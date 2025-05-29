import React, { useContext, useEffect } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { ListContext, AuthContext, MiscContext } from "../App";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TitleCard() {
  const { particularGenreMovieList, setParticularGenreMovieList } =
    useContext(ListContext);

  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`/title/${id}`);
  };

  const { setLoading } = useContext(AuthContext);
  const { andOr, selectedCards, currPage, setTotalPages } =
    useContext(MiscContext);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const selectedIds = Object.keys(selectedCards)
          .filter((id) => selectedCards[id])
          .join(andOr === "or" ? "|" : ",");

        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/discover/movie?page=${currPage}&genreId=${selectedIds}&page=1`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setParticularGenreMovieList(response.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        // console.error("Error:", error.message);
      }
    };
    fetchTitles();

    return () => setParticularGenreMovieList(null);
  }, [selectedCards, andOr, currPage]);

  if (
    !particularGenreMovieList?.results ||
    particularGenreMovieList.results.length === 0
  ) {
    return (
      <SkeletonTheme baseColor="#2a2e37" highlightColor="#404756">
        <div className="w-full h-96 bg-base-300 overflow-y-scroll space-y-2 md:space-y-4 px-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="card card-side bg-base-200 relative w-full grid grid-cols-[100px_1fr] md:grid-cols-[150px_1fr]">
              <figure className="flex items-center justify-center pl-2 md:pl-4">
                <Skeleton
                  height={128}
                  width={80}
                  className="md:h-40 md:w-28 rounded-lg mt-2 mb-2"
                />
              </figure>
              {/* Rating Box Skeleton */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4">
                <Skeleton height={24} width={40} className="rounded-lg" />
              </div>
              {/* Content section */}
              <div className="card-body py-2 md:py-4 pl-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton height={24} width="70%" />
                  </div>
                  <Skeleton height={16} width="30%" className="mt-1" />
                  <div className="mt-2 md:mt-4">
                    <Skeleton count={2} height={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="w-full h-96 bg-base-300 overflow-y-scroll space-y-2 md:space-y-4 px-4">
      {particularGenreMovieList.results.map((title) => (
        <div
          key={title.id}
          className="card card-side bg-base-200 relative w-full grid grid-cols-[100px_1fr] md:grid-cols-[150px_1fr]">
          <figure className="flex items-center justify-center">
            <a
              href={`/title/${title.id}`}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                alt={title.title}
                className="h-32 md:h-40 rounded-lg mt-2 mb-2 w-20 md:w-28 object-cover cursor-pointer"
                onClick={(e) => handleClick(e, title.id)}
              />
            </a>
          </figure>
          {/* Rating Box */}
          <div className="bg-base-300 absolute top-2 md:top-4 right-2 md:right-4 px-2 md:px-3 py-1 rounded-lg">
            <span className="text-sm md:text-lg font-semibold">
              {title.vote_average.toFixed(1)}
            </span>
          </div>
          {/* Content section */}
          <div className="card-body py-2 md:py-4 pl-0">
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={`/title/${title.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleClick(e, title.id)}>
                  <h2 className="card-title text-base md:text-xl cursor-pointer hover:text-secondary">
                    {title.title}
                  </h2>
                </a>
              </div>
              <p className="text-xs md:text-sm opacity-70 break-words whitespace-normal flex-1 leading-tight">
                {title.release_date.split("-")[0]}
              </p>
              <p className="mt-2 md:mt-4 text-base-content/70 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                {title.overview}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
