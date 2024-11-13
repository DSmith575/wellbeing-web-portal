/**
 * @name routeList
 * @description Route list
 * @returns {Array} - List of routes
 */

import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";
import EventPlanner from "../pages/EventPlanner";
import AttendeesPage from "../pages/AttendeePage";
import { routerLabels, routerPaths } from "./routeLabels";

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
    path: routerPaths.eventPlanner,
    label: routerLabels.eventPlanner,
    element: <EventPlanner />,
  },
  {
    path: routerPaths.attendanceList,
    label: routerLabels.attendanceList,
    element: <AttendeesPage />,
  },
];
