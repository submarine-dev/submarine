import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout: React.FC<Props> = ({
  children,
}) => {
  const { fbUser, isLoading } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router('/');
    }
  }, [fbUser, isLoading, router]);

  if (!fbUser || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
