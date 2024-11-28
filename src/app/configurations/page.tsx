'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash } from 'lucide-react';
import { fetchConfigurations, removeConfiguration } from './actions';
import { Button } from '@/components/ui/button';
import { ConfigurationWithOrders } from '@/db';

const ConfigurationsPage = () => {
    const queryClient = useQueryClient();

    const { data: configurations, isLoading } = useQuery<
        ConfigurationWithOrders[]
    >({
        queryKey: ['configurations'],
        queryFn: fetchConfigurations,
        retry: 1,
    });

    const { mutate: deleteConfiguration, isPending: isDeleting } = useMutation({
        mutationFn: removeConfiguration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['configurations'] });
        },
        onError: (error: Error) => {
            console.error(error.message);
        },
    });

    if (isLoading) {
        return (
            <div className='mt-20 flex justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-10'>
            <h1 className='mb-8 text-3xl font-bold'>Your Configurations</h1>
            {configurations?.length === 0 ? (
                <p className='text-zinc-500'>No configurations found.</p>
            ) : (
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {Array.isArray(configurations) &&
                    configurations.length > 0 ? (
                        configurations.map(
                            (config: ConfigurationWithOrders) => (
                                <div
                                    key={config.id}
                                    className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'
                                >
                                    <div className='flex items-center justify-between'>
                                        <h3 className='truncate text-lg font-semibold'>
                                            {config.model ||
                                                'Unnamed Configuration'}
                                        </h3>
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() =>
                                                deleteConfiguration(config.id)
                                            }
                                            disabled={isDeleting}
                                        >
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </div>
                                    <p className='mt-2 truncate text-sm text-zinc-500'>
                                        Created:{' '}
                                        {new Date(
                                            config.createdAt,
                                        ).toLocaleDateString()}
                                    </p>
                                    <Button
                                        variant='default'
                                        className='mt-4 w-full'
                                        onClick={() =>
                                            (window.location.href = `/configure/design?id=${config.id}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </div>
                            ),
                        )
                    ) : (
                        <div className='py-10 text-center'>
                            <p className='text-zinc-500'>
                                No configurations found.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConfigurationsPage;
