import { Entity_PaymentType } from '../../../api/@types';

export type PaymentType = Entity_PaymentType;

export const PaymentEnum = {
  daily: 'daily',
  monthly: 'monthly',
  yearly: 'yearly',
} as const;

export type PaymentEnum = (typeof PaymentEnum)[keyof typeof PaymentEnum];
