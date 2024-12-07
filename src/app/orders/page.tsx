'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getUserOrders } from './actions';
import { GetOrders } from '@/db';
import PhonePreview from '@/components/custom/PhonePreview';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper';

const OrdersPage = () => {
    const { data: orders, isLoading } = useQuery<GetOrders[]>({
        queryKey: ['user-orders'],
        queryFn: getUserOrders,
        retry: 1,
    });

    // Loading state
    if (isLoading) {
        return (
            <div className='mt-20 flex justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
            </div>
        );
    }

    return (
        <MaxWidthWrapper className='py-10'>
            <h2 className='mb-8 text-3xl font-bold'>Your Orders</h2>
            {orders?.length === 0 ? (
                <p className='text-zinc-500'>No orders found.</p>
            ) : (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {orders?.map((order) => (
                        <Card key={order.id} className='shadow-lg'>
                            <CardHeader>
                                <CardTitle>
                                    Order ID:{' '}
                                    <Link
                                        href={`thank-you?orderId=${order.id}`}
                                        className='text-primary underline underline-offset-4'
                                    >
                                        {order.id}
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    Status: {order.orderStatus}
                                    <div className='mt-4 flex justify-center space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10'>
                                        <PhonePreview
                                            imgSrc={
                                                order.configuration
                                                    .croppedImageUrl!
                                            }
                                            color={order.configuration.color!}
                                        />
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Amount: ₹{order.amount.toFixed(2)}</p>
                                <p>
                                    Ordered On:{' '}
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                                <p>Order By: {order.user.name}</p>
                                <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
                                <p>
                                    Shipping Address:{' '}
                                    {order.shippingAddress?.street ||
                                        'Not provided'}{' '}
                                    -{' '}
                                    {order.shippingAddress?.postalCode ||
                                        'Not provided'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </MaxWidthWrapper>
    );
};

export default OrdersPage;
