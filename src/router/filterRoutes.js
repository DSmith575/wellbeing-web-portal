import { routerLabels } from './routeLabels';

const ignoredRoutesAuthenticated = [routerLabels.login];

const ignoredRoutesUnauthenticated = [routerLabels.dashboard];

export const filterRoutes = (routes, user) => {
  const ignoredRoutes = user
    ? ignoredRoutesAuthenticated
    : ignoredRoutesUnauthenticated;
  return routes.filter((route) => !ignoredRoutes.includes(route.label));
};
