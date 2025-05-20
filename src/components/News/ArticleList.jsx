import React from "react";

import dayjs from "dayjs";

import Card from "./Card";

const ArticleList = ({ newsData }) => (
  <div>
    {newsData
      ? newsData.map(
          ({ author, publishedAt, description, urlToImage, url, title }) => (
            <Card
              date={dayjs(publishedAt).format("DD/MM/YYYY")}
              imageUrl={urlToImage}
              key={url}
              {...{ author, description, title, url }}
            />
          )
        )
      : null}
  </div>
);

export default ArticleList;
