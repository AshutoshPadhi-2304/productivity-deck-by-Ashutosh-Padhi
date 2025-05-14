import axios from "axios";

const fetch = async (params) => {
  const response = await axios.get("everything", { params });
  console.log("Rsponse from news.js", response.data);

  return response.data;
};

const newsApi = { fetch };

export default newsApi;
