import { useAtom } from 'jotai';
import { authCodeAtom } from './atom/authAtom';

export const useAuth = (): {
  authCode: string;
  setAuthCode: (authCode: string) => void;
} => {
  const [authCode, setAuthCode] = useAtom(authCodeAtom);

  return {
    authCode,
    setAuthCode,
  };
};
