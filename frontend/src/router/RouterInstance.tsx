import { AuthPage } from '@/feature/auth/AuthPage';
import { AuthCallbackPage } from '@/feature/authCallback/AuthCallbackPage';
import { NotFoundPage } from '@/feature/common/NotFoundPage';
import { DetailPage } from '@/feature/detail/DetailPage';
import { IndexPage } from '@/feature/index/IndexPage';
import { SubscriptionsPage } from '@/feature/subscriptions/SubscriptionsPage';
import type { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterServiceProvider } from './RouterServiceProvider';

type RouteItemType = {
  path: string;
  element: ReactNode;
};

/**
 * ReactRouter
 */
export const RouterInstance: FC = () => {
  const routeArray: RouteItemType[] = [
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      /**
       * ユーザのサブスクリプション詳細ページ
       */
      path: '/subscription/:id',
      element: <DetailPage />,
    },
    {
      /**
       * サブスク一覧ページ
       */
      path: '/subscriptions',
      element: <SubscriptionsPage />,
    },
    {
      /**
       * サブスク一覧ページ→idがある場合には、そのサブスクのdrawerが開いた状態で表示
       */
      path: '/subscriptions/:id',
      element: <SubscriptionsPage />,
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/google/callback',
      element: <AuthCallbackPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  return (
    <BrowserRouter>
      <RouterServiceProvider>
        <Routes>
          {routeArray.map((routeItem) => (
            <Route key={routeItem.path} path={routeItem.path} element={routeItem.element} />
          ))}
        </Routes>
      </RouterServiceProvider>
    </BrowserRouter>
  );
};
