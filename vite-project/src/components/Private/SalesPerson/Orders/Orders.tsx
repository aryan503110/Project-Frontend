import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { FiEdit } from "react-icons/fi";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setorders] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const timer = setTimeout(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/salesperson/ordersbysalesperson/${userId}?search=${search}&status=${status}`,
          );
          setorders(res?.data?.order);
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
  }, [toggle, search, status]);

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/salesperson/changeorderstatus",
        {
          orderId: id,
          status: status,
        },
      );
      settoggle((prev) => !prev);
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
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">See all orders.</p>
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
        <div className="sm:w-56">
          <select
            value={status}
            onChange={(e) => {
              setstatus(e.target.value);
            }}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#222] shadow-sm outline-none transition focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
          >
            <option value="">Status</option>
            <option value="ordered">Ordered</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
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
                  Customer
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Amount
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.product?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.customer?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.totalAmount}
                  </td>

                  <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                    <select
                      disabled={item?.orderStatus == "delivered"}
                      value={item?.orderStatus}
                      onChange={(e) => {
                        changeStatus(item?._id, e.target.value);
                      }}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
                    >
                      <option value="ordered">Ordered</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}

              {orders?.length === 0 && (
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

export default Orders;
