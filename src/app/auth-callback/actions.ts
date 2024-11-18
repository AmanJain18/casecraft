'use server';

import { ensureUser } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const getAuthStatus = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
        throw new Error('Invalid user data');
    }

    await ensureUser({
        providerId: user.id,
        email: user.email!,
        name: user.given_name ?? undefined,
    });

    return { success: true };
};
