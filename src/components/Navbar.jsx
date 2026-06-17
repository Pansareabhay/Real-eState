/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    toast.info("Logged out successfully. See you soon!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div
        className=" container mx-auto flex justify-between
        items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent"
      >
        <img src={assets.logo} alt="" />
        <ul className="hidden md:flex gap-7 text-white">
          <a
            href="#Header"
            className="cursor-pointer 
            hover:text-gray-400"
          >
            Home
          </a>
          <a
            href="#About"
            className="cursor-pointer 
            hover:text-gray-400"
          >
            About
          </a>
          <a
            href="#Projects"
            className="cursor-pointer 
            hover:text-gray-400"
          >
            Projects
          </a>
          <a
            href="#Testimonails"
            className="cursor-pointer 
            hover:text-gray-400"
          >
            Testimonials
          </a>
        </ul>
        {user ? (
          <div className="hidden md:flex items-center gap-3 relative">
            <button
              onClick={() => setShowAvatarMenu(!showAvatarMenu)}
              className="focus:outline-none"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 cursor-pointer hover:opacity-80 transition-opacity"
                />
              ) : (
                <div
                  className={`w-10 h-10 ${user?.avatarColor || "bg-blue-500"} rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity`}
                >
                  {user?.avatar || "U"}
                </div>
              )}
            </button>
            {showAvatarMenu && (
              <div className="absolute top-12 right-0 w-70 rounded overflow-hidden shadow-2xl z-50">
                <div className="bg-blue-600 p-3">
                  <h3 className="text-white text-lg font-semibold">
                    My Profile
                  </h3>
                </div>
                <div className="bg-blue-500 p-3">
                  <div className="flex items-center gap-3">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-4 border-white"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 ${user?.avatarColor || "bg-gray-400"} rounded flex items-center justify-center text-white text-3xl font-bold border-2 border-white`}
                      >
                        {user?.avatar || "U"}
                      </div>
                    )}
                    <div>
                      <p className="text-white text-base font-semibold">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-white/80 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-3 space-y-3">
                  <button
                    onClick={() => setShowAvatarMenu(false)}
                    className="w-full flex items-center gap-3 p-3 bg-slate-800 rounded text-white hover:bg-slate-700 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-100 text-blue-600 text-lg">
                      👤
                    </span>
                    <span className="font-semibold">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowAvatarMenu(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-slate-800 rounded text-white hover:bg-slate-700 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-pink-100 text-pink-600 text-lg">
                      🚪
                    </span>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt=""
        />
      </div>
      {/* ------ mobile-menu ------ */}
      <div
        className={`md:hidden ${showMobileMenu ? "fixed w-full" : "h-0 w-0"}  right-0 top-0 bottom-0 
        overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-6"
            alt=""
          />
        </div>
        <ul
          className="flex flex-col items-center gap-2 mt-5 px-5 text-lg
          font-medium"
        >
          <a
            onClick={() => setShowMobileMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full 
            inline-block"
          >
            Home
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="#About"
            className="px-4 py-2 rounded-full 
            inline-block"
          >
            About
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="#Projects"
            className="px-4 py-2 rounded-full 
            inline-block"
          >
            Projects
          </a>
          <a
            onClick={() => setShowMobileMenu(false)}
            href="#Testimonails"
            className="px-4 py-2 rounded-full 
            inline-block"
          >
            Testimonials
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
