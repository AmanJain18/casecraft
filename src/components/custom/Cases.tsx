

import { HTMLAttributes } from 'react';
import Phone from './Phone';

interface CasesProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

/**
 * Renders an individual review card with random animation delay.
 * @param {Object} props
 * @param {string} props.imgSrc - Image source for the review.
 * @returns {JSX.Element} Review component.
 */
function Cases({ imgSrc, className, ...props }: CasesProps) {
  const animationDelay = `${Math.random() * 0.5}s`;

  return (
    <div
      className={`animate-fade-in rounded-[2.5rem] bg-white p-4 opacity-0 shadow-xl ${className}`}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

export default Cases;
