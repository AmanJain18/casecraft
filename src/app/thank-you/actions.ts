'use server';

import { getOrder, getUserByProviderId } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user.email) {
            throw new Error('You need to be logged in to view this page.');
        }

        const dbUser = await getUserByProviderId(user.id);
        if (!dbUser) {
            throw new Error('User not found.');
        }

        const order = await getOrder(orderId, dbUser.id);
        if (!order) {
            throw new Error('This order does not exist.');
        }

        return order.isPaid ? order : false;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw error;
    }
};
