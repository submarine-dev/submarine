import { authService } from '@/service/authService';
import { UserType } from '@/types/domain/UserType';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { authCodeAtom } from './atom/authAtom';
import { userAtom } from './atom/userAtom';
import { localStorageKeys } from '@/const/localStorageKeys';
import { useProductMode } from './useProductMode';

export const useAuth = (): {
  authCode: string;
  user: UserType;
  setAuthCode: (authCode: string) => void;
  setUser: (user: UserType) => void;
} => {
  const [authCode, setAuthCode] = useAtom(authCodeAtom);
  const [user, setUser] = useAtom(userAtom);
  const { productMode } = useProductMode();

  useEffect(() => {
    const localStorageAuthCode = localStorage.getItem(localStorageKeys.AUTH_CODE_KEY);
    if (!authCode && localStorageAuthCode) {
      setAuthCode(localStorageAuthCode);
    }

    const currentAuthCode = authCode ?? localStorageAuthCode ?? '';
    if (!currentAuthCode || user.userId) return;

    (async () => {
      const userData = await authService.google.login({ authCode: currentAuthCode, productMode });
      if (!userData) return;
      setUser(userData);
    })();
  }, [authCode]);

  return {
    authCode,
    user,
    setAuthCode,
    setUser,
  };
};
