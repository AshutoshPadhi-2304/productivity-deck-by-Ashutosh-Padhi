import { NEWS_SOURCES } from "constants/news";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "constants/query";

import React, { useState } from "react";

import {
  ModalComponent,
  PageLoader,
  ResultsNotFound,
} from "components/commons";
import SearchComponent from "components/commons/SearchComponent";
import dayjs from "dayjs";
import { useFetchNews } from "hooks/reactQuery/useNewsApi";
import i18n from "i18next";
import { Filter, MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Select, Pagination, Typography, Tag } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useNewsModeStore from "stores/useNewsModeStore";
import withTitle from "utils/withTitle";

import ArticleList from "./ArticleList";
import PaneComponent from "./PaneComponent";

const News = () => {
  const {
    newsSource,
    setNewsSource,
    searchKey,
    setSearchKey,
    dateRange,
    setDateRange,
  } = useNewsModeStore();

  const [showModal, setShowModal] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const [selectedSource, setSelectedSource] = useState(newsSource);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const { t } = useTranslation();

  const newsParams = {
    sources: newsSource,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
    from: dateRange[0] ? dayjs(dateRange[0]).format("YYYY-MM-DD") : "",
    to: dateRange[1] ? dayjs(dateRange[1]).format("YYYY-MM-DD") : "",
    q: searchKey || "",
  };

  const { data: { articles = [], totalResults = 0 } = {}, isLoading } =
    useFetchNews(newsParams);

  const resetFilters = () => {
    setSearchKey("");
    setDateRange([]);
  };
  if (isLoading) return <PageLoader />;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className=" flex items-center gap-x-4 self-start">
        <p className="mb-5 ml-12 mt-6 self-start text-4xl font-bold">
          {t("label.modes.news")}
        </p>
        <Dropdown buttonStyle="tertiary" icon={MenuHorizontal}>
          <Dropdown.Menu>
            <Dropdown.MenuItem onClick={() => setShowModal(true)}>
              {t("label.news.changeSource")}
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
        <ModalComponent
          closeModal={() => setShowModal(false)}
          confirmMessage={t("modal.save")}
          isOpen={showModal}
          label={t("label.news.changeSource")}
          confirmModal={() => {
            setNewsSource(selectedSource.value);
            setShowModal(false);
          }}
        >
          <Select
            isClearable
            isSearchable
            className="text-black"
            label={t("label.news.source")}
            name={t("label.news.sourceList")}
            options={NEWS_SOURCES}
            placeholder={t("placeholder.news.selectNewsSource")}
            onChange={(option) => setSelectedSource(option)}
          />
        </ModalComponent>
        <Button
          icon={Filter}
          style="tertiary"
          tooltipProps={{
            content: "Open pane",
            position: "bottom",
          }}
          onClick={() => {
            setShowPane(true);
          }}
        />
        <PaneComponent
          closePane={() => setShowPane(false)}
          isOpen={showPane}
          {...{ dateRange, searchKey, setDateRange, setSearchKey }}
          confirmPane={() => {
            setShowPane(false);
          }}
        />
        <div
          style={{
            marginLeft: "755px",
          }}
        >
          <SearchComponent searchKey={searchKey} setSearchKey={setSearchKey} />
        </div>
      </div>
      <div className="flex items-center self-start rounded-md p-2 text-xl font-bold text-black">
        {(!isEmpty(searchKey) || !isEmpty(dateRange)) && (
          <Typography style="body1">
            {t("message.articleCount", { count: totalResults })}
          </Typography>
        )}
        {(!isEmpty(searchKey) || !isEmpty(dateRange)) && (
          <div className="ml-4">
            {!isEmpty(searchKey) && (
              <Tag
                label={searchKey}
                size="large"
                style="secondary"
                onClose={() => setSearchKey("")}
              />
            )}
            {!isEmpty(dateRange) && (
              <Tag
                size="large"
                style="secondary"
                label={`${
                  dateRange[0] ? dayjs(dateRange[0]).format("YYYY-MM-DD") : ""
                } - ${
                  dateRange[1] ? dayjs(dateRange[1]).format("YYYY-MM-DD") : ""
                }`}
                onClose={() => setDateRange([])}
              />
            )}
            <Button
              className="ml-2 bg-gray-200"
              label={t("label.news.resetFilters")}
              size="small"
              style="tertiary"
              onClick={resetFilters}
            />
          </div>
        )}
      </div>
      {totalResults === 0 && (
        <div className="mt-56">
          <ResultsNotFound
            label={t("title.resultsNotFound")}
            {...{ resetFilters }}
          />
        </div>
      )}
      <ArticleList newsData={articles} />
      <div className="mr-24 self-end">
        <Pagination
          count={totalResults}
          navigate={(page) => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default withTitle(News, i18n.t("title.news"));
