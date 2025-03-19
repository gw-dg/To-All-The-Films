import React, { useEffect, useContext, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MovieRecommendations() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };
  const [recommendedMovieList, setRecommendedMovieList] = useState({});

  useEffect(() => {
    if (recommendedMovieList?.results) return;

    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recommendations`,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        setRecommendedMovieList(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTrendingMovies();

    // return () => setRecommendedMovieList(null);
  }, []);

  if (!recommendedMovieList?.recommendations)
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div>
      <div className="mx-auto grid grid-cols-2 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-4 p-2 overflow-y-auto scrollbar-hide max-h-screen">
        {recommendedMovieList?.recommendations.map((title) => (
          <div key={title.movieId} className="flex flex-col">
            {/* <div className="card bg-base-300 h-48 w-44  "></div> */}
            <figure className="p-2 ">
              <a
                href={`/title/${title.movieId}`}
                target="_blank"
                rel="noopener noreferrer">
                <img
                  src={`https://image.tmdb.org/t/p/w400${title.metadata.backdrop_path}`}
                  className="rounded-lg h-32 md:h-40 w-64 md:w-80 object-cover cursor-pointer"
                  alt={title.metadata.title}
                  onClick={(e) => {
                    handleClick(title.movieId);
                  }}
                />
              </a>
            </figure>
            <div className="card-body p-2 -mt-3 w-40 md:w-52 text-left">
              <div className="flex items-center justify-between">
                <a
                  href={`/title/${title.movieId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick(title.movieId)}>
                  <h2 className="card-title text-sm md:text-sm break-keep font-sans whitespace-pre-line leading-tight cursor-pointer hover:text-primary">
                    {title.metadata.title
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h2>
                </a>
              </div>
              <p className="text-xs md:text-sm opacity-70 -mt-2 break-words whitespace-normal leading-tight">
                {title.metadata.release_date.split("-")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
