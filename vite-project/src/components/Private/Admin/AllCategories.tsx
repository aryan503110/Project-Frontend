import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const AllCategories = () => {
  const navigate = useNavigate();
  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/allcategories",
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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#222]">Category List</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all product categories
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            navigate("/createcategory");
          }}
          className="rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#222] text-white">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Category Name
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categoryList?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-100 transition hover:bg-[#faf9f5]"
                >
                  <td className="px-6 py-5 text-center text-sm font-medium text-[#222]">
                    {item?.categoryName}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/categorybyid/${item?._id}`);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4a853]/40 text-[#b18a3e] transition hover:bg-[#d4a853] hover:text-black"
                      >
                        <FiEdit size={17} />
                      </button>

                      {/* Delete */}
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

              {categoryList?.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No categories found.
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

export default AllCategories;
