import { LoadingPage } from '@/components/page/LoadingPage';
import { type FC, type ReactNode, Suspense } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * SuspenseのProvider
 */
export const SuspenseProvider: FC<Props> = (props) => {
  return <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>;
};
