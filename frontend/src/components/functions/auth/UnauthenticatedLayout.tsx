import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

interface Props {
  children: ReactNode;
}

const UnauthenticatedLayout: React.FC<Props> = ({
  children,
}) => {
  const { fbUser, isLoading } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    if (fbUser) {
      router('/home');
    }
  }, [fbUser, isLoading, router]);

  if (fbUser || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default UnauthenticatedLayout;
