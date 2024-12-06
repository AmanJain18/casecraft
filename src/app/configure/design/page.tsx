import DesignCase from '@/app/configure/design/DesignCase';
import { getConfigurationById } from '@/db';
import { notFound } from 'next/navigation';

type PageProps = {
    searchParams: Promise<{ id: string }>;
};

const page = async ({ searchParams }: PageProps) => {
    const { id } = await searchParams;

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
