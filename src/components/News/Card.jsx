import React from "react";

import { Heart, RatingFilled } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useNewsModeStore from "stores/useNewsModeStore";

const Card = ({ title, description, author, date, imageUrl, url }) => {
  const { toggleFavorite, favorites } = useNewsModeStore();

  const { t } = useTranslation();

  const isFavorite = favorites.some((article) => article.url === url);

  return (
    <div className="ml-24 w-full max-w-7xl border-b-2 p-8">
      <div className="flex justify-between gap-6">
        <div className="flex max-w-4xl flex-col items-start justify-between">
          <Typography
            className="max-w-2xl text-left"
            style="h2"
            weight="semibold"
          >
            <a href={url} rel="noreferrer" target="_blank">
              {title}
            </a>
          </Typography>
          <Typography
            className="mt-2 max-w-2xl text-left text-gray-600"
            style="body2"
          >
            {description}
          </Typography>
          <Typography className="mt-4 text-gray-400" style="body3">
            {date} · {author}
          </Typography>
        </div>
        <Button
          className=" ml-2 mr-auto self-start text-gray-400 hover:text-gray-600"
          icon={isFavorite ? RatingFilled : Heart}
          style="tertiary"
          tooltipProps={{
            content: isFavorite
              ? t("label.favorite.remove")
              : t("label.favorite.add"),
          }}
          onClick={() =>
            toggleFavorite({
              title,
              description,
              author,
              date,
              imageUrl,
              url,
            })
          }
        />
        <div className="h-32 w-48  overflow-hidden rounded-md border bg-gray-100">
          {imageUrl ? (
            <img
              alt={t("label.news.altNews")}
              className="h-full w-full object-cover"
              src={imageUrl}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
