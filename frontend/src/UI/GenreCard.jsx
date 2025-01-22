import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import genreMap from "../utils/GenreName";
import { MiscContext } from "../App";

export default function Card() {
  const { selectedCards, setSelectedCards } = useContext(MiscContext);

  const toggleSelected = (id) => {
    const selectedCount = Object.values(selectedCards).filter(Boolean).length;
    if (selectedCount === 1 && selectedCards[id]) {
      return;
    }
    setSelectedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(selectedCards);
  };
  // useEffect(() => {
  //   // console.log("Selected Cards:", selectedCards);
  // }, [selectedCards]);

  return (
    <div className="carousel carousel-center rounded-box space-x-1 p-4 overflow-x-auto max-w-2xl">
      {genreMap.map((genre) => (
        <div
          key={genre.id}
          className="carousel-item  card w-56 bg-base-300 rounded-md shadow-md cursor-pointer relative"
          onClick={() => toggleSelected(genre.id)}>
          <figure className="relative h-24">
            <img
              src={`${genre.backdrop}`}
              alt={genre.name}
              className="w-full h-full object-cover rounded-lg brightness-50"
            />
            <div className="absolute inset-0 rounded-lg flex items-center justify-center gap-2">
              {selectedCards[genre.id] && (
                <div className="text-neutral-content">
                  <FaCheckCircle className="w-5 h-5" />
                </div>
              )}
              <span className="text-neutral-content font-bold text-xl">
                {genre.name}
              </span>
            </div>
          </figure>
        </div>
      ))}
    </div>
  );
}
