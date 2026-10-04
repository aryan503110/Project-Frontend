import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const AllAdminStock = () => {
  const navigate = useNavigate();
  const [adminStockList, setadminStockList] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [search, setsearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const getAdminStock = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/alladminstock?search=${search}`,
          );
          setadminStockList(res?.data?.adminstock);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data?.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }

          console.log(err);
        }
      };
      getAdminStock();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [toggle,search]);

  const handleDeleteAdminStock = async (id) => {
    try {
      if (!id) {
        return toast.error("Cannot find admin stock");
      }
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/deleteadminstock/` + id,
      );

      toast.success(res?.data?.message);
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
            Admin Stock List
          </h1>

          <p className="mt-1 text-sm text-gray-500">Manage all admin stock.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            navigate("/createadminstock");
          }}
          className="w-full rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black sm:w-auto"
        >
          + Add Admin Stock
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search Product..."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            className="w-75 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#222] shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20"
          />
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
                  Stock
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Amount
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold sm:px-6 sm:py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {adminStockList?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.product?.name}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.stock}
                  </td>

                  <td className="px-4 py-4 text-center text-sm font-medium text-[#222] sm:px-6 sm:py-5">
                    {item?.purchasePrice}
                  </td>

                  <td className="px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/adminstockbyid/${item?._id}`);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4a853]/40 text-[#b18a3e] transition hover:bg-[#d4a853] hover:text-black"
                      >
                        <FiEdit size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          handleDeleteAdminStock(item?._id);
                        }}
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <MdDeleteOutline size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {adminStockList?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No Admin Stock found.
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

export default AllAdminStock;
