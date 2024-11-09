import { apiClient } from '@/lib/apiClient';
import { UserType } from '@/types/domain/UserType';

export const authService = {
  google: {
    login: async ({ authCode }: { authCode: string }): Promise<UserType | null> => {
      try {
        const res = await apiClient.login.google.post({
          body: { code: authCode },
        });

        const userData = res.body;

        if (!userData) return null;
        return userData;
      } catch (e) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(e);
        return null;
      }
    },
  },
};
