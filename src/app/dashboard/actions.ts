'use server';

import client from '@/db';
import { OrderStatus } from '@prisma/client';

export const changeOrderStatus = async ({
    id,
    newStatus,
}: {
    id: string;
    newStatus: OrderStatus;
}) => {
    await client.order.update({
        where: { id },
        data: { orderStatus: newStatus },
    });
};
