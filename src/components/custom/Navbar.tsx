import React from 'react';
import MaxWithWrapper from './MaxWithWrapper';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// type Props = {}

const Navbar = async() => {

  const { getUser} = getKindeServerSession();

  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  
  return (
    <nav className="sticky h-16 z-[100] top-0 w-full border-b bg-white/75 border-gray-200 inset-x-0 backdrop-blur-lg transition-all">
      <MaxWithWrapper>
        <div className="flex h-16 items-center justify-between border-zinc-200 border-b">
          {/* Left */}
          <Link href="/" className="flex font-semibold z-40">
            Phone
            <span className=" text-purple-600">Case</span>
          </Link>
          {/* Right */}
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign Out
                </Link>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    })}
                  >
                    Dashboard ✨
                  </Link>
                )}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: 'sm',
                    className:
                      'hidden sm:flex items-center gap-1 bg-purple-600 font-semibold',
                  })}
                >
                  Create case <ArrowRight className="h-5 w-5 ml-1.5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign Up
                </Link>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Login
                </Link>

                <div className="w-px h-8 bg-zinc-200 hidden sm:block" />

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: 'sm',
                    className:
                      'hidden sm:flex items-center gap-1 font-semibold',
                  })}
                >
                  Create case <ArrowRight className="h-5 w-5 ml-1.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWithWrapper>
    </nav>
  );
};

export default Navbar;
