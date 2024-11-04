import { AutoManagementSuggestSubscriptionType } from '@/types/domain/AutoManagementSuggestSubscriptionType';
import { MailDomainEnum } from '@/types/domain/MailDomainEnum';
import { SubscriptionSummaryType, SubscriptionType } from '@/types/domain/SubscriptionType';
import { SuggestTypeEnum } from '@/types/domain/SuggestTypeEnum';
import { UserSubscriptionType } from '@/types/domain/UserSubscriptionType';
import { UserType } from '@/types/domain/UserType';

const userSubscriptionsBody: UserSubscriptionType['userSubscriptions'] = [
  {
    createdAt: new Date().toISOString(),
    icon: '/images/subscription/youtube_premium_icon.webp',
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
    icon: '/images/subscription/netflix_icon.png',
    id: 'netflix',
    name: 'Netflix',
    paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
    paymentType: 'monthly',
    planId: 'standard_plan',
    planName: 'スタンダード',
    price: 1590,
    templId: 'templ_netflix',
    unsubscribeLink: 'https://www.netflix.com/cancelplan',
    updatedAt: new Date().toISOString(),
    userId: 'user_google',
  },
  {
    createdAt: new Date().toISOString(),
    icon: '/images/subscription/amazon_prime_icon.png',
    id: 'amazon_prime',
    name: 'Amazon Prime',
    paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
    paymentType: 'monthly',
    planId: 'monthly_plan',
    planName: '月額プラン',
    price: 600,
    templId: 'templ_amazon_prime',
    unsubscribeLink: 'https://www.amazon.co.jp/mc/pipelines/cancellation',
    updatedAt: new Date().toISOString(),
    userId: 'user_google',
  },
  {
    createdAt: new Date().toISOString(),
    icon: '/images/subscription/spotify_icon.png',
    id: 'spotify_premium',
    name: 'Spotify Premium',
    paidAt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .split('T')[0],
    paymentType: 'monthly',
    planId: 'standard_plan',
    planName: 'Standard',
    price: 980,
    templId: 'templ_spotify',
    unsubscribeLink: 'https://support.spotify.com/jp/article/cancel-premium/',
    updatedAt: new Date().toISOString(),
    userId: 'user_google',
  },
];

const userSubscriptions: UserSubscriptionType = {
  totalAmountPerDay: 0,
  totalAmountPerMonth: userSubscriptionsBody.reduce((acc, cur) => acc + (cur.price ?? 0), 0),
  totalAmountPerYear: userSubscriptionsBody.reduce((acc, cur) => acc + (cur.price ?? 0), 0) * 12,
  userSubscriptions: userSubscriptionsBody,
};

const user: UserType = {
  userId: 'demo_user',
  icon: 'https://picsum.photos/300',
};

const subscriptions: SubscriptionSummaryType[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: '/images/subscription/netflix_icon.png',
    isSubscribed: false,
  },
  {
    id: 'amazon_prime',
    name: 'Amazon Prime',
    icon: '/images/subscription/amazon_prime_icon.png',
    isSubscribed: false,
  },
  {
    id: 'spotify_premium',
    name: 'Spotify Premium',
    icon: '/images/subscription/spotify_icon.png',
    isSubscribed: false,
  },
  {
    id: 'disney_plus',
    name: 'Disney+',
    icon: '/images/subscription/disney_plus_icon.png',
    isSubscribed: false,
  },
  {
    id: 'youtube_premium',
    name: 'Youtube Premium',
    icon: '/images/subscription/youtube_premium_icon.webp',
    isSubscribed: false,
  },
  {
    id: 'adobe_creative_cloud',
    name: 'Adobe Creative Cloud',
    icon: '/images/subscription/adobe_cc_icon.svg',
    isSubscribed: false,
  },
  {
    id: 'chat_gpt',
    name: 'ChatGPT',
    icon: '/images/subscription/chat_gpt_icon.png',
    isSubscribed: false,
  },
  {
    id: 'apple_music',
    name: 'Apple Music',
    icon: '/images/subscription/apple_music_icon.png',
    isSubscribed: false,
  },
  {
    id: 'hulu',
    name: 'Hulu',
    icon: '/images/subscription/hulu_icon.webp',
    isSubscribed: false,
  },
  {
    id: 'u_next',
    name: 'U-NEXT',
    icon: '/images/subscription/u_next_icon.png',
    isSubscribed: false,
  },
  {
    id: 'd_anime_store',
    name: 'dアニメストア',
    icon: '/images/subscription/d_anime_store_icon.png',
    isSubscribed: false,
  },
  {
    id: 'kindle_unlimited',
    name: 'Kindle Unlimited',
    icon: '/images/subscription/kindle_unlimited_icon.jpeg',
    isSubscribed: false,
  },
];

