'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CaseColumn from './CaseColumn';

/**
 * Splits an array into specified number of subarray.
 * @param {Array<T>} array - The array to split.
 * @param {number} parts - Number of parts to split into.
 * @returns {Array<Array<T>>} The split array.
 */
function splitArray<T>(array: T[], parts: number): T[][] {
  const result: T[][] = Array.from({ length: parts }, () => []);
  array.forEach((item, index) => result[index % parts].push(item));
  return result;
}

/**
 * Renders the ReviewGrid component with responsive columns and infinite scroll.
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs to display in the grid.
 * @returns {JSX.Element} ReviewGrid component.
 */
function CaseGrid({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Splitting the array to create three responsive columns.
  const [col1, col2, col3] = splitArray(images, 3);

  return (
    <div
      ref={containerRef}
      className="relative mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8 overflow-hidden h-[49rem] max-h-[150vh] px-4 sm:mt-20 -mx-4"
    >
      {isInView && (
        <>
          <CaseColumn reviews={col1} animatePerPixel={10} />
          <CaseColumn
            reviews={col2}
            animatePerPixel={15}
            className="hidden md:block"
          />
          <CaseColumn
            reviews={col3}
            animatePerPixel={10}
            className="hidden lg:block"
          />
        </>
      )}
      {/* Top and Bottom gradient overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export default CaseGrid;
