import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import type { FC } from 'react';
import { IndexContainer } from './IndexContainer';

export const IndexPage: FC = () => {
  return (
    <PrimaryLayout>
      <IndexContainer />
    </PrimaryLayout>
  );
};
