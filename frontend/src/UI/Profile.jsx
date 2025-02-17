import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaMapPin, FaEllipsisH, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Profile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/title/${id}`);
  };

  useEffect(() => {
    if (!username) return;
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile/${username}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [username]);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Banner Section */}
      <div className="relative h-[30vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center"
          style={{
            backgroundImage: `url(${userDetails?.user?.backgroundImage})`,
            transform: `translateY(${
              typeof window !== "undefined" ? window.scrollY * 0.5 : 0
            }px)`,
            filter: "brightness(50%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent">
          <div className="container mx-auto px-4 py-6 h-full flex items-center justify-center">
            <div className="flex items-center gap-6 w-full max-w-5xl">
              {/* Profile Picture */}
              <div className="avatar">
                <div className="w-24 rounded-full ring-1 ring-primary">
                  <img
                    src={`${userDetails?.user?.profileImage}`}
                    alt="Profile Picture"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-base-content space-y-1">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">
                    {userDetails?.user?.username}
                  </h1>
                  <button className="btn btn-ghost btn-sm btn-square">
                    <FaEllipsisH className="h-5 w-5" />
                  </button>
                </div>
                <p className="opacity-90">{userDetails?.user?.about}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                {[
                  {
                    count: `${userDetails?.stats?.moviesWatched.length}`,
                    label: "FILMS",
                  },
                  {
                    count: `${userDetails?.stats?.favoriteMovies.length}`,
                    label: "FAVORITES",
                  },
                  { count: 0, label: "LISTS" },
                  { count: 15, label: "FRIENDS" },
                ].map(({ count, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-semibold">{count}</div>
                    <div className="text-xs opacity-70">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Favorite Films */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold font-montserrat mb-6">
            Favorite Films
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {userDetails?.stats?.favoriteMovies?.slice(0, 4).map((title) => (
              <div key={title.movieId} className="flex flex-col">
                <figure className="p-2 ">
                  <img
                    src={`https://image.tmdb.org/t/p/w400${title.posterPath}`}
                    className="h-64 rounded-lg w-48 object-cover cursor-pointer"
                    alt={title.movieName}
                    onClick={() => handleClick(title.movieId)}
                  />
                </figure>
                <div className="card-body p-2 -mt-3 w-36">
                  <div className="flex items-center justify-between">
                    <a onClick={() => handleClick(title.movieId)}>
                      <h2 className="card-title text-base break-words whitespace-normal flex-1 leading-tight cursor-pointer hover:text-primary">
                        {title.movieName}
                      </h2>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-semibold font-montserrat mb-6">
            Recent Activity
          </h2>
          {/* {console.log(userDetails?.recentActivity)} */}
          <div className="space-y-4">
            {userDetails?.recentActivity?.map((title) => (
              <div
                key={title.movieId}
                className="card card-side bg-base-200 rounded-md relative grid grid-cols-[150px_1fr]">
                <figure className="flex items-center justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${title.posterPath}`}
                    alt={title.title}
                    className="h-28 rounded-lg mt-2 mb-2 w-20 -ml-10 object-cover cursor-pointer"
                    onClick={() => handleClick(title.movieId)}
                  />
                </figure>
                {/* Content section */}
                <div className="card-body py-4 -ml-16">
                  <div>
                    <div className="flex items-center gap-2">
                      <a onClick={() => handleClick(title.movieId)}>
                        <h2 className="card-title text-xl font-montserrat mb-2 cursor-pointer hover:text-secondary">
                          {title.movieName}
                        </h2>
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-warning">
                      {[...Array(parseInt(title.rating))].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-4 h-4 text-primary-content"
                        />
                      ))}
                      {/* {[...Array(5 - parseInt(title.rating))].map((_, i) => (
                        <FaRegStar
                          key={i}
                          className="w-4 h-4 text-base-content/50"
                        />
                      ))} */}
                    </div>
                    <p className="text-sm opacity-70 mt-2 font-montserrat">
                      {new Date(title.dateWatched).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
