import { PrimaryLayout } from '@/components/layout/PrimaryLayout';
import type { FC } from 'react';
import { IndexContainer } from './IndexContainer';
import { TutorialProvider } from './TutorialProvider';

export const IndexPage: FC = () => {
  return (
    <TutorialProvider>
      <PrimaryLayout>
        <IndexContainer />
      </PrimaryLayout>
    </TutorialProvider>
  );
};
