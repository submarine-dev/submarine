import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import { IconButton } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const RouterServiceProvider: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const router = useNavigate();
  const { productMode } = useProductMode();
  const [cookies] = useCookies();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPWA, setIsPWA] = useState(false);

  const sessionId = cookies.session_id ?? '';

  useEffect(() => {
    /**
     * 未認証（デモの時は弾かない）
     */
    if (
      // !sessionId &&
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

  useEffect(() => {
    // @ts-ignore
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsPWA(isStandalone);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {children}
      {!isPWA && (
        <IconButton
          onClick={handleInstallClick}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'white',
            boxShadow: 3,
            zIndex: 1000,
            '&:hover': {
              bgcolor: 'white',
              opacity: 0.9,
            },
          }}
        >
          <InstallMobileIcon color="primary" />
        </IconButton>
      )}
    </>
  );
};
