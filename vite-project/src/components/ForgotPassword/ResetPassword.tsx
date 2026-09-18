import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setnewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  //Interface
  interface ResetPasswordData {
    email: string;
    newPassword: string;
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewPassword(e.target.value);
  };

  axios.defaults.withCredentials = true;
  const handleResetPassword = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      navigate("/forgot-password");
      return;
    }

    const resetpassworddata: ResetPasswordData = {
      email,
      newPassword,
    };
    try {
      const res = await axios.put(
        "http://localhost:3000/user/reset-password",
        resetpassworddata,
      );

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
      <div>Enter New Password</div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        ></input>
        <button onClick={handleResetPassword}>Submit</button>
      </div>
    </>
  );
};

export default ResetPassword;
