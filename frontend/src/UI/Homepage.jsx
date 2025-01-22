import React from "react";
import Body from "../UI/Body";
import { useNavigate } from "react-router-dom";
import { SlHome, SlSettings } from "react-icons/sl";
import { CgLogIn } from "react-icons/cg";
import { GoTrophy } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import ThemeController from "./ThemeController";

export default function Homepage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
          {/* <GenreCard /> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/home")}>
                <SlHome className="w-5 h-5" />
                <a>Home</a>
              </button>
            </li>
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/profile/:id")}>
                <LuUser className="w-5 h-5" />
                <a>Profile</a>
              </button>
            </li>
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/credits")}>
                <GoTrophy className="w-5 h-5" />
                <a>Credits</a>
              </button>
            </li>
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/preferences")}>
                <SlSettings className="w-5 h-5" />
                <a>Preferences</a>
              </button>
            </li>
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/login")}>
                <CgLogIn className="w-5 h-5" />
                <a>Login</a>
              </button>
            </li>
            <li className="mt-auto"></li>
            {/* <p className="ml-8">Select Theme</p> */}
            <ThemeController />
          </ul>
        </div>
      </div>
    </>
  );
}
