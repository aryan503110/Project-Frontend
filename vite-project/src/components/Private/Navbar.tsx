import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import type { RootState } from "../Redux/store";

const Navbar = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);
  const linkClass = (path: string) =>
    `rounded-lg px-4 py-3 text-sm font-medium text-white no-underline transition hover:bg-[#444] ${
      location.pathname === path ? "bg-[#444]" : ""
    }`;

  return (
    <nav className="shrink-0 bg-[#222] text-white md:min-h-screen md:w-60">
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-bold">My App</h2>
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-lg p-2 transition hover:bg-[#444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {isDrawerOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#222] p-5 shadow-2xl transition-transform duration-300 md:static md:min-h-screen md:w-60 md:translate-x-0 md:shadow-none ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My App</h2>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
            className="rounded-lg p-2 transition hover:bg-[#444] md:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {role === "admin" && (
            <>
              <Link to="/home" onClick={closeDrawer} className={linkClass("/home")}>Dashboard</Link>
              <Link to="/allsalesperson" onClick={closeDrawer} className={linkClass("/allsalesperson")}>Salespersons</Link>
              <Link to="/allcategories" onClick={closeDrawer} className={linkClass("/allcategories")}>Categories</Link>
              <Link to="/allproducts" onClick={closeDrawer} className={linkClass("/allproducts")}>Products</Link>
               <Link to="/alladminstock" onClick={closeDrawer} className={linkClass("/alladminstock")}>Admin Stock</Link>
              <Link to="/stock-requests" onClick={closeDrawer} className={linkClass("/stock-requests")}>Stock Requests</Link>
              <Link to="/orders" onClick={closeDrawer} className={linkClass("/orders")}>Orders</Link>
            </>
          )}

          {role === "salesperson" && (
            <>
              <Link to="/salespersonhome" onClick={closeDrawer} className={linkClass("/salespersonhome")}>Dashboard</Link>
              <Link to="/products" onClick={closeDrawer} className={linkClass("/products")}>Products</Link>
              <Link to="/my-stock" onClick={closeDrawer} className={linkClass("/my-stock")}>My Stock</Link>
              <Link to="/stock-requests" onClick={closeDrawer} className={linkClass("/stock-requests")}>Stock Requests</Link>
              <Link to="/orders" onClick={closeDrawer} className={linkClass("/orders")}>Orders</Link>
            </>
          )}

          {role === "customer" && (
            <>
              <Link to="/customerhome" onClick={closeDrawer} className={linkClass("/customerhome")}>Home</Link>
              <Link to="/products" onClick={closeDrawer} className={linkClass("/products")}>Products</Link>
              <Link to="/cart" onClick={closeDrawer} className={linkClass("/cart")}>Cart</Link>
              <Link to="/my-orders" onClick={closeDrawer} className={linkClass("/my-orders")}>My Orders</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
