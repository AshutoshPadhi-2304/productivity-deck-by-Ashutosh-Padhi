const TIMER_MODES = [
  { id: 1, name: "Pomodoro", duration: 25 * 60 },
  { id: 2, name: "Short Break", duration: 5 * 60 },
  { id: 3, name: "Long Break", duration: 15 * 60 },
];
const KANBAN_COLUMN_IDS = ["todo", "inProgress", "done"];

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

export { TIMER_MODES, KANBAN_COLUMN_IDS, NEWS_SOURCES };
