import React, { useEffect, useContext } from "react";
import Avatar from "./Avatar";
import { ListContext } from "../App";
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
    setLoading,
  } = useContext(ListContext);

  useEffect(() => {
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
        console.log(response.data);
        setTrendingMovieList(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();

    return () => setTrendingMovieList(null);
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
          {/* <span className="text-left pl-4 font-montserrat">Trending</span> */}
          {/* <div className="carousel carousel-center rounded-box max-w space-x-4 p-4">
            {[
              "photo-1559703248-dcaaec9fab78",
              "photo-1565098772267-60af42b81ef2",
              "photo-1572635148818-ef6fd45eb394",
              "photo-1494253109108-2e30c049369b",
              "photo-1550258987-190a2d41a8ba",
              "photo-1559181567-c3190ca9959b",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
            ].map((photo, index) => (
              <div key={index} className="carousel-item flex flex-col">
                <img
                  src={`https://img.daisyui.com/images/stock/${photo}.webp`}
                  className="rounded-box h-40 w-64 object-cover" // Added fixed dimensions and object-cover
                  alt={`Carousel image ${index + 1}`}
                />
                <p>yes</p>
              </div>
            ))}
          </div> */}

          <Card />
        </div>
        {/* Second carousel */}
        <div className="flex flex-col">
          {/* <span className="text-left pl-4 font-montserrat">
            Curated Titles For You
          </span> */}
          {/* <div className="-mt-6 carousel carousel-center rounded-box max-w space-x-4 p-4">
            {[
              "photo-1559703248-dcaaec9fab78",
              "photo-1565098772267-60af42b81ef2",
              "photo-1572635148818-ef6fd45eb394",
              "photo-1494253109108-2e30c049369b",
              "photo-1550258987-190a2d41a8ba",
              "photo-1559181567-c3190ca9959b",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
              "photo-1601004890684-d8cbf643f5f2",
            ].map((photo, index) => (
              <div key={index} className="carousel-item flex flex-col">
                <img
                  src={`https://img.daisyui.com/images/stock/${photo}.webp`}
                  className="rounded-box h-40 w-64 object-cover" // Added fixed dimensions and object-cover
                  alt={`Carousel image ${index + 1}`}
                />
                <p>yes</p>
              </div>
            ))}
          </div> */}
        </div>
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
        {/* <div className="flex flex-col items-center">
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab tab-lg flex-1 whitespace-nowrap"
              aria-label="Based on your taste"
            />
            <div role="tabpanel" className="tab-content p-4">
              <p>Content for "Based on your taste" goes here.</p>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab tab-lg flex-1 whitespace-nowrap"
              aria-label="Based on your mood"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-4">
              <p className="text-center mb-4">
                What would you like to watch today?
              </p>
              <GenreCard />
            </div>
          </div>

          {/* Tab content container */}
        {/* <div className="w-full mt-6">yes</div> }
        </div> */}
        {/* Centered tabs */}
        <div className="flex flex-col items-center">
          <TabContent />
        </div>
      </div>
    </div>
  );
}
