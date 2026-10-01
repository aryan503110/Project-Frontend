import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import type { RootState } from "../Redux/store";
import { MdStars } from "react-icons/md";

const Navbar = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const name = useSelector((state: RootState) => state.auth.name);
  const image = useSelector((state: RootState) => state.auth.image);
  const isPremium = useSelector((state: RootState) => state.auth.isPremium);
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const linkClass = (path: string) =>
    `rounded-lg px-4 py-3 text-sm font-medium text-white no-underline transition hover:bg-[#444] ${
      location.pathname === path ? "bg-[#444]" : ""
    }`;

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });

      toast.success(res.data.message);

      closeDrawer();
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

  const handleUserProfileEdit = async () => {
    try {
      navigate("/userprofile/edit");
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
    <nav className="shrink-0 bg-[#222] text-white md:min-h-screen md:w-60">
      <div className="flex items-center justify-between p-4 md:hidden">
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a853] font-bold text-black">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold">{name}</p>

              {isPremium && (
                <MdStars
                  size={18}
                  className="text-[#d4a853]"
                  title="Premium Member"
                />
              )}
            </div>
            <p className="text-xs capitalize text-gray-400">{role}</p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-lg p-2 transition hover:bg-[#444] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {isDrawerOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#222] p-5 shadow-2xl transition-transform duration-300 md:static md:min-h-screen md:w-60 md:translate-x-0 md:shadow-none ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="mb-8 flex items-center justify-between cursor-pointer"
          onClick={handleUserProfileEdit}
        >
          <div className="flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a853] font-bold text-black">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">{name}</p>

                {isPremium && (
                  <MdStars
                    size={18}
                    className="text-[#d4a853]"
                    title="Premium Member"
                  />
                )}
              </div>
              <p className="text-xs capitalize text-gray-400">{role}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
            className="rounded-lg p-2 transition hover:bg-[#444] md:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {/* Admin Links */}
          {role === "admin" && (
            <>
              <Link
                to="/home"
                onClick={closeDrawer}
                className={linkClass("/home")}
              >
                Dashboard
              </Link>

              <Link
                to="/allsalesperson"
                onClick={closeDrawer}
                className={linkClass("/allsalesperson")}
              >
                Salespersons
              </Link>

              <Link
                to="/allcategories"
                onClick={closeDrawer}
                className={linkClass("/allcategories")}
              >
                Categories
              </Link>

              <Link
                to="/allproducts"
                onClick={closeDrawer}
                className={linkClass("/allproducts")}
              >
                Products
              </Link>

              <Link
                to="/alladminstock"
                onClick={closeDrawer}
                className={linkClass("/alladminstock")}
              >
                Admin Stock
              </Link>

              <Link
                to="/adminallstockrequest"
                onClick={closeDrawer}
                className={linkClass("/adminallstockrequest")}
              >
                Stock Requests
              </Link>
            </>
          )}

          {/* Salesperson Links */}
          {role === "salesperson" && (
            <>
              <Link
                to="/salespersonhome"
                onClick={closeDrawer}
                className={linkClass("/salespersonhome")}
              >
                Dashboard
              </Link>

              <Link
                to="/salesperson/products"
                onClick={closeDrawer}
                className={linkClass("/salesperson/products")}
              >
                Products
              </Link>

              <Link
                to="/salesperson/mystock"
                onClick={closeDrawer}
                className={linkClass("/salesperson/mystock")}
              >
                My Stock
              </Link>

              <Link
                to="/salesperson/allstockrequest"
                onClick={closeDrawer}
                className={linkClass("/salesperson/allstockrequest")}
              >
                Stock Requests
              </Link>

              <Link
                to="/salesperson/orders"
                onClick={closeDrawer}
                className={linkClass("/salesperson/orders")}
              >
                Orders
              </Link>
            </>
          )}

          {/* Customer Links */}
          {role === "customer" && (
            <>
              <Link
                to="/explore"
                onClick={closeDrawer}
                className={linkClass("/explore")}
              >
                Explore
              </Link>

              <Link
                to="/cart"
                onClick={closeDrawer}
                className={linkClass("/cart")}
              >
                Cart
              </Link>

              <Link
                to="/myorders"
                onClick={closeDrawer}
                className={linkClass("/myorders")}
              >
                My Orders
              </Link>
            </>
          )}
        </div>

        <div className="mt-auto">
          {role === "customer" && !isPremium && (
            <Link
              to="/buy-premium"
              onClick={closeDrawer}
              className="mb-2 flex w-full gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#d4a853] transition hover:bg-[#444]"
            >
              <MdStars size={18} />
              Buy Premium
            </Link>
          )}

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-[#d4a853] hover:text-black"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
