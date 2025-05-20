import React, { useState } from "react";

import { PageLoader } from "components/commons";
import { SearchComponent } from "components/commons/SearchComponent";
import { Typography, Pane, DatePicker, Button, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

const PaneComponent = ({
  isOpen,
  closePane,
  dateRange,
  setDateRange,
  setSearchKey,
  searchKey,
}) => {
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { t } = useTranslation();

  const handleSearch = () => setTriggerSearch(true);

  const handleSave = () => {
    try {
      setIsLoading(true);
      closePane();
      setDateRange(tempDateRange);
      handleSearch();
    } catch (error) {
      Toastr.error(t("error.genericError", { error }), {
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
      setTempDateRange([]);
    }
  };
  if (isLoading) return <PageLoader />;

  return (
    <div>
      <Pane isOpen={isOpen} onClose={closePane}>
        <Pane.Header>
          <Typography className="font-bold" style="h2">
            {t("label.news.filters")}
          </Typography>
        </Pane.Header>
        <Pane.Body className="flex flex-col items-start justify-start">
          <SearchComponent
            {...{ searchKey, setSearchKey, triggerSearch, setTriggerSearch }}
            triggerOnEnterKey={false}
          />
          <div className="mt-4 w-full">
            <DatePicker
              label={t("label.dateRange")}
              type="range"
              value={tempDateRange}
              onChange={setTempDateRange}
            />
          </div>
        </Pane.Body>
        <Pane.Footer>
          <Button
            className="hover:bg-black hover:text-white"
            label={t("modal.save")}
            style="tertiary"
            onClick={handleSave}
          />
          <Button
            className="hover:bg-black hover:text-white"
            label={t("modal.cancel")}
            style="tertiary"
            onClick={() => {
              closePane();
              setSearchKey("");
              setDateRange([]);
            }}
          />
        </Pane.Footer>
      </Pane>
    </div>
  );
};

export default PaneComponent;
