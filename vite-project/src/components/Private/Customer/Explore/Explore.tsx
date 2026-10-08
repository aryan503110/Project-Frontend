import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { MdStars } from "react-icons/md";

const Explore = () => {
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [search, setsearch] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const isPremium = useSelector((state: RootState) => state.auth.isPremium);

  useEffect(() => {
    const timer = setTimeout(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/customer/availablecustomerproducts?search=${search}&category=${categoryId}`,
          );

          setproductList(res?.data?.stock || []);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }

          console.log(err);
        }
      };

      getProducts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search, categoryId]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/allcategories`,
        );
        setcategoryList(res?.data?.categories);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    getCategories();
  }, []);

  const categoryOptions = categoryList?.map((item) => ({
    label: item?.categoryName,
    value: item?._id,
  }));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="mt-1 text-2xl font-bold text-[#222] sm:text-3xl">
          Explore Products
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Browse our available products.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            className="w-75 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#222] shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
          />
        </div>

        {/* Category */}
        <div className="sm:w-56">
          <select
            value={categoryId}
            onChange={(e) => {
              setcategoryId(e.target.value);
            }}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#222] shadow-sm outline-none transition focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
          >
            <option value="">All Categories</option>

            {categoryOptions?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards */}
      {productList?.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productList
            ?.filter((item) => isPremium || item.premiumOnly === false)
            ?.map((item) => (
              <div
                key={item?._id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#d4a853]/50 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-[#f5f4f1]">
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Stock */}
                  <div
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white flex gap-1 ${
                      item?.premiumOnly ? "bg-[#c0a13a]" : "bg-[#222]/90"
                    }`}
                  >
                    {item?.premiumOnly ? <MdStars size={16} /> : ""}
                    {item?.stock} in stock
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="truncate text-base font-bold text-[#222]">
                    {item?.product?.name}
                  </h2>

                  <p className="mt-1 line-clamp-2 min-h-[20px] text-xs leading-5 text-gray-500">
                    {item?.product?.description}
                  </p>

                  <span className="mt-2 inline-flex items-center rounded-full border border-[#d4a853]/30 bg-[red]/10 px-3 py-1 text-xs font-medium text-[#9a7428]">
                    Seller {item?.salesperson?.name}
                  </span>

                  {/* Prices */}
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <div className="flex items-end justify-between">
                      {/* Regular */}
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                          Regular
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-[#222]">
                          ₹{item?.normalSellingPrice?.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Subscription */}
                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#b18a3e]">
                          Subscription
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-[#b18a3e]">
                          ₹
                          {item?.subscriptionSellingPrice?.toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Details */}
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/exploreproductbyid/${item?._id}`);
                    }}
                    className="mt-3 w-full rounded-lg bg-[#222] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <h2 className="text-base font-semibold text-[#222]">
            No products available
          </h2>

          <p className="mt-1 text-sm text-gray-500">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
