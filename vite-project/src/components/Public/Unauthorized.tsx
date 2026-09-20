import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Unauthorized = () => {
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
    <main className="flex min-h-screen items-center justify-center bg-[#222] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#262626] p-6 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:p-10">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">Unauthorized</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">You do not have permission to view this page.</p>
        <button type="button" onClick={handleLogout} className="mt-6 w-full rounded-xl bg-[#d4a853] px-5 py-3 text-sm font-semibold text-[#221b0c] transition hover:bg-[#e0b66a] sm:w-auto">
          Logout
        </button>
      </section>
    </main>
  );
};

export default Unauthorized;
