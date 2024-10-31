import type { FC } from 'react';
import { DetailPageContainer } from './DetailPageContainer.tsx';
import { PrimaryLayout } from '@/components/layout/PrimaryLayout.tsx';

export const DetailPage: FC = () => {
  return (
    <PrimaryLayout>
      <DetailPageContainer />
    </PrimaryLayout>
  );
};
