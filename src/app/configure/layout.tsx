import { ReactNode } from 'react';
import MaxWithWrapper from '@/components/custom/MaxWithWrapper';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWithWrapper className="flex flex-col flex-1">{children}</MaxWithWrapper>
  );
};

export default Layout;
