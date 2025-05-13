import axios from "axios";

const initialiseAxios = () => {
  axios.defaults.baseURL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NEWS_API_KEY}`;
};

export default initialiseAxios;
