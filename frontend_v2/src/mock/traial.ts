import { SubscriptionSummaryType } from '@/types/domain/SubscriptionType';
import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';
import { UserType } from '@/types/domain/UserType';

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
      paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0],
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
      paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0],
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
      paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0],
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
      paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split('T')[0],
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

const user: UserType = {
  userId: 'trail_user',
  icon: 'https://picsum.photos/300',
};

const subscriptions: SubscriptionSummaryType[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png',
    isSubscribed: false,
  },
  {
    id: 'amazon_prime',
    name: 'Amazon Prime',
    icon: '/images/icon/subscription/amazon_prime_icon.png',
    isSubscribed: false,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '/images/icon/subscription/spotify_icon.png',
    isSubscribed: false,
  },
  {
    id: 'disney_plus',
    name: 'Disney+',
    icon: '/images/icon/subscription/disney_plus_icon.png',
    isSubscribed: false,
  },
  {
    id: 'youtube_premium',
    name: 'Youtube Premium',
    icon: '/images/icon/subscription/youtube_premium_icon.webp',
    isSubscribed: false,
  },
];

export const trailMock = {
  userSubscriptions,
  user,
  subscriptions,
};
