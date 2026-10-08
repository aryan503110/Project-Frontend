import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegTrashCan } from "react-icons/fa6";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setcategoryId] = useState("");
  const [cocoaPercentage, setcocoaPercentage] = useState<number>(0);
  const [weight, setweight] = useState<number>(0);
  const [weightType, setweightType] = useState("");
  const [flavors, setflavors] = useState<string[]>([""]);
  const [categoryList, setcategoryList] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/allcategories`,
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

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("cocoaPercentage", String(cocoaPercentage));
    formData.append("weight", String(weight));
    formData.append("weightType", weightType);
    formData.append(
      "flavors",
      JSON.stringify(flavors?.filter((flavor) => flavor.trim() !== "")),
    );
    if (image) {
      formData.append("image", image);
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/createproduct`,
        formData,
      );

      toast.success(res.data.message);
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

  const handleFlavorChange = (index: number, value: string) => {
    const updatedFlavors = [...flavors];
    updatedFlavors[index] = value;
    setflavors(updatedFlavors);
  };

  const addFlavor = () => {
    setflavors([...flavors, ""]);
  };

  const removeFlavor = (index: number) => {
    const updatedFlavors = flavors.filter((_, i) => i !== index);
    setflavors(updatedFlavors);
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-2">
        <div>
          <label className={label}>Product Name</label>
          <input
            type="text"
            placeholder="Enter Product name"
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
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-2">
        <div>
          <label htmlFor="image" className={label}>
            Image
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
            <p className="mt-2 text-xs text-zinc-500">Selected: {image.name}</p>
          )}
        </div>
        <div>
          <label className={label}>Cocoa %</label>
          <input
            type="number"
            placeholder="Cocoa %"
            value={cocoaPercentage}
            min={0}
            max={100}
            onChange={(e) => {
              setcocoaPercentage(Number(e.target.value));
            }}
            onWheel={(e) => e.currentTarget.blur()}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Weight</label>
          <input
            type="number"
            placeholder="Weight"
            value={weight}
            min={0}
            onChange={(e) => {
              setweight(Number(e.target.value));
            }}
            onWheel={(e) => e.currentTarget.blur()}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Weight Type</label>
          <select
            required
            value={weightType}
            onChange={(e) => {
              setweightType(e.target.value);
            }}
            className={field + " bg-white"}
          >
            <option value="" disabled>
              Select weight type
            </option>

            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-2">
        <div className="mt-4">
          <label className={label}>Flavors</label>

          <div className="space-y-3">
            {flavors.map((flavor, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Flavor ${index + 1}`}
                  value={flavor}
                  onChange={(e) => handleFlavorChange(index, e.target.value)}
                  className={field}
                />

                {flavors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFlavor(index)}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-red cursor-pointer   "
                  >
                    <FaRegTrashCan />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addFlavor}
            className="mt-3 rounded-xl bg-[#222] px-4 py-2 text-sm font-medium text-white hover:bg-[#d4a853] hover:text-black"
          >
            Add Flavor
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
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
          {Loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
