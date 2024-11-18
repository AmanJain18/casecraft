import { COLORS } from '@/constant';
import { clsx, type ClassValue } from 'clsx';
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