import { Favorite, List, TimeTracking, Globe } from "neetoicons";
import routes from "routes";

const NAV_LINKS = [
  { to: routes.kanban, icon: List },
  { to: routes.pomodoro, icon: TimeTracking },
  { to: routes.news, icon: Globe },
  { to: routes.favorite, icon: Favorite },
];

export { NAV_LINKS };
