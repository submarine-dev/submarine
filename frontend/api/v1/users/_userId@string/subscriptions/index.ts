/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    /** OK */
    resBody: Types.Controller_GetUserSubscriptionsResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.Controller_CreateUserSubscriptionResponse;
    /** CreateUserSubscriptionRequest */
    reqBody: Types.Controller_CreateUserSubscriptionRequest;
  };
}>;
