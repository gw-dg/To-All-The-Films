import React, { useState, useContext } from "react";
import GenreCard from "./GenreCard";
import TitleCard from "./TitlesCard";
import { MiscContext } from "../App";
import Pagination from "./Pagination";
import PaginationTitleCard from "./PaginationTitleCard";

const TabContent = () => {
  const [activeTab, setActiveTab] = useState("mood");
  const { andOr, setAndOr, currPage, setCurrPage, totalPages } =
    useContext(MiscContext);

  const handleToggle = (e) => {
    if (e.target.checked) setAndOr("or");
    else setAndOr("and");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Tab headers */}
      <div className="flex mb-8 [&>*]:mx-0">
        <button
          onClick={() => setActiveTab("taste")}
          className={`flex-1 pb-2 text-base uppercase tracking-wide font-medium ${
            activeTab === "taste"
              ? "border-b border-primary text-base-content" // For active tab
              : "text-base-content/50" // For inactive tab - removed border
          }`}>
          Based on my taste
        </button>
        <button
          onClick={() => setActiveTab("mood")}
          className={`flex-1 pb-2 text-base uppercase tracking-wide font-medium transition-colors ${
            activeTab === "mood"
              ? "border-b border-primary text-base-content"
              : "text-base-content/50"
          }`}>
          Based on my mood
        </button>
      </div>

      {/* Content area */}
      <div className="mt-6 h-full">
        {activeTab === "taste" && (
          <div className="text-center">
            <p>Based on your taste content goes here</p>
          </div>
        )}

        {activeTab === "mood" && (
          <div className="h-full">
            <div className="flex flex-row justify-between">
              <h2 className="text-sm text-start ml-4">
                What would you like to watch today?
              </h2>
              <div className="flex flex-row gap-x-2">
                <label className="text-sm">AND</label>
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  defaultChecked={andOr === "or"}
                  onChange={handleToggle}
                />
                <label className="text-sm">OR</label>
              </div>
            </div>
            <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-y-2 w-full">
              <GenreCard />
              <TitleCard />
              <PaginationTitleCard
                totalPages={totalPages}
                currentPage={currPage}
                onPageChange={setCurrPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
