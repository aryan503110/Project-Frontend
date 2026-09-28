import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const BuyPremium = () => {
  const handleBuyPremium = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/create-premium-checkout",
        {},
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-[#d4a853] bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-[#222]">Go Premium 👑</h1>

        <p className="mt-3 text-gray-500">
          Unlock premium benefits and enjoy a better shopping experience.
        </p>

        <div className="mt-6">
          <p className="text-3xl font-bold text-[#222]">₹499</p>

          <p className="text-sm text-gray-500">30 days premium membership</p>
        </div>

        <button
          type="button"
          onClick={handleBuyPremium}
          className="mt-6 w-full rounded-lg bg-[#d4a853] px-4 py-3 font-semibold text-black transition hover:bg-[#c39745]"
        >
          Buy Premium
        </button>
      </div>
    </div>
  );
};

export default BuyPremium;
