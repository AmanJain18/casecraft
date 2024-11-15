import DesignCase from '@/app/configure/design/DesignCase';
import { getConfigurationById } from '@/db';
import { notFound } from 'next/navigation';

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const page = async ({ searchParams }: PageProps) => {
    const { id } = searchParams;

    if (!id || typeof id !== 'string') {
        return notFound();
    }

    const configuration = await getConfigurationById(id);

    if (!configuration) {
        return notFound();
    }

    const { width, height, originalImageUrl } = configuration;
    return (
        <DesignCase
            configId={configuration.id}
            originalImageUrl={originalImageUrl}
            imageDimensions={{
                width,
                height,
            }}
        />
    );
};

export default page;
