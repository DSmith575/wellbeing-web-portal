import LoginPage from '../pages/LoginPage';
import EventPage from '../pages/EventPage';
import DashboardPage from '../pages/DashboardPage';
import { routerLabels, routerPaths } from './routeLabels';

export const routes = [
  {
    path: routerPaths.home,
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
