import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdStars } from "react-icons/md";

const Explore = () => {
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [search, setsearch] = useState("");
  const [categoryId, setcategoryId] = useState("");

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

  const visibleProducts = (productList || [])?.filter(
    (item) => item?.premiumOnly === false,
  );

  return (
    <div className="explore-candy w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A2418] sm:text-4xl">
          Discover a World of Sweet Delights
        </h1>

        <p className="mt-1 text-base text-[#4A2418]/70">
          🍬 Browse our sweet collection
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <input
          type="text"
          placeholder="Search treats..."
          onChange={(e) => {
            setsearch(e.target.value);
          }}
          className="w-full rounded-full border-2 border-[#4A2418] bg-[#FFF8EC] px-5 py-2.5 text-sm font-medium text-[#4A2418] shadow-[3px_3px_0_#4A2418] outline-none transition placeholder:text-[#4A2418]/45 focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50 sm:w-80"
        />

        {/* Category */}
        <div className="relative sm:w-56">
          <select
            value={categoryId}
            onChange={(e) => {
              setcategoryId(e.target.value);
            }}
            className="w-full cursor-pointer appearance-none rounded-full border-2 border-[#4A2418] bg-[#FFF8EC] py-2.5 pl-5 pr-10 text-sm font-medium text-[#4A2418] shadow-[3px_3px_0_#4A2418] outline-none transition focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50"
          >
            <option value="">All Categories</option>

            {categoryOptions?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#4A2418]">
            ▼
          </span>
        </div>
      </div>

      {/* Product Cards */}
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts?.map((item) => (
            <div
              key={item?._id}
              onClick={() => {
                navigate(`/exploreproductbyid/${item?._id}`);
              }}
              className="group cursor-pointer overflow-hidden rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] shadow-[5px_5px_0_#4A2418]"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden border-b-2 border-[#4A2418] bg-[#FFE3EE]">
                <img
                  src={item?.product?.image}
                  alt={item?.product?.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Stock */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border-2 border-[#4A2418] bg-[#FFD166] px-2.5 py-0.5 text-[11px] font-semibold text-[#4A2418]">
                  {item?.premiumOnly ? <MdStars size={14} /> : null}
                  {item?.stock} in stock
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="truncate text-lg font-bold text-[#4A2418]">
                  {item?.product?.name}
                </h2>

                <p className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-[#4A2418]/70">
                  {item?.product?.description}
                </p>

                <p className="mt-2 text-xs font-medium text-[#4A2418]/60">
                  Seller: {item?.salesperson?.name}
                </p>

                {/* Prices */}
                <div className="mt-3 flex items-end justify-between border-t-2 border-dashed border-[#4A2418]/25 pt-3">
                  <div>
                    <p className="text-xs text-[#4A2418]/60">Regular</p>
                    <p className="text-base font-semibold text-[#4A2418]">
                      ₹{item?.normalSellingPrice?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-full border-2 border-[#4A2418] bg-[#FF8FB8] px-3 py-1 text-right">
                    <p className="text-[10px] font-medium leading-none text-[#4A2418]/80">
                      Subscription
                    </p>
                    <p className="text-base font-bold leading-tight text-[#4A2418]">
                      ₹{item?.subscriptionSellingPrice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* View Details */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/exploreproductbyid/${item?._id}`);
                  }}
                  className="mt-4 w-full rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-4 py-2 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-sm rounded-3xl border-2 border-dashed border-[#4A2418] bg-[#FFF8EC] px-6 py-10 text-center">
          <div className="text-4xl">🍪</div>

          <h2 className="mt-2 text-lg font-bold text-[#4A2418]">
            No sweets found
          </h2>

          <p className="mt-1 text-sm text-[#4A2418]/70">
            Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;
