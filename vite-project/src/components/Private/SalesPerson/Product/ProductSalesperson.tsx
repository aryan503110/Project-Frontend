import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSalesperson = () => {
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
            `${import.meta.env.VITE_API_URL}/salesperson/allproducts?search=${search}&category=${categoryId}`,
          );
          setproductList(res?.data?.products);
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
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
            Product List
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            See all available products.
          </p>
        </div>
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-120 text-left">
            <thead className="bg-[#222] text-white">
              <tr>
                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Product Name
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Description
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Category
                </th>
              </tr>
            </thead>

            <tbody>
              {productList?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.description}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.category?.categoryName}
                  </td>
                </tr>
              ))}

              {productList?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSalesperson;
