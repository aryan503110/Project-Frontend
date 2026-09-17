import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
         <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<AdminHome />}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
