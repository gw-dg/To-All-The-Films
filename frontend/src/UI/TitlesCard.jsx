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
  const { andOr, selectedCards } = useContext(MiscContext);
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
        }/api/discover/movie?page=1&genreId=${selectedIds}&page=1`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        // console.log(url);
        setParticularGenreMovieList(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchTitles();

    return () => setParticularGenreMovieList(null);
  }, [selectedCards, andOr]);
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
    <div className="flex-1 max-h-96 bg-base-300 overflow-y-scroll space-y-4">
      {particularGenreMovieList.results.map((title) => (
        <div
          key={title.id}
          className="card card-side bg-base-200 relative grid grid-cols-[150px_1fr]">
          <figure className="flex items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${title.poster_path}`}
              alt={title.title}
              className="h-40 rounded-lg mt-2 mb-2 w-28 object-cover cursor-pointer"
              onClick={() => handleClick(title.id)}
            />
          </figure>
          {/* Rating Box */}
          <div className="bg-base-300 absolute top-4 right-4 px-3 py-1 rounded-lg">
            <span className="text-lg font-semibold">
              {title.vote_average.toFixed(1)}
            </span>
          </div>
          {/* Content section */}
          <div className="card-body py-4 pl-0">
            <div>
              <div className="flex items-center gap-2">
                <a onClick={() => handleClick(title.id)}>
                  <h2 className="card-title text-xl cursor-pointer hover:text-secondary">
                    {title.title}
                  </h2>
                </a>
                {/* <button className="btn btn-sm btn-square">
                  <IoIosAdd className="w-5 h-5 " />
                </button> */}
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
  );
}
