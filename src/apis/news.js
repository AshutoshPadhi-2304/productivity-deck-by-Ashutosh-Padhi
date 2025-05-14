import axios from "axios";

const fetch = (params) => axios.get("everything", { params });

const newsApi = { fetch };

export default newsApi;
