import { useHandleAuth } from '@/feature/auth/hooks/useHandleAuth';
import { ReactNode, forwardRef } from 'react';
import OauthPopup from 'react-oauth-popup';

type Props = {
  children?: ReactNode;
};

export const GoogleLoginButtonBase = forwardRef<HTMLButtonElement, Props>(
  ({ children }: Props, ref): ReactNode => {
    const { authUrl, handleCatchAuthCode } = useHandleAuth();

    return (
      <OauthPopup
        title="Login with Google"
        width={600}
        height={600}
        url={authUrl}
        onCode={handleCatchAuthCode}
        // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
        onClose={() => {}}
      >
        {ref ? <button type="button" ref={ref} hidden /> : null}
        {children}
      </OauthPopup>
    );
  }
);
