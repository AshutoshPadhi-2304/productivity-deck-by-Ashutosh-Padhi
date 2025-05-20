import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute left-1/3 mt-64 max-w-full p-10">
      <NoData
        title={t("title.pageNotFound")}
        primaryButtonProps={{
          label: t("label.pageNotFound"),
          className: "bg-neutral-800 hover:bg-neutral-950",
          to: routes.root,
        }}
      />
    </div>
  );
};
export default PageNotFound;
