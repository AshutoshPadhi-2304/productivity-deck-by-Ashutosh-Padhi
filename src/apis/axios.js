import axios from "axios";

const initialiseAxios = () => {
  axios.defaults.baseURL = `https://newsapi.org/v2/`;
};

export default initialiseAxios;
