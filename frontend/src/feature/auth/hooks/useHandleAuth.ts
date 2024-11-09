import { GCP_CLIENT_ID, GCP_REDIRECT_URI } from '@/const/env';
import { localStorageKeys } from '@/const/localStorageKeys';
import { authService } from '@/service/authService';
import { useAuth } from '@/store/useAuth';
import { useProductMode } from '@/store/useProductMode';

const O_AUTH2_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPES =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

const oauthParams = {
  client_id: GCP_CLIENT_ID,
  redirect_uri: GCP_REDIRECT_URI,
  response_type: 'code',
  scope: SCOPES,
  include_granted_scopes: 'true',
  state: 'pass-through value',
};

const authUrl = new URL(O_AUTH2_ENDPOINT);
authUrl.search = new URLSearchParams(oauthParams).toString();
const AUTH_URL = authUrl.toString();

export const useHandleAuth = (): {
  authUrl: string;
  handleCatchAuthCode: (authCode: string) => void;
} => {
  const { setAuthCode, setUser } = useAuth();
  const { changeToProduction } = useProductMode();

  const handleCatchAuthCode = async (authCode: string): Promise<void> => {
    setAuthCode(authCode);
    localStorage.setItem(localStorageKeys.AUTH_CODE_KEY, authCode);

    const userData = await authService.google.login({ authCode });
    if (!userData) return;
    setUser(userData);

    changeToProduction();
  };

  return {
    authUrl: AUTH_URL,
    handleCatchAuthCode,
  };
};
