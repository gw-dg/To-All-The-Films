import React, { useEffect, useContext } from "react";
import Avatar from "./Avatar";
import { ListContext, AuthContext } from "../App";
import axios from "axios";
import Card from "./Card";
import { IoIosAdd } from "react-icons/io";
import GenreCard from "./GenreCard";
import TabContent from "./TabContent";

export default function Body() {
  const {
    trendingMovieList,
    setTrendingMovieList,
    trendingTvList,
    setTrendingTvList,
  } = useContext(ListContext);

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    if (trendingMovieList?.results) return;

    const fetchTrendingMovies = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();

    // return () => setTrendingMovieList(null);
  }, [setLoading, setTrendingMovieList]);
  return (
    // Main container - min-height for larger screens, flex-grow for responsiveness
    <div className="min-h-screen relative flex md:flex-row">
      {/* Left panel - grows to fill available space, maintains minimum height on mobile */}
      <div className="flex-1 min-h-[500px] md:h-auto bg-base-200 p-4 flex flex-col">
        <span className="text-center text-xl font-montserrat mb-6">
          Discover
        </span>

        <div className="max-w-xs mx-auto w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow font-montserrat"
              placeholder="Search"
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
          <Card />
        </div>
        {/* Second carousel */}
        <div className="flex flex-col"></div>
      </div>
      <div className="mt-7 absolute left-1/2 transform -translate-x-1/2 z-40">
        <Avatar />
      </div>
      {/* Right panel with centered tabs and modified carousel layout */}
      <div className="flex-1 min-h-[500px] md:h-auto bg-base-300 p-4 flex flex-col">
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
