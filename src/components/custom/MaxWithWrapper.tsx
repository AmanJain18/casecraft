import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const MaxWithWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'h-full w-full mx-auto px-3 md:px-20 max-w-screen-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWithWrapper;
