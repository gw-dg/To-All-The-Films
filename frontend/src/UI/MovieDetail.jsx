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
import ShareModal from "./Share";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const { isLoggedIn, loading, setLoading } = useContext(AuthContext);
  const { titleDetail, setTitleDetail, director, setDirector, cast, setCast } =
    useContext(ListContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefualt();
    navigate(`/title/${id}`);
  };

  const favoriteMovie = async () => {
    try {
      if (!isFavorited) {
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
      } else {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/favorite/${movieId}`,
          {
            withCredentials: true,
          }
        );
        toast.success(`${titleDetail?.title} removed from favorites!`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      toast.error(
        `Failed to ${isFavorited ? "remove" : "add"} ${titleDetail?.title} ${
          isFavorited ? "from" : "to"
        } favorites. Please try again.`,
        {
          position: "bottom-right",
          duration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/favorite/${movieId}`,
          {
            withCredentials: true,
          }
        );
        setIsFavorited(response.data.message === "Movie is Favorited");
      } catch (error) {
        setIsFavorited(false);
      }
    };

    if (movieId) {
      checkFavoriteStatus();
    }
  }, [movieId]);

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
            <div className="relative h-[70vh] md:aspect-video w-full overflow-hidden">
              {/* Backdrop Image */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${titleDetail.backdrop_path})`,
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent">
                <div className="container mx-auto px-4 h-full flex items-center justify-center">
                  {" "}
                  {/* Changed from items-end to items-center */}
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-end w-full max-w-4xl mx-auto">
                    {/* Poster */}
                    <div className="w-32 md:w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${titleDetail.poster_path}`}
                        alt="Movie Poster"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title and Quick Info */}
                    <div className="flex-1 text-base-content space-y-3 md:space-y-4 text-center md:text-left">
                      <h1 className="text-2xl md:text-4xl font-serif italic break-words">
                        {titleDetail?.title}
                      </h1>
                      <div className="flex flex-wrap justify-center md:justify-start items-center font-montserrat gap-1 md:gap-2 md:text-xl">
                        <p className="opacity-90 underline">
                          {titleDetail?.original_title}
                        </p>
                        <p className="opacity-90">directed by</p>
                        <p className="opacity-90 underline">{director}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {titleDetail?.genres?.map((genre) => (
                          <div
                            key={genre.id}
                            className="badge badge-outline text-xs md:text-sm">
                            {genre.name}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm justify-center md:justify-start">
                        <div className="flex items-center gap-1">
                          <FaStar className="w-3 h-3 md:w-4 md:h-4 text-warning" />
                          <span>{titleDetail?.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>
                            {titleDetail?.runtime
                              ? `${Math.floor(titleDetail.runtime / 60)}h ${
                                  titleDetail.runtime % 60
                                }m`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3 md:w-4 md:h-4" />
                          <span>
                            {new Date(titleDetail?.release_date).getFullYear()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <button
                          className="btn btn-primary btn-xs md:btn-sm"
                          onClick={() => setShowTrailer(true)}>
                          <FaPlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                          Watch Trailer
                        </button>
                        {isLoggedIn && (
                          <>
                            <button
                              className={`btn btn-xs md:btn-sm ${
                                isFavorited ? "btn-primary" : "btn-outline"
                              }`}
                              onClick={() => favoriteMovie()}>
                              <FaHeart className="w-3 h-3 md:w-4 md:h-4" />
                              Favorite
                            </button>
                            <button
                              className="btn btn-outline btn-xs md:btn-sm"
                              onClick={() => setShowAddMovie(true)}
                              disabled={!titleDetail?.id}>
                              <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
                              Add
                            </button>
                          </>
                        )}
                        <button className="btn btn-outline btn-xs md:btn-sm">
                          <FaBookmark className="w-3 h-3 md:w-4 md:h-4" />
                          Add to Watchlist
                        </button>
                        <button
                          className="btn btn-outline btn-xs md:btn-sm"
                          onClick={() => setShowShareModal(true)}
                          disabled={!titleDetail?.id}>
                          <FaShareAlt className="w-3 h-3 md:w-4 md:h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Content */}
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
              <div className="space-y-8">
                {/* Overview */}
                <section className="space-y-4">
                  <h2 className="text-lg md:text-xl font-montserrat text-left md:text-left">
                    {titleDetail?.tagline}
                  </h2>
                  <p className="text-base-content/70 text-sm md:text-base leading-relaxed text-left md:text-left">
                    {titleDetail?.overview}
                  </p>
                </section>

                {/* Cast Carousel */}
                <section className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-montserrat text-left sm:text-left">
                    Cast
                  </h3>
                  <div className="carousel carousel-center rounded-box gap-3 p-2 sm:p-4 overflow-x-auto w-full">
                    {cast.map((actor) => (
                      <div
                        key={actor.id}
                        className="carousel-item flex flex-col items-center text-center space-y-2 w-16 sm:w-20 md:w-24">
                        <div className="aspect-square w-full rounded-full overflow-hidden shadow-md">
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
                          <p className="text-xs sm:text-sm font-medium line-clamp-1">
                            {actor.name}
                          </p>
                          <p className="text-xs text-base-content/70 line-clamp-1">
                            {actor.character}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Media Carousel */}
                <section className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-montserrat text-left sm:text-left">
                    Media
                  </h3>
                  <div className="carousel carousel-center rounded-box gap-3 p-2 sm:p-4 overflow-x-auto w-full">
                    {titleDetail?.videos?.results?.map((video) => (
                      <div
                        key={video.id}
                        className="carousel-item flex flex-col items-center space-y-2 w-48 sm:w-56 md:w-64">
                        <div
                          className="aspect-video w-full rounded-lg overflow-hidden shadow-md cursor-pointer"
                          onClick={() => {
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
                        <p className="text-xs sm:text-sm font-medium truncate w-full px-1">
                          {video.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Recommendations */}
                <section className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-montserrat text-left sm:text-left">
                    Recommendations
                  </h3>
                  <div className="carousel carousel-center rounded-box gap-3 p-2 sm:p-4 overflow-x-auto w-full">
                    {titleDetail?.recommendations?.results?.map((title) => (
                      <div
                        key={title.id}
                        className="carousel-item flex flex-col text-start space-y-2 w-48 sm:w-56 md:w-64">
                        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                          <a
                            href={`/title/${title.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleClick(e, title.id)}>
                            <img
                              src={
                                title.backdrop_path
                                  ? `https://image.tmdb.org/t/p/w500${title.backdrop_path}`
                                  : "/default-backdrop.png"
                              }
                              alt={title.title}
                              onClick={(e) => handleClick(e, title.id)}
                              className="w-full h-full object-cover cursor-pointer"
                            />
                          </a>
                        </div>
                        <div className="px-1">
                          <a
                            href={`/title/${title.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleClick(e, title.id)}>
                            <p className="text-xs sm:text-sm font-medium cursor-pointer hover:text-primary line-clamp-1">
                              {title.title}
                            </p>
                            <p className="text-xs text-base-content/70">
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

            {showShareModal && (
              <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                movieTitle={`${titleDetail?.title}`}
                movieId={titleDetail?.id}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetail;
