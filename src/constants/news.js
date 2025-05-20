import dayjs from "dayjs";

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

const TODAY = dayjs();

export { NEWS_SOURCES, TODAY };
