import { createBrowserRouter, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { routes } from './routeList';
import ErrorPage from '../pages/ErrorPage';

const AppLayout = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

const routerConfig = [
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
