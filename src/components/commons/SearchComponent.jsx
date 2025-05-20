import React, { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Input, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import PageLoader from "./PageLoader";

export const SearchComponent = ({
  setSearchKey,
  triggerOnEnterKey = true,
  triggerSearch,
  setTriggerSearch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tempSearchKey, setTempSearchKey] = useState("");

  const { t } = useTranslation();

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setSearchKey(tempSearchKey);
    } catch (error) {
      Toastr.error(t("error.genericError", { error }), {
        autoClose: 2000,
      });
    } finally {
      setTempSearchKey("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (triggerSearch) {
      handleSearch();
      setTriggerSearch(false);
    }
  }, [triggerSearch, setTriggerSearch]);

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <Input
        placeholder={t("placeholder.search", { label: "articles" })}
        prefix={<Search />}
        type="search"
        value={tempSearchKey}
        onChange={(event) => setTempSearchKey(event.target.value)}
        onKeyDown={(event) =>
          triggerOnEnterKey && event.key === "Enter" && handleSearch()
        }
      />
      <ToastContainer />
    </div>
  );
};

export default SearchComponent;
