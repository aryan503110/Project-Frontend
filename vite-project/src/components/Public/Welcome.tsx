import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#fff0d2] p-3 sm:p-4 lg:p-5">
      <div
        className="
          mx-auto
          grid
          h-full
          w-full
          max-w-[1600px]
          grid-cols-1
          gap-3
          sm:gap-4
          lg:grid-cols-[1.35fr_0.9fr]
        "
      >
        {/* LEFT SECTION */}
        <div className="grid min-h-0 grid-rows-[1fr_0.55fr] gap-3 sm:gap-4">
          {/* LEFT TOP */}
          <div className="grid min-h-0 grid-cols-2 gap-3 sm:gap-4">
            {/* Top Left */}
            <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
              <img
                src="/01-pure-truffles-fork.svg"
                alt="Chocolate"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Top Right */}
            <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
              <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
                <div className="flex h-full min-h-0 flex-col items-center justify-center gap-2 rounded-[20px] bg-[#5a2d1c] p-2 sm:gap-6 sm:rounded-[28px] sm:p-8">
                  <Link
                    to="/signup"
                    className="w-full rounded-lg border border-[#4b2417] bg-[#fff0d2] px-1.5 py-1.5 text-center text-[10px] font-bold leading-tight text-[#4b2417] shadow-[2px_2px_0px_#3b1d12] transition hover:bg-white sm:rounded-2xl sm:border-2 sm:px-5 sm:py-4 sm:text-lg sm:shadow-[4px_4px_0px_#3b1d12]"
                  >
                    🍫 Sign Up
                  </Link>

                  <Link
                    to="/login"
                    className="w-full rounded-lg border border-[#fff0d2] bg-[#7b3f22] px-1.5 py-1.5 text-center text-[10px] font-bold leading-tight text-[#fff0d2] shadow-[2px_2px_0px_#3b1d12] transition hover:bg-[#8f4b29] sm:rounded-2xl sm:border-2 sm:px-5 sm:py-4 sm:text-lg sm:shadow-[4px_4px_0px_#3b1d12]"
                  >
                    🍬 Login
                  </Link>
                </div>
              </div>

              <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
                <img
                  src="/L4-cookies-and-milk-landscape.svg"
                  alt="Chocolate"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* LEFT BOTTOM */}
          <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
            <img
              src="/L1-chocolate-cake-landscape.svg"
              alt="Chocolate"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="grid min-h-0 grid-rows-1 gap-3 sm:grid-rows-2 sm:gap-4">
          <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
            <img
              src="/chocolate_bar_circular_text_poster.png"
              alt="Chocolate"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="hidden min-h-0 overflow-hidden rounded-[20px] sm:block sm:rounded-[28px]">
            <img
              src="/L2-ek-tokri-landscape.svg"
              alt="Chocolate"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
