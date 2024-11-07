import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_17j1g8v } from './login/google';
import type { Methods as Methods_u5gjfz } from './subscription';
import type { Methods as Methods_1x83wiu } from './subscription/_subscriptionId@string';
import type { Methods as Methods_ofkqqi } from './users/_userId@string/subscriptions';
import type { Methods as Methods_1q6s3gs } from './users/_userId@string/subscriptions/_userSubscriptionId@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/v1' : baseURL).replace(/\/$/, '');
  const PATH0 = '/login/google';
  const PATH1 = '/subscription';
  const PATH2 = '/users';
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
    subscription: {
      _subscriptionId: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1x83wiu['get']['resBody'],
              BasicHeaders,
              Methods_1x83wiu['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1x83wiu['get']['resBody'],
              BasicHeaders,
              Methods_1x83wiu['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * @returns OK
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_u5gjfz['get']['resBody'], BasicHeaders, Methods_u5gjfz['get']['status']>(
          prefix,
          PATH1,
          GET,
          option
        ).json(),
      /**
       * @returns OK
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_u5gjfz['get']['resBody'], BasicHeaders, Methods_u5gjfz['get']['status']>(
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
      _userId: (val1: string) => {
        const prefix1 = `${PATH2}/${val1}`;

        return {
          subscriptions: {
            _userSubscriptionId: (val3: string) => {
              const prefix3 = `${prefix1}${PATH3}/${val3}`;

              return {
                /**
                 * @returns OK
                 */
                delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods_1q6s3gs['delete']['resBody'],
                    BasicHeaders,
                    Methods_1q6s3gs['delete']['status']
                  >(prefix, prefix3, DELETE, option).json(),
                /**
                 * @returns OK
                 */
                $delete: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods_1q6s3gs['delete']['resBody'],
                    BasicHeaders,
                    Methods_1q6s3gs['delete']['status']
                  >(prefix, prefix3, DELETE, option)
                    .json()
                    .then((r) => r.body),
                /**
                 * @param option.body - UpdateUserSubscriptionRequest
                 * @returns OK
                 */
                put: (option: {
                  body: Methods_1q6s3gs['put']['reqBody'];
                  config?: T | undefined;
                }) =>
                  fetch<
                    Methods_1q6s3gs['put']['resBody'],
                    BasicHeaders,
                    Methods_1q6s3gs['put']['status']
                  >(prefix, prefix3, PUT, option).json(),
                /**
                 * @param option.body - UpdateUserSubscriptionRequest
                 * @returns OK
                 */
                $put: (option: {
                  body: Methods_1q6s3gs['put']['reqBody'];
                  config?: T | undefined;
                }) =>
                  fetch<
                    Methods_1q6s3gs['put']['resBody'],
                    BasicHeaders,
                    Methods_1q6s3gs['put']['status']
                  >(prefix, prefix3, PUT, option)
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix3}`,
              };
            },
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods_ofkqqi['get']['resBody'],
                BasicHeaders,
                Methods_ofkqqi['get']['status']
              >(prefix, `${prefix1}${PATH3}`, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods_ofkqqi['get']['resBody'],
                BasicHeaders,
                Methods_ofkqqi['get']['status']
              >(prefix, `${prefix1}${PATH3}`, GET, option)
                .json()
                .then((r) => r.body),
            /**
             * @param option.body - CreateUserSubscriptionRequest
             * @returns OK
             */
            post: (option: { body: Methods_ofkqqi['post']['reqBody']; config?: T | undefined }) =>
              fetch<
                Methods_ofkqqi['post']['resBody'],
                BasicHeaders,
                Methods_ofkqqi['post']['status']
              >(prefix, `${prefix1}${PATH3}`, POST, option).json(),
            /**
             * @param option.body - CreateUserSubscriptionRequest
             * @returns OK
             */
            $post: (option: { body: Methods_ofkqqi['post']['reqBody']; config?: T | undefined }) =>
              fetch<
                Methods_ofkqqi['post']['resBody'],
                BasicHeaders,
                Methods_ofkqqi['post']['status']
              >(prefix, `${prefix1}${PATH3}`, POST, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`,
          },
        };
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
