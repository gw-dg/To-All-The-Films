import React from "react";

export default function PaginationTitleCard({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const getPagination = () => {
    // For mobile, show fewer pagination items
    const isMobile = window.innerWidth < 768;

    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    }

    if (isMobile) {
      // Simplified pagination for mobile
      if (currentPage < 3) {
        return [1, 2, 3, "...", totalPages];
      } else if (currentPage >= 3 && currentPage <= totalPages - 2) {
        return [1, "...", currentPage, "...", totalPages];
      } else {
        return [1, "...", totalPages - 2, totalPages - 1, totalPages];
      }
    } else {
      // Desktop pagination
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
    }
  };

  const pagination = getPagination();
  return (
    <div>
      <div className="join">
        <button
          className={`join-item btn btn-xs lg:btn-sm ${
            currentPage === 1 ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}>
          «
        </button>
        {pagination.map((page, index) => {
          if (page === "...")
            return (
              <button
                key={`ellipsis-${index}`}
                className={`font-bold join-item btn btn-disabled btn-xs lg:btn-sm`}>
                ...
              </button>
            );
          else if (currentPage === page)
            return (
              <button
                key={page}
                className="join-item btn btn-active btn-xs lg:btn-sm">
                {page}
              </button>
            );
          else
            return (
              <button
                key={page}
                className="join-item btn btn-xs lg:btn-sm"
                onClick={() => onPageChange(page)}>
                {page}
              </button>
            );
        })}
        <button
          className={`join-item btn btn-xs lg:btn-sm ${
            currentPage === totalPages ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}>
          »
        </button>
      </div>
    </div>
  );
}
