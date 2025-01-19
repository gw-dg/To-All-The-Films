import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Preferences() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Romance",
    "Science Fiction",
    "Documentary",
    "Animation",
  ];

  return (
    <div className="min-h-screen bg-base-100 px-4 py-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif italic">Tell us what you love</h1>
          <p className="text-gray-600 text-sm">
            Help us understand your taste in cinema
          </p>
        </div>

        {/* Favorite Directors */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic">Favorite Directors</h2>
          <div className="card bg-base-200 p-6">
            <div className="space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for directors..."
                  className="input input-bordered pl-10 w-full text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-secondary text-sm">
                  Christopher Nolan
                </div>
                <div className="badge badge-secondary text-sm">
                  Martin Scorsese
                </div>
                <div className="badge badge-secondary text-sm">
                  Quentin Tarantino
                </div>
                <button className="btn btn-outline btn-sm text-sm">
                  + Add Director
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Actors */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic">Favorite Actors</h2>
          <div className="card bg-base-200 p-6">
            <div className="space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for actors..."
                  className="input input-bordered pl-10 w-full text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="badge badge-secondary text-sm">
                  Leonardo DiCaprio
                </div>
                <div className="badge badge-secondary text-sm">Tom Hanks</div>
                <div className="badge badge-secondary text-sm">
                  Meryl Streep
                </div>
                <button className="btn btn-outline btn-sm text-sm">
                  + Add Actor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic">Preferred Genres</h2>
          <div className="card bg-base-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`btn w-full text-sm ${
                    selectedGenres.includes(genre)
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  onClick={() => {
                    setSelectedGenres((prev) =>
                      prev.includes(genre)
                        ? prev.filter((g) => g !== genre)
                        : [...prev, genre]
                    );
                  }}>
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Era Preferences */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic">Preferred Eras</h2>
          <div className="card bg-base-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="btn btn-outline w-full text-sm">
                Classics (Pre-1960)
              </button>
              <button className="btn btn-outline w-full text-sm">
                New Wave (1960-1979)
              </button>
              <button className="btn btn-outline w-full text-sm">
                Modern (1980-1999)
              </button>
              <button className="btn btn-outline w-full text-sm">
                Contemporary (2000+)
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button className="btn btn-primary btn-lg px-8 text-sm">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
