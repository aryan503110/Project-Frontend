import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#222222] text-zinc-100">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,83,0.7) 0%, rgba(212,168,83,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT — BIG LOGO */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow behind logo */}
              <div
                aria-hidden
                className="absolute inset-0 scale-90 rounded-[40px] bg-[#d4a853]/10 blur-3xl"
              />

              {/* Logo container */}
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#262626] p-3 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.8)]">
                <img
                  src="/logo.jpeg"
                  alt="Chocolate Platform"
                  className="h-[280px] w-[280px] rounded-[24px] object-cover sm:h-[360px] sm:w-[360px] lg:h-[470px] lg:w-[470px]"
                />
              </div>

              {/* Small floating badge */}
              <div className="absolute -bottom-5 -right-5 rounded-2xl border border-[#d4a853]/20 bg-[#262626]/95 px-5 py-4 shadow-xl backdrop-blur-md sm:-right-8">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Your chocolate
                </p>
                <p className="mt-1 font-semibold text-[#d4a853]">
                  Our passion.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — INFORMATION */}
          <div className="text-center lg:text-left">

            <div className="mb-5 inline-flex rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
                Chocolate • Selling • Distribution
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Where great
              <span className="block text-[#d4a853]">
                chocolate meets opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg lg:mx-0">
              Welcome to our chocolate selling and distribution platform.
              Discover delicious chocolates, shop your favourites, or become
              a salesperson and build your own customer network.
            </p>

            {/* About */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-wider text-[#d4a853]">
                About Us
              </p>

              <h2 className="mt-2 text-xl font-semibold text-zinc-100">
                One platform. Every chocolate experience.
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Our platform brings customers, salespersons, and administrators
                together to make chocolate selling and distribution simple.
                Customers can discover and order chocolates, while
                salespersons can manage their stock, products, and sales.
              </p>
            </div>

            {/* Chocolate types */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {[
                "Milk Chocolate",
                "Dark Chocolate",
                "White Chocolate",
                "Chocolate Bars",
                "Filled Chocolates",
                "Premium Chocolates",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-[#262626] px-3 py-2 text-xs text-zinc-400"
                >
                  🍫 {item}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/signup"
                className="rounded-xl bg-[#d4a853] px-8 py-3.5 text-center text-sm font-semibold text-[#221b0c] shadow-lg shadow-[#d4a853]/10 transition hover:bg-[#e0b66a] hover:shadow-[#d4a853]/20 active:scale-[0.98]"
              >
                Join the Platform
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-8 py-3.5 text-center text-sm font-semibold text-zinc-100 transition hover:border-[#d4a853]/30 hover:bg-white/[0.07] active:scale-[0.98]"
              >
                Login
              </Link>
            </div>

            {/* Roles */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#262626] p-4">
                <p className="text-lg">🍫</p>
                <p className="mt-2 text-sm font-medium">Customer</p>
                <p className="mt-1 text-xs text-zinc-600">
                  Shop chocolates
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#262626] p-4">
                <p className="text-lg">🤝</p>
                <p className="mt-2 text-sm font-medium">Salesperson</p>
                <p className="mt-1 text-xs text-zinc-600">
                  Sell & distribute
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-white/10 bg-[#262626] p-4 sm:col-span-1">
                <p className="text-lg">📦</p>
                <p className="mt-2 text-sm font-medium">Platform</p>
                <p className="mt-1 text-xs text-zinc-600">
                  Manage everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;