'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getPaymentStatus } from './actions';

const ThankYou = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') ?? '';

    const { data, error, isLoading } = useQuery({
        queryKey: ['get-payment-status', orderId],
        queryFn: () => getPaymentStatus({ orderId }),
        retry: 2,
        retryDelay: 500,
        enabled: !!orderId, // Prevent query from running without orderId
    });

    // Error handling
    if (error instanceof Error) {
        return (
            <div className='mt-24 flex w-full items-center justify-center'>
                <div className='text-center'>
                    <h3 className='text-xl font-semibold text-red-500'>
                        Error: {error.message}
                    </h3>
                </div>
            </div>
        );
    }

    // Loading State
    if (isLoading) {
        return (
            <div className='mt-24 flex w-full items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
                    <h3 className='text-xl font-semibold'>
                        Loading your order...
                    </h3>
                    <p>This won't take long.</p>
                </div>
            </div>
        );
    }

    // Payment Verification Pending
    if (data === false) {
        return (
            <div className='mt-24 flex w-full items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
                    <h3 className='text-xl font-semibold'>
                        Verifying your payment...
                    </h3>
                    <p>This might take a moment.</p>
                </div>
            </div>
        );
    }

    // Successful Payment
    const { billingAddress, shippingAddress, amount } = data!;

    return (
        <div className='bg-white py-16 sm:py-24 lg:py-32'>
            <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
                <div className='max-w-2xl'>
                    <p className='text-base font-medium text-primary'>
                        Thank you!
                    </p>
                    <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
                        Your case is on the way!
                    </h1>
                    <p className='mt-2 text-base text-zinc-500'>
                        We've received your order and are now processing it.
                    </p>

                    <div className='mt-12 text-sm font-medium'>
                        <p className='text-zinc-900'>Order number</p>
                        <p className='mt-2 text-zinc-500'>{orderId}</p>
                    </div>
                </div>

                <div className='mt-10 border-t border-zinc-200 pt-10'>
                    <h4 className='font-semibold text-zinc-900'>
                        You made a great choice!
                    </h4>
                    <p className='mt-2 text-sm text-zinc-600'>
                        We at PhoneCase believe that a phone case doesn't only
                        need to look good, but also last you for years. We offer
                        a 3-year print guarantee: If your case isn't of the
                        highest quality, we'll replace it for free.
                    </p>
                </div>

                <div className='mt-4 flex justify-center space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10'>
                    {/* TODO:// Add Phone Preview Showcase */}
                </div>

                {/* Address Section */}
                <div className='mt-10 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2'>
                    <div>
                        <p className='font-medium text-gray-900'>
                            Shipping address
                        </p>
                        <address className='mt-2 text-zinc-700'>
                            {shippingAddress?.name && (
                                <span className='block'>{shippingAddress.name},</span>
                            )}
                            {shippingAddress?.street && (
                                <span className='block'>{shippingAddress.street},</span>
                            )}
                            {shippingAddress?.postalCode && (
                                <span className='block'>
                                    {shippingAddress.postalCode}{', '}
                                    {shippingAddress.city}
                                </span>
                            )}
                        </address>
                    </div>
                    <div>
                        <p className='font-medium text-gray-900'>
                            Billing address
                        </p>
                        <address className='mt-2 text-zinc-700'>
                            {billingAddress?.name && (
                                <span className='block'>{billingAddress.name}</span>
                            )}
                            {billingAddress?.street && (
                                <span className='block'>{billingAddress.street}</span>
                            )}
                            {billingAddress?.postalCode && (
                                <span className='block'>
                                    {billingAddress.postalCode}{', '}
                                    {billingAddress.city}
                                </span>
                            )}
                        </address>
                    </div>
                </div>

                {/* Payment Status Section */}
                <div className='grid grid-cols-2 gap-x-6 border-t border-zinc-200 mt-10 text-sm py-4 '>
                    <div>
                        <p className='font-medium text-zinc-900'>
                            Payment status
                        </p>
                        <p className='mt-2 text-zinc-700'>Paid</p>
                    </div>
                    <div>
                        <p className='font-medium text-zinc-900'>
                            Shipping Method
                        </p>
                        <p className='mt-2 text-zinc-700'>
                            DHL, takes up to 3 working days
                        </p>
                    </div>
                </div>

                {/* Price Section */}
                <div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
                    <div className='flex justify-between'>
                        <p className='font-medium text-zinc-900'>Subtotal</p>
                        <p className='text-zinc-700'>{formatPrice(amount)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-medium text-zinc-900'>Shipping</p>
                        <p className='text-zinc-700'>{formatPrice(0)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-medium text-zinc-900'>Total</p>
                        <p className='text-zinc-700'>{formatPrice(amount)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
