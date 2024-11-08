import { localStorageKeys } from '@/const/localStorageKeys';
import { authService } from '@/service/authService';
import { UserType } from '@/types/domain/UserType';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { authCodeAtom } from './atom/authAtom';
import { initialUserData, userAtom } from './atom/userAtom';
import { useProductMode } from './useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { demoMock } from '@/mock/demoMock';

export const useAuth = (): {
  authCode: string;
  user: UserType;
  setAuthCode: (authCode: string) => void;
  setUser: (user: UserType) => void;
  logout: () => void;
} => {
  const [authCode, setAuthCode] = useAtom(authCodeAtom);
  const [user, setUser] = useAtom(userAtom);
  const { forAuthGetProductMode } = useProductMode();

  /**
   * ログアウトの処理
   */
  const logout = (): void => {
    /**
     * TODO: 実装
     */
    // authService.google.logout();
    localStorage.removeItem(localStorageKeys.AUTH_CODE_KEY);
    setAuthCode('');
    setUser(initialUserData);
  };

  useEffect(() => {
    /**
     * デモモードの時はチェックせずにデフォルトユーザを設定してあげる
     */
    if (forAuthGetProductMode() === ProductModeEnum.DEMO) {
      setUser(demoMock.user);
      return;
    }
    if (forAuthGetProductMode() === ProductModeEnum.PRODUCTION) {
      const localStorageAuthCode = localStorage.getItem(localStorageKeys.AUTH_CODE_KEY);
      if (!authCode && localStorageAuthCode) {
        setAuthCode(localStorageAuthCode);
      }

      const currentAuthCode = authCode ?? localStorageAuthCode ?? '';
      if (!currentAuthCode) return;

      /**
       * ユーザデータが既に存在する場合はfetchしない
       */
      if (user.userId) return;
      (async () => {
        const userData = await authService.google.login({
          authCode: currentAuthCode,
          productMode: forAuthGetProductMode(),
        });
        if (!userData) return;
        setUser(userData);
      })();
      return;
    }
  }, [authCode]);

  return {
    authCode,
    user,
    setAuthCode,
    setUser,
    logout,
  };
};
