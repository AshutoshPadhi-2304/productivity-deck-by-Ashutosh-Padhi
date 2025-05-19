import React, { useState } from "react";

import { ResultsNotFound } from "components/commons";
import i18n from "i18next";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useNewsModeStore from "stores/useNewsModeStore";
import Pagination from "utils/Pagination";
import withTitle from "utils/withTitle";

import ArticleList from "./ArticleList";

const Favorite = () => {
  const favoritesData = useNewsModeStore((store) => store.favorites);

  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();

  const articlesPerPage = 3;

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = favoritesData.slice(
    firstArticleIndex,
    lastArticleIndex
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Typography
        className="mb-28 ml-12 mt-6 self-start text-4xl"
        style="h1"
        weight="bold"
      >
        {t("modes.favorite")}
        {favoritesData.length === 0 && (
          <ResultsNotFound label={t("favorite.noFavorites")} />
        )}
      </Typography>
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

export default withTitle(Favorite, i18n.t("favorite.title"));
