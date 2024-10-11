import { AuthProvider } from '@/components/functions/context/auth';
import { FC, ReactNode } from 'react';
import { SuspenseProvider } from './SuspenseProvider';
import { TanStackQueryProvider } from './TanStackQueryProvider';

type Props = {
  children: ReactNode;
};

export const ProviderRoot: FC<Props> = (props) => {
  return (
    <AuthProvider>
      <SuspenseProvider>
        <TanStackQueryProvider>
          {props.children}
        </TanStackQueryProvider>
      </SuspenseProvider>
    </AuthProvider>
  );
};
