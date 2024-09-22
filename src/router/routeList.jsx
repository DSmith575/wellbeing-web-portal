import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import EventPage from '../pages/EventPage';
import DashboardPage from '../pages/DashboardPage';
import { routerLabels, routerPaths } from './routeLabels';

export const routes = [
  {
    path: routerPaths.home,
    label: routerLabels.home,
    element: <HomePage />,
  },
  {
    path: routerPaths.login,
    label: routerLabels.login,
    element: <LoginPage />,
  },
  {
    path: routerPaths.events,
    label: routerLabels.events,
    element: <EventPage />,
  },
  {
    path: routerPaths.dashboard,
    label: routerLabels.dashboard,
    element: <DashboardPage />,
  },
];
