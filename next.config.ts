import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        KINDE_SITE_URL:
            process.env.KINDE_SITE_URL ??
            `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
        KINDE_POST_LOGOUT_REDIRECT_URL:
            process.env.KINDE_POST_LOGOUT_REDIRECT_URL ??
            `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
        KINDE_POST_LOGIN_REDIRECT_URL:
            process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
            `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth-callback`,
    },
    images: {
        domains: ['utfs.io'],
    },
    async headers() {
        return [
            {
                source: '/api/:path*', // Apply CORS headers to all API routes
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Adjust to specific domains in production for security
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
