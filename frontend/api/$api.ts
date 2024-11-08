import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_17j1g8v } from './login/google';
import type { Methods as Methods_1er0sp5 } from './v1/subscription';
import type { Methods as Methods_11adnuw } from './v1/subscription/_subscriptionId@string';
import type { Methods as Methods_15i0cf4 } from './v1/users/_userId@string/subscriptions';
import type { Methods as Methods_1wti2re } from './v1/users/_userId@string/subscriptions/_userSubscriptionId@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1' : baseURL).replace(/\/$/, '');
  const PATH0 = '/login/google';
  const PATH1 = '/v1/subscription';
  const PATH2 = '/v1/users';
  const PATH3 = '/subscriptions';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    login: {
      google: {
        /**
         * @param option.body - GoogleLoginRequest
         * @returns OK
         */
        post: (option: { body: Methods_17j1g8v['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_17j1g8v['post']['resBody'],
            BasicHeaders,
            Methods_17j1g8v['post']['status']
          >(prefix, PATH0, POST, option).json(),
        /**
         * @param option.body - GoogleLoginRequest
         * @returns OK
         */
        $post: (option: { body: Methods_17j1g8v['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_17j1g8v['post']['resBody'],
            BasicHeaders,
            Methods_17j1g8v['post']['status']
          >(prefix, PATH0, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    v1: {
      subscription: {
        _subscriptionId: (val2: string) => {
          const prefix2 = `${PATH1}/${val2}`;

          return {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods_11adnuw['get']['resBody'],
                BasicHeaders,
                Methods_11adnuw['get']['status']
              >(prefix, prefix2, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods_11adnuw['get']['resBody'],
                BasicHeaders,
                Methods_11adnuw['get']['status']
              >(prefix, prefix2, GET, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1er0sp5['get']['resBody'], BasicHeaders, Methods_1er0sp5['get']['status']>(
            prefix,
            PATH1,
            GET,
            option
          ).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1er0sp5['get']['resBody'], BasicHeaders, Methods_1er0sp5['get']['status']>(
            prefix,
            PATH1,
            GET,
            option
          )
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      users: {
        _userId: (val2: string) => {
          const prefix2 = `${PATH2}/${val2}`;

          return {
            subscriptions: {
              _userSubscriptionId: (val4: string) => {
                const prefix4 = `${prefix2}${PATH3}/${val4}`;

                return {
                  /**
                   * @returns OK
                   */
                  delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<
                      Methods_1wti2re['delete']['resBody'],
                      BasicHeaders,
                      Methods_1wti2re['delete']['status']
                    >(prefix, prefix4, DELETE, option).json(),
                  /**
                   * @returns OK
                   */
                  $delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<
                      Methods_1wti2re['delete']['resBody'],
                      BasicHeaders,
                      Methods_1wti2re['delete']['status']
                    >(prefix, prefix4, DELETE, option)
                      .json()
                      .then((r) => r.body),
                  /**
                   * @param option.body - UpdateUserSubscriptionRequest
                   * @returns OK
                   */
                  put: (option: {
                    body: Methods_1wti2re['put']['reqBody'];
                    config?: T | undefined;
                  }) =>
                    fetch<
                      Methods_1wti2re['put']['resBody'],
                      BasicHeaders,
                      Methods_1wti2re['put']['status']
                    >(prefix, prefix4, PUT, option).json(),
                  /**
                   * @param option.body - UpdateUserSubscriptionRequest
                   * @returns OK
                   */
                  $put: (option: {
                    body: Methods_1wti2re['put']['reqBody'];
                    config?: T | undefined;
                  }) =>
                    fetch<
                      Methods_1wti2re['put']['resBody'],
                      BasicHeaders,
                      Methods_1wti2re['put']['status']
                    >(prefix, prefix4, PUT, option)
                      .json()
                      .then((r) => r.body),
                  $path: () => `${prefix}${prefix4}`,
                };
              },
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods_15i0cf4['get']['resBody'],
                  BasicHeaders,
                  Methods_15i0cf4['get']['status']
                >(prefix, `${prefix2}${PATH3}`, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods_15i0cf4['get']['resBody'],
                  BasicHeaders,
                  Methods_15i0cf4['get']['status']
                >(prefix, `${prefix2}${PATH3}`, GET, option)
                  .json()
                  .then((r) => r.body),
              /**
               * @param option.body - CreateUserSubscriptionRequest
               * @returns OK
               */
              post: (option: {
                body: Methods_15i0cf4['post']['reqBody'];
                config?: T | undefined;
              }) =>
                fetch<
                  Methods_15i0cf4['post']['resBody'],
                  BasicHeaders,
                  Methods_15i0cf4['post']['status']
                >(prefix, `${prefix2}${PATH3}`, POST, option).json(),
              /**
               * @param option.body - CreateUserSubscriptionRequest
               * @returns OK
               */
              $post: (option: {
                body: Methods_15i0cf4['post']['reqBody'];
                config?: T | undefined;
              }) =>
                fetch<
                  Methods_15i0cf4['post']['resBody'],
                  BasicHeaders,
                  Methods_15i0cf4['post']['status']
                >(prefix, `${prefix2}${PATH3}`, POST, option)
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix2}${PATH3}`,
            },
          };
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
