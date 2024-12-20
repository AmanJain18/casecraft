import { getConfigurationById } from '@/db';
import { notFound } from 'next/navigation';
import DesignPreview from '@/app/configure/preview/DesignPreview';

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

    return <DesignPreview configuration={configuration} />;
};

export default page;
