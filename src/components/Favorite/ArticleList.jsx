import React from "react";

import Card from "./Card";

const ArticleList = ({ favoritesData }) => (
  <div>
    {favoritesData
      ? favoritesData.map((favorite) => (
          <Card key={favorite.url} title={favorite.title} url={favorite.url} />
        ))
      : null}
  </div>
);

export default ArticleList;
