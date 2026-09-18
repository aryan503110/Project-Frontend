import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#222]">
      <Navbar />

      <main className="flex-1 min-w-0 m-2 p-6 bg-white rounded-2xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;