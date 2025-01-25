import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaMapPin, FaEllipsisH } from "react-icons/fa";
import { AuthContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState({});
  // const { loading, setLoading } = useContext(AuthContext);
  useEffect(() => {
    // console.log("useEffect triggered with username:", username);

    if (!username) {
      // console.log("Username is undefined, skipping fetch.");
      return;
    }
    // if (userDetails.user) {
    //   console.log("details already fetched. Skipping...");
    //   console.log(userDetails);
    //   return;
    // }
    const fetchUserDetails = async () => {
      // console.log("Fetching user details for:", username);
      // setLoading(true);
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
        // console.log(
        //   "User details fetched:",
        //   userDetails?.user?.backgroundImage
        // );
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        // setLoading(false);
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
            // backgroundImage: `url(${userDetails?.user?.backgroundImage})`,
            transform: `translateY(${
              typeof window !== "undefined" ? window.scrollY * 0.5 : 0
            }px)`,
            filter: "brightness(50%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent">
          <div className="container mx-auto px-4 py-6 h-full flex items-center justify-center">
            <div className="flex items-end gap-6 w-full max-w-5xl">
              {/* Profile Picture */}
              <div className="avatar">
                <div className="w-28 rounded-full ring-1 ring-primary">
                  <img
                    src={`${userDetails?.user?.backgroundImage}`}
                    alt="Profile Picture"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-base-content space-y-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">GwdG</h1>
                  <button className="btn btn-ghost btn-sm btn-square">
                    <FaEllipsisH className="h-5 w-5" />
                  </button>
                </div>
                <p className="opacity-90">
                  I am somewhat of a cinephile myself.
                </p>
                <div className="flex items-center">
                  <FaMapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">India</span>
                </div>

                {/* Stats */}
              </div>
              <div className="flex gap-6">
                {[
                  { count: 208, label: "FILMS" },
                  { count: 4, label: "THIS YEAR" },
                  { count: 1, label: "LIST" },
                  { count: 13, label: "FOLLOWING" },
                  { count: 15, label: "FOLLOWERS" },
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
      <div className="container mx-auto px-4 py-8">
        {/* Favorite Films */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Favorite Films</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative group">
                <div className="aspect-[2/3] rounded-md overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={`Movie ${i + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute bottom-0 p-3">
                    <p className="text-white text-sm font-medium">
                      Movie Title
                    </p>
                    <p className="text-neutral-content text-xs">2023</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 bg-base-200 p-4 rounded-md">
                <div className="avatar w-16 h-24">
                  <div className="rounded-md">
                    <img
                      src="/placeholder.svg"
                      alt={`Recent Movie ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Movie Title</h3>
                  <p className="text-sm text-neutral-content mt-1">
                    Watched • 2 days ago
                  </p>
                  <div className="mt-2 text-sm text-neutral-content">★★★★½</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
