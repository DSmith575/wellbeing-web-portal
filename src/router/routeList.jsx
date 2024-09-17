import LoginPage from '../pages/LoginPage';
import { routerLabels } from './routeLabels';

export const routes = [
  {
    path: '/',
    label: routerLabels.home,
    element: 'Home',
  },
  {
    path: '/login',
    label: routerLabels.login,
    element: <LoginPage />,
  },
];
