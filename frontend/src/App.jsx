import React, { useState } from "react";
import "./index.css";
import Body from "./UI/Body";
function App() {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="navbar bg-base-100">
            <div className="flex-none">
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost
          drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 justify-center items-center">
              <a className="text-5xl font-italianno tracking-wider pt-2">
                To All The Films
              </a>
            </div>
          </div>
          <Body />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Credits</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Select Theme</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
