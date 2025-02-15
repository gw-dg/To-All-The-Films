import React, { useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { ListContext, AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const { trendingMovieList, trendingTvList } = useContext(ListContext);
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  if (!trendingMovieList?.results) return <div>Loading</div>;

  return (
    <div className="ml-10 grid grid-cols-3 gap-x-2 gap-y-3 p-2 overflow-y-auto max-h-screen">
      {trendingMovieList.results.slice(0, 6).map((title) => (
        <div key={title.id} className="flex flex-col">
          {/* <div className="card bg-base-300 h-48 w-44  "></div> */}
          <figure className="p-2 ">
            <img
              src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
              className="h-48 rounded-lg w-36 object-cover cursor-pointer"
              alt={title.title}
              onClick={() => handleClick(title.id)}
            />
          </figure>
          <div className="card-body p-2 -mt-3 w-36">
            <div className="flex items-center justify-between">
              <a onClick={() => handleClick(title.id)}>
                <h2 className="card-title text-base break-words whitespace-normal flex-1 leading-tight cursor-pointer hover:text-primary">
                  {title.title}
                </h2>
              </a>
              <IoIosAdd className="flex-shrink-0 w-5 h-7 cursor-pointer hover:text-success" />
            </div>
            <p className="text-sm opacity-70 -mt-1 break-words whitespace-normal flex-1 leading-tight">
              {title.release_date.split("-")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
