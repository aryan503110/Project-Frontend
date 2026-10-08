import React from "react";

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
                src="/choco1.jpeg"
                alt="Chocolate"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Top Right */}
            <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
              <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
                <img
                  src="/choco.jpeg"
                  alt="Chocolate"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
                <img
                  src="/choco.jpeg"
                  alt="Chocolate"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* LEFT BOTTOM */}
          <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
            <img
              src="/choco.jpeg"
              alt="Chocolate"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4">
          <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
            <img
              src="/choco.jpeg"
              alt="Chocolate"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-h-0 overflow-hidden rounded-[20px] sm:rounded-[28px]">
            <img
              src="/choco.jpeg"
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
