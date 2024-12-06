import { COLORS } from '@/constant';
import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(price);
};

export const getCaseBackgroundClass = (color: string): string => {
    const colorObj = COLORS.find((c) => c.value === color);
    return colorObj?.bg || 'bg-zinc-900'; // Default to 'bg-zinc-900'
};

export const constructMetadata = ({
    title = 'Case Craft - Your One-Stop Solution for Custom Cases',
    description = 'Design and order personalized phone cases that reflect your unique style. Perfectly crafted to suit every personality.',
    image = '/images/ccmain.webp',
}: {
    title?: string;
    description?: string;
    image?: string;
    lightIcon?: string;
    darkIcon?: string;
}): Metadata => {
    return {
        title,
        description,
        keywords: [
            'Case Craft',
            'custom phone cases',
            'personalized cases',
            'unique phone covers',
            'stylish phone cases',
            'design your case',
            'custom gifts',
        ],
        authors: [
            { name: 'Aman S. Jain', url: 'https://aman-jain.vercel.app/' },
        ],
        openGraph: {
            type: 'website',
            title,
            description,
            images: [{ url: image }],
            url: 'https://casecraft.vercel.app/',
            locale: 'en_US',
            siteName: 'Case Craft',
        },
        twitter: {
            card: 'summary_large_image',
            site: '@AmansJain99',
            title,
            description,
            images: [image],
        },
        robots: {
            index: true,
            follow: true,
        },
        icons: {
            icon: [
                {
                    url: '/favicons/light/favicon-16x16.png',
                    media: '(prefers-color-scheme: light)',
                    sizes: '16x16',
                },
                {
                    url: '/favicons/dark/favicon-16x16.png',
                    media: '(prefers-color-scheme: dark)',
                    sizes: '16x16',
                },
                {
                    url: '/favicons/light/favicon-32x32.png',
                    media: '(prefers-color-scheme: light)',
                    sizes: '32x32',
                },
                {
                    url: '/favicons/dark/favicon-32x32.png',
                    media: '(prefers-color-scheme: dark)',
                    sizes: '32x32',
                },
                {
                    url: '/favicons/light/android-icon-192x192.png',
                    media: '(prefers-color-scheme: light)',
                    sizes: '192x192',
                },
                {
                    url: '/favicons/dark/android-icon-192x192.png',
                    media: '(prefers-color-scheme: dark)',
                    sizes: '192x192',
                },
            ],
            apple: [
                {
                    url: '/favicons/light/apple-icon-180x180.png',
                    media: '(prefers-color-scheme: light)',
                },
                {
                    url: '/favicons/dark/apple-icon-180x180.png',
                    media: '(prefers-color-scheme: dark)',
                },
            ],
            shortcut: [
                {
                    url: '/favicons/light/favicon.ico',
                    media: '(prefers-color-scheme: light)',
                },
                {
                    url: '/favicons/dark/favicon.ico',
                    media: '(prefers-color-scheme: dark)',
                },
            ],
        },
        alternates: {
            canonical: 'https://casecraft.vercel.app/',
        },
        metadataBase: new URL('https://casecraft.vercel.app/'),
    };
};

