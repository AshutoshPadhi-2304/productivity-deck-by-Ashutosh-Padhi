import React from "react";

import Card from "./Card";

const ArticleList = ({ favoritesData }) => (
  <div>
    {favoritesData
      ? favoritesData.map(({ url, title }) => (
          <Card key={url} {...{ title, url }} />
        ))
      : null}
  </div>
);

export default ArticleList;
