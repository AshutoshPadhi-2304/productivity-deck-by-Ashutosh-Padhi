import React, { useEffect, useState } from "react";

import axios from "axios";
import { ModalComponent } from "components/commons";
import SearchComponent from "components/commons/SearchComponent";
import { NEWS_SOURCES } from "components/constants";
import { Filter, MenuHorizontal } from "neetoicons";
import { Button, Dropdown, Select } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";
import Pagination from "utils/Pagination";

import ArticleList from "./ArticleList";
import PaneComponent from "./PaneComponent";

const News = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { newsData, setNewsData, newsSource, setNewsSource } =
    useNewsModeStore();
  const [selectedSource, setSelectedSource] = useState(newsSource);
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const fetchNews = async () => {
    try {
      await axios
        .get(
          `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        )
        .then((res) => setNewsData(res.data.articles));
    } catch (error) {
      console.log("Error at fetching news", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [newsSource]);

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = newsData.slice(firstArticleIndex, lastArticleIndex);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="mb-28 flex items-center gap-x-4 self-start">
        <p className="mb-8 ml-12 mt-6 self-start text-4xl font-bold">
          News mode
        </p>
        <Dropdown
          buttonStyle="tertiary"
          icon={MenuHorizontal}
          onClose={() => setShowDropdown(false)}
          onClickOutside={() => {
            setShowDropdown(false);
            console.log(showDropdown);
          }}
        >
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
          setDateRange={setDateRange}
          confirmPane={() => {
            setShowPane(false);
            fetchNews();
          }}
        />
        <SearchComponent />
      </div>
      <ArticleList newsData={currentArticles} />
      <Pagination
        articlesPerPage={articlesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalArticles={newsData.length}
      />
    </div>
  );
};

export default News;
