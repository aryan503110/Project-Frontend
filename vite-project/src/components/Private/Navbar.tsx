import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";

const Navbar = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <nav className="w-60 min-h-screen shrink-0 bg-[#222] text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">My App</h2>

      {role === "admin" && (
        <>
          <Link
            to="/home"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Dashboard
          </Link>
          <Link
            to="/allsalesperson"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Salespersons
          </Link>
          <Link
            to="/categories"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Categories
          </Link>
          <Link
            to="/products"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Products
          </Link>
          <Link
            to="/stock-requests"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Stock Requests
          </Link>
          <Link
            to="/orders"
            className="text-white no-underline px-4 py-3 mb-2 rounded-lg hover:bg-[#444]"
          >
            Orders
          </Link>
        </>
      )}

      {role === "salesperson" && (
        <>
          <Link to="/salespersonhome">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/my-stock">My Stock</Link>
          <Link to="/stock-requests">Stock Requests</Link>
          <Link to="/orders">Orders</Link>
        </>
      )}

      {role === "customer" && (
        <>
          <Link to="/customerhome">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
