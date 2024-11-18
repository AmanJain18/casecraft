import client from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import OrderReceived from '@/components/emails/OrderReceived';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;
function formatAddress(address: Stripe.Address) {
    return {
        street: [address.line1, address.line2].filter(Boolean).join(', '),
        city: address.city!,
        state: address.state!,
        postalCode: address.postal_code!,
        country: address.country!,
    };
}

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = (await headers()).get('stripe-signature');

        if (!signature) {
            return new Response('Invalid signature', { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET_LOCAL!,
        );

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;

            if (!session.customer_details?.email) {
                throw new Error('Missing user email');
            }

            const { userId, orderId } = session.metadata || {};

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata');
            }

            if (!session.shipping_details) {
                throw new Error('Missing shipping details');
            }

            const billingAddress = formatAddress(
                session.customer_details?.address ||
                    session.shipping_details!.address!,
            );

            const shippingAddress = formatAddress(
                session.shipping_details!.address!,
            );

            const paymentId =
                typeof session.payment_intent === 'string'
                    ? session.payment_intent
                    : session.payment_intent?.id;

            if (!paymentId) {
                throw new Error('Missing payment ID');
            }

            const updatedOrder = await client.order.update({
                where: { id: orderId },
                data: {
                    isPaid: true,
                    stripePaymentId: paymentId,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            contact: session.customer_details?.phone,
                            ...shippingAddress,
                        },
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            contact: session.customer_details?.phone,
                            ...billingAddress,
                        },
                    },
                },
                include: {
                    configuration: true,
                },
            });

            await resend.emails.send({
                from: `PhoneCase <${adminEmail}>`,
                to: [session.customer_details.email!],
                subject: 'Thanks for your order!',
                react: OrderReceived({
                    orderId,
                    orderDate: updatedOrder.createdAt.toLocaleDateString(),
                    amount: session.amount_total! / 100,
                    config: updatedOrder.configuration,
                    orderStatus: updatedOrder.isPaid
                        ? 'Paid'
                        : 'Pending Payment',
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details!.name!,
                        city: shippingAddress!.city!,
                        country: shippingAddress!.country!,
                        postalCode: shippingAddress!.postalCode!,
                        street: shippingAddress!.street!,
                        state: shippingAddress!.state!,
                    },
                }),
            });
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (err) {
        console.error('Error handling Stripe webhook:', err);
        return NextResponse.json(
            { message: 'Something went wrong', ok: false },
            { status: 500 },
        );
    }
}
