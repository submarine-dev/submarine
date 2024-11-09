import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { type FC, type ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export const RouterServiceProvider: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const router = useNavigate();
  const { productMode } = useProductMode();
  const [cookies] = useCookies();

  const sessionId = cookies.session_id ?? '';

  useEffect(() => {
    /**
     * 未認証（デモの時は弾かない）
     */
    if (
      !sessionId &&
      pathname !== '/auth' &&
      pathname !== '/google/callback' &&
      (productMode === ProductModeEnum.PRODUCTION || productMode === ProductModeEnum.NONE_SELECTED)
    ) {
      router('/auth');
    }

    /**
     * 認証済
     */
    if (sessionId && pathname === '/auth') {
      router('/');
    }
  }, [pathname]);

  return <>{children}</>;
};
