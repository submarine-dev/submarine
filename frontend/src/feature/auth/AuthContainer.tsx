import { GoogleLoginButton } from '@/components/button/GoogleLoginButton';
import useDiscloser from '@/hooks/common/useDiscloser';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DemoDescriptionModal } from './descriptionModal/DemoDescriptionModal';

export const AuthContainer: FC = () => {
  const router = useNavigate();

  const { productMode, changeToDemo } = useProductMode();
  const [isDemoDescriptionModalOpen, onOpenDemoDescriptionModal, onCloseDemoDescriptionModal] =
    useDiscloser();

  const handleDemoModeButtonClick = (): void => {
    /**
     * 既にデモモードを過去に選択していた場合は、ホームに遷移する
     */
    if (productMode === ProductModeEnum.DEMO) {
      router('/');
      return;
    }
    onOpenDemoDescriptionModal();
  };

  const handleDemoModeSubmit = (): void => {
    changeToDemo();
    onCloseDemoDescriptionModal();
    router('/');
  };

  const googleLoginLabel = (() => {
    if (productMode === ProductModeEnum.DEMO) return 'Submarineに登録する';
    return 'Googleでログイン';
  })();

  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100%',
        background: 'linear-gradient(0deg, #0B1C31 0%, #2850BF 100%)',
        overflow: 'hidden',
      }}
    >
      <Stack
        spacing={10}
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <img src="/images/icon/submarine_icon.png" alt="submarine" height={50} />
          <Typography variant="h4" sx={{ color: 'white', pt: 0.8, fontWeight: 'bold' }}>
            Submarine
          </Typography>
        </Stack>
        <Stack alignItems="stretch" spacing={3}>
          <GoogleLoginButton label={googleLoginLabel} />
          {productMode !== ProductModeEnum.PRODUCTION ? (
            <Button
              onClick={handleDemoModeButtonClick}
              variant="outlined"
              startIcon={
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ bgcolor: 'white', borderRadius: '100%', p: 0.5 }}
                >
                  <img src="/images/icon/submarine_icon.png" alt="submarine" height={20} />
                </Stack>
              }
              sx={{
                bgcolor: 'white',
                fontWeight: 'bold',
                '&:hover': { bgcolor: 'white', opacity: 0.8 },
              }}
            >
              デモモード
            </Button>
          ) : null}
          <DemoDescriptionModal
            open={isDemoDescriptionModalOpen}
            onCancel={onCloseDemoDescriptionModal}
            onSubmit={handleDemoModeSubmit}
          />
        </Stack>
        <Typography variant="caption" color="white" sx={{ textAlign: 'center' }}>
          技育展で皆さんに触れて頂くためにデモモードをご用意しております
        </Typography>
      </Stack>
    </Stack>
  );
};
