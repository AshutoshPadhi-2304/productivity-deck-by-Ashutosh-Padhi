import { NoData } from "neetoui";
import { Link } from "react-router-dom";

const ResultsNotFound = ({ label, fetchNews }) => (
  <div className="absolute left-1/3 max-w-full p-10">
    <Link to="/news">
      <NoData
        title={label}
        primaryButtonProps={{
          label: `Search news`,
          className: "bg-neutral-800 hover:bg-neutral-950",
          onClick: fetchNews,
        }}
      />
    </Link>
  </div>
);

export default ResultsNotFound;
