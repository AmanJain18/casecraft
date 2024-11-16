import { Configuration, PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = client;
}

export const createConfiguration = async (
    width: number,
    height: number,
    originalImageUrl: string,
) => {
    return client.configuration.create({
        data: {
            width,
            height,
            originalImageUrl,
        },
    });
};

export const updateConfiguration = async (
    id: string,
    croppedImageUrl: string,
): Promise<Configuration | null> =>
    client.configuration.update({
        where: { id },
        data: {
            croppedImageUrl,
        },
    });

export const getConfigurationById = async (id: string) => {
    return client.configuration.findUnique({
        where: { id },
    });
};

export default client;
