import React from "react";

import Card from "./Card";

const ArticleList = ({ newsData }) => (
  <div>
    {newsData
      ? newsData.map((article) => (
          <Card
            author={article.author}
            date={new Date(article.publishedAt).toLocaleDateString("en-GB")}
            description={article.description}
            imageUrl={article.urlToImage}
            key={article.url}
            title={article.title}
            url={article.url}
          />
        ))
      : null}
  </div>
);

export default ArticleList;
