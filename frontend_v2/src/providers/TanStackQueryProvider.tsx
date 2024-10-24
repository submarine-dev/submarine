import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const TanStackQueryProvider: FC<Props> = (props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
