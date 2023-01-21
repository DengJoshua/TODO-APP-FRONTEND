import React from "react";
import _ from "lodash";

const Pagination = ({ todosCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(todosCount / pageSize);

  const pages = _.range(1, pagesCount + 1);
  return (
    <div className="flex justify-center space-x-1 mt-10 dark:text-gray-100">
      <button
        title="previous"
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800"
      >
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      {pages.map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400 ${
            page === currentPage
              ? "font-semibold border bg-violet-400 text-white border-violet-400"
              : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
