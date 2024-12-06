import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    dark?: boolean;
}

/**
 * Phone component that displays an image within a phone frame.
 * @param {Object} props
 * @param {string} [props.imgSrc] - Image source to display in the phone frame.
 * @param {boolean} [props.dark=false] - Dark mode variant of phone frame.
 * @returns {JSX.Element} Phone component.
 */

const Phone = ({ className, imgSrc, dark = false, ...props }: PhoneProps) => {
    const frameSrc = dark
        ? '/images/phone-template-dark-edges.webp'
        : '/images/phone-template-white-edges.webp';

    return (
        <div
            className={cn(
                'pointer-events-none relative z-50 overflow-hidden',
                className,
            )}
            {...props}
        >
            <Image
                src={frameSrc}
                alt='Phone template'
                className='pointer-events-none z-50 size-full select-none'
                priority
                width={350}
                height={100}
            />

            <Image
                src={imgSrc}
                alt='Phone Image'
                className='absolute inset-0 -z-10 size-full object-cover'
                priority
                width={350}
                height={100}
            />
        </div>
    );
};

export default Phone;
