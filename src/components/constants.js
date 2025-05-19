import { Favorite, List, TimeTracking, Globe } from "neetoicons";
import routes from "routes";

const API_BASE_URL = "https://newsapi.org/v2/";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const TIMER_MODES = [
  { id: 1, name: "pomodoro", duration: 25 * 60 },
  { id: 2, name: "shortBreak", duration: 5 * 60 },
  { id: 3, name: "longBreak", duration: 15 * 60 },
];
const KANBAN_COLUMN_IDS = ["todo", "inProgress", "done"];

const DEFAULT_PAGE_SIZE = 3;

const DEFAULT_PAGE_INDEX = 1;

const QUERY_KEYS = {
  NEWS: "news",
};

const NAV_LINKS = [
  { to: routes.kanban, icon: List },
  { to: routes.pomodoro, icon: TimeTracking },
  { to: routes.news, icon: Globe },
  { to: routes.favorite, icon: Favorite },
];

const NEWS_SOURCES = [
  {
    value: "abc-news",
    label: "ABC News",
  },
  {
    value: "bbc-news",
    label: "BBC News",
  },
  {
    value: "bloomberg",
    label: "Bloomberg",
  },
  {
    value: "business-insider",
    label: "Business Insider",
  },
  {
    value: "buzzfeed",
    label: "Buzzfeed",
  },
  {
    value: "cbc-news",
    label: "CBC News",
  },
  {
    value: "cnn",
    label: "CNN",
  },
  {
    value: "espn",
    label: "ESPN",
  },
  {
    value: "focus",
    label: "Focus",
  },
  {
    value: "news24",
    label: "News24",
  },
];

export {
  TIMER_MODES,
  KANBAN_COLUMN_IDS,
  NEWS_SOURCES,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_INDEX,
  QUERY_KEYS,
  NAV_LINKS,
  API_BASE_URL,
  API_KEY,
};
