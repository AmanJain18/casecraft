'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getAuthStatus } from './actions';

const Page = () => {
    const router = useRouter();
    const [configId, setConfigId] = useState<string | null>(null);

    useEffect(() => {
        const configurationId = localStorage.getItem('configurationId');
        if (configurationId) setConfigId(configurationId);
    }, []);

    const { data, isSuccess, isError, error, isFetching } = useQuery({
        queryKey: ['auth-callback'],
        queryFn: async () => await getAuthStatus(),
        retry: true,
        retryDelay: 500,
    });

    useEffect(() => {
        if (isSuccess && data?.success) {
            if (configId) {
                router.push(`/configure/preview?id=${configId}`);
                localStorage.removeItem('configurationId');
            } else {
                router.push('/');
            }
        }
    }, [isSuccess, data, configId, router]);

    if (isFetching) {
        return (
            <div className='mt-24 flex w-full justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
                    <h3 className='text-xl font-semibold'>Logging you in...</h3>
                    <p>You will be redirected automatically.</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='mt-24 flex w-full justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <h3 className='text-xl font-semibold text-red-500'>
                        Authentication Failed, Try again after sometime.
                    </h3>
                    <p className='text-sm text-gray-600'>
                        {error instanceof Error
                            ? error.message
                            : 'An unexpected error occurred.'}
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className='mt-2 text-blue-600 underline'
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default Page;
