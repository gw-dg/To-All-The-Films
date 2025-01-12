import React from "react";
import Avatar from "./Avatar";
export default function Body() {
  return (
    // Main container - min-height for larger screens, flex-grow for responsiveness
    <div className="min-h-screen relative flex md:flex-row">
      {/* Left panel - grows to fill available space, maintains minimum height on mobile */}
      <div className="flex-1 min-h-[500px] md:h-auto bg-base-200 p-4 flex flex-col justify-center">
        <span className="text-center mt-5">Explore</span>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="mt-7 absolute left-1/2 transform -translate-x-1/2 z-40">
        <Avatar />
      </div>
      {/* Right panel - grows to fill available space, maintains minimum height on mobile */}
      <div className="flex-1 min-h-[500px] md:h-auto bg-base-300 p-4 flex justify-center ">
        <span className="text-center mt-5">Movies for you</span>
      </div>
    </div>
  );
}
