import { useAuth } from '@/store/useAuth';
import { type FC, type ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const RouterServiceProvider: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const router = useNavigate();
  const { authCode } = useAuth();

  useEffect(() => {
    /**
     * 未認証
     */
    if (!authCode && pathname !== '/auth' && pathname !== '/google/callback') {
      router('/auth');
    }
    /**
     * 認証済
     */
    if (authCode && pathname === '/auth') {
      router('/');
    }
  }, [authCode, pathname]);

  return <>{children}</>;
};
