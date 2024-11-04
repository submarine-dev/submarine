import { useAuth } from '@/store/useAuth';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import { type FC, MouseEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLoginButtonBase } from '../button/GoogleLoginButtonBase';
import { ProfileMenu } from './ProfileMenu';

export const Header: FC = () => {
  const { productMode } = useProductMode();
  const { pathname } = useLocation();
  const router = useNavigate();
  const { user, logout } = useAuth();

  const googleLoginButtonRef = useRef<HTMLButtonElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isHiddenBackButton = pathname === '/';

  const handleBack = (): void => {
    router(-1);
  };

  const handleBackHome = (): void => {
    router('/');
  };

  const handleClickProfile = (e: MouseEvent<HTMLDivElement>): void => {
    setMenuAnchorEl(e.currentTarget);
  };

  const profileMenuItems = [
    {
      label: productMode === ProductModeEnum.DEMO ? 'トップに戻る' : 'ログアウト',
      icon: <LogoutIcon />,
      onClick: () => {
        logout();
        router('/auth');
      },
    },
    (() => {
      if (productMode !== ProductModeEnum.DEMO) return null;
      return {
        label: 'Submarineに登録する',
        icon: <GoogleIcon />,
        onClick: () => {
          if (!googleLoginButtonRef.current) return;
          googleLoginButtonRef.current.click();
        },
      };
    })(),
    {
      label: 'プロフィール（開発中）',
      icon: <AccountCircleIcon />,
      onClick: () => {
        /**
         * TODO: プロフィールページ実装
         */
        // router('/friends');
      },
      isDisabled: true,
    },
  ].filter((item) => item !== null);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 2,
          /* ヘッダーの操作系を微妙に内側に寄せるための余白 */
          px: 0.5,
        }}
      >
        <IconButton
          onClick={handleBack}
          disabled={isHiddenBackButton}
          sx={{ opacity: isHiddenBackButton ? 0 : 1 }}
        >
          <ArrowCircleLeftIcon fontSize="large" sx={{ color: 'white' }} />
        </IconButton>
        <Button onClick={handleBackHome} variant="text">
          <Typography variant="h5" color="white" sx={{ fontWeight: 'bold' }}>
            Submarine
          </Typography>
        </Button>
        <Stack onClick={handleClickProfile} alignItems="flex-end">
          <Avatar src={user.icon} alt={user.userId} id="profile-menu-icon" />
        </Stack>
      </Stack>
      {productMode === ProductModeEnum.DEMO ? (
        <Stack sx={{ pb: 1 }}>
          <Typography variant="caption" sx={{ color: 'white' }}>
            デモモード中。サブスクリプション等の変更は保存されません。
          </Typography>
        </Stack>
      ) : null}
      <ProfileMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        menuItem={profileMenuItems}
      />
      <GoogleLoginButtonBase ref={googleLoginButtonRef} />
    </>
  );
};
