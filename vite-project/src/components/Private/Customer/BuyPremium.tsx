import React from "react";
import axios from "axios";

/*
  Minimal cartoon theme (same tokens as Explore)
  Chocolate #4A2418 · Bubblegum #FF8FB8 · Butter #FFD166 · Cream #FFF8EC
*/

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
      icon: "🍬",
      title: "Exclusive Sweet Discounts",
      description: "Enjoy special prices on your favourite sweets.",
    },
    {
      icon: "🍫",
      title: "Premium Sweet Collection",
      description: "Explore our finest and exclusive sweet selections.",
    },
    {
      icon: "🎁",
      title: "Custom Gift Baskets",
      description: "Personalize sweet hampers for every occasion.",
    },
  ];

  return (
    <div className="explore-candy flex min-h-[70vh] items-center justify-center px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
      `}</style>

      <div className="w-full max-w-md rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] p-7 shadow-[6px_6px_0_#4A2418] sm:p-9">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#4A2418] bg-[#FFD166] text-2xl shadow-[3px_3px_0_#4A2418]">
            👑
          </div>

          <h1 className="text-3xl font-bold text-[#4A2418]">
            Premium Membership
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#4A2418]/70">
            Make every sweet moment more special with exclusive member benefits.
          </p>
        </div>

        {/* Pricing */}
        <div className="my-7 rounded-2xl border-2 border-[#4A2418] bg-[#FF8FB8] px-5 py-5 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-[#4A2418]">₹499</span>
            <span className="text-sm text-[#4A2418]/80">/ 30 days</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-5">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#4A2418] bg-white text-lg"
              >
                {benefit.icon}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#4A2418]">
                  {benefit.title}
                </h3>
                <p className="mt-0.5 text-sm leading-5 text-[#4A2418]/70">
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
          className="mt-8 w-full rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-5 py-3 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
        >
          Become a Premium Member
        </button>
      </div>
    </div>
  );
};

export default BuyPremium;