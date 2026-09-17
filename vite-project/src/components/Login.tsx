import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //Interface
  interface LoginData {
    email: string;
    password: string;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  axios.defaults.withCredentials = true;
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const logindata: LoginData = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        logindata,
      );

      toast.success(res.data.message);
      if (res?.data?.role === "admin") {
        navigate("/home");
      } else if (res?.data?.role === "salesperson") {
        navigate("/salespersonhome");
      } else {
        navigate("/customerhome");
      }
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
      <div>Login</div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        ></input>
        <button onClick={handleLogin}>Login</button>
        <span>
          Dont Have an Account ? <Link to="/">SignUp</Link>
        </span>
      </div>
    </>
  );
};

export default Login;
