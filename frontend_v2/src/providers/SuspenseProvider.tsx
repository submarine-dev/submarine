import { LoadingPage } from '@/components/page/LoadingPage';
import { FC, ReactNode, Suspense } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * SuspenseのProvider
 */
export const SuspenseProvider: FC<Props> = (props) => {
  return <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>;
};
