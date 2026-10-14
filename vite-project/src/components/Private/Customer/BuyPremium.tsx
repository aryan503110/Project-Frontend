
import React from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const BuyPremium = () => {
  const handleBuyPremium = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/create-premium-checkout`,
        {},
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Failed to create premium checkout:", err);
    }
  };

  const benefits = [
    {
      icon: "◇",
      title: "Exclusive Sweet Discounts",
      description: "Enjoy special prices on your favourite sweets.",
    },
    {
      icon: "✧",
      title: "Premium Sweet Collection",
      description: "Explore our finest and exclusive sweet selections.",
    },
    {
      icon: "▧",
      title: "Custom Gift Baskets",
      description: "Personalize sweet hampers for every occasion.",
    },
  ];

  return (
    <div className="flex min-h-[70vh] items-center justify-center  px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#482726]/10 bg-white p-7 shadow-sm sm:p-9">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#482726]/5 text-2xl text-[#482726]">
            ♛
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6a55]">
            A Little More Luxury
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#482726]">
            Premium Membership
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Make every sweet moment more special with exclusive member benefits.
          </p>
        </div>

        {/* Pricing */}
        <div className="my-7 rounded-xl bg-[#faf7f2] px-5 py-5 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-[#482726]">
              ₹499
            </span>
            <span className="text-sm text-gray-500">/ 30 days</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Exclusive perks, a sweeter experience.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-5">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#482726]/5 text-xl text-[#482726]">
                {benefit.icon}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#482726]">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleBuyPremium}
          className="mt-8 w-full rounded-lg bg-[#482726] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#603936] focus:outline-none focus:ring-2 focus:ring-[#482726]/30 focus:ring-offset-2"
        >
          Become a Premium Member
          <span className="ml-2" aria-hidden="true">→</span>
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Crafted for those who love the finer things.
        </p>
      </div>
    </div>
  );
};

export default BuyPremium;
