import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSalesperson = () => {
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/salesperson/allproducts",
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
  }, []);

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
