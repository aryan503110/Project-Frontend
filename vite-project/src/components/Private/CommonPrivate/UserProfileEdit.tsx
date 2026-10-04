import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/get-user/${userId}`,
        );
        setName(res?.data?.user?.name);
        setEmail(res?.data?.user?.email);
        setImageUrl(res?.data?.user?.image);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }

        console.log(err);
      }
    };

    getUserById();
  }, []);

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("password", password);
    if (image) {
      formdata.append("image", image);
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-user/${userId}`,
        formdata,
      );

      toast.success(res?.data?.message);
      navigate(-1);
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-semibold text-[#222] sm:text-3xl">
          Edit Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Cooper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            disabled
            type="email"
            placeholder="jane.cooper@example.com"
            value={email}
            required
            className={field}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={field}
          />
        </div>

        <div>
          <label htmlFor="image" className={label}>
            Profile Image
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
        </div>
      </div>
      {imageUrl && (
        <div>
          <label className={label}>Profile Picture</label>

          <div className="flex flex-col items-start gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center">
            <img
              src={imageUrl}
              alt="Current profile"
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div>
              <p className="text-sm font-medium text-zinc-600">
                Current Profile Picture
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={loading}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleUpdateProfile}
          disabled={loading}
          className="flex-1 rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Editing..." : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfileEdit;
