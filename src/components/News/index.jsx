import React, { useEffect, useState } from "react";

import newsApi from "apis/news";
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
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const fetchNews = async () => {
    try {
      const response = await newsApi.fetch({
        sources: newsSource,
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
      });
      setNewsData(response.data.articles);
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
      <div className=" flex items-center gap-x-4 self-start">
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
          isOpen={showPane}
          confirmPane={() => {
            setShowPane(false);
            fetchNews();
          }}
        />
        <SearchComponent searchKey={searchKey} setSearchKey={setSearchKey} />
      </div>
      <div className="self-start rounded-md bg-black p-2 text-xl font-bold text-white">
        {newsData.length}
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
