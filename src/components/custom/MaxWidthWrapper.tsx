import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const MaxWidthWrapper = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'mx-auto h-full w-full max-w-screen-xl px-3 md:px-20',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
