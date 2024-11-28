'use server';

import {
    getConfigurationsByUserId,
    deleteConfiguration,
    ConfigurationWithOrders,
    getUserByProviderId,
} from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const fetchConfigurations = async (): Promise<
    ConfigurationWithOrders[]
> => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id)
        throw new Error('You need to be logged in to view configurations.');

    const dbUser = await getUserByProviderId(user.id);

    if (!dbUser) {
        throw new Error('User not found.');
    }

    const configurations = await getConfigurationsByUserId(dbUser.id);
    return configurations || [];
};

export const removeConfiguration = async (id: string) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id)
        throw new Error('You need to be logged in to delete configurations.');

    const dbUser = await getUserByProviderId(user.id);

    if (!dbUser) {
        throw new Error('No such user exist');
    }
    await deleteConfiguration(id, user.id);
};
