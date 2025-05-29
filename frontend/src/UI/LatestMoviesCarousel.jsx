import React from "react";

export default function LatestMoviesCarousel({ trendingMovieList }) {
  if (!trendingMovieList?.results)
    return (
      <div className="flex items-center justify-center">
        <div className="flex gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-red-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      {/* Grid Layout for Mobile & Tablet */}
      <div className="lg:hidden">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {trendingMovieList.results.slice(0, 6).map((title) => (
            <div key={title.id} className="cursor-pointer group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={title.title || title.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Layout for Large Screens */}
      <div className="hidden lg:block">
        <div className="carousel carousel-center rounded-box space-x-4 p-4 overflow-x-auto max-w-7xl mx-auto">
          {trendingMovieList.results.map((title) => (
            <div
              key={title.id}
              className="carousel-item flex-shrink-0 cursor-pointer group">
              <div className="card h-48 w-36 rounded-md shadow-md overflow-hidden">
                <figure className="w-full h-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${title.poster_path}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={title.title || title.name}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
