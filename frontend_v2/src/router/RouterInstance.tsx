import { NotFoundPage } from '@/components/page/NotFoundPage';
import { FC, ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

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
      element: <div>IndexPage</div>,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];

  return (
    <HashRouter>
      <Routes>
        {routeArray.map((routeItem) => (
          <Route key={routeItem.path} path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
    </HashRouter>
  );
};
