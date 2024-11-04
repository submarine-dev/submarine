import { FC, ReactNode, useEffect } from 'react';
import '@sjmc11/tourguidejs/src/scss/tour.scss';
import { sessionStorageKeys } from '@/const/localStorageKeys';
// import { TourGuideClient } from '@sjmc11/tourguidejs/src/Tour';
import { useProductMode } from '@/store/useProductMode';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
// import { TourGuideOptions } from '@sjmc11/tourguidejs/src/core/options';

// const options: TourGuideOptions = {
//   dialogWidth: 1400,
//   dialogZ: 1000,
//   debug: true,
// };

type Props = {
  children: ReactNode;
};

export const TutorialProvider: FC<Props> = ({ children }) => {
  const { productMode } = useProductMode();
  // const tg = new TourGuideClient(options);

  useEffect(() => {
    if (
      productMode !== ProductModeEnum.DEMO ||
      sessionStorage.getItem(sessionStorageKeys.IS_DEMO_TUTORIAL_COMPLETED_KEY)
    ) {
      return;
    }
    /**
     * TODO: 動かないためコメントアウト、いつか修正する
     */
    // tg.start();
    // localStorage.setItem(sessionStorageKeys.IS_DEMO_TUTORIAL_COMPLETED_KEY, 'true');
  }, [productMode]);

  return <>{children}</>;
};

/* <button
  type="button"
  data-tg-order="1"
  data-tg-tour="Click here to started and create a tour for your app! 🚀"
  data-tg-title="Getting started"
>
  Get started
</button>; */
