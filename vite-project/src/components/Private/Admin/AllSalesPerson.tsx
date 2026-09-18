import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const AllSalesPerson = () => {
  const navigate = useNavigate();
  const [salesPersonList, setsalesPersonList] = useState([]);

  useEffect(() => {
    const getSalespersons = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/allsalesperson",
        );
        setsalesPersonList(res?.data?.salespersons);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    getSalespersons();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#222]">SalesPerson List</h1>

          <p className="mt-1 text-sm text-gray-500">Manage all salespersons</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#222] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-center">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-center">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-center">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {salesPersonList?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition duration-200 hover:bg-[#EFF6FF]"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#222] text-center">
                    {item?.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {item?.email}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold capitalize text-[#2563EB] ">
                      {item?.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
                      >
                        <FiEdit size={17} />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <MdDeleteOutline size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllSalesPerson;
