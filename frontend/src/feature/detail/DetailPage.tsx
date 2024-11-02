import { PrimaryLayout } from '@/components/layout/PrimaryLayout.tsx';
import type { FC } from 'react';
import { DetailPageContainer } from './DetailPageContainer.tsx';

export const DetailPage: FC = () => {
  return (
    <PrimaryLayout>
      <DetailPageContainer />
    </PrimaryLayout>
  );
};
