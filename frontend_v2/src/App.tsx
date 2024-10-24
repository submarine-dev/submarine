import { FC } from 'react';
import { ProviderRoot } from './providers/ProviderRoot';
import { RouterInstance } from './router/RouterInstance';

export const App: FC = () => {
  return (
    <ProviderRoot>
      <RouterInstance />
    </ProviderRoot>
  );
};
