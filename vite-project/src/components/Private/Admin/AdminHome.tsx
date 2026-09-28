import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

const AdminHome = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  axios.defaults.withCredentials = true;

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#222] sm:text-4xl">Admin Home</h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base">Manage your store from one place.</p>
    </section>
  );
};

export default AdminHome;
