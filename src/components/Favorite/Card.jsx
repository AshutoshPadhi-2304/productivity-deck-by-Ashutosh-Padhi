import React, { useState } from "react";

import { ModalComponent } from "components/commons";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Textarea, Typography } from "neetoui";
import useNewsModeStore from "stores/useNewsModeStore";

const Card = ({ title, url }) => {
  const { toggleFavorite, favorites, setFavoriteNote } = useNewsModeStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");

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
                Remove
              </Dropdown.MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <ModalComponent
            closeModal={() => setShowModal(false)}
            confirmMessage="Delete"
            isOpen={showModal}
            label="Remove from favorite"
            confirmModal={() => {
              toggleFavorite(favoriteArticle);
              setShowModal(false);
            }}
          />
        </div>
        <Textarea
          placeholder="Add a note"
          size="small"
          value={favoriteArticle?.note || note}
          onChange={(e) => {
            setNote(e.target.value);
            setFavoriteNote(url, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
