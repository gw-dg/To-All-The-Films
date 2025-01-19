import React, { useState } from "react";
import "./index.css";
import Login from "./UI/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./UI/Homepage";
import Credits from "./UI/Credits";
import Preferences from "./UI/Preferences";

export const ListContext = React.createContext();

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

  return (
    <ListContext.Provider
      value={{
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
        loading,
        setLoading,
        andOr,
        setAndOr,
        selectedCards,
        setSelectedCards,
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/credits" element={<Credits />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ListContext.Provider>
  );
}

export default App;
