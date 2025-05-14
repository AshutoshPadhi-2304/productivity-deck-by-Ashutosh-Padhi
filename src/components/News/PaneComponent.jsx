import React, { useState } from "react";

import { PageLoader } from "components/commons";
import { SearchComponent } from "components/commons/SearchComponent";
import { Typography, Pane, DatePicker, Button } from "neetoui";

const PaneComponent = ({
  isOpen,
  closePane,
  dateRange,
  setDateRange,
  setSearchKey,
  searchKey,
}) => {
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const [tempSearchKey, setTempSearchKey] = useState(searchKey);

  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    try {
      setIsLoading(true);
      closePane();
      setDateRange(tempDateRange);
      setSearchKey(tempSearchKey);
      setTempDateRange([]);
    } catch (error) {
      console.log("Error while searching at Pane component: ", error);
    } finally {
      setIsLoading(false);
      setTempSearchKey("");
    }
  };
  if (isLoading) return <PageLoader />;

  return (
    <div>
      <Pane isOpen={isOpen} onClose={closePane}>
        <Pane.Header>
          <Typography className="font-bold" style="h2">
            Filters
          </Typography>
        </Pane.Header>
        <Pane.Body className="flex flex-col items-start justify-start">
          <SearchComponent
            searchKey={tempSearchKey}
            setSearchKey={setTempSearchKey}
          />
          <div className="w-full">
            <DatePicker
              label="Date range"
              type="range"
              value={tempDateRange}
              onChange={setTempDateRange}
            />
          </div>
        </Pane.Body>
        <Pane.Footer>
          <Button
            className="hover:bg-black hover:text-white"
            label="Save"
            style="tertiary"
            onClick={handleSave}
          />
          <Button
            className="hover:bg-black hover:text-white"
            label="Cancel"
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
