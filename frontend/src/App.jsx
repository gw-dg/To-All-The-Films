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
import MovieDetail from "./UI/MovieDetail";
import Profile from "./UI/Profile";
import Layout from "./UI/Layout";
import Body from "./UI/Body";
import SearchPage from "./UI/SearchPage";
import LoadingPage from "./utils/Loading";

export const ListContext = createContext();
export const AuthContext = createContext();
export const MiscContext = createContext();

function App() {
  const [genreList, setGenreList] = useState([{ id: "", genreName: "" }]);
  const [trendingTvList, setTrendingTvList] = useState({});
  const [particularGenreMovieList, setParticularGenreMovieList] = useState({});
  const [titleDetail, setTitleDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [andOr, setAndOr] = useState("and");
  const [selectedCards, setSelectedCards] = useState({ 80: true });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([{}]);
  const [username, setUsername] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        if (response.data.isLoggedIn) {
          setUsername(response.data.username);
        } else {
          Cookies.remove("session");
        }
      } catch (error) {
        // console.error("Session validation error:", error);
        setIsLoggedIn(false);
        Cookies.remove("session");
      }
    };

    validateSession();
  }, []);

  const listContextValue = useMemo(
    () => ({
      genreList,
      setGenreList,
      // trendingMovieList,
      // setTrendingMovieList,
      trendingTvList,
      setTrendingTvList,
      particularGenreMovieList,
      setParticularGenreMovieList,
      titleDetail,
      setTitleDetail,
      director,
      setDirector,
      cast,
      setCast,
    }),
    [
      genreList,
      trendingTvList,
      particularGenreMovieList,
      titleDetail,
      director,
      cast,
    ]
  );

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
      username,
      setUsername,
    }),
    [isLoggedIn, loading, username]
  );

  const miscContextValue = useMemo(
    () => ({
      andOr,
      setAndOr,
      selectedCards,
      setSelectedCards,
      currPage,
      setCurrPage,
      totalPages,
      setTotalPages,
    }),
    [andOr, selectedCards, currPage, totalPages]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <ListContext.Provider value={listContextValue}>
        <MiscContext.Provider value={miscContextValue}>
          {loading ? (
            <LoadingPage onLoadComplete={() => setLoading(false)} />
          ) : (
            <Layout>
              <Routes>
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? <Navigate to="/home" replace /> : <Login />
                  }
                />
                <Route path="/home" element={<Body />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/title/:movieId" element={<MovieDetail />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route
                  path="/search/:searchQuery/:page"
                  element={<SearchPage />}
                />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Layout>
          )}
        </MiscContext.Provider>
      </ListContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
