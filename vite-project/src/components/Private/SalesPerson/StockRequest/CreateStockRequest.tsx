import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";

const CreateStockRequest = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [stock, setstock] = useState<number>(0);
  const [productId, setproductId] = useState("");
  const [productList, setproductList] = useState([]);
  const [Loading, setLoading] = useState(false);

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

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!productId) {
      toast.error("Please select a product");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/salesperson/createstockrequest",
        { salesperson: userId, product: productId, stock },
      );

      toast.success(res.data.message);
      navigate("/salesperson/allstockrequest");
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

  const field =
    "w-full rounded-xl border border-white/10 px-4 py-3 text-[15px] text-black placeholder-zinc-600 outline-none transition " +
    "hover:border-white/20 focus:border-[#d4a853]/60 focus:ring-4 focus:ring-[#d4a853]/10 disabled:opacity-50";

  const label = "mb-2 block text-[13px] font-medium text-zinc-600";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
          Create Product
        </h1>
      </div>

      {/* Form Card */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={label}>Product</label>

          <select
            required
            value={productId}
            onChange={(e) => {
              setproductId(e.target.value);
            }}
            className={field + " bg-white"}
          >
            <option value="" disabled>
              Select a Product
            </option>

            {productList?.map((item) => (
              <option key={item?._id} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Stock</label>
          <input
            type="number"
            placeholder="Enter Stock"
            value={stock}
            onChange={(e) => {
              setstock(Number(e.target.value));
            }}
            className={field}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate("/allproducts")}
          disabled={Loading}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleAddProduct}
          disabled={Loading}
          className="flex-1 rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {Loading ? "Creating..." : "Create Stock Request"}
        </button>
      </div>
    </div>
  );
};

export default CreateStockRequest;