const subscriptionsDetails: SubscriptionType[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: '/images/subscription/netflix_icon.png',
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
    icon: '/images/subscription/amazon_prime_icon.png',
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
    icon: '/images/subscription/spotify_icon.png',
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
    icon: '/images/subscription/disney_plus_icon.png',
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
    icon: '/images/subscription/youtube_premium_icon.webp',
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
  {
    id: 'adobe_creative_cloud',
    name: 'Adobe Creative Cloud',
    icon: '/images/subscription/adobe_cc_icon.svg',
    isSubscribed: false,
    plan: [
      {
        id: 'individual_creative_cloud_complete_plan_monthly',
        name: 'Creative Cloud コンプリート 月額プラン',
        paymentType: 'monthly',
        price: 7780,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_photoshop_plan_monthly',
        name: 'Photoshop 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_adobe_firefly_plan_monthly',
        name: 'Adobe Firefly 月額プラン',
        paymentType: 'monthly',
        price: 680,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_adobe_premerie_plan_monthly',
        name: 'Adobe Premerie 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_adobe_illustrator_plan_monthly',
        name: 'Adobe Illustrator 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_acrobat_pro_plan_monthly',
        name: 'Acrobat Pro 月額プラン',
        paymentType: 'monthly',
        price: 1980,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_after_effects_plan_monthly',
        name: 'After Effects 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_in_design_plan_monthly',
        name: 'In Design 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_adobe_express_plan_monthly',
        name: 'Adobe Express 月額プラン',
        paymentType: 'monthly',
        price: 1180,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'individual_lightroom_plan_monthly',
        name: 'Lightroom 月額プラン',
        paymentType: 'monthly',
        price: 1180,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'adobe_substance_3d_collection_plan_monthly',
        name: 'Substance 3D Collection 月額プラン',
        paymentType: 'monthly',
        price: 6680,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'adobe_substance_3d_texturing_plan_monthly',
        name: 'Substance 3D Texturing 月額プラン',
        paymentType: 'monthly',
        price: 2680,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'animate_plan_monthly',
        name: 'Animate 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'dreamweaver_plan_monthly',
        name: 'Dreamweaver 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'audition_plan_monthly',
        name: 'Audition 月額プラン',
        paymentType: 'monthly',
        price: 3280,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'incopy_plan_monthly',
        name: 'InCopy 月額プラン',
        paymentType: 'monthly',
        price: 680,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'acrobat_standard_plan_monthly',
        name: 'Acrobat Standard 月額プラン',
        paymentType: 'monthly',
        price: 1518,
        subscriptionId: 'adobe_creative_cloud',
      },
      {
        id: 'adobe_stock_plan_monthly',
        name: 'Adobe Stock 月額プラン',
        paymentType: 'monthly',
        price: 3828,
        subscriptionId: 'adobe_creative_cloud',
      },
    ],
  },
  {
    id: 'chat_gpt',
    name: 'ChatGPT',
    icon: '/images/subscription/chat_gpt_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'plus_plan',
        name: 'Plus',
        paymentType: 'monthly',
        price: 3059,
        subscriptionId: 'chat_gpt',
      },
    ],
  },
  {
    id: 'apple_music',
    name: 'Apple Music',
    icon: '/images/subscription/apple_music_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'individual_plan',
        name: '個人',
        paymentType: 'monthly',
        price: 1080,
        subscriptionId: 'apple_music',
      },
      {
        id: 'family_plan',
        name: 'ファミリー',
        paymentType: 'monthly',
        price: 1680,
        subscriptionId: 'apple_music',
      },
      {
        id: 'student_plan',
        name: '学生',
        paymentType: 'monthly',
        price: 580,
        subscriptionId: 'apple_music',
      },
    ],
  },
  {
    id: 'hulu',
    name: 'Hulu',
    icon: '/images/subscription/hulu_icon.webp',
    isSubscribed: false,
    plan: [
      {
        id: 'standard_plan',
        name: 'スタンダード',
        paymentType: 'monthly',
        price: 1026,
        subscriptionId: 'hulu',
      },
    ],
  },
  {
    id: 'u_next',
    name: 'U-NEXT',
    icon: '/images/subscription/u_next_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'monthly_plan',
        name: '月額プラン',
        paymentType: 'monthly',
        price: 2189,
        subscriptionId: 'u_next',
      },
    ],
  },
  {
    id: 'd_anime_store',
    name: 'dアニメストア',
    icon: '/images/subscription/d_anime_store_icon.png',
    isSubscribed: false,
    plan: [
      {
        id: 'standard_plan',
        name: 'スタンダード',
        paymentType: 'monthly',
        price: 550,
        subscriptionId: 'd_anime_store',
      },
    ],
  },
  {
    id: 'kindle_unlimited',
    name: 'Kindle Unlimited',
    icon: '/images/subscription/kindle_unlimited_icon.jpeg',
    isSubscribed: false,
    plan: [
      {
        id: 'monthly_plan',
        name: 'スタンダード',
        paymentType: 'monthly',
        price: 980,
        subscriptionId: 'kindle_unlimited',
      },
    ],
  },
];

