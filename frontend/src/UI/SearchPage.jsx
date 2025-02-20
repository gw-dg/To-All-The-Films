import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";

export default function SearchPage() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  const { searchQuery, page } = useParams();
  const [searchResults, setSearchResults] = useState({});
  const [searchInput, setSeachInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(Number(page) || 1);

  useEffect(() => {
    // if (searchResults?.results) return;
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/search/${searchQuery}/${currPage}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (searchQuery) {
          setSearchResults(response.data);
          setTotalPages(response.data.total_pages);
        }
      } catch (error) {
        // console.error("Error:", error.message);
      }
    };
    fetchSearchResults();
  }, [searchQuery, currPage]);

  const handleInputChange = (e) => {
    setSeachInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchInput}/1`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Input */}
      <div className="max-w-5xl w-full mt-4 mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow font-montserrat"
            value={searchInput}
            placeholder="Search"
            onChange={handleInputChange}
            onKeyDown={handleEnter}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* Search Results Container */}
      <div className="max-w-5xl w-full flex flex-col">
        {!searchResults?.results?.length ? (
          <div className="text-center text-gray-500 font-montserrat">
            No Results Found for {searchQuery}
          </div>
        ) : (
          <>
            <div className="font-montserrat mb-2">
              Search Results for {searchQuery}
            </div>

            <div className="grid gap-4">
              {searchResults?.results?.map((title) => (
                <div
                  key={title.id}
                  className="card card-side grid grid-cols-[150px_1fr]">
                  {/* Movie Poster */}
                  <figure className="flex items-center justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                      alt={title.title}
                      className="h-40 rounded-lg mt-2 mb-2 w-28 object-cover cursor-pointer"
                      onClick={() => handleClick(title.id)}
                    />
                  </figure>

                  {/* Movie Info */}
                  <div className="card-body py-4 pl-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <a onClick={() => handleClick(title.id)}>
                          <h2 className="card-title text-xl cursor-pointer hover:text-secondary">
                            {title.title}
                          </h2>
                        </a>
                      </div>
                      <p className="text-sm opacity-70">
                        {title.release_date.split("-")[0]}
                      </p>
                      <p className="mt-4 text-base-content/70 text-sm line-clamp-3">
                        {title.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 mb-6 w-full">
          <Pagination
            totalPages={totalPages}
            currentPage={currPage}
            onPageChange={setCurrPage}
            title={searchQuery}
          />
        </div>
      )}
    </div>
  );
}
