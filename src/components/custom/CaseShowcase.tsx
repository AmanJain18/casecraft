import CaseGrid from './CaseGrid';
import MaxWithWrapper from './MaxWithWrapper';
import Image from 'next/image';

const PHONES = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
  '/testimonials/5.jpg',
  '/testimonials/6.jpg',
];

/**
 * Reviews section rendering a dynamic grid with animated scrolling columns.
 * @returns {JSX.Element} The Reviews component for the landing page.
 */

export function CaseShowcase() {
  return (
    <MaxWithWrapper className="relative max-w-5xl">
      <img
        src="/images/what-people-are-buying.png"
        alt="what people are buying"
        aria-hidden="true"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <CaseGrid images={PHONES} />
    </MaxWithWrapper>
  );
}
