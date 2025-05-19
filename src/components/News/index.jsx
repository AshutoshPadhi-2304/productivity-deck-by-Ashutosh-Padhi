import React, { useEffect, useState } from "react";

import {
  ModalComponent,
  PageLoader,
  ResultsNotFound,
} from "components/commons";
import SearchComponent from "components/commons/SearchComponent";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  NEWS_SOURCES,
} from "components/constants";
import { useFetchNews } from "hooks/reactQuery/useNewsApi";
import { Close, Filter, MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Select, Pagination } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

import ArticleList from "./ArticleList";
import PaneComponent from "./PaneComponent";

const News = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const { setNewsData, newsSource, setNewsSource } = useNewsModeStore();
  const [selectedSource, setSelectedSource] = useState(newsSource);
  const [searchKey, setSearchKey] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const newsParams = {
    sources: newsSource,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
    from: dateRange[0]?.format("YYYY-MM-DD") || "",
    to: dateRange[1]?.format("YYYY-MM-DD") || "",
    q: searchKey || "",
  };

  const { data: { articles = [], totalResults = 0 } = {}, isLoading } =
    useFetchNews(newsParams);

  useEffect(() => {
    if (articles.length > 0) {
      setNewsData(articles);
    }
  }, [articles, newsSource]);

  const resetFilters = () => {
    setSearchKey("");
    setDateRange([]);
  };
  if (isLoading) return <PageLoader />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className=" flex items-center gap-x-4 self-start">
        <p className="mb-8 ml-12 mt-6 self-start text-4xl font-bold">
          News mode
        </p>
        <Dropdown buttonStyle="tertiary" icon={MenuHorizontal}>
          <Dropdown.Menu>
            <Dropdown.MenuItem onClick={() => setShowModal(true)}>
              Change news source
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        <ModalComponent
          closeModal={() => setShowModal(false)}
          confirmMessage="Save"
          description="News source"
          isOpen={showModal}
          label="Change news source"
          confirmModal={() => {
            setNewsSource(selectedSource.value);
            setShowModal(false);
          }}
        >
          <Select
            isClearable
            isSearchable
            className="text-black"
            label="News source"
            name="News source list"
            options={NEWS_SOURCES}
            placeholder="Select news source"
            onChange={(option) => setSelectedSource(option)}
          />
        </ModalComponent>
        <Button
          icon={Filter}
          style="tertiary"
          onClick={() => {
            setShowPane(true);
          }}
        />
        <PaneComponent
          closePane={() => setShowPane(false)}
          dateRange={dateRange}
          isOpen={showPane}
          searchKey={searchKey}
          setDateRange={setDateRange}
          setSearchKey={setSearchKey}
          confirmPane={() => {
            setShowPane(false);
          }}
        />
        <SearchComponent searchKey={searchKey} setSearchKey={setSearchKey} />
      </div>
      <div className="flex items-center self-start rounded-md bg-black p-2 text-xl font-bold text-white">
        {totalResults}
        {totalResults === 0 && (
          <ResultsNotFound
            label="No results found. Please try adjusting your search terms or filters."
            resetFilters={resetFilters}
          />
        )}
        {(searchKey !== "" || dateRange.length !== 0) && (
          <div>
            {searchKey !== "" && (
              <Button
                icon={Close}
                label={searchKey}
                style="tertiary"
                onClick={() => setSearchKey("")}
              />
            )}
            {dateRange.length !== 0 && (
              <Button
                icon={Close}
                style="tertiary"
                label={`${dateRange[0]?.format(
                  "YYYY-MM-DD"
                )} - ${dateRange[1]?.format("YYYY-MM-DD")}`}
                onClick={() => setDateRange([])}
              />
            )}
            <Button
              className="ml-2"
              label="Reset filters"
              style="tertiary"
              onClick={resetFilters}
            />
          </div>
        )}
      </div>
      <ArticleList newsData={articles} />
      <Pagination
        count={totalResults}
        navigate={(page) => setCurrentPage(page)}
        pageNo={currentPage || DEFAULT_PAGE_INDEX}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </div>
  );
};

export default News;
