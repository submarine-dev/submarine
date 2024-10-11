import { ContractedSubscriptionType } from '@/types/ContractedSubscriptionType';

export const data: {
  totalPayment: number;
  subscriptions: ContractedSubscriptionType[];
} = {
  totalPayment: 23399,
  subscriptions: [
    {
      subscriptionId: '1',
      subscriptionName: 'Netflix',
      icon: 'https://www.netflix.com/favicon.ico',
      color: '#E50914',
      plan: '個人プラン',
      monthlyPrice: 1399,
      paymentDate: String(new Date('2021-08-01')),
      startedAt: String(new Date('2021-08-01')),
    },
    {
      subscriptionId: '2',
      subscriptionName: 'Amazon Prime Video',
      icon: 'https://www.primevideo.com/favicon.ico',
      color: '#00A8E1',
      plan: 'ビジネスプラン',
      monthlyPrice: 1399,
      paymentDate: String(new Date('2021-08-01')),
      startedAt: String(new Date('2021-08-01')),
    },
    {
      subscriptionId: '3',
      subscriptionName: 'Spotify',
      icon: 'https://www.spotify.com/favicon.ico',
      color: '#1DB954',
      plan: 'ファミリープラン',
      monthlyPrice: 1399,
      paymentDate: String(new Date('2021-08-01')),
      startedAt: String(new Date('2021-08-01')),
    },
    {
      subscriptionId: '4',
      subscriptionName: 'Disney+',
      color: '#0089D6',
      icon: 'https://www.disneyplus.com/favicon.ico',
      plan: '個人プラン',
      monthlyPrice: 1399,
      paymentDate: String(new Date('2021-08-01')),
      startedAt: String(new Date('2021-08-01')),
    },
  ],
};
