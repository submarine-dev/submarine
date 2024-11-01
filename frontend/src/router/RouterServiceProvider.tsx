import { useAuth } from '@/store/useAuth';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { type FC, type ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const RouterServiceProvider: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const router = useNavigate();
  const { authCode } = useAuth();
  const { productMode } = useProductMode();

  useEffect(() => {
    /**
     * 未認証（デモの時は弾かない）
     */
    if (
      !authCode &&
      pathname !== '/auth' &&
      pathname !== '/google/callback' &&
      productMode === ProductModeEnum.PRODUCTION
    ) {
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
