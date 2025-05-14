import React, { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

import PageLoader from "./PageLoader";

export const SearchComponent = ({ searchKey, setSearchKey }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tempSearchKey, setTempSearchKey] = useState(searchKey);
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setSearchKey(tempSearchKey);
      setTempSearchKey("");
    } catch (error) {
      console.log("Error at Search", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <Input
        placeholder="Search articles"
        prefix={<Search />}
        type="search"
        value={tempSearchKey}
        onChange={(event) => setTempSearchKey(event.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchComponent;
