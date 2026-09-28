import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Unauthorized = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#222] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#262626] p-6 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:p-10">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">Unauthorized</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">You do not have permission to view this page.</p>
      </section>
    </main>
  );
};

export default Unauthorized;
