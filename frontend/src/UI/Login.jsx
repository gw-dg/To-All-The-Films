import React, { useState, useContext } from "react";
import { auth } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";

import axios from "axios";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdPerson,
  MdArrowBack,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Login = () => {
  const { loading, setLoading, isLoggedIn, setIsLoggedIn, setUsername } =
    useContext(AuthContext);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleLoginInputChange = (field, value) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegisterInputChange = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // setLoading(true);

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    try {
      const auth = getAuth();
      await setPersistence(auth, inMemoryPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      const idToken = await userCredential.user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { idToken },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Login successful") {
        setUsername(response.data.user.username);
        await auth.signOut();
        setIsLoggedIn(true);
        // navigate("/home");
      }

      toast.success(`Successfully Logged-In!`, {
        position: "bottom-right",
        duration: 3000,
      });
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        toast.error("Invalid email or password", {
          position: "bottom-right",
          duration: 3000,
        });
      } else if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email", {
          position: "bottom-right",
          duration: 3000,
        });
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password", {
          position: "bottom-right",
          duration: 3000,
        });
      } else if (err.response?.data?.message) {
        // backend errors
        toast.error(err.response.data.message, {
          position: "bottom-right",
          duration: 3000,
        });
      } else {
        toast.error("An error occurred during login", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      toast.error("Please fill in all fields", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );

      const idToken = await userCredential.user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          idToken,
          username: registerData.username,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "User registered successfully") {
        await auth.signOut();
        setUsername(response.data.user.username);
        setIsLoggedIn(true);
        toast.success("Account created successfully!", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email is already registered", {
          position: "bottom-right",
          duration: 3000,
        });
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message, {
          position: "bottom-right",
          duration: 3000,
        });

        // If the backend rejected the registration, clean up the Firebase auth
        try {
          const auth = getAuth();
          if (auth.currentUser) {
            await auth.currentUser.delete();
          }
        } catch (deleteError) {}
      } else {
        toast.error("Error creating account", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          {activeTab !== "forgot" && (
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-base-content">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="mt-3 text-base-content/60">
                {activeTab === "login"
                  ? "Sign in to continue your cinematic journey"
                  : "Join us on your cinematic journey"}
              </p>
            </div>
          )}

          {/* Auth Card */}
          <div className="bg-base-100 rounded-xl shadow-xl p-8">
            {/* Tabs */}
            {activeTab !== "forgot" && (
              <div className="flex space-x-4 mb-8">
                <button
                  className={`flex-1 pb-2 text-sm font-medium transition-colors
                  ${
                    activeTab === "login"
                      ? "text-primary border-b-2 border-primary"
                      : "text-base-content/60 border-b-2 border-transparent"
                  }`}
                  onClick={() => {
                    setActiveTab("login");
                    setError("");
                  }}>
                  Login
                </button>
                <button
                  className={`flex-1 pb-2 text-sm font-medium transition-colors
                  ${
                    activeTab === "register"
                      ? "text-primary border-b-2 border-primary"
                      : "text-base-content/60 border-b-2 border-transparent"
                  }`}
                  onClick={() => {
                    setActiveTab("register");
                    setError("");
                  }}>
                  Register
                </button>
              </div>
            )}

            {/* Forms */}
            {activeTab === "login" ? (
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        handleLoginInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        handleLoginInputChange("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}>
                      {showLoginPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleRegister}>
                {/* Username field */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type="text"
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter your username"
                      value={registerData.username}
                      onChange={(e) =>
                        handleRegisterInputChange("username", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        handleRegisterInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) =>
                        handleRegisterInputChange("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }>
                      {showRegisterPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-3 h-5 w-5 text-base-content/40" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        handleRegisterInputChange(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }>
                      {showConfirmPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-6"
                  disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}

            {/* Social Login */}
            {activeTab !== "forgot" && (
              <div className="mt-8">
                <div className="divider">Or continue with</div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="btn btn-outline gap-2">
                    <FcGoogle className="h-5 w-5" />
                    Google
                  </button>
                  <button className="btn btn-outline gap-2">
                    <FaGithub className="h-5 w-5" />
                    GitHub
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
