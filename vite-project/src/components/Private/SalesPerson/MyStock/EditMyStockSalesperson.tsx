import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditMyStockSalesperson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState();
  const [normalsellingprice, setnormalsellingprice] = useState();
  const [subscriptionsellingprice, setsubscriptionsellingprice] = useState();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/salesperson/salespersonmystockbyid/" + id,
        );
        console.log(res, "res");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    getData();
  }, []);

  // const handleUpdateProduct = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   formdata.append("name", name);
  //   formdata.append("description", description);
  //   formdata.append("categoryId", categoryId);
  //   if (image) {
  //     formdata.append("image", image);
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.put(
  //       "http://localhost:3000/admin/upadteproduct/" + id,
  //       formdata,
  //     );

  //     toast.success(res?.data?.message);
  //     navigate("/allproducts");
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       toast.error(err.response?.data?.message || "Something went wrong");
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const field =
    "w-full rounded-xl border border-white/10 px-4 py-3 text-[15px] text-black placeholder-zinc-600 outline-none transition " +
    "hover:border-white/20 focus:border-[#d4a853]/60 focus:ring-4 focus:ring-[#d4a853]/10 disabled:opacity-50";

  const label = "mb-2 block text-[13px] font-medium text-zinc-600";

  return (
    <>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">
          Edit Your Stock
        </h1>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={label}>Product</label>
            <input
              type="text"
              placeholder="Enter Product"
              value={name}
              className={field}
            />
          </div>
          <div>
            <label className={label}>Description</label>

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              className={field}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={label}>Stock</label>
            <input
              type="number"
              placeholder="Enter stock"
              value={stock}
              className={field}
            />
          </div>

          <div>
            <label className={label}>Normal Selling Price</label>
            <input
              type="number"
              placeholder="Enter NSP"
              value={normalsellingprice}
              className={field}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={label}>Subscription Selling Price</label>
            <input
              type="number"
              placeholder="Enter SSP"
              value={subscriptionsellingprice}
              className={field}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/allproducts")}
            disabled={Loading}
            className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-600 transition hover:border-white/20 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            // onClick={handleUpdateProduct}
            disabled={Loading}
            className="flex-1 rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e2b968] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditMyStockSalesperson;
