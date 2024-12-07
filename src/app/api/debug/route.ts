// app/api/debug/route.ts
import { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_req: NextRequest) => {
    return new Response(
        JSON.stringify({
            siteUrl: process.env.KINDE_SITE_URL,
            clientId: process.env.KINDE_CLIENT_ID,
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        },
    );
};
