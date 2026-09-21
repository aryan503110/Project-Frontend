import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProducyById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [categoryList, setcategoryList] = useState([]);
  const [Loading, setLoading] = useState(false);

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

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/getproductbyid/" + id,
        );
        setname(res?.data?.product?.name);
        setdescription(res?.data?.product?.description);
        setcategoryId(res?.data?.product?.category);
        setImageUrl(res?.data?.product?.image);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
        console.log(err);
      }
    };
    getProductById();
  }, []);

  const handleUpdateProduct = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("categoryId", categoryId);
    if (image) {
      formdata.append("image", image);
    }

    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:3000/admin/upadteproduct/" + id,
        formdata,
      );

      toast.success(res?.data?.message);
      navigate("/allproducts");
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
    <>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-black sm:text-3xl">
          Edit Product
        </h1>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={label}>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
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
            <label className={label}>Category</label>

            <select
              required
              value={categoryId}
              onChange={(e) => {
                setcategoryId(e.target.value);
              }}
              className={field + " bg-white"}
            >
              <option value="" disabled>
                Select a category
              </option>

              {categoryList?.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.categoryName}
                </option>
              ))}
            </select>
          </div>
          {imageUrl && (
            <div>
              <label className={label}>Product Image</label>

              <div className="flex flex-col items-start gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center">
                <img
                  src={imageUrl}
                  alt="Current profile"
                  className="h-20 w-20 rounded-xl object-cover"
                />

                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    Current product picture
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Choose a new image below to replace it.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="image" className={label}>
              Change Product Picture
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
              className={field}
            />

            {image && (
              <p className="mt-2 text-xs text-zinc-500">
                Selected: {image.name}
              </p>
            )}
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
            onClick={handleUpdateProduct}
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

export default ProducyById;
