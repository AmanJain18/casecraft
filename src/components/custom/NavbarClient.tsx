'use client';

import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import {
    LoginLink,
    RegisterLink,
    LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

const NavbarClient = ({
    user,
    isAdmin,
}: {
    user: KindeUser<Record<string, unknown>> | null;
    isAdmin: boolean;
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Utility function to conditionally render protected links
    const renderProtectedLink = (href: string, label: string) => (
        <Link
            href={href}
            className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
            })}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
        >
            {label}
        </Link>
    );

    return (
        <>
            <div className='relative flex items-center space-x-4 sm:flex-row sm:space-x-6'>
                {/* Create Case Button Outside Hamburger Menu */}
                <div className='order-none sm:order-last sm:ml-6'>
                    <Link
                        href='/configure/upload'
                        className={buttonVariants({
                            size: 'sm',
                            className:
                                'flex items-center gap-1 bg-purple-600 font-semibold text-white',
                        })}
                    >
                        Create Case <ArrowRight className='ml-1.5 h-5 w-5' />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='block sm:hidden'>
                    <button
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className='p-2'
                    >
                        {isMobileMenuOpen ? (
                            <X className='h-6 w-6 text-gray-700' />
                        ) : (
                            <Menu className='h-6 w-6 text-gray-700' />
                        )}
                    </button>
                </div>
                {/* Desktop and Tablet Navigation Links */}
                <div className='hidden items-center space-x-6 sm:flex'>
                    {user ? (
                        <>
                            <LogoutLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign Out
                            </LogoutLink>
                            {/* Admin Dashboard Link */}
                            {isAdmin &&
                                renderProtectedLink(
                                    '/dashboard',
                                    'Dashboard ✨',
                                )}

                            {/* Protected Links */}
                            {renderProtectedLink('/orders', 'My Orders')}
                            {renderProtectedLink(
                                '/configurations',
                                'My Configurations',
                            )}
                        </>
                    ) : (
                        <>
                            <RegisterLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                            >
                                Sign up
                            </RegisterLink>
                            <LoginLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                            >
                                Login
                            </LoginLink>
                        </>
                    )}
                </div>
            </div>

            {/* Hamburger Menu */}
            <motion.div
                className={`fixed inset-x-0 top-16 z-40 w-full bg-white sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                initial={{ height: 0 }}
                animate={{ height: isMobileMenuOpen ? '28vh' : 0 }}
                transition={{ duration: 0.3 }}
                exit={{ height: 0 }}
                aria-hidden={!isMobileMenuOpen}
                aria-expanded={isMobileMenuOpen}
            >
                <div className='flex flex-col items-center justify-center space-y-6 py-10'>
                    {user ? (
                        <>
                            <LogoutLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign Out
                            </LogoutLink>

                            {isAdmin &&
                                renderProtectedLink(
                                    '/dashboard',
                                    'Dashboard ✨',
                                )}

                            {renderProtectedLink('/orders', 'My Orders')}
                            {renderProtectedLink(
                                '/configurations',
                                'My Configurations',
                            )}
                        </>
                    ) : (
                        <>
                            <RegisterLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign up
                            </RegisterLink>
                            <LoginLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </LoginLink>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default NavbarClient;
