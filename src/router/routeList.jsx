import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";
import EventPlanner from "../pages/EventPlanner";
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
];
