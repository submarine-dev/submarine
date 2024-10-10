'use client';

import { HeaderComponents } from '@/components/HeaderComponents';
import AuthenticatedLayout from '@/components/functions/auth/AuthenticatedLayout';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * 認証済みルートのレイアウト
 */
const ProtectedRoutesLayout: FC<Props> = ({ children }) => {
  return (
    <AuthenticatedLayout>
      <div className="p-3 max-w-md mx-auto">
        <HeaderComponents />
        {children}
      </div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '30dvh',
          borderRadius: '0 0 5% 5%',
          zIndex: -1,
        }}
        className="bg-primary max-w-md"
      />
    </AuthenticatedLayout>
  );
};

export default ProtectedRoutesLayout;
