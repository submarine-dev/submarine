/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../@types';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    /** OK */
    resBody: Types.Controller_GoogleLoginResponse;
    /** GoogleLoginRequest */
    reqBody: Types.Controller_GoogleLoginRequest;
  };
}>;
