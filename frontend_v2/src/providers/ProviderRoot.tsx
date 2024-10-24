import { FC, ReactNode } from 'react';
import { MUIProvider } from './MUIProvider';
import { SuspenseProvider } from './SuspenseProvider';
import { TanStackQueryProvider } from './TanStackQueryProvider';

type Props = {
  children: ReactNode;
};

export const ProviderRoot: FC<Props> = (props) => {
  return (
    <SuspenseProvider>
      <TanStackQueryProvider>
        <MUIProvider>{props.children}</MUIProvider>
      </TanStackQueryProvider>
    </SuspenseProvider>
  );
};
