/* eslint-disable */
export type Controller_CreateUserSubscriptionRequest = {
  name?: string | undefined;
  planId?: string | undefined;
  planName?: string | undefined;
  planPaymentType?: Entity_PaymentType | undefined;
  planPrice?: number | undefined;
  subscriptionId?: string | undefined;
  unsubscribeLink?: string | undefined;
};

export type Controller_CreateUserSubscriptionResponse = {
  userSubscrionId?: string | undefined;
};

export type Controller_GetSubscriptionResponse = {
  icon?: string | undefined;
  id?: string | undefined;
  isSubscribed?: boolean | undefined;
  name?: string | undefined;
  plan?: Entity_TemplPlan[] | undefined;
};

export type Controller_GetSubscriptionsResponse = {
  icon?: string | undefined;
  id?: string | undefined;
  isSubscribed?: boolean | undefined;
  name?: string | undefined;
};

export type Controller_GetUserSubscriptionsResponse = {
  totalAmountPerDay?: number | undefined;
  totalAmountPerMonth?: number | undefined;
  totalAmountPerYear?: number | undefined;
  userSubscriptions?: Entity_UserSubscription[] | undefined;
};

export type Controller_GoogleLoginRequest = {
  code?: string | undefined;
};

export type Controller_GoogleLoginResponse = {
  userId?: string | undefined;
};

export type Echo_HTTPError = {};

export type Entity_PaymentType = 'daily' | 'monthly' | 'yearly';

export type Entity_TemplPlan = {
  id?: string | undefined;
  name?: string | undefined;
  paymentType?: Entity_PaymentType | undefined;
  price?: number | undefined;
  subscriptionId?: string | undefined;
};

export type Entity_UserSubscription = {
  createdAt?: string | undefined;
  icon?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  paidAt?: string | undefined;
  paymentType?: Entity_PaymentType | undefined;
  planId?: string | undefined;
  planName?: string | undefined;
  price?: number | undefined;
  templId?: string | undefined;
  unsubscribeLink?: string | undefined;
  updatedAt?: string | undefined;
  userId?: string | undefined;
};
