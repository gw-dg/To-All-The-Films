import React, { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const LogMovieModal = ({
  isOpen,
  titleId,
  posterPath,
  onClose,
  movieTitle,
  movieYear,
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [dateString, setDateString] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add`,
        {
          titleId,
          title: movieTitle,
          posterPath,
          rating: selectedRating,
          dateWatched: new Date(dateString),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (isLiked) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/favorite`,
          {
            titleId,
            title: movieTitle,
            posterPath,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      onClose(true);
    } catch (error) {
      console.error("Error logging movie", error);
      onClose(false);
    }
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const position = i + 1;
        return (
          <button
            key={position}
            className="cursor-pointer p-1 hover:scale-110 transition-transform"
            onMouseEnter={() => setHoverRating(position)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setSelectedRating(position)}
            aria-label={`Rate ${position} stars`}>
            {position <= (hoverRating || selectedRating) ? (
              <FaStar className="text-primary-content w-6 h-6" />
            ) : (
              <FaRegStar className="text-base-content/50 w-6 h-6" />
            )}
          </button>
        );
      });
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`} role="dialog">
      <div className="modal-box bg-base-300 text-base-content sm:max-w-md">
        <button
          className="btn btn-sm btn-circle absolute top-2 right-2 z-10"
          onClick={() => onClose(null)}>
          <FaTimes className="w-3 h-3" />
        </button>
        <div className="space-y-6 py-4">
          {/* Movie Header */}
          <div className="flex justify-start space-x-2 items-center pb-2">
            <h3 className="text-xl font-bold font-montserrat truncate">
              {movieTitle}
            </h3>
            <p className="text-lg font-montserrat text-base-content">
              {movieYear}
            </p>
          </div>

          {/* Watched Toggle */}
          <div className="flex flex-col gap-2">
            {/* Date Input */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-mono ">Watched on:</label>
              <input
                type="date"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="input input-bordered input-sm h-6 font-mono bg-base-200"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Rating & Like Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">{renderStars()}</div>
            <button
              className={`btn btn-ghost btn-square hover:bg-base-content/10 ${
                isLiked ? "text-primary-content" : "text-base-content"
              }`}
              onClick={() => setIsLiked(!isLiked)}
              aria-label={
                isLiked ? "Remove from favorites" : "Add to favorites"
              }>
              {isLiked ? (
                <FaHeart className="w-6 h-6" />
              ) : (
                <FaRegHeart className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-action justify-end">
          <button
            className="btn btn-outline h-8 min-h-8 rounded-md"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

LogMovieModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movieTitle: PropTypes.string,
  movieYear: PropTypes.string,
};

export default LogMovieModal;
