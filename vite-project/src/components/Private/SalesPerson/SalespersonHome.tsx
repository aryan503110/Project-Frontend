import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SalespersonHome = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/user/logout");

      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      console.log(err);
    }
  };
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#222] sm:text-4xl">Salesperson Home</h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">Manage your stock and customer orders.</p>
      <button type="button" onClick={handleLogout} className="mt-6 w-full rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black sm:w-auto">
        Logout
      </button>
    </section>
  );
};

export default SalespersonHome;
