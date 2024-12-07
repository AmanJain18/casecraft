'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'; // Assuming you have a custom Card component
import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from './actions'; // The function to fetch orders
import { Loader2 } from 'lucide-react';
import PhonePreview from '@/components/custom/PhonePreview';
import Link from 'next/link';
import { GetOrders } from '@/db';

const OrdersPage = () => {
    const { data: orders, isLoading } = useQuery<GetOrders[]>({
        queryKey: ['user-orders'],
        queryFn: getUserOrders,
        retry: 1,
    });

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className='mt-20 flex justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
            </div>
        );
    }

    return (
        <div className='orders-page container mx-auto px-4 py-10'>
            <h2 className='mb-4 text-2xl font-bold'>Your Orders</h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {orders?.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders?.map((order) => (
                        <Card key={order.id} className='shadow-lg'>
                            <CardHeader>
                                <CardTitle>
                                    Order Id:-{' '}
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
                                        'Not provided'}
                                    {'-'}
                                    {order.shippingAddress?.postalCode ||
                                        'Not provided'}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
