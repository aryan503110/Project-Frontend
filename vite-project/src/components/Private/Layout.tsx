import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#222] md:flex-row">
      <Navbar />

      <main className="min-w-0 flex-1 rounded-t-2xl bg-white p-4 sm:p-6 md:m-2 md:rounded-2xl lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
