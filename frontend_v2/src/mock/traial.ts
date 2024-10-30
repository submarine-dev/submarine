import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';

const userSubscriptions: UserSubscriptionType = {
  totalAmountPerDay: 0,
  totalAmountPerMonth: 7345,
  totalAmountPerYear: 7345 * 12,
  userSubscriptions: [
    {
      createdAt: new Date().toISOString(),
      icon: 'https://fluxfilm.in/wp-content/uploads/2024/04/92dd8733114cb40986002878c7a6a59d9325c1516f8f4e95b96896a2279c2afb_.webp',
      id: 'subscription_youtube_premium_personal',
      name: 'Youtube Premium',
      paidAt: '',
      paymentType: 'monthly',
      planId: 'plan_youtube_premium_personal',
      planName: '個人プラン',
      price: 1280,
      templId: 'templ_youtube',
      unsubscribeLink:
        'https://support.google.com/youtube/answer/6308278?hl=ja&co=GENIE.Platform%3DAndroid',
      updatedAt: new Date().toISOString(),
      userId: 'user_google',
    },
    {
      createdAt: new Date().toISOString(),
      icon: 'https://fluxfilm.in/wp-content/uploads/2024/04/92dd8733114cb40986002878c7a6a59d9325c1516f8f4e95b96896a2279c2afb_.webp',
      id: 'subscription_youtube_premium_family',
      name: 'Youtube Premium',
      paidAt: '',
      paymentType: 'monthly',
      planId: 'plan_youtube_premium_personal',
      planName: 'ファミリープラン',
      price: 2280,
      templId: 'templ_youtube',
      unsubscribeLink:
        'https://support.google.com/youtube/answer/6308278?hl=ja&co=GENIE.Platform%3DAndroid',
      updatedAt: new Date().toISOString(),
      userId: 'user_google',
    },
    {
      createdAt: new Date().toISOString(),
      icon: 'https://fluxfilm.in/wp-content/uploads/2024/04/92dd8733114cb40986002878c7a6a59d9325c1516f8f4e95b96896a2279c2afb_.webp',
      id: 'subscription_youtube_premium_student',
      name: 'Youtube Premium',
      paidAt: '',
      paymentType: 'monthly',
      planId: 'plan_youtube_premium_personal',
      planName: '学生プラン',
      price: 780,
      templId: 'templ_youtube',
      unsubscribeLink:
        'https://support.google.com/youtube/answer/6308278?hl=ja&co=GENIE.Platform%3DAndroid',
      updatedAt: new Date().toISOString(),
      userId: 'user_google',
    },
    {
      createdAt: new Date().toISOString(),
      icon: 'https://fluxfilm.in/wp-content/uploads/2024/04/92dd8733114cb40986002878c7a6a59d9325c1516f8f4e95b96896a2279c2afb_.webp',
      id: 'subscription_youtube_premium_personal_yearly',
      name: 'Youtube Premium',
      paidAt: '',
      paymentType: 'yearly',
      planId: 'plan_youtube_premium_personal',
      planName: '個人プラン1年間',
      price: 12800,
      templId: 'templ_youtube',
      unsubscribeLink:
        'https://support.google.com/youtube/answer/6308278?hl=ja&co=GENIE.Platform%3DAndroid',
      updatedAt: new Date().toISOString(),
      userId: 'user_google',
    },
  ],
};

export const trailMock = {
  userSubscriptions,
};
