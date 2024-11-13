

import { useEffect, useRef, useState } from 'react';
import Cases from './Cases';

/**
 * Renders a column with animated scrolling reviews.
 * @param {Object} props
 * @param {string[]} props.reviews - Array of image URLs for each review.
 * @param {string} [props.className] - Optional CSS class for the column.
 * @param {number} [props.animatePerPixel=0] - Animation speed based on pixels.
 * @returns {JSX.Element} ReviewColumn component.
 */
const CaseColumn = ({
  reviews,
  className,
  animatePerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  animatePerPixel?: number;
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * animatePerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe(columnRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={columnRef}
      className={`animate-marquee space-y-8 py-4 ${className}`}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, index) => (
        <Cases key={index} imgSrc={imgSrc} />
      ))}
    </div>
  );
};

export default CaseColumn;
