import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Card from "./GenreCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaStar,
  FaRobot,
  FaBrain,
  FaArrowRight,
  FaUser,
  FaCalendar,
  FaHandHolding,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestMoviesCarousel from "./LatestMoviesCarousel";

const LandingPage = () => {
  const [trendingMovieList, setTrendingMovieList] = useState({});

  useEffect(() => {
    let isMounted = true;
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    const fetchTrendingMovies = async (attempt = 1) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/trending/movie`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (isMounted) {
          setTrendingMovieList(response.data);
        }
      } catch (error) {
        console.error(`Attempt ${attempt}:`, error.message);
        if (attempt < maxRetries) {
          setTimeout(() => fetchTrendingMovies(attempt + 1), retryDelay);
        } else {
          console.error("All retry attempts failed.");
        }
      }
    };

    if (!trendingMovieList?.results) {
      fetchTrendingMovies();
    }

    return () => {
      isMounted = false; // Prevent state update on unmounted component
    };
  }, [trendingMovieList?.results]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end justify-center pb-24">
        {/* Background Movie Image with Responsive Design */}
        <div className="absolute inset-0">
          {/* Desktop and Tablet Background */}
          <div className="hidden sm:flex items-start justify-center h-full">
            <div className="relative w-5/6 h-[90vh]">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original/braxt8dewdpV8zcGHpXUSj0ja2N.jpg')`,
                }}></div>

              {/* Gradient overlays for desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-black via-black/90 to-transparent"></div>
            </div>
          </div>

          {/* Mobile Background - Full Width with Better Gradients */}

          <div className="sm:hidden absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/yRBc6WY3r1Fz5Cjd6DhSvzqunED.jpg')`,
              }}></div>

            {/* Mobile-optimized gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/95 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-inter md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              To All The Films
              <br />
              <span className="text-gradient bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                I've Loved
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg font-inter md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              AI-powered movie discovery app tailored to your taste. Rate,
              discover, and chat about films like never before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/home">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Discovering
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-col items-center justify-center">
        {!trendingMovieList?.results ? (
          <div className="flex flex-col items-center justify-center w-full px-6">
            <SkeletonTheme baseColor="#1f1f1f" highlightColor="#333">
              <div className="text-center mb-8">
                <Skeleton height={30} width={400} className="mb-4" />
              </div>

              {/* Skeleton for movie carousel */}
              <div className="flex gap-4 overflow-hidden w-full max-w-6xl justify-center items-center">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Skeleton height={300} width={200} className="rounded-lg" />
                    <Skeleton height={20} width={200} className="mt-2" />
                    <Skeleton height={16} width={150} className="mt-1" />
                  </div>
                ))}
              </div>
            </SkeletonTheme>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-base md:text-xl pb-5 font-inter text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover Trending Movies, TV Shows and more...
            </span>
            <LatestMoviesCarousel trendingMovieList={trendingMovieList} />
          </div>
        )}
      </div>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Features
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the future of movie discovery with our cutting-edge
              artificial intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1: Rate and Favorite */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <FaStar className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    Log your favorite movies
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Build your personal profile by rating films and marking
                    favorites. Our system learns your preferences to deliver
                    perfect recommendations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Groq Chatbot */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-gray-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-700/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    <FaRobot className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    Groq Powered Chatbot -
                    <span className="italic text-gradient bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      &nbsp;Ani
                    </span>
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Get instant recommendations, plot discussions, and trivia
                    powered by Groq's lightning-fast inference.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: ML Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-800/5 to-red-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center">
                    <FaBrain className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    ML Powered Recommendations
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Get film recommendations based on what you like and you rate
                    the most.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-800/5 to-red-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center">
                    <FaUser className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    Join your friends, Create a community
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Add friends. Create communties, discuss about your favorite
                    movies with others.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-gray-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-700/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center">
                    <FaHandHolding className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    For the love of Open Source
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Open Source Application. Make contributions about the
                    features you'd like to see.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group">
              <div className="relative p-6 h-[380px] max-w-[320px] mx-auto rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-800/5 to-red-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center">
                    <FaCalendar className="text-3xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold font-inter mb-4 text-white">
                    Create and Share Watchlist
                  </h3>
                  <p className="text-gray-400 mb-6 font-inter leading-relaxed">
                    Create Watchlist. Share with your friends and keep track of
                    it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative ">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <h2 className="text-4xl font-inter md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-gray-800 bg-clip-text text-transparent">
              Ready to Transform Your Movie Experience?
            </h2>
            <p className="text-lg font-inter text-gray-300 mb-12 max-w-2xl mx-auto">
              Join to discover thousands of films with who've already discovered
              their new favorite films through our AI-powered platform.
            </p>

            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-bold text-xl shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300">
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black">
        <div className="max-w-5xl mx-auto">
          {/* Row with links on left, icons on right */}
          <div className="flex flex-col font-inter md:flex-row justify-between items-center md:items-start gap-8">
            {/* Left: Navigation Links */}
            <div className="flex gap-6 text-gray-400">
              <Link to="/credits">
                <span className="hover:text-red-300 cursor-pointer transition-colors whitespace-nowrap">
                  Credits
                </span>
              </Link>
              <Link to="/credits">
                <span className="hover:text-red-300 cursor-pointer transition-colors whitespace-nowrap">
                  Contact
                </span>
              </Link>
              <Link to="/credits">
                <span className="hover:text-red-300 cursor-pointer transition-colors whitespace-nowrap">
                  TOS
                </span>
              </Link>
            </div>

            {/* Right: Social Icons */}
            <div className="flex gap-6">
              <a
                href="https://x.com/bhaskar__jha"
                className="inline-flex items-center gap-2 text-base-content/60 hover:text-red-300 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/gw-dg"
                className="inline-flex items-center gap-2 text-base-content/60 hover:text-red-300 transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/bhaskar-jha-89226a218/"
                className="inline-flex items-center gap-2 text-base-content/60 hover:text-red-300 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
