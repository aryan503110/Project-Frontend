import { Routes, Route } from "react-router-dom";
import SignUp from "../Public/SignUp";
import Login from "../Public/Login";
import AdminHome from "../Private/Admin/AdminHome";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import SalespersonHome from "../Private/SalesPerson/SalespersonHome";
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
import ProductSalesperson from "../Private/SalesPerson/Product/ProductSalesperson";
import AllStockRequest from "../Private/SalesPerson/StockRequest/AllStockRequest";
import CreateStockRequest from "../Private/SalesPerson/StockRequest/CreateStockRequest";
import AdminAllStockRequest from "../Private/Admin/StockRequest/AdminAllStockRequest";
import AllMyStockSalesperson from "../Private/SalesPerson/MyStock/AllMyStockSalesperson";
import EditMyStockSalesperson from "../Private/SalesPerson/MyStock/EditMyStockSalesperson";
import Explore from "../Private/Customer/Explore/Explore";
import ExploreProductById from "../Private/Customer/Explore/ExploreProductById";
import Cart from "../Private/Customer/Cart/Cart";
import PaymentSuccess from "../Private/Customer/Cart/PaymentSuccess";
import MyOrders from "../Private/Customer/MyOrders/MyOrders";
import Orders from "../Private/SalesPerson/Orders/Orders";
import BuyPremium from "../Private/Customer/BuyPremium";
import PremiumSuccess from "../Private/Customer/PremiumSuccess";
import UserProfileEdit from "../Private/CommonPrivate/UserProfileEdit";
import Welcome from "../Public/Welcome";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
         <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/otp-page" element={<OTPAuthenticator />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/userprofile/edit" element={<UserProfileEdit />} />
          </Route>
        </Route>
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
            <Route
              path="/createadminstock"
              element={<CreateAdminStock />}
            ></Route>
            <Route
              path="/adminstockbyid/:id"
              element={<AdminStockById />}
            ></Route>
            <Route
              path="/adminallstockrequest"
              element={<AdminAllStockRequest />}
            ></Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="salesperson" />}>
          <Route element={<Layout />}>
            <Route
              path="/salespersonhome"
              element={<SalespersonHome />}
            ></Route>
            <Route
              path="/salesperson/products"
              element={<ProductSalesperson />}
            ></Route>
            <Route
              path="/salesperson/allstockrequest"
              element={<AllStockRequest />}
            ></Route>
            <Route
              path="/salesperson/createstockrequest"
              element={<CreateStockRequest />}
            ></Route>
            <Route
              path="/salesperson/mystock"
              element={<AllMyStockSalesperson />}
            ></Route>
            <Route
              path="/salesperson/editmystocksalesperson/:id"
              element={<EditMyStockSalesperson />}
            ></Route>
            <Route path="/salesperson/orders" element={<Orders />}></Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute role="customer" />}>
          <Route element={<Layout />}>
            <Route path="/explore" element={<Explore />}></Route>
            <Route
              path="/exploreproductbyid/:id"
              element={<ExploreProductById />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/payment-success" element={<PaymentSuccess />}></Route>
            <Route path="/myorders" element={<MyOrders />}></Route>
            <Route path="/buy-premium" element={<BuyPremium />}></Route>
            <Route path="/premium-success" element={<PremiumSuccess />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
