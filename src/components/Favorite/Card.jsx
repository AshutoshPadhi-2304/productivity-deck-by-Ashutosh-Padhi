import React, { useState } from "react";

import { ModalComponent } from "components/commons";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Textarea, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useNewsModeStore from "stores/useNewsModeStore";

const Card = ({ title, url }) => {
  const { toggleFavorite, favorites, setFavoriteNote } = useNewsModeStore();

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");

  const { t } = useTranslation();

  const favoriteArticle = favorites.find((article) => article.url === url);

  return (
    <div className="ml-1  mr-1 flex w-full max-w-7xl border-b-2 p-8">
      <div className="flex-1 pr-4">
        <div className="flex items-start justify-between">
          <Typography className="text-md font-semibold" style="h2">
            <a href={url} rel="noreferrer" target="_blank">
              {title}
            </a>
          </Typography>
          <Dropdown buttonStyle="tertiary" icon={MenuHorizontal}>
            <Dropdown.Menu>
              <Dropdown.MenuItem onClick={() => setShowModal(true)}>
                {t("favorite.dropdown.remove")}
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <ModalComponent
            closeModal={() => setShowModal(false)}
            confirmMessage={t("favorite.modal.delete")}
            isOpen={showModal}
            label={t("favorite.modal.removeFromFavorite")}
            confirmModal={() => {
              toggleFavorite(favoriteArticle);
              setShowModal(false);
            }}
          />
        </div>
        <Textarea
          placeholder={t("favorite.addNote")}
          size="small"
          value={favoriteArticle?.note || note}
          onChange={(event) => {
            setNote(event.target.value);
            setFavoriteNote(url, event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
