'use server'
import { getUserByProviderId, getUserOrdersFromDb } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// Function to fetch user orders from the database
export const getUserOrders = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id)
        throw new Error('You need to be logged in to view configurations.');

    const dbUser = await getUserByProviderId(user.id);

    if (!dbUser) {
        throw new Error('User not found.');
    }

    const orders = await getUserOrdersFromDb(dbUser.id);
    return orders || [];
};
