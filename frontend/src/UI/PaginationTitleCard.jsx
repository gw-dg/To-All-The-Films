import React from "react";

export default function PaginationTitleCard({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const getPagination = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    }

    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= 5 && currentPage <= totalPages - 4) {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
  };

  const pagination = getPagination();
  return (
    <div>
      <div className="join">
        <button
          className={`join-item btn btn-sm ${
            currentPage === 1 ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}>
          «
        </button>
        {pagination.map((page, index) => {
          if (page === "...")
            return (
              <button className={`font-bold join-item btn btn-disabled btn-sm`}>
                ...
              </button>
            );
          else if (currentPage === page)
            return (
              <button className="join-item btn btn-active btn-sm">
                {page}
              </button>
            );
          else
            return (
              <button
                className="join-item btn btn-sm"
                onClick={() => onPageChange(page)}>
                {page}
              </button>
            );
        })}
        <button
          className={`join-item btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}>
          »
        </button>
      </div>
    </div>
  );
}
