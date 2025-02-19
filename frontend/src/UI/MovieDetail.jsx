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
  FaEye,
  FaPlus,
  FaBookmark,
} from "react-icons/fa";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import LoadingPage from "../utils/Loading";

import { useParams } from "react-router-dom";
import { AuthContext, ListContext } from "../App";
import { useNavigate } from "react-router-dom";
import LogMovieModal from "./LogMovieModal";
// import { Calendar } from "react-datetime-picker";
import { Toaster, toast } from "sonner";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { isLoggedIn, loading, setLoading } = useContext(AuthContext);
  const { titleDetail, setTitleDetail, director, setDirector, cast, setCast } =
    useContext(ListContext);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  const favoriteMovie = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/favorite`,
        {
          titleId: movieId,
          title: titleDetail?.title,
          posterPath: titleDetail?.poster_path,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`${titleDetail?.title} added to favorites!`, {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      toast.error(
        `Failed to favorite ${titleDetail?.title}. Please try again.`,
        {
          position: "bottom-right",
          duration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    if (!movieId) {
      return;
    }
    if (titleDetail?.id?.toString() === movieId?.toString()) {
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
          setDirector(dirArr[0].name);
        } else {
          setDirector("Unknown Director");
        }
        setCast(response.data?.credits?.cast?.slice(0, 10));
        setTitleDetail(response.data);
      } catch (error) {
        console.log("Error fetching movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <Toaster />
          <div className="min-h-screen bg-base-100">
            {/* Movie Banner Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
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
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-end max-w-4xl w-full">
                    {/* Poster */}
                    <div className="w-48 h-72 rounded-lg overflow-hidden shadow-lg md:mb-0">
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
                        <p className="text-xl opacity-90 underline">
                          {titleDetail?.original_title}
                        </p>
                        <p className="text-xl opacity-90 ml-2 mr-2">
                          directed by
                        </p>
                        <p className="text-xl opacity-90 underline">
                          {director}
                        </p>
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
                            {titleDetail?.runtime
                              ? `${Math.floor(titleDetail.runtime / 60)}h ${
                                  titleDetail.runtime % 60
                                }m`
                              : "N/A"}
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
                        {isLoggedIn && (
                          <>
                            <button
                              className="btn btn-outline btn-sm "
                              onClick={() => setShowAddMovie(true)}
                              disabled={!titleDetail?.id}>
                              <FaPlus className="w-4 h-4" />
                              Add
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={() => favoriteMovie()}>
                              <FaHeart className="w-4 h-4" />
                              Favorite
                            </button>
                          </>
                        )}
                        <button className="btn btn-outline btn-sm">
                          <FaBookmark className="w-4 h-4" />
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
              <div className="grid md:grid-cols-3 gap-12 justify-center">
                {/* Main Content - Now centered */}
                <div className="md:col-span-3 space-y-8 flex flex-col items-center">
                  {/* Overview */}
                  <section className="space-y-4 max-w-4xl">
                    <h2 className="text-xl font-montserrat">
                      {titleDetail?.tagline}
                    </h2>
                    <p className="text-base-content/70 text-sm leading-relaxed">
                      {titleDetail?.overview}
                    </p>
                  </section>
                  {/* Cast Carousel */}
                  <section className="space-y-4 w-full max-w-4xl">
                    <h3 className="text-xl font-montserrat">Cast</h3>
                    <div className="carousel carousel-center rounded-box space-x-4 p-4 overflow-x-auto max-w-4xl">
                      {cast.map((actor) => (
                        <div
                          key={actor.id}
                          className="flex flex-col items-center text-center space-y-2">
                          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                            <img
                              src={
                                actor.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                  : "/default-avatar.png"
                              }
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{actor.name}</p>
                            <p className="text-xs text-base-content/70">
                              {actor.character}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  {/* Media Carousel */}
                  <section className="space-y-4 w-full max-w-4xl">
                    <h3 className="text-xl font-montserrat">Media</h3>
                    <div className="carousel carousel-center rounded-box space-x-4 p-4 overflow-x-auto max-w-4xl">
                      {titleDetail?.videos?.results?.map((video) => (
                        <div
                          key={video.id}
                          className="carousel-item flex flex-col items-center space-y-2">
                          <div
                            className="w-64 h-36 rounded-lg overflow-hidden shadow-md cursor-pointer"
                            onClick={() => {
                              // Open trailer in modal or new window
                              window.open(
                                `https://www.youtube.com/watch?v=${video.key}`,
                                "_blank"
                              );
                            }}>
                            <img
                              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                              alt={video.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium max-w-64 truncate">
                            {video.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                  {/* Recommendations */}
                  <section className="space-y-4 w-full max-w-4xl">
                    <h3 className="text-xl font-montserrat">Recommendations</h3>
                    <div className="carousel carousel-center rounded-box space-x-4 p-4 overflow-x-auto max-w-4xl">
                      {titleDetail?.recommendations?.results?.map((title) => (
                        <div
                          key={title.id}
                          className="flex flex-col  text-start space-y-2">
                          <div className="w-64 h-36 rounded-xl overflow-hidden shadow-md">
                            <img
                              src={
                                title.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${title.backdrop_path}`
                                  : "/default-avatar.png"
                              }
                              alt={title.title}
                              onClick={() => handleClick(title.id)}
                              className="w-full h-full object-cover cursor-pointer"
                            />
                          </div>
                          <div>
                            <a onClick={() => handleClick(title.id)}>
                              <p className="text-sm font-medium cursor-pointer hover:text-primary">
                                {title.title}
                              </p>
                              <p className="text-sm opacity-70 break-words whitespace-normal leading-tight">
                                {title.release_date.split("-")[0]}
                              </p>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
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

            {showAddMovie && (
              <LogMovieModal
                titleId={titleDetail?.id}
                posterPath={titleDetail?.poster_path}
                isOpen={showAddMovie}
                onClose={() => setShowAddMovie(false)}
                movieTitle={`${titleDetail?.title}`}
                movieYear={`${titleDetail?.release_date.split("-")[0]}`}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetail;
