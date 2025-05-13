import React, { useState } from "react";

import axios from "axios";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

export const SearchComponent = () => {
  const [searchKey, setSearchKey] = useState("");
  const { setNewsData, newsSource } = useNewsModeStore();
  const fetchNews = async () => {
    try {
      await axios
        .get(
          `https://newsapi.org/v2/top-headlines?q=${searchKey}&sources=${newsSource}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        )
        .then((res) => setNewsData(res.data.articles));
    } catch (error) {
      console.log("Error at fetching news", error);
    }
  };

  const handleSearch = () => {
    fetchNews();
    setSearchKey("");
  };

  return (
    <div>
      <Input
        placeholder="Search articles"
        prefix={<Search />}
        type="search"
        value={searchKey}
        onChange={(event) => setSearchKey(event.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchComponent;
