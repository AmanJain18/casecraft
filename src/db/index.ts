import { PrismaClient, Configuration } from '@prisma/client';

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

// export const createListing = async (
//   userId: string,
//   category: string,
//   location: string,
//   guestCount: number,
//   roomCount: number,
//   bathroomCount: number,
//   bedCount: number,
//   imageSrc: string,
//   price: number,
//   title: string,
//   description: string,
//   currency: string
// ) => {
//   return client.listing.create({
//     data: {
//       userId,
//       category,
//       location,
//       guestCount,
//       roomCount,
//       bathroomCount,
//       bedCount,
//       imageSrc,
//       price,
//       title,
//       description,
//       currency,
//     },
//   });
// };

export const getConfigurationById = async (id: string) => {
    return client.configuration.findUnique({
        where: { id },
    });
};

export default client;
