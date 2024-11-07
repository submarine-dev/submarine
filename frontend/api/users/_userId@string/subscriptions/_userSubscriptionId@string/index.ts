/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  delete: {
    status: 200;
    /** OK */
    resBody: Types.Controller_DeleteUserSubscriptionResponse;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.Controller_UpdateUserSubscriptionResponse;
    /** UpdateUserSubscriptionRequest */
    reqBody: Types.Controller_UpdateUserSubscriptionRequest;
  };
}>;
