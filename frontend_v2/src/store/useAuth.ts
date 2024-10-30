import { authService } from '@/service/authService';
import { UserType } from '@/types/domain/UserType';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { authCodeAtom } from './atom/authAtom';
import { userAtom } from './atom/userAtom';

export const useAuth = (): {
  authCode: string;
  user: UserType;
  setAuthCode: (authCode: string) => void;
  setUser: (user: UserType) => void;
} => {
  const [authCode, setAuthCode] = useAtom(authCodeAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!authCode || user.userId) return;

    (async () => {
      const userData = await authService.google.login(authCode);
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
