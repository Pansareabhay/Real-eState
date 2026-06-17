/* eslint-disable no-unused-vars */
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AppProvider, useAppContext } from "./context/AppContext";

const AppContent = () => {
  const { user } = useAppContext();

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />
      {user ? <Dashboard /> : <Login />}
    </div>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
