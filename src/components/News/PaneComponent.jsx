import React from "react";

import { SearchComponent } from "components/commons/SearchComponent";
import { Typography, Pane, DatePicker, Button } from "neetoui";

const PaneComponent = ({
  isOpen,
  closePane,
  confirmPane,
  dateRange,
  setDateRange,
}) => (
  <div>
    <Pane isOpen={isOpen} onClose={closePane}>
      <Pane.Header>
        <Typography className="font-bold" style="h2">
          Filters
        </Typography>
      </Pane.Header>
      <Pane.Body className="flex flex-col items-start justify-start">
        <SearchComponent />
        <div className="w-full">
          <DatePicker
            label="Date range"
            type="range"
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </Pane.Body>
      <Pane.Footer>
        <Button
          className="hover:bg-black hover:text-white"
          label="Save"
          style="tertiary"
          onClick={confirmPane}
        />
        <Button
          className="hover:bg-black hover:text-white"
          label="Cancel"
          style="tertiary"
          onClick={closePane}
        />
      </Pane.Footer>
    </Pane>
  </div>
);

export default PaneComponent;
