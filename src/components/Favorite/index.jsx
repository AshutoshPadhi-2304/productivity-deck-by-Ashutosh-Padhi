import React, { useState } from "react";

import useNewsModeStore from "stores/useNewsModeStore";
import Pagination from "utils/Pagination";

import ArticleList from "./ArticleList";

const Favorite = () => {
  const favoritesData = useNewsModeStore((store) => store.favorites);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = favoritesData.slice(
    firstArticleIndex,
    lastArticleIndex
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="mb-28 ml-12 mt-6 self-start text-4xl font-bold">
        Favorite
      </h1>
      <ArticleList favoritesData={currentArticles} />
      <Pagination
        articlesPerPage={articlesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalArticles={favoritesData.length}
      />
    </div>
  );
};

export default Favorite;
