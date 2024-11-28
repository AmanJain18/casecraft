import { Icons } from '@/components/custom/Icons';
import MaxWithWrapper from '@/components/custom/MaxWithWrapper';
import Phone from '@/components/custom/Phone';
import { CaseShowcase } from '@/components/custom/CaseShowcase';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className='bg-slate-50'>
            <section>
                <MaxWithWrapper className='pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pb-64 xl:pt-32'>
                    <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
                        <div className='relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left'>
                            <div className='absolute -top-20 left-0 hidden w-28 lg:block'>
                                <Image
                                    src='/images/snake-1.png'
                                    alt='Case Craft'
                                    className='h-full w-full'
                                    priority
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h1 className='relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl'>
                                Your Image, Your{' '}
                                <span className='bg-primary px-2 text-white'>
                                    Case
                                </span>
                                , Your{' '}
                                <span className='bg-primary px-2 text-white'>
                                    Style
                                </span>{' '}
                            </h1>
                            <p className='mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10 lg:text-left'>
                                Transform your favorite moments into a{' '}
                                <span className='font-semibold'>
                                    one-of-a-kind
                                </span>{' '}
                                phone case. With{' '}
                                <span className='font-bold'>Case Craft,</span>{' '}
                                you don’t just protect your phone – you protect
                                your memories. Our custom phone cases are
                                designed to be as unique as you are, offering
                                both style and functionality.
                            </p>
                            <ul className='mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-center'>
                                <div className='space-y-2'>
                                    <li className='flex items-center gap-1.5 text-left'>
                                        <Check className='h-5 w-5 shrink-0 text-purple-600' />
                                        <span>
                                            Premium Quality & Durability.
                                        </span>
                                    </li>
                                    <li className='flex items-center gap-1.5 text-left'>
                                        <Check className='h-5 w-5 shrink-0 text-purple-600' />
                                        <span>
                                            Personalized and unique designs.
                                        </span>
                                    </li>
                                    <li className='flex items-center gap-1.5 text-left'>
                                        <Check className='h-5 w-5 shrink-0 text-purple-600' />
                                        <span>3-Year Print Warranty.</span>
                                    </li>
                                    <li className='flex items-center gap-1.5 text-left'>
                                        <Check className='h-5 w-5 shrink-0 text-purple-600' />
                                        <span>
                                            Latest iPhone Models Supported.
                                        </span>
                                    </li>
                                </div>
                            </ul>

                            <div className='mt-8 flex flex-col items-center gap-5 sm:flex-row sm:items-start'>
                                <div className='flex -space-x-2'>
                                    <Image
                                        src='/users/user-1.png'
                                        alt='User Image'
                                        width={100}
                                        height={100}
                                        className='inline-block h-12 w-12 rounded-full object-cover ring-2 ring-slate-100'
                                    />
                                    <Image
                                        src='/users/user-2.png'
                                        alt='User Image'
                                        width={100}
                                        height={100}
                                        className='h-12 w-12 rounded-full object-cover ring-2 ring-slate-100'
                                    />
                                    <Image
                                        src='/users/user-3.png'
                                        alt='User Image'
                                        width={100}
                                        height={100}
                                        className='h-12 w-12 rounded-full object-cover ring-2 ring-slate-100'
                                    />
                                    <Image
                                        src='/users/user-4.jpg'
                                        alt='User Image'
                                        width={100}
                                        height={100}
                                        className='h-12 w-12 rounded-full object-cover ring-2 ring-slate-100'
                                    />
                                    <Image
                                        src='/users/user-5.jpg'
                                        alt='User Image'
                                        width={100}
                                        height={100}
                                        className='h-12 w-12 rounded-full object-cover ring-2 ring-slate-100'
                                    />
                                </div>

                                <div className='flex flex-col items-center justify-between sm:items-start'>
                                    <div className='flex gap-0.5'>
                                        <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                                        <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                                        <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                                        <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                                        <Star className='h-4 w-4 fill-yellow-500 text-yellow-500' />
                                    </div>
                                    <p>
                                        <span className='font-semibold text-gray-900'>
                                            1000+
                                        </span>
                                        &nbsp; happy customers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mt-20 lg:px-0'>
                        <div className='relative md:max-w-xl'>
                            <Image
                                src='/images/your-image.png'
                                alt='Hero Image'
                                width={600}
                                height={400}
                                className='absolute left-56 hidden w-40 select-none sm:-top-20 sm:block lg:hidden lg:w-52 xl:-top-36 xl:block'
                            />
                            <Image
                                src='/images/line.png'
                                alt='Dotted Line'
                                width={400}
                                height={600}
                                className='absolute -bottom-6 -left-6 w-20 select-none'
                            />
                            <Phone imgSrc='/testimonials/3.jpg' />
                        </div>
                    </div>
                </MaxWithWrapper>
            </section>

            {/* Value Proposition Section */}
            <section className='grainy-dark bg-slate-100 py-24'>
                <MaxWithWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
                    <div className='flex flex-col items-center gap-4 sm:gap-6 lg:flex-row'>
                        <img
                            src='/images/snake-2.png'
                            className='order-0 w-24 lg:order-2'
                        />
                        <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl'>
                            What our{' '}
                            <span className='relative px-2'>
                                customers{' '}
                                <Icons.underline className='pointer-events-none absolute inset-x-0 -bottom-7 hidden text-primary sm:block' />
                            </span>{' '}
                            say
                        </h2>
                    </div>

                    <div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-20'>
                        {/* first user review */}
                        <div className='flex flex-auto flex-col gap-4'>
                            <div className='mb-2 flex gap-0.5'>
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                            </div>
                            <div className='text-lg leading-8'>
                                <p>
                                    &quot;I’ve been using this case for six
                                    months, and{'  '}
                                    <span className='bg-slate-800 p-0.5 text-white'>
                                        it still looks almost brand new!
                                    </span>{' '}
                                    The print hasn't faded or peeled, and there
                                    are no significant scratches despite my
                                    phone being in and out of my bag daily. I’m
                                    really impressed with the durability and
                                    clarity of the image.&quot;
                                </p>
                            </div>
                            <div className='mt-2 flex gap-4'>
                                <img
                                    className='h-12 w-12 rounded-full object-cover'
                                    src='/users/user-1.png'
                                    alt='user'
                                />
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Jonathan</p>
                                    <div className='flex items-center gap-1.5 text-zinc-600'>
                                        <Check className='h-4 w-4 stroke-[3px] text-primary' />
                                        <p className='text-sm'>
                                            Verified Purchase
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* second user review */}
                        <div className='flex flex-auto flex-col gap-4'>
                            <div className='mb-2 flex gap-0.5'>
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                                <Star className='h-5 w-5 fill-primary text-primary' />
                            </div>
                            <div className='text-lg leading-8'>
                                <p>
                                    "I’ve been using my custom case for{' '}
                                    <span className='bg-slate-800 p-0.5 text-white'>
                                        over a year now,
                                    </span>{' '}
                                    and the image is still as clear and vibrant
                                    as when I first got it. The case has minimal
                                    scratches despite being dropped, and it
                                    still feels premium and sturdy. Unlike
                                    others, there’s no fading or discoloration.{' '}
                                    <span className='bg-slate-800 p-0.5 text-white'>
                                        Worth every penny for its long-term
                                        protection.
                                    </span>{' '}
                                    I highly recommend it."
                                </p>
                            </div>
                            <div className='mt-2 flex gap-4'>
                                <img
                                    className='h-12 w-12 rounded-full object-cover'
                                    src='/users/user-4.jpg'
                                    alt='user'
                                />
                                <div className='flex flex-col'>
                                    <p className='font-semibold'>Josh</p>
                                    <div className='flex items-center gap-1.5 text-zinc-600'>
                                        <Check className='h-4 w-4 stroke-[3px] text-primary' />
                                        <p className='text-sm'>
                                            Verified Purchase
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWithWrapper>

                <div className='pt-16'>
                    <CaseShowcase />
                </div>
            </section>

            {/* CTA */}
            <section>
                <MaxWithWrapper className='py-24'>
                    {/* CTA Heading */}
                    <div className='mb-12 px-6 lg:px-8'>
                        <div className='mx-auto max-w-2xl sm:text-center'>
                            <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl'>
                                Design Your{' '}
                                <span className='relative bg-primary px-2 pb-1 text-white'>
                                    Personalized
                                </span>{' '}
                                Phone Case Today
                            </h2>
                            <p className='mt-4 text-center text-xl text-gray-600'>
                                Upload your photo and create a custom case
                                that’s as unique as you.
                            </p>
                        </div>
                    </div>

                    {/* Image Transitions  */}
                    <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                        <div className='relative flex grid-cols-2 flex-col items-center gap-40 md:grid'>
                            <img
                                src='/images/arrow.png'
                                className='absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0'
                            />

                            <div className='relative z-50 h-80 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl'>
                                <img
                                    src='/images/horse.jpg'
                                    className='h-full w-full rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10'
                                />
                            </div>

                            <Phone
                                className='w-60'
                                imgSrc='/images/horse_phone.jpg'
                            />
                        </div>
                    </div>

                    {/* CTA Description */}
                    <ul className='mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg'>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            Premium, high-quality silicone for ultimate
                            protection
                        </li>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            Scratch-resistant and fingerprint-free coating
                        </li>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            Seamless wireless charging compatibility
                        </li>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            3-year print warranty to ensure lasting quality
                        </li>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            Vivid, high-resolution prints that won’t fade over
                            time
                        </li>
                        <li className='w-fit'>
                            <Check className='mr-1.5 inline h-5 w-5 text-primary' />
                            Eco-friendly, durable materials that stand the test
                            of time
                        </li>

                        <div className='flex justify-center'>
                            <Link
                                className={buttonVariants({
                                    size: 'lg',
                                    className: 'mx-auto mt-8',
                                })}
                                href='/configure/upload'
                            >
                                Create your case now{' '}
                                <ArrowRight className='ml-1.5 h-4 w-4' />
                            </Link>
                        </div>
                    </ul>
                </MaxWithWrapper>
            </section>
        </div>
    );
}
