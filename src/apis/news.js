import axios from "axios";

const fetch = async (params) => {
  const news = await axios.get("everything", { params });

  return news;
};

const newsApi = { fetch };

export default newsApi;
