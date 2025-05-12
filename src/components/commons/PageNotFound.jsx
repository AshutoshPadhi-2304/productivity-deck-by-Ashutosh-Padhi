import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/3 max-w-full p-10">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Back to Kanban Board",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
