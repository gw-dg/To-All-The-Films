import React, { useContext, useEffect } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { ListContext, AuthContext, MiscContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function TitleCard() {
  const { particularGenreMovieList, setParticularGenreMovieList } =
    useContext(ListContext);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  const { setLoading } = useContext(AuthContext);
  const { andOr, selectedCards, currPage, setTotalPages } =
    useContext(MiscContext);
  useEffect(() => {
    // if (particularGenreMovieList?.results) return;

    const fetchTitles = async () => {
      // setLoading(true);
      try {
        const selectedIds = Object.keys(selectedCards)
          .filter((id) => selectedCards[id]) // Get keys with `true` values
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
        // console.log(url);
        setParticularGenreMovieList(response.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        // console.error("Error:", error.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchTitles();

    return () => setParticularGenreMovieList(null);
  }, [selectedCards, andOr, currPage]);
  if (
    !particularGenreMovieList?.results ||
    particularGenreMovieList.results.length === 0
  )
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
    <div className="flex-1 max-h-96 bg-base-300 overflow-y-scroll space-y-2 md:space-y-4">
      {particularGenreMovieList.results.map((title) => (
        <div
          key={title.id}
          className="card card-side bg-base-200 relative grid grid-cols-[100px_1fr] md:grid-cols-[150px_1fr]">
          <figure className="flex items-center justify-center">
            <a
              href={`/title/${title.id}`}
              target="_blank"
              rel="noopener noreferrer">
              <img
                src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
                alt={title.title}
                className="h-32 md:h-40 rounded-lg mt-2 mb-2 w-20 md:w-28 object-cover cursor-pointer"
                onClick={() => handleClick(title.id)}
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
                  onClick={() => handleClick(title.id)}>
                  <h2 className="card-title text-base md:text-xl cursor-pointer hover:text-secondary">
                    {title.title}
                  </h2>
                </a>
                {/* <button className="btn btn-sm btn-square">
                  <IoIosAdd className="w-5 h-5 " />
                </button> */}
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
