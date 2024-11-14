import { ReactNode } from 'react';
import MaxWithWrapper from '@/components/custom/MaxWithWrapper';
import Steps from '@/components/custom/Steps';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWithWrapper className="flex flex-col flex-1">
      <Steps />
      {children}
    </MaxWithWrapper>
  );
};

export default Layout;
