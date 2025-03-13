import React, { useContext, useState } from "react";
import Body from "../UI/Body";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SlHome, SlSettings } from "react-icons/sl";
import { CgLogIn } from "react-icons/cg";
import { GoTrophy } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import ThemeController from "./ThemeController";
import { AuthContext } from "../App";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isTransparentNavbar = location.pathname.startsWith("/title/");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleNavigation = (path) => {
    navigate(path);
  };
  const { isLoggedIn, setIsLoggedIn, setLoading, username } =
    useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.message === "Logged out successfully") {
        setIsLoggedIn(false);
        // handleNavigation("/");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          onChange={(e) => setIsDrawerOpen(e.target.checked)}
        />
        <div className="drawer-content relative">
          {/* Page content here */}
          <div
            className={`navbar bg-base-100 
            //     
            //   isTransparentNavbar
            //     ? "absolute top-0 left-0 right-0 bg-transparent z-10 text-white"
            //     : ""
            // } z-[30]
            `}>
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
              <a
                className="text-3xl sm:text-4xl md:text-5xl font-italianno tracking-wider pt-2 hover:cursor-pointer truncate"
                onClick={() => handleNavigation("/home")}>
                To All The Films
              </a>
            </div>
          </div>
          {children}

          {/* <GenreCard /> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay z-40"
            onClick={() => setIsDrawerOpen(false)}></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-50">
            {/* Sidebar content here */}
            <li>
              <button
                className="text-base-content"
                onClick={() => handleNavigation("/home")}>
                <SlHome className="w-5 h-5" />
                <a>Home</a>
              </button>
            </li>
            {isLoggedIn && (
              <li>
                <button
                  className="text-base-content"
                  onClick={() => handleNavigation(`/profile/${username}`)}>
                  <LuUser className="w-5 h-5" />
                  <a>Profile</a>
                </button>
              </li>
            )}
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
                onClick={() =>
                  handleNavigation(isLoggedIn ? "/chat" : "/login")
                }>
                <HiOutlineSparkles className="w-5 h-5" />
                <a>Chat With AI</a>
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
              {!isLoggedIn ? (
                <button
                  className="text-base-content"
                  onClick={() => handleNavigation("/login")}>
                  <CgLogIn className="w-5 h-5" />
                  <a>Login</a>
                </button>
              ) : (
                <button
                  className="text-base-content"
                  onClick={(e) => handleLogout(e)}>
                  <CgLogIn className="w-5 h-5" />
                  <a>Logout</a>
                </button>
              )}
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
