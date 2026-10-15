import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
import { FaFileDownload } from "react-icons/fa";

// One soft color per order status
const STATUS_STYLES: Record<string, string> = {
  ordered: "bg-[#FFD166]",
  dispatched: "bg-[#FF8FB8]",
  delivered: "bg-[#BFEFD9]",
};

const BasketOrders = () => {
  const navigate = useNavigate();
  const [myOrders, setmyOrders] = useState<any[]>([]);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const timer = setTimeout(() => {
      const getMyStock = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/customer/getbaskets/${userId}`,
          );
          setmyOrders(res?.data?.baskets);
          console.log("res", res.data.baskets);
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
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const downloadInvoice = async (orderId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoice/${orderId}`,
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

  const th = "px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4";
  const td =
    "px-4 py-4 text-center text-sm font-medium text-[#4A2418] sm:px-6 sm:py-5";

  return (
    <div className="explore-candy w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A2418] sm:text-4xl">
          Basket Orders
        </h1>

        <p className="mt-1 text-base text-[#4A2418]/70">
          See all your custom basket orders here.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] shadow-[5px_5px_0_#4A2418]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left">
            <thead className="bg-[#4A2418] text-[#FFF8EC]">
              <tr>
                <th className={th}>Basket Items</th>
                <th className={th}>Gift</th>
                 <th className={th}>Gift Message</th>
                <th className={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {myOrders?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b-2 border-dashed border-[#4A2418]/20 transition last:border-b-0 hover:bg-[#FFF0C9]"
                >
                  <td className={td}>
                    {item?.items
                      ?.map((abc) => abc?.salespersonStock?.product?.name)
                      .filter(Boolean)
                      .join(", ")}
                  </td>

                  <td className={td}>
                    {item?.isGift ? "Yes" : "No"}
                  </td>

                  <td className={td}>
                    {item?.giftMessage ? item?.giftMessage : "-"}
                  </td>

                  <td className="px-4 py-3 text-center sm:px-6 sm:py-4">
                    <span
                      className={`rounded-full border-2 border-[#4A2418] px-3 py-0.5 text-xs font-semibold capitalize text-[#4A2418] ${
                        STATUS_STYLES[item?.orderStatus] ?? "bg-white"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                </tr>
              ))}

              {myOrders?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-4xl">🍪</div>
                    <p className="mt-2 text-sm font-medium text-[#4A2418]/70">
                      No orders found.
                    </p>
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

export default BasketOrders;
