import { SubscriptionSummaryType, SubscriptionType } from '@/types/domain/SubscriptionType';
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
    id: 'spotify_premium',
    name: 'Spotify Premium',
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

const subscriptionsDetails: SubscriptionType[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png',
    isSubscribed: false,
    plan: [
      {
        id: 'standard_with_ad_plan',
        name: '広告付きスタンダード',
        paymentType: 'monthly',
        price: 890,
        subscriptionId: 'netflix',
      },
      {
        id: 'standard_plan',
        name: 'スタンダード',
        paymentType: 'monthly',
        price: 1590,
        subscriptionId: 'netflix',
      },
      {
        id: 'premium_plan',
        name: 'プレミアム',
        paymentType: 'monthly',
        price: 2290,
        subscriptionId: 'netflix',
      },
    ],
  },
  {
    id: 'amazon_prime',
    name: 'Amazon Prime',
    icon: '/images/icon/subscription/amazon_prime_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'yearly_plan',
        name: '年間プラン',
        paymentType: 'yearly',
        price: 5900,
        subscriptionId: 'amazon_prime',
      },
      {
        id: 'monthly_plan',
        name: '月額プラン',
        paymentType: 'monthly',
        price: 600,
        subscriptionId: 'amazon_prime',
      },
    ],
  },
  {
    id: 'spotify_premium',
    name: 'Spotify Premium',
    icon: '/images/icon/subscription/spotify_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'standard_plan',
        name: 'Standard',
        paymentType: 'monthly',
        price: 980,
        subscriptionId: 'spotify_premium',
      },
      {
        id: 'student_plan',
        name: 'Student',
        paymentType: 'monthly',
        price: 480,
        subscriptionId: 'spotify_premium',
      },
      {
        id: 'duo_plan',
        name: 'Duo',
        paymentType: 'monthly',
        price: 1280,
        subscriptionId: 'spotify_premium',
      },
      {
        id: 'family_plan',
        name: 'Family',
        paymentType: 'monthly',
        price: 1580,
        subscriptionId: 'spotify_premium',
      },
    ],
  },
  {
    id: 'disney_plus',
    name: 'Disney+',
    icon: '/images/icon/subscription/disney_plus_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'standard_monthly_plan',
        name: 'スタンダード 月額プラン',
        paymentType: 'monthly',
        price: 990,
        subscriptionId: 'disney_plus',
      },
      {
        id: 'standard_yearly_plan',
        name: 'スタンダード 年額プラン',
        paymentType: 'yearly',
        price: 9900,
        subscriptionId: 'disney_plus',
      },
      {
        id: 'premium_monthly_plan',
        name: 'プレミアム 月額プラン',
        paymentType: 'monthly',
        price: 1320,
        subscriptionId: 'disney_plus',
      },
      {
        id: 'premium_yearly_plan',
        name: 'プレミアム 年額プラン',
        paymentType: 'yearly',
        price: 13200,
        subscriptionId: 'disney_plus',
      },
    ],
  },
  {
    id: 'youtube_premium',
    name: 'Youtube Premium',
    icon: '/images/icon/subscription/youtube_premium_icon.webp',
    isSubscribed: false,
    plan: [
      {
        id: 'individual_monthly_plan',
        name: '個人 月額プラン',
        paymentType: 'monthly',
        price: 1280,
        subscriptionId: 'youtube_premium',
      },
      {
        id: 'individual_yearly_plan',
        name: '個人 年額プラン',
        paymentType: 'yearly',
        price: 12800,
        subscriptionId: 'youtube_premium',
      },
      {
        id: 'student_plan',
        name: '学生',
        paymentType: 'monthly',
        price: 780,
        subscriptionId: 'youtube_premium',
      },
      {
        id: 'family_plan',
        name: 'ファミリー',
        paymentType: 'monthly',
        price: 2280,
        subscriptionId: 'youtube_premium',
      },
    ],
  },
];

export const trailMock = {
  userSubscriptions,
  user,
  subscriptions,
  subscriptionsDetails,
};
