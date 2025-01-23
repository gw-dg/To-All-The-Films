import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  FaStar,
  FaClock,
  FaCalendarAlt,
  FaHeart,
  FaShareAlt,
  FaPlayCircle,
  FaTimes,
  FaMusic,
  FaCamera,
  FaFilm,
  FaThumbsUp,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { AuthContext, ListContext } from "../App";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { loading, setLoading } = useContext(AuthContext);
  const { titleDetail, setTitleDetail, director, setDirector } =
    useContext(ListContext);

  useEffect(() => {
    // console.log(movieId);
    if (!movieId) {
      // console.log("movie id is undefined");
      return;
    }
    if (titleDetail?.id?.toString() === movieId?.toString()) {
      // console.log("Movie details already fetched. Skipping...");
      return;
    }
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/title/movie/${movieId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const dirArr = response.data?.credits?.crew?.filter(
          (member) => member.job === "Director"
        );

        if (dirArr && dirArr.length > 0) {
          console.log(dirArr[0].name);
          setDirector(dirArr[0].name);
        } else {
          setDirector("Unknown Director");
        }

        setTitleDetail(response.data);
      } catch (error) {
        console.log("Error fetching movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const [showTrailer, setShowTrailer] = useState(false);

  const soundtrack = [
    { title: "Time", artist: "Hans Zimmer", duration: "4:35" },
    { title: "Dream is Collapsing", artist: "Hans Zimmer", duration: "2:23" },
    { title: "528491", artist: "Hans Zimmer", duration: "2:23" },
  ];

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="min-h-screen bg-base-100">
          {/* Movie Banner Section */}
          <div className="relative h-[55vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${titleDetail.backdrop_path})`,
                transform: `translateY(${
                  typeof window !== "undefined" ? window.scrollY * 0.5 : 0
                }px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-end pb-8">
                <div className="flex gap-6 items-end">
                  {/* Poster */}
                  <div className="ml-20 hidden md:block w-48 h-72 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${titleDetail.poster_path}`}
                      alt="Movie Poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Title and Quick Info */}
                  <div className="flex-1 text-base-content space-y-4">
                    <h1 className="text-4xl font-serif italic">
                      {titleDetail?.title}
                    </h1>
                    <div className="flex justify-start items-center font-montserrat">
                      <p className="text-xl opacity-70 underline">
                        {titleDetail?.original_title}
                      </p>
                      <p className="text-xl opacity-70 ml-2 mr-2">
                        directed by
                      </p>
                      <p className="text-xl opacity-70 underline">{director}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {titleDetail?.genres?.map((genre) => (
                        <div key={genre.id} className="badge badge-outline">
                          {genre.name}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm items-center">
                      <div className="flex items-center gap-1">
                        <FaStar className="w-4 h-4 text-warning" />
                        <span>{titleDetail?.vote_average?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-4 h-4" />
                        <span>
                          {Math.floor(titleDetail?.runtime / 60)}h{" "}
                          {titleDetail?.runtime % 60}m
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>
                          {new Date(titleDetail?.release_date).getFullYear()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowTrailer(true)}>
                        <FaPlayCircle className="w-4 h-4" />
                        Watch Trailer
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <FaHeart className="w-4 h-4" />
                        Add to Watchlist
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <FaShareAlt className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Content */}
          <div className="container mx-auto px-4 py-12 max-w-screen">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8 ml-40">
                {/* Overview */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-serif italic">Overview</h2>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {titleDetail?.overview}
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Trailer Modal */}
          {showTrailer && (
            <div className="modal modal-open">
              <div className="modal-box max-w-4xl p-0 overflow-hidden bg-base-300">
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${titleDetail?.videos?.results[0]?.key}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
                <button
                  className="btn btn-sm btn-circle absolute top-2 right-2"
                  onClick={() => setShowTrailer(false)}>
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieDetail;
