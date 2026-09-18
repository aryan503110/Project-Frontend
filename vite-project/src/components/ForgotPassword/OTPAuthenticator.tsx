import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OTPAuthenticator = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState(0);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  //Interface
  interface VerifyOTPData {
    email: string;
    otp: number;
  }

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setotp(Number(e.target.value));
  };

  axios.defaults.withCredentials = true;
  const handleSubmitOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      navigate("/forgot-password");
      return;
    }

    const verifyotpdata: VerifyOTPData = {
      email,
      otp,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/user/verify-otp",
        verifyotpdata,
      );

      toast.success(res.data.message);
      navigate(`/reset-password?email=${email}`);
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
      <div>OTP Authenticator</div>
      <div>
        <input
          type="number"
          placeholder="OTP"
          value={otp}
          onChange={handleOTPChange}
          required
        ></input>
        <button onClick={handleSubmitOTP}>Submit OTP</button>
      </div>
    </>
  );
};

export default OTPAuthenticator;
