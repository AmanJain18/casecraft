// Navbar.tsx (Server-side component)
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import NavbarClient from './NavbarClient'; // Import client-side navbar component

const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return (
        <nav className='sticky inset-x-0 top-0 z-50 h-16 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg'>
            <MaxWidthWrapper>
                <div className='flex h-16 items-center justify-between'>
                    {/* Left Side */}
                    <Link href='/' className='z-40 text-lg font-semibold'>
                        Case<span className='text-purple-600'>Craft</span>
                    </Link>

                    {/* Right Side (Client-side logic for navbar) */}
                    <NavbarClient user={user} isAdmin={isAdmin} />
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
