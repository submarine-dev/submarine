import { SectionLayout } from '@/components/section/SectionLayout';
import { sessionStorageKeys } from '@/const/localStorageKeys';
import useDiscloser from '@/hooks/common/useDiscloser';
import { useSubscription } from '@/hooks/useSubscription';
import { useUserData } from '@/hooks/useUserData';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { Stack } from '@mui/material';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TutorialDescriptionModal } from './TutorialDescriptionModal';
import { AddSubscription } from './add/AddSubscription';
import { AutoRegister } from './autoRegister/AutRegister';
import { UserSubscriptionSummary } from './summary/UserSubscriptionSummary';

export const IndexContainer: FC = () => {
  const router = useNavigate();
  const { userSubscription } = useUserData();
  const { subscriptionSummaries } = useSubscription();
  const { productMode } = useProductMode();

  const [
    isOpenTutorialDescriptionModal,
    onOpenTutorialDescriptionModal,
    onCloseTutorialDescriptionModal,
  ] = useDiscloser();
  const [tutorialDescriptionModalAnchorEl, setTutorialDescriptionModalAnchorEl] =
    useState<HTMLElement | null>(null);

  const handleClickColumn = (subscriptionId: string): void => {
    router(`/subscription/${subscriptionId}`);
  };

  const handleFindSubscriptionClick = (): void => {
    router('/subscriptions');
  };

  const handleSubscriptionClick = (subscriptionId: string): void => {
    router(`/subscriptions?subscriptionId=${subscriptionId}`);
  };

  const handleCloseTutorialDescriptionModal = (): void => {
    onCloseTutorialDescriptionModal();
    sessionStorage.setItem(sessionStorageKeys.IS_DEMO_TUTORIAL_COMPLETED_KEY, 'true');
  };

  useEffect(() => {
    if (
      productMode !== ProductModeEnum.DEMO ||
      sessionStorage.getItem(sessionStorageKeys.IS_DEMO_TUTORIAL_COMPLETED_KEY)
    ) {
      return;
    }

    setTimeout(() => {
      setTutorialDescriptionModalAnchorEl(document.getElementById('profile-menu-icon'));
      onOpenTutorialDescriptionModal();
    }, 1000);
  }, [productMode]);

  return (
    <>
      <Stack>
        {userSubscription?.userSubscriptions ? (
          <UserSubscriptionSummary
            currentMonthPayment={userSubscription.totalAmountPerMonth ?? 0}
            userSubscriptions={userSubscription.userSubscriptions}
            onClickColumn={handleClickColumn}
          />
        ) : null}
        <SectionLayout
          sectionTitle="自動で登録"
          helpText="メール情報から、AIによってサブスクリプションの登録をサジェストします"
        >
          <AutoRegister />
        </SectionLayout>
        {subscriptionSummaries ? (
          <SectionLayout sectionTitle="手動で登録">
            <AddSubscription
              subscriptionSummaries={subscriptionSummaries}
              onFindSubscriptionClick={handleFindSubscriptionClick}
              onSubscriptionClick={handleSubscriptionClick}
            />
          </SectionLayout>
        ) : null}
      </Stack>
      <TutorialDescriptionModal
        open={isOpenTutorialDescriptionModal}
        onClose={handleCloseTutorialDescriptionModal}
        anchorEl={tutorialDescriptionModalAnchorEl}
      />
    </>
  );
};
