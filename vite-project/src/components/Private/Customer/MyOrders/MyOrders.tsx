import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { FaFileDownload } from "react-icons/fa";

const MyOrders = () => {
  const navigate = useNavigate();
  const [myOrders, setmyOrders] = useState([]);
  const [toggle, settoggle] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const getMyStock = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/customer/myorder/" + userId,
        );
        setmyOrders(res?.data?.order);
        console.log("res", res.data.order);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    getMyStock();
  }, []);

  const downloadInvoice = async (orderId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/invoice/${orderId}`,
        {
          withCredentials: true,
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;
      link.download = `invoice-${orderId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">All Orders.</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left">
            <thead className="bg-[#222] text-white">
              <tr>
                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Product Name
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Salesperson
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Amount Paid
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Status
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Invoice
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.product?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.salesperson?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.totalAmount}
                  </td>

                  <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                    <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold capitalize text-[#2563EB] ">
                      {item?.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                    <button
                      type="button"
                      onClick={() => downloadInvoice(item?._id)}
                      className="rounded-lg  px-4 py-2 text-sm font-semibold text-black pointer-fine:"
                    >
                      <FaFileDownload/>
                    </button>
                  </td>
                </tr>
              ))}

              {myOrders?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No orders found.
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

export default MyOrders;
