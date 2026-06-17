/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setUser } = useAppContext();

  const [state, setState] = useState("choice"); // "choice" | "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const userName =
      state === "register" ? name || email.split("@")[0] : email.split("@")[0];
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const avatarColors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-red-500",
      "bg-indigo-500",
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    setUser({
      email,
      name: userName,
      avatar: initials,
      avatarColor: randomColor,
      profileImage: profileImage,
    });

    if (state === "register") {
      setProfileImage(null);
      setImagePreview(null);
      toast.success("Account created successfully! Welcome!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.success("Login successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Choice Screen - Initial page
  if (state === "choice") {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8"
        style={{ backgroundImage: "url('/header_img.png')" }}
      >
        <div className="flex flex-col gap-6 m-auto items-center p-8 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Welcome</h2>
          <p className="text-gray-600 text-center text-sm">Do you have an account?</p>

          <button
            onClick={() => setState("login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all"
          >
            Yes, I have an account
          </button>

          <button
            onClick={() => setState("register")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-all"
          >
            No, Create an account
          </button>
        </div>
      </div>
    );
  }

  // Login/Register Form
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8"
      style={{ backgroundImage: "url('/header_img.png')" }}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <div className="w-full flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => setState("choice")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back
          </button>
          <p className="text-2xl font-medium text-gray-800">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </p>
        </div>

        {state === "register" && (
          <div className="w-full">
            <p className="text-sm font-medium text-gray-700">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        {state === "register" && (
          <div className="w-full">
            <p className="text-sm font-medium text-gray-700">Profile Picture</p>
            <div className="flex items-center gap-3 mt-2">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  No image
                </div>
              )}
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer inline-block text-sm">
                  Choose Image
                </span>
              </label>
            </div>
          </div>
        )}

        <div className="w-full">
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-medium text-gray-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-xs text-gray-600 text-center w-full">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
            >
              Login instead
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-600 text-center w-full">
            Don't have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
            >
              Sign up instead
            </span>
          </p>
        )}

        <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
