import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const [genreName, setGenreName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [actorName, setActorName] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSaveDirector = async () => {
    // console.log(directorName);
    if (!isLoggedIn) {
      navigate(`/login`);
      return;
    }
    if (!directorName.trim()) {
      toast.error("Director name cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add/director`,
        {
          director: directorName.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`${directorName} added!`, {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Failed to add ${directorName}. Please try again.`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleSaveActor = async () => {
    // console.log(actorName);
    if (!isLoggedIn) {
      navigate(`/login`);
      return;
    }

    if (!actorName.trim()) {
      toast.error("Actor name cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add/actor`,
        {
          actor: actorName.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`${actorName} added!`, {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Failed to add ${actorName}. Please try again.`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleSaveGenre = async () => {
    // console.log(actorName);
    if (!isLoggedIn) {
      navigate(`/login`);
      return;
    }

    if (!genreName.trim()) {
      toast.error("Genre cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/add/genre`,
        {
          genre: genreName.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`${genreName} genre added!`, {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Failed to add ${genreName} genre. Please try again.`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleInputChangeDir = (e) => {
    setDirectorName(e.target.value);
  };

  const handleInputChangeAct = (e) => {
    setActorName(e.target.value);
  };

  const handleInputChangeGen = (e) => {
    setGenreName(e.target.value);
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-base-100 px-4 py-12 font-sans">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-serif italic">
              Tell us what you love
            </h1>
            <p className="text-gray-600 text-sm">
              Help us understand your taste in cinema
            </p>
          </div>

          {/* Favorite Directors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif italic">Favorite Directors</h2>
            <div className="card bg-base-200 p-6">
              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for directors..."
                    className="input input-bordered pl-10 w-full text-sm"
                    onChange={handleInputChangeDir}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* <div className="badge badge-secondary text-sm">
                    Christopher Nolan
                  </div>
                  <div className="badge badge-secondary text-sm">
                    Martin Scorsese
                  </div>
                  <div className="badge badge-secondary text-sm">
                    Quentin Tarantino
                  </div> */}
                  <button
                    className="btn btn-outline btn-sm text-sm"
                    onClick={handleSaveDirector}>
                    + Add Director
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite Actors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif italic">Favorite Actors</h2>
            <div className="card bg-base-200 p-6">
              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for actors..."
                    className="input input-bordered pl-10 w-full text-sm"
                    onChange={handleInputChangeAct}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* <div className="badge badge-secondary text-sm">
                    Leonardo DiCaprio
                  </div>
                  <div className="badge badge-secondary text-sm">Tom Hanks</div>
                  <div className="badge badge-secondary text-sm">
                    Meryl Streep
                  </div> */}
                  <button
                    className="btn btn-outline btn-sm text-sm"
                    onClick={handleSaveActor}>
                    + Add Actor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif italic">Preferred Genres</h2>
            <div className="card bg-base-200 p-6">
              <div className="space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for actors..."
                    className="input input-bordered pl-10 w-full text-sm"
                    onChange={handleInputChangeGen}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* <div className="badge badge-secondary text-sm">
                    Leonardo DiCaprio
                  </div>
                  <div className="badge badge-secondary text-sm">Tom Hanks</div>
                  <div className="badge badge-secondary text-sm">
                    Meryl Streep
                  </div> */}
                  <button
                    className="btn btn-outline btn-sm text-sm"
                    onClick={handleSaveGenre}>
                    + Add Genre
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Era Preferences */}
          {/* <div className="space-y-4">
            <h2 className="text-2xl font-serif italic">Preferred Eras</h2>
            <div className="card bg-base-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="btn btn-outline w-full text-sm">
                  Classics (Pre-1960)
                </button>
                <button className="btn btn-outline w-full text-sm">
                  New Wave (1960-1979)
                </button>
                <button className="btn btn-outline w-full text-sm">
                  Modern (1980-1999)
                </button>
                <button className="btn btn-outline w-full text-sm">
                  Contemporary (2000+)
                </button>
              </div>
            </div>
          </div> */}

          {/* <div className="flex justify-center pt-6">
            <button className="btn btn-primary btn-lg px-8 text-sm">
              Save Preferences
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
