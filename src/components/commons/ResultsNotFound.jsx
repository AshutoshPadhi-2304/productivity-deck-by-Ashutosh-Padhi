import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "routes";

const ResultsNotFound = ({ label, resetFilters }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-20 mr-10">
      <Link to={routes.news}>
        <NoData
          title={label}
          primaryButtonProps={{
            label: t("label.resultsNotFound", { label: "news" }),
            className: "bg-neutral-800 hover:bg-neutral-950",
            onClick: resetFilters,
          }}
        />
      </Link>
    </div>
  );
};

export default ResultsNotFound;
