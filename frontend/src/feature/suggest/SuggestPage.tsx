import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import { FC } from 'react';
import { SuggestPageContainer } from './SuggestPageContainer.tsx';

export const SuggestPage: FC = () => {
  return (
    <PrimaryLayout>
      <SuggestPageContainer />
    </PrimaryLayout>
  );
};
