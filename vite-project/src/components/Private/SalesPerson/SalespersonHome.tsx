import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SalespersonHome = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#222] sm:text-4xl">Salesperson Home</h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">Manage your stock and customer orders.</p>
    </section>
  );
};

export default SalespersonHome;
