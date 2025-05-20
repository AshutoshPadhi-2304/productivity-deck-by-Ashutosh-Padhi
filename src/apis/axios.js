import { API_BASE_URL, API_KEY } from "constants/api";

import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use((response) => response.data);
};

const initialiseAxios = () => {
  axios.defaults.baseURL = API_BASE_URL;
  axios.defaults.params = { apiKey: API_KEY };
  responseInterceptors();
};

export default initialiseAxios;
