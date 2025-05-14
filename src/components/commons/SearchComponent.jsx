import React from "react";

import newsApi from "apis/news";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

export const SearchComponent = ({ searchKey, setSearchKey }) => {
  const { setNewsData, newsSource } = useNewsModeStore();
  const fetchNews = async () => {
    try {
      const response = await newsApi.fetch({
        q: searchKey,
        sources: newsSource,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
      });

      setNewsData(response.data.articles);
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
