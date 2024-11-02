import type { FC } from 'react';
import { ProviderRoot } from './providers/ProviderRoot';
import { RouterInstance } from './router/RouterInstance';
import { localStorageKeys } from './const/localStorageKeys';

export const App: FC = () => {
  return (
    <ProviderRoot>
      {localStorage.getItem(localStorageKeys.PRODUCT_MODE_KEY)}
      <button
        onClick={() => {
          localStorage.removeItem(localStorageKeys.PRODUCT_MODE_KEY);
        }}
        type="button"
      >
        リセット
      </button>
      <RouterInstance />
    </ProviderRoot>
  );
};
