import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setcategoryName] = useState("");
  const [Loading, setLoading] = useState(false);

  interface CategoryData {
    categoryName: string;
  }

  const handleAddCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const categorydata: CategoryData = { categoryName };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/admin/createcategory",
        categorydata,
      );

      toast.success(res.data.message);
      navigate("/allcategories");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">Create Category</h1>
      </div>

      {/* Form Card */}
      <div className="max-w-xl rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div>
          <label className="mb-2 block text-[13px] font-medium text-gray-600">
            Category Name
          </label>

          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => {
              setcategoryName(e.target.value);
            }}
            className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-[15px] text-[#222] placeholder-gray-400 outline-none transition hover:border-gray-300 focus:border-[#d4a853] focus:bg-white focus:ring-4 focus:ring-[#d4a853]/10"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/allcategories")}
            disabled={Loading}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddCategory}
            disabled={Loading}
            className="flex-1 rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
