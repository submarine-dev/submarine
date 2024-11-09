import { localStorageKeys } from '@/const/localStorageKeys';
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
  const { productMode, forAuthGetProductMode } = useProductMode();

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
  }, [productMode]);

  return {
    authCode,
    user,
    setAuthCode,
    setUser,
    logout,
  };
};
