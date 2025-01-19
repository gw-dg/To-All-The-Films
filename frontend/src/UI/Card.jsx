// import React, { useContext } from "react";
// import { IoIosAdd } from "react-icons/io";
// import { ListContext } from "../App";

// export default function Card() {
//   const { trendingMovieList, trendingTvList, setLoading } =
//     useContext(ListContext);
//   if (!trendingMovieList) return <div>Loading</div>;
//   return (
//     <div>
// <div className="card w-64 bg-base-300 rounded-md shadow-md">
//   <figure className="p-6">
//     <img
//       src="https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
//       alt="Pulp Fiction"
//       className="w-full rounded-lg"
//     />
//   </figure>
// </div>
// <div className="card-body p-4">
//   <div className="flex items-center gap-2">
//     <h2 className="card-title text-base">Pulp Fiction</h2>
//     <IoIosAdd className="w-5 h-7 cursor-pointer" />
//   </div>
//   <p className="text-sm opacity-70 -mt-2">Quentin Tarantino</p>
// </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { ListContext } from "../App";

export default function Card() {
  const { trendingMovieList, trendingTvList, setLoading } =
    useContext(ListContext);

  if (!trendingMovieList?.results) return <div>Loading</div>;

  return (
    <div className="ml-10 grid grid-cols-3 gap-x-2 gap-y-3 p-2 overflow-y-auto max-h-screen">
      {trendingMovieList.results.slice(0, 6).map((title) => (
        <div key={title.id} className="flex flex-col">
          {/* <div className="card bg-base-300 h-48 w-44  "></div> */}
          <figure className="p-2 ">
            <img
              src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
              className="h-48 rounded-lg w-36 object-cover"
              alt={title.name}
            />
          </figure>
          <div className="card-body p-2 -mt-3 w-36">
            <div className="flex items-center justify-between">
              <h2 className="card-title text-base break-words whitespace-normal flex-1 leading-tight">
                {title.name}
              </h2>
              <IoIosAdd className="flex-shrink-0 w-5 h-7 cursor-pointer" />
            </div>
            <p className="text-sm opacity-70 -mt-1 break-words whitespace-normal flex-1 leading-tight">
              {title.original_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
