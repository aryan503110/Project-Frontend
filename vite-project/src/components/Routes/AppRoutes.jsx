import { Routes, Route } from "react-router-dom";
import SignUp from "../Public/SignUp";
import Login from "../Public/Login";
import AdminHome from "../Private/Admin/AdminHome";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import SalespersonHome from "../Private/SalesPerson/SalespersonHome";
import CustomerHome from "../Private/Customer/CustomerHome";
import Unauthorized from "../Public/Unauthorized";
import Forgotpassword from "../Public/ForgotPassword/Forgotpassword";
import OTPAuthenticator from "../Public/ForgotPassword/OTPAuthenticator";
import ResetPassword from "../Public/ForgotPassword/ResetPassword";
import Layout from "../Private/Layout";
import AllSalesPerson from "../Private/Admin/Salesperson/AllSalesPerson";
import SalespersonById from "../Private/Admin/Salesperson/SalespersonById";
import AllCategories from "../Private/Admin/Category/AllCategories";
import CreateCategory from "../Private/Admin/Category/CreateCategory";
import CategoryById from "../Private/Admin/Category/CategoryById";
import AllProduct from "../Private/Admin/Product/AllProduct";
import CreateProduct from "../Private/Admin/Product/CreateProduct";
import ProductById from "../Private/Admin/Product/ProductById";
import AllAdminStock from "../Private/Admin/AdminStock/AllAdminStock";
import CreateAdminStock from "../Private/Admin/AdminStock/CreateAdminStock";
import AdminStockById from "../Private/Admin/AdminStock/AdminStockById";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/otp-page" element={<OTPAuthenticator />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute role="admin" />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<AdminHome />}></Route>
            <Route path="/allsalesperson" element={<AllSalesPerson />}></Route>
            <Route
              path="/salespersonbyid/:id"
              element={<SalespersonById />}
            ></Route>
            <Route path="/allcategories" element={<AllCategories />}></Route>
            <Route path="/createcategory" element={<CreateCategory />}></Route>
            <Route path="/categorybyid/:id" element={<CategoryById />}></Route>
            <Route path="/allproducts" element={<AllProduct />}></Route>
            <Route path="/createproduct" element={<CreateProduct />}></Route>
            <Route path="/productbyid/:id" element={<ProductById />}></Route>
            <Route path="/alladminstock" element={<AllAdminStock />}></Route>
            <Route path="/createadminstock" element={<CreateAdminStock />}></Route>
            <Route path="/adminstockbyid/:id" element={<AdminStockById />}></Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="salesperson" />}>
          <Route element={<Layout />}>
            <Route
              path="/salespersonhome"
              element={<SalespersonHome />}
            ></Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="customer" />}>
          <Route element={<Layout />}>
            <Route path="/customerhome" element={<CustomerHome />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
