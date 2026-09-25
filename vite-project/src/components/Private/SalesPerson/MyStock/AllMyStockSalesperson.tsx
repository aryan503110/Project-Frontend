import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { FiEdit } from "react-icons/fi";

const AllMyStockSalesperson = () => {
  const navigate = useNavigate();
  const [stock, setstock] = useState([]);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const getMyStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/salesperson/salespersonmystock/" + userId,
        );

        setstock(res?.data?.stock);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    if (userId) {
      getMyStock();
    }
  }, [userId]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
            My Stock
          </h1>

          <p className="mt-1 text-sm text-gray-500">See your current stock.</p>
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
                  In Stock
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {stock?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.product?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.product?.description}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.stock}
                  </td>

                  <td className="px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/salesperson/editmystocksalesperson/${item?._id}`);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4a853]/40 text-[#b18a3e] transition hover:bg-[#d4a853] hover:text-black"
                      >
                        <FiEdit size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {stock?.length === 0 && (
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

export default AllMyStockSalesperson;
