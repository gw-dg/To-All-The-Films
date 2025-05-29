import React, { useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { ListContext, AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Card({ trendingMovieList, number }) {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`/title/${id}`);
  };

  if (!trendingMovieList?.results) {
    return (
      <SkeletonTheme baseColor="#2a2e37" highlightColor="#404756">
        <div className="mx-auto grid grid-cols-3 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-4 p-2 overflow-y-auto max-h-screen">
          {[...Array(number || 6)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <figure className="p-2">
                <Skeleton
                  height={160}
                  width={112}
                  className="md:h-48 md:w-36 rounded-lg"
                />
              </figure>
              <div className="card-body p-2 -mt-3 w-28 md:w-36 text-left md:text-left">
                <div className="flex items-center justify-between">
                  <Skeleton height={20} width="80%" />
                </div>
                <Skeleton height={16} width="40%" />
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="mx-auto grid grid-cols-3 gap-x-3 gap-y-4 md:gap-x-12 md:gap-y-4 p-2 overflow-y-auto max-h-screen">
      {trendingMovieList.results.slice(0, number).map((title) => (
        <div key={title.id} className="flex flex-col">
          <figure className="p-2 ">
            <a
              href={`/title/${title.id}`}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
                className="rounded-lg h-40 md:h-48 w-28 md:w-36 object-cover cursor-pointer"
                alt={title.title}
                onClick={() => handleClick(title.id)}
              />
            </a>
          </figure>
          <div className="card-body p-2 -mt-3 w-28 md:w-36 text-left md:text-left">
            <div className="flex items-center justify-between">
              <a
                href={`/title/${title.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, title.id)}>
                <h2 className="card-title text-sm md:text-base  break-words whitespace-normal flex-1 leading-tight cursor-pointer hover:text-primary">
                  {title.title}
                </h2>
              </a>
            </div>
            <p className="text-xs md:text-sm opacity-70 -mt-1 break-words whitespace-normal flex-1 leading-tight">
              {title.release_date.split("-")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