const autoManagementSuggestSubscriptions: AutoManagementSuggestSubscriptionType[] = [
  {
    id: 'subscription_youtube_premium_personal',
    name: 'Youtube Premium',
    icon: '/images/subscription/youtube_premium_icon.webp',
    plan: {
      id: 'plan_youtube_premium_personal',
      name: '個人プラン',
      paymentType: 'monthly',
      price: 1280,
    },
    suggestType: SuggestTypeEnum.REGISTER,
    mailSubject: '【お知らせ】Youtube Premiumのご請求が完了しました',
    mailDomain: MailDomainEnum.GMAIL,
  },
  {
    id: 'subscription_netflix_standard',
    name: 'Netflix',
    icon: '/images/subscription/netflix_icon.png',
    plan: {
      id: 'standard_plan',
      name: 'スタンダード',
      paymentType: 'monthly',
      price: 1590,
    },
    suggestType: SuggestTypeEnum.CANCEL,
    mailSubject: '【Netflix】ご利用料金のお支払いが完了しました',
    mailDomain: MailDomainEnum.GMAIL,
  },
  {
    id: 'subscription_amazon_prime_monthly',
    name: 'Amazon Prime',
    icon: '/images/subscription/amazon_prime_icon.png',
    plan: {
      id: 'monthly_plan',
      name: '月額プラン',
      paymentType: 'monthly',
      price: 600,
    },
    suggestType: SuggestTypeEnum.CHANGE,
    mailSubject: '【Amazon】Amazon Primeのご請求が完了しました',
    mailDomain: MailDomainEnum.GMAIL,
  },
];

export const demoMock = {
  userSubscriptions,
  user,
  subscriptions,
  subscriptionsDetails,
  autoManagementSuggestSubscriptions,
};
