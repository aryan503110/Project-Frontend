import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  type Role = "" | "admin" | "salesperson" | "customer";
  const [role, setrole] = useState<Role>("");

  //Interface
  interface SignUpData {
    name: string;
    email: string;
    password: string;
    role: Role;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setrole(e.target.value as Role);
  };

  axios.defaults.withCredentials = true;
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const signupdata: SignUpData = {
      name,
      email,
      password,
      role,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/user/signup",
        signupdata,
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
      <div>Sign Up</div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        ></input>
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
        <select value={role} onChange={handleRoleChange}>
          <option value="">Select</option>
          <option value="admin">Admin</option>
          <option value="salesperson">Salesperson</option>
          <option value="customer">Customer</option>
        </select>
        <button onClick={handleSignUp}>Sign Up</button>
        <span>
          Already Have an Account ? <Link to="/login">Login</Link>
        </span>
      </div>
    </>
  );
};

export default SignUp;
