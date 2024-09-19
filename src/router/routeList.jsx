import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import EventPage from '../pages/EventPage';
import { routerLabels } from './routeLabels';

export const routes = [
  {
    path: '/',
    label: routerLabels.home,
    element: <HomePage />,
  },
  {
    path: '/login',
    label: routerLabels.login,
    element: <LoginPage />,
  },
  {
    path: '/events',
    label: routerLabels.events,
    element: <EventPage />,
  },
];
