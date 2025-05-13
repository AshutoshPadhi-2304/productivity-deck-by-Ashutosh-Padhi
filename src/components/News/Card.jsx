import React from "react";

import { Heart, RatingFilled } from "neetoicons";
import { Button, Typography } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

const Card = ({ title, description, author, date, imageUrl, url }) => {
  const { toggleFavorite, favorites } = useNewsModeStore();
  const isFavorite = favorites.some((article) => article.url === url);

  return (
    <div className="ml-1  mr-1 flex w-full max-w-7xl border-b-2 p-8">
      <div className="flex-1 pr-4">
        <div className="flex items-start justify-between">
          <Typography className="text-md font-semibold" style="h2">
            <a href={url} rel="noreferrer" target="_blank">
              {title}
            </a>
          </Typography>
          <Button
            className="ml-2 text-gray-400 hover:text-gray-600"
            icon={isFavorite ? RatingFilled : Heart}
            style="tertiary"
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
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <p className="mt-4 text-xs text-gray-400">
          {date} · {author}
        </p>
      </div>
      <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
        {imageUrl ? (
          <img
            alt="news"
            className="h-full w-full object-cover"
            src={imageUrl}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Card;
