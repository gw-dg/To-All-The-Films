import React, { useState, useEffect, useMemo, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./index.css";
import Login from "./UI/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Homepage from "./UI/Homepage";
import Credits from "./UI/Credits";
import Preferences from "./UI/Preferences";

export const ListContext = createContext();
export const AuthContext = createContext();
export const MiscContext = createContext();

function App() {
  const [genreList, setGenreList] = useState([{ id: "", genreName: "" }]);
  const [trendingMovieList, setTrendingMovieList] = useState({});
  const [trendingTvList, setTrendingTvList] = useState({});
  const [particularGenreMovieList, setParticularGenreMovieList] = useState({});
  const [titleDetail, setTitleDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [andOr, setAndOr] = useState("and");
  const [selectedCards, setSelectedCards] = useState({ 80: true });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateSession = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/session/validate`,
          {
            withCredentials: true,
          }
        );

        setIsLoggedIn(response.data.isLoggedIn);
        if (!response.data.isLoggedIn) {
          Cookies.remove("session");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        setIsLoggedIn(false);
        Cookies.remove("session");
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const listContextValue = useMemo(
    () => ({
      genreList,
      setGenreList,
      trendingMovieList,
      setTrendingMovieList,
      trendingTvList,
      setTrendingTvList,
      particularGenreMovieList,
      setParticularGenreMovieList,
      titleDetail,
      setTitleDetail,
    }),
    [
      genreList,
      trendingMovieList,
      trendingTvList,
      particularGenreMovieList,
      titleDetail,
    ]
  );

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
    }),
    [isLoggedIn, loading]
  );

  const miscContextValue = useMemo(
    () => ({
      andOr,
      setAndOr,
      selectedCards,
      setSelectedCards,
    }),
    [andOr, selectedCards]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <ListContext.Provider value={listContextValue}>
        <MiscContext.Provider value={miscContextValue}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Routes>
              <Route path="/home" element={<Homepage />} />
              <Route
                path="/login"
                element={
                  isLoggedIn ? <Navigate to="/home" replace /> : <Login />
                }
              />
              <Route path="/credits" element={<Credits />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          )}
        </MiscContext.Provider>
      </ListContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
