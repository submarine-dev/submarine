import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import OauthPopup from 'react-oauth-popup';
import { useHandleAuth } from './hooks/useHandleAuth';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import useDiscloser from '@/hooks/common/useDiscloser';
import { DemoDescriptionModal } from './descriptionModal/DemoDescriptionModal';
import { useNavigate } from 'react-router-dom';

export const AuthContainer: FC = () => {
  const router = useNavigate();
  const { authUrl, handleCatchAuthCode } = useHandleAuth();
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

  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100%',
        background: 'linear-gradient(0deg, #0B1C31 0%, #2850BF 100%)',
      }}
    >
      {productMode}
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
          {productMode !== ProductModeEnum.DEMO ? (
            <OauthPopup
              title="Login with Google"
              width={600}
              height={600}
              url={authUrl}
              onCode={handleCatchAuthCode}
              // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
              onClose={() => {}}
            >
              <Button
                variant="contained"
                startIcon={
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{ bgcolor: 'white', borderRadius: '100%', p: 0.5 }}
                  >
                    <img src="/images/common/google_icon.svg" alt="google" height={20} />
                  </Stack>
                }
              >
                Googleでログイン
              </Button>
            </OauthPopup>
          ) : null}
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
      </Stack>
    </Stack>
  );
};
