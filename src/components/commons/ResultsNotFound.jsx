import { NoData } from "neetoui";
import { is } from "ramda";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "routes";

const ResultsNotFound = ({ label, resetFilters, refetch }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-20 mr-10">
      <Link to={routes.news}>
        <NoData
          title={label}
          primaryButtonProps={{
            label: t("label.resultsNotFound", { label: "news" }),
            className: "bg-neutral-800 hover:bg-neutral-950",
            onClick: () => {
              if (is(Function, resetFilters)) resetFilters();

              if (is(Function, refetch)) refetch();
            },
          }}
        />
      </Link>
    </div>
  );
};

export default ResultsNotFound;
