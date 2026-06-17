/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import About from "./About";
import Projects from "./Projects";
import Testimonails from "./Testimonails";
import Contact from "./Contact";
import Footer from "./Footer";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    toast.info("Logged out successfully. See you soon!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full overflow-hidden">
      <Header />
      <About />
      <Projects />
      <Testimonails />
      <Contact />
      <Footer />
    </div>
  );
};

export default Dashboard;
