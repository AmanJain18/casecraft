'use client';
import Phone from '@/components/custom/Phone';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BASE_PRICE, COLORS, MODELS, PRODUCT_PRICES } from '@/constant';
import { useToast } from '@/hooks/use-toast';
import { cn, formatPrice } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Configuration } from '@prisma/client';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
interface DesignPreviewProps {
    configuration: Configuration;
}

const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};
const DesignPreview = ({ configuration }: DesignPreviewProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useKindeBrowserClient();
    const [showConfetti, setShowConfetti] = useState(false);
    const { id, color, model, finish, material } = configuration;

    const bg = COLORS.find(({ value }) => value === color)?.bg;

    const { name: modelLabel } = MODELS.options.find(
        ({ value }) => value === model,
    )!;

    let totalPrice = BASE_PRICE;
    if (material === 'polycarbonate')
        totalPrice += PRODUCT_PRICES.material.polycarbonate;
    if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured;

    const handleCheckout = () => {
        if (user) {
            // create payment session
            // createPaymentSession({ configId: id });
        } else {
            // User Needs to Login -> Open Login Modal
            localStorage.setItem('configurationId', id);
        }
    };

    useEffect(() => {
        setShowConfetti(true);
    }, []);

    return (
        <>
            <div className='pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden'>
                <Confetti active={showConfetti} config={config} />
            </div>

            <div className='container mx-auto mt-20 px-4 sm:px-6 md:mt-16 lg:px-8'>
                <div className='grid grid-cols-1 justify-items-center gap-y-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12'>
                    {/* Left/Top Section */}
                    <div className='flex items-center justify-center md:col-span-4'>
                        <div className='w-full max-w-[150px] md:max-w-full'>
                            <Phone
                                className={cn(`${bg}`, 'w-full')}
                                imgSrc={configuration.croppedImageUrl!}
                            />
                        </div>
                    </div>

                    {/* Right/Bottom Section */}
                    <div className='space-y-8 md:col-span-8'>
                        {/* Heading and Subheading */}
                        <div className='flex flex-col items-center md:items-start'>
                            <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
                                Your {modelLabel} Case
                            </h3>
                            <p className='mt-3 flex items-center gap-1.5 text-base text-primary'>
                                <Check className='h-5 w-5' />
                                In stock and ready to ship
                            </p>
                        </div>

                        {/* Highlights and Materials Section */}
                        <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6'>
                            {/* Highlights */}
                            <div>
                                <p className='font-medium text-zinc-950'>
                                    Highlights
                                </p>
                                <ol className='mt-3 list-inside list-disc text-zinc-700'>
                                    <li>Wireless charging compatible</li>
                                    <li>TPU shock absorption</li>
                                    <li>
                                        Packaging made from recycled materials
                                    </li>
                                    <li>3 year print warranty</li>
                                </ol>
                            </div>

                            {/* Materials */}
                            <div>
                                <p className='font-medium text-zinc-950'>
                                    Materials
                                </p>
                                <ol className='mt-3 list-inside list-disc text-zinc-700'>
                                    <li>High-quality, durable material</li>
                                    <li>
                                        Scratch- and fingerprint-resistant
                                        coating
                                    </li>
                                </ol>
                            </div>
                        </div>

                        {/* Pricing and Checkout */}
                        <div className='rounded-md bg-primary/10 p-6 sm:rounded-lg sm:p-8'>
                            <div className='flow-root text-sm'>
                                {/* Base Price */}
                                <div className='flex items-center justify-between py-1'>
                                    <p className='text-gray-600'>
                                        Base Price (
                                        {color
                                            ? `${color[0].toUpperCase()}${color.slice(1)} Color`
                                            : ''}
                                        )
                                    </p>
                                    <p className='font-medium text-gray-900'>
                                        {formatPrice(BASE_PRICE / 100)}
                                    </p>
                                </div>

                                {/* Textured Finish (if applicable) */}
                                {
                                    <div className='flex items-center justify-between py-1'>
                                        <p className='text-gray-600'>
                                            {finish === 'textured'
                                                ? 'Textured Finish'
                                                : 'Smooth Finish'}
                                        </p>
                                        <p className='font-medium text-gray-900'>
                                            {finish === 'textured'
                                                ? formatPrice(
                                                      PRODUCT_PRICES.finish
                                                          .textured / 100,
                                                  )
                                                : formatPrice(
                                                      PRODUCT_PRICES.finish
                                                          .smooth / 100,
                                                  )}
                                        </p>
                                    </div>
                                }

                                {/* Polycarbonate Material (if applicable) */}
                                {
                                    <div className='flex items-center justify-between py-1'>
                                        <p className='text-gray-600'>
                                            {material === 'polycarbonate'
                                                ? 'Soft polycarbonate material'
                                                : 'Silicone material'}
                                        </p>
                                        <p className='font-medium text-gray-900'>
                                            {material === 'polycarbonate'
                                                ? formatPrice(
                                                      PRODUCT_PRICES.material
                                                          .polycarbonate / 100,
                                                  )
                                                : formatPrice(
                                                      PRODUCT_PRICES.material
                                                          .silicone / 100,
                                                  )}
                                        </p>
                                    </div>
                                }

                                {/* Divider */}
                                <Separator />

                                {/* Order Total */}
                                <div className='flex items-center justify-between py-2'>
                                    <p className='font-semibold text-gray-900'>
                                        Order total
                                    </p>
                                    <p className='font-semibold text-gray-900'>
                                        {formatPrice(totalPrice / 100)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className='flex justify-end pb-8'>
                            <Button
                                // disabled={isPending}
                                onClick={() => handleCheckout()}
                                size='sm'
                                className='w-full px-4 sm:px-6 lg:px-8'
                            >
                                {false ? (
                                    <>
                                        Processing Order{' '}
                                        <Loader2 className='ml-1.5 inline h-4 w-4 animate-spin' />
                                    </>
                                ) : (
                                    <>
                                        Check out{' '}
                                        <ArrowRight className='ml-1.5 inline h-4 w-4' />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DesignPreview;
