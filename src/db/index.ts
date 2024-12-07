import {
    Configuration,
    Order,
    PrismaClient,
    User,
    Prisma,
} from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = client;
}

// Create a new configuration (without user linkage initially)
export const createConfiguration = async (
    width: number,
    height: number,
    originalImageUrl: string,
): Promise<Configuration> => {
    return client.configuration.create({
        data: {
            width,
            height,
            originalImageUrl,
        },
    });
};

// Update an existing configuration (e.g., after image cropping)
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

// Get a configuration by its ID
export const getConfigurationById = async (
    id: string,
): Promise<Configuration | null> => {
    return client.configuration.findUnique({
        where: { id },
    });
};

export const linkConfigurationToUser = async (
    configurationId: string,
    userId: string,
): Promise<Configuration | null> => {
    return client.configuration.update({
        where: { id: configurationId },
        data: { userId },
    });
};

export const getConfigurationsByUser = async (
    userId: string,
): Promise<Configuration[]> => {
    return client.configuration.findMany({
        where: { userId },
    });
};

// User
export const createUser = async (
    id: string,
    email: string,
    name?: string,
): Promise<User> => {
    return client.user.create({
        data: {
            email,
            providerId: id,
            name,
        },
    });
};
export const getUserByEmail = async (email: string): Promise<User | null> => {
    return client.user.findUnique({ where: { email } });
};

export const getUserByProviderId = async (
    providerId: string,
): Promise<User | null> => {
    return client.user.findUnique({
        where: { providerId },
    });
};

export const ensureUser = async (userInfo: {
    providerId: string;
    email: string;
    name?: string;
}) => {
    const { email, providerId, name } = userInfo;

    // Check if the user already exists
    let user = await getUserByEmail(email);

    // If user doesn't exist, create a new one
    if (!user) {
        user = await createUser(providerId, email, name);
    }

    return user;
};

export const createOrder = async (
    amount: number,
    userId: string,
    configurationId: string,
): Promise<Order> => {
    return client.order.create({
        data: {
            amount,
            userId,
            configurationId,
            orderStatus: 'awaiting_shipment',
        },
    });
};

export const getOrder = async (id: string, userId: string) => {
    return client.order.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true,
        },
    });
};

export type ConfigurationWithOrders = Prisma.ConfigurationGetPayload<{
    include: { orders: true };
}>;

export const getConfigurationsByUserId = async (
    userId: string,
): Promise<ConfigurationWithOrders[]> => {
    return client.configuration.findMany({
        where: { userId },
        include: { orders: true },
    });
};

export const deleteConfiguration = async (id: string, userId: string) => {
    return client.configuration.delete({
        where: { id, userId },
    });
};

export type GetOrders = Prisma.OrderGetPayload<{
    include: {
        configuration: true;
        user: true;
        billingAddress: true;
        shippingAddress: true;
    };
}>;

export const getUserOrdersFromDb = async (
    userId: string,
): Promise<GetOrders[]> => {
    return client.order.findMany({
        where: { userId },
        orderBy: {
            createdAt: 'desc', // Orders sorted by latest first
        },
        include: {
            configuration: true, // Include configuration details if necessary
            user: true, // Include user details if necessary
            billingAddress: true,
            shippingAddress: true,
        },
    });
};

export default client;
