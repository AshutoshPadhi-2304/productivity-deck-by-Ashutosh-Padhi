import React, { useState } from "react";

import newsApi from "apis/news";
import { SearchComponent } from "components/commons/SearchComponent";
import { Typography, Pane, DatePicker, Button } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

const PaneComponent = ({ isOpen, closePane }) => {
  const [dateRange, setDateRange] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const newsSource = useNewsModeStore((store) => store.newsSource);
  const setNewsData = useNewsModeStore((store) => store.setNewsData);

  const fetchNews = async () => {
    const [startDate, endDate] = dateRange;

    const response = await newsApi.fetch({
      q: searchKey,
      sources: newsSource,
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      from: startDate.format("YYYY-MM-DD"),
      to: endDate.format("YYYY-MM-DD"),
    });
    setNewsData(response.data.articles);
  };

  return (
    <div>
      <Pane isOpen={isOpen} onClose={closePane}>
        <Pane.Header>
          <Typography className="font-bold" style="h2">
            Filters
          </Typography>
        </Pane.Header>
        <Pane.Body className="flex flex-col items-start justify-start">
          <SearchComponent searchKey={searchKey} setSearchKey={setSearchKey} />
          <div className="w-full">
            <DatePicker
              label="Date range"
              type="range"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </Pane.Body>
        <Pane.Footer>
          <Button
            className="hover:bg-black hover:text-white"
            label="Save"
            style="tertiary"
            onClick={() => {
              fetchNews();
              closePane();
              setSearchKey("");
              setDateRange([]);
            }}
          />
          <Button
            className="hover:bg-black hover:text-white"
            label="Cancel"
            style="tertiary"
            onClick={() => {
              closePane();
              setSearchKey("");
              setDateRange([]);
            }}
          />
        </Pane.Footer>
      </Pane>
    </div>
  );
};

export default PaneComponent;
