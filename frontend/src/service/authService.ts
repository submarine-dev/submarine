import { apiClient } from '@/lib/apiClient';
import { trailMock } from '@/mock/traial';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { UserType } from '@/types/domain/UserType';

export const authService = {
  google: {
    login: async ({
      authCode,
      productMode,
    }: { authCode: string; productMode: ProductModeEnum }): Promise<UserType | null> => {
      try {
        const res = (async () => {
          if (productMode === ProductModeEnum.DEMO) return trailMock.user;
          return await apiClient.login.google.$post({
            body: {
              code: authCode,
            },
          });
        })();
        if (!res) return null;
        return res;
      } catch (e) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(e);
        return null;
      }
    },
  },
};
