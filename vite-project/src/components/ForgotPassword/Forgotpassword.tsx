import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");

  //Interface
  interface ForgotPasswordData {
    email: string;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  axios.defaults.withCredentials = true;
  const handleForgotPassword = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const forgotpassworddata: ForgotPasswordData = {
      email,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/user/forgot-password",
        forgotpassworddata,
      );

      toast.success(res.data.message);
      navigate(`/otp-page?email=${email}`);
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
      <div>Enter Email to Recover Password</div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        ></input>
        <button onClick={handleForgotPassword}>Submit Email</button>
      </div>
    </>
  );
};

export default Forgotpassword;
