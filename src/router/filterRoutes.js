/**
 * @name filterRoutes
 * @description Filter routes based on user authentication status
 * @param {Array} routes - Array of routes
 * @param {Object} user - User object
 * @returns {Array} - Filtered routes
 */

import { routerLabels } from "./routeLabels";

const ignoredRoutesAuthenticated = [routerLabels.login];

const ignoredRoutesUnauthenticated = [routerLabels.dashboard, routerLabels.events];

export const filterRoutes = (routes, user) => {
  const ignoredRoutes = user
    ? ignoredRoutesAuthenticated
    : ignoredRoutesUnauthenticated;
  return routes.filter((route) => !ignoredRoutes.includes(route.label));
};
