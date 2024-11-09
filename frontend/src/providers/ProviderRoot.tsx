import type { FC, ReactNode } from 'react';
import { MUIProvider } from './MUIProvider';
import { SuspenseProvider } from './SuspenseProvider';
import { TanStackQueryProvider } from './TanStackQueryProvider';
import { CookiesProvider } from 'react-cookie';

type Props = {
  children: ReactNode;
};

export const ProviderRoot: FC<Props> = (props) => {
  return (
    <SuspenseProvider>
      <TanStackQueryProvider>
        <MUIProvider>
          {/* TODO: あとでcookiesのやつを外に取り出す */}
          <CookiesProvider>{props.children}</CookiesProvider>
        </MUIProvider>
      </TanStackQueryProvider>
    </SuspenseProvider>
  );
};
