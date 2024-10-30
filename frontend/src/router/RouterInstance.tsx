import HomePage from '@/app/(protectedroutes)/home/page';
import SearchSubscriptionPage from '@/app/(protectedroutes)/search/page';
import ErrorPage from '@/app/_error';
import IndexPage from '@/app/page';
import { FC, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
      path: '/search',
      element: <SearchSubscriptionPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routeArray.map((routeItem) => (
          <Route key={routeItem.path} path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
