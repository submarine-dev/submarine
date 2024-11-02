import { useAuth } from '@/store/useAuth';
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material';
import { MouseEvent, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ProfileMenu } from './ProfileMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';

export const Header: FC = () => {
  const { productMode } = useProductMode();
  const { pathname } = useLocation();
  const router = useNavigate();
  const { user, logout } = useAuth();

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
  ];

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
          <KeyboardBackspaceIcon fontSize="medium" sx={{ color: 'white' }} />
        </IconButton>
        <Button onClick={handleBackHome} variant="text">
          <Typography variant="h5" color="white" sx={{ fontWeight: 'bold' }}>
            Submarine
          </Typography>
        </Button>
        <Stack onClick={handleClickProfile} alignItems="flex-end">
          <Avatar src={user.icon} alt={user.userId} />
        </Stack>
      </Stack>
      <ProfileMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
        menuItem={profileMenuItems}
      />
    </>
  );
};
