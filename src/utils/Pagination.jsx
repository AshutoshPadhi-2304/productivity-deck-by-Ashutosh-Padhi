import React from "react";

import { Button } from "neetoui";

const Pagination = ({
  totalArticles,
  articlesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, i) => (
        <Button
          key={i}
          style="tertiary"
          className={`gap-x-2 hover:bg-black hover:text-white ${
            currentPage === page ? "bg-gray-700" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
