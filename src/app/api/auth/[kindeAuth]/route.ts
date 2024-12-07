import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextRequest } from 'next/server';

export const GET = handleAuth();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const OPTIONS = async (_req: NextRequest) => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': process.env.KINDE_SITE_URL ?? '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
};
