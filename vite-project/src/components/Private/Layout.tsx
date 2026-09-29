import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#222] md:flex-row">
      <Navbar />

      <main className="min-w-0 flex-1 overflow-y-auto rounded-t-2xl bg-white p-4 sm:p-6 md:m-2 md:rounded-2xl lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
