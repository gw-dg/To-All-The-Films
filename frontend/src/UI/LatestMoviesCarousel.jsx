import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import genreMap from "../utils/GenreName";
import { MiscContext } from "../App";

export default function LatestMoviesCarousel({ trendingMovieList, number }) {
  // useEffect(() => {
  //   // console.log("Selected Cards:", selectedCards);
  // }, [selectedCards]);

  if (!trendingMovieList?.results)
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
    <div className="carousel carousel-center rounded-box space-x-4 p-2 md:p-4 overflow-x-auto max-w-full md:w-11/12 lg:max-w-7xl">
      {trendingMovieList.results.map((title) => (
        <div
          key={title.id}
          className="carousel-item flex-shrink-0 cursor-pointer relative"
          onClick={() => toggleSelected(title.id)}>
          <div className="card h-40 md:h-48 w-28 md:w-36 rounded-md shadow-md overflow-hidden">
            <figure className="w-full h-full">
              <img
                src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                alt={title.title}
              />
            </figure>
          </div>
        </div>
      ))}
    </div>
  );
}
