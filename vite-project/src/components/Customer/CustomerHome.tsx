import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerHome = () => {
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
    <>
       Customer Home
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default CustomerHome
