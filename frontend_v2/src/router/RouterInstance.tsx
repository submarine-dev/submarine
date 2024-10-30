import { AuthPage } from '@/feature/auth/AuthPage';
import { NotFoundPage } from '@/feature/common/NotFoundPage';
import { IndexPage } from '@/feature/index/IndexPage';
import type { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouterServiceProvider } from './RouterServiceProvider';
import { DetailPage } from '@/feature/detail/DetailPage';

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
      path: '/auth',
      element: <AuthPage />,
    },
    {
      path: '/',
      element: <IndexPage />,
    },
    {
      path: '/subscription/:id',
      element: <DetailPage />,
    },
    {
      path: '/google/callback',
      element: <div>GoogleAuth is success✅</div>,
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
