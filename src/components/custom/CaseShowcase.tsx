import CaseGrid from './CaseGrid';
import MaxWithWrapper from './MaxWithWrapper';
import Image from 'next/image';

const PHONES = [
    '/testimonials/1.webp',
    '/testimonials/2.webp',
    '/testimonials/3.webp',
    '/testimonials/4.webp',
    '/testimonials/5.webp',
    '/testimonials/6.webp',
];

/**
 * Reviews section rendering a dynamic grid with animated scrolling columns.
 * @returns {JSX.Element} The Reviews component for the landing page.
 */

export function CaseShowcase() {
    return (
        <MaxWithWrapper className='relative max-w-5xl'>
            <img
                src='/images/what-people-are-buying.webp'
                alt='what people are buying'
                aria-hidden='true'
                className='absolute -left-32 top-1/3 hidden select-none xl:block'
            />
            <CaseGrid images={PHONES} />
        </MaxWithWrapper>
    );
}
