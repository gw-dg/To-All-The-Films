import React, { useEffect, useContext, useState } from "react";
import Avatar from "./Avatar";
import { ListContext, AuthContext } from "../App";
import axios from "axios";
import Card from "./Card";
import { IoIosAdd } from "react-icons/io";
import GenreCard from "./GenreCard";
import TabContent from "./TabContent";
import { useNavigate } from "react-router-dom";

export default function Body() {
  const [trendingMovieList, setTrendingMovieList] = useState({});
  const [searchQuery, setSeachQuery] = useState("");
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };
  const { setLoading } = useContext(AuthContext);
  // const [searchResults, setSearchResults] = useState({});
  useEffect(() => {
    if (trendingMovieList?.results) return;

    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/trending/movie`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setTrendingMovieList(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTrendingMovies();

    // return () => setTrendingMovieList(null);
  }, [setTrendingMovieList]);

  const handleInputChange = (e) => {
    setSeachQuery(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleNavigation(`/search/${searchQuery.trim()}/1`);
      // console.log(searchQuery);
    }
  };

  return (
    // Main container - Flex direction column for mobile, row for desktop
    <div className="min-h-screen relative flex flex-col lg:flex-row">
      {/* Left panel - takes full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 lg:flex-1 lg:h-auto  bg-base-200 p-4 flex flex-col">
        <span className="text-center text-xl font-montserrat mb-6">
          Discover
        </span>

        <div className="max-w-xs mx-auto w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow font-montserrat"
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

        <div className="mt-5 flex flex-col">
          <Card trendingMovieList={trendingMovieList} />
        </div>
        {/* Second carousel */}
        <div className="flex flex-col"></div>
      </div>

      <div className="hidden lg:block lg:mt-7 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:z-40">
        <Avatar />
      </div>

      {/* Right panel - takes full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 md:flex-1 lg:flex-1  bg-base-300 p-4 flex flex-col">
        {/* Header with centered text */}
        <span className="text-center text-xl font-montserrat mb-6">
          Movies for you
        </span>

        {/* Centered tabs */}
        <div className="flex flex-col items-center">
          <TabContent />
        </div>
      </div>
    </div>
  );
}
