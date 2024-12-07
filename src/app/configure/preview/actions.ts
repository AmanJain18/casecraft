'use server';

import { BASE_PRICE, PRODUCT_PRICES } from '@/constant';
import client, {
    createOrder,
    ensureUser,
    getConfigurationById,
    linkConfigurationToUser,
} from '@/db';
import { stripe } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Order } from '@prisma/client';

export const createCheckoutSession = async ({
    configId,
}: {
    configId: string;
}) => {
    const configuration = await getConfigurationById(configId);

    if (!configuration) {
        throw new Error('No such configuration found');
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error('You need to be logged in');
    }

    // Step 1: Ensure the user exists in the database
    const dbUser = await ensureUser({
        providerId: user.id,
        email: user.email!,
        name: user.given_name ?? undefined,
    });

    // Step 2: Link the configuration to the user
    await linkConfigurationToUser(configuration.id, dbUser.id);

    const { finish, material } = configuration;

    let price = BASE_PRICE;
    if (finish === 'textured') price += PRODUCT_PRICES.finish.textured;
    if (material === 'polycarbonate')
        price += PRODUCT_PRICES.material.polycarbonate;

    let order: Order | undefined = undefined;

    const existingOrder = await client.order.findFirst({
        where: {
            userId: dbUser.id,
            configurationId: configuration.id,
        },
    });

    console.log(dbUser.id, configuration.id);

    if (existingOrder) {
        order = existingOrder;
    } else {
        order = await createOrder(price / 100, dbUser.id, configuration.id);
    }

    const product = await stripe.products.create({
        name: 'Custom iPhone Case',
        images: [configuration.originalImageUrl],
        default_price_data: {
            currency: 'INR',
            unit_amount: price,
        },
    });

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types: ['card'],
        mode: 'payment',
        currency: 'INR',
        shipping_address_collection: { allowed_countries: ['IN'] },
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
};
