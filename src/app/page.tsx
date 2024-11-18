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
    <div className="bg-slate-50">
      <section>
        <MaxWithWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 xl:pb-64">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src="/images/snake-1.png"
                  alt="PhoneCase Logo"
                  className="w-full h-full"
                  priority
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance font-bold text-gray-900 mt-16 !leading-tight text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{' '}
                <span className="bg-primary text-white px-2">Custom</span>{' '}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left text-balance md:text-wrap max-w-prose">
                Capture your favorite moments with your own,{' '}
                <span className="font-semibold">one-of-one</span> Phone Case.
                Phone Case allows you to protect your memories, not just your
                phone.
              </p>
              <ul className="mt-8 space-y-2 font-medium flex flex-col items-center sm:items-center text-left">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>High-quality, durable materials</span>
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Unique and personalized</span>
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>3 years of print warranty</span>
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Modern IPhone models supported</span>
                  </li>
                </div>
              </ul>

              <div className="mt-8 items-center gap-5 sm:items-start sm:flex-row flex flex-col">
                <div className="flex -space-x-2">
                  <Image
                    src="/users/user-1.png"
                    alt="User Image"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 inline-block object-cover"
                  />
                  <Image
                    src="/users/user-2.png"
                    alt="User Image"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                  <Image
                    src="/users/user-3.png"
                    alt="User Image"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                  <Image
                    src="/users/user-4.jpg"
                    alt="User Image"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                  <Image
                    src="/users/user-5.jpg"
                    alt="User Image"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full ring-2 ring-slate-100 object-cover"
                  />
                </div>

                <div className="flex flex-col items-center justify-between sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p>
                    <span className="font-semibold text-gray-900">1000+</span>
                    &nbsp; happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex px-8 justify-center w-full lg:col-span-1 col-span-full sm:px-16 md:px-0 mt-32 lg:mt-20 h-fit lg:px-0">
            <div className="relative md:max-w-xl">
              <Image
                src="/images/your-image.png"
                alt="Hero Image"
                width={600}
                height={400}
                className="w-40 absolute lg:w-52 left-56 sm:-top-20 xl:-top-36 select-none hidden sm:block lg:hidden xl:block"
              />
              <Image
                src="/images/line.png"
                alt="Dotted Line"
                width={400}
                height={600}
                className="w-20 absolute -left-6 -bottom-6 select-none"
              />
              <Phone imgSrc="/testimonials/3.jpg" />
            </div>
          </div>
        </MaxWithWrapper>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-slate-100 grainy-dark py-24">
        <MaxWithWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <img
              src="/images/snake-2.png"
              className="w-24 order-0 lg:order-2"
            />
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{' '}
              <span className="relative px-2">
                customers{' '}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-7 text-primary" />
              </span>{' '}
              say
            </h2>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 lg:gap-x-8 xl:gap-x-20">
            {/* first user review */}
            <div className="flex flex-auto flex-col gap-4">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &quot;The case feels durable and I even got a compliment on
                  the design. Had the case for two and a half months now and{' '}
                  <span className="p-0.5 bg-slate-800 text-white">
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it.&quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-1.png"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-primary" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className="flex flex-auto flex-col gap-4">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  &quot;I usually keep my phone together with my keys in my
                  pocket and that led to some pretty heavy scratchmarks on all
                  of my last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className="p-0.5 bg-slate-800 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it.&quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="/users/user-4.jpg"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Josh</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-primary" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWithWrapper>

        <div className="pt-16">
          <CaseShowcase />
        </div>
      </section>

      {/* CTA */}
      <section>
        <MaxWithWrapper className="py-24">
          {/* CTA Heading */}
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload your photo and get{' '}
                <span className="relative px-2 pb-1 bg-primary text-white">
                  your own case
                </span>{' '}
                now
              </h2>
            </div>
          </div>

          {/* Image Transitions  */}
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/images/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl z-50">
                <img
                  src="/images/horse.jpg"
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                />
              </div>

              <Phone className="w-60" imgSrc="/images/horse_phone.jpg" />
            </div>
          </div>

          {/* CTA Description */}
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-primary inline mr-1.5" />
              High-quality silicone material
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-primary inline mr-1.5" />
              Scratch- and fingerprint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-primary inline mr-1.5" />
              Wireless charging compatible
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-primary inline mr-1.5" />3 year
              print warranty
            </li>

            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href="/configure/upload"
              >
                Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWithWrapper>
      </section>
    </div>
  );
}
