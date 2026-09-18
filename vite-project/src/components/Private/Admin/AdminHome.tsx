import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AdminHome = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);
  console.log(role, "aryan");
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
    <>
     <h1 className="text-4xl font-bold text-blue-500"> Admin Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default AdminHome;
