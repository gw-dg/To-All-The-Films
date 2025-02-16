import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState({});
  const [searchInput, setSeachInput] = useState("");
  useEffect(() => {
    // if (searchResults?.results) return;
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/search/${searchQuery}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (searchQuery) setSearchResults(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSeachInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="max-w-5xl mt-4 mb-4 mx-auto w-full">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow font-montserrat"
            value={searchInput}
            placeholder="Search"
            onChange={(e) => handleInputChange(e)}
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
      <div className="flex flex-col justify-center items-start max-w-5xl space-y-4">
        {!searchResults?.results?.length ? (
          <div className="font-montserrat">
            No Results Found for {searchQuery}
          </div>
        ) : (
          <>
            <div className="font-montserrat">
              Search Results for {searchQuery}
            </div>
            <div className="flex-1 max-h-96 space-y-4">
              {searchResults?.results?.map((title) => (
                <div
                  key={title.id}
                  className="card card-side  relative grid grid-cols-[150px_1fr]">
                  <figure className="flex items-center justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                      alt={title.title}
                      className="h-40 rounded-lg mt-2 mb-2 w-28 object-cover cursor-pointer"
                      onClick={() => handleClick(title.id)}
                    />
                  </figure>
                  {/* Content section */}
                  <div className="card-body py-4 pl-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <a onClick={() => handleClick(title.id)}>
                          <h2 className="card-title text-xl cursor-pointer hover:text-secondary">
                            {title.title}
                          </h2>
                        </a>
                      </div>
                      <p className="text-sm opacity-70 break-words whitespace-normal flex-1 leading-tight">
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
    </div>
  );
}
