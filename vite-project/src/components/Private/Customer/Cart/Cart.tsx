import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../Redux/store";
import {
  decreaseQuantity,
  removeFromCart,
  clearCart,
  increaseQuantity,
} from "../../../Redux/Slice/cartSlice";
import axios from "axios";

/*
  Minimal cartoon theme (same tokens as Explore)
  Chocolate #4A2418 · Bubblegum #FF8FB8 · Butter #FFD166 · Cream #FFF8EC
*/

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
    .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
  `}</style>
);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems?.reduce(
    (total, item) => total + item.sellingprice * item.quantity,
    0,
  );

  axios.defaults.withCredentials = true;
  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer/create-checkout-session`,
        {
          items: cartItems,
        },
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="explore-candy flex min-h-[60vh] flex-col items-center justify-center text-center">
        <FontStyle />

        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#4A2418] bg-[#FFD166] text-[#4A2418] shadow-[3px_3px_0_#4A2418]">
          <FiShoppingBag size={26} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#4A2418]">
          Your cart is empty
        </h2>

        <p className="mt-1 text-sm text-[#4A2418]/70">
          Add some sweets and they will show up here.
        </p>

        <button
          type="button"
          onClick={() => navigate("/explore")}
          className="mt-5 rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-6 py-2.5 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="explore-candy w-full">
      <FontStyle />

      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2418] sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-1 text-base text-[#4A2418]/70">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="rounded-full text-sm font-medium text-[#4A2418]/60 underline-offset-4 transition hover:text-[#4A2418] hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div
              key={item.salespersonstockid}
              className="flex gap-4 rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] p-3 shadow-[4px_4px_0_#4A2418]"
            >
              {/* Image */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-[#4A2418] bg-[#FFE3EE]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5 pr-1">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-bold text-[#4A2418]">
                      {item.name}
                    </h2>

                    <p className="mt-0.5 text-sm text-[#4A2418]/70">
                      ₹{item.sellingprice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          salespersonstockid: item.salespersonstockid,
                        }),
                      )
                    }
                    className="h-fit rounded-full p-1.5 text-[#4A2418]/60 transition hover:bg-[#FF8FB8] hover:text-[#4A2418] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex items-center rounded-full border-2 border-[#4A2418] bg-white">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            salespersonstockid: item.salespersonstockid,
                          }),
                        )
                      }
                      className="rounded-l-full px-3 py-1.5 text-[#4A2418] transition hover:bg-[#FFD166]"
                    >
                      <FiMinus size={13} />
                    </button>

                    <span className="min-w-8 text-center text-sm font-semibold text-[#4A2418]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            salespersonstockid: item.salespersonstockid,
                          }),
                        )
                      }
                      className="rounded-r-full px-3 py-1.5 text-[#4A2418] transition hover:bg-[#FFD166]"
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>

                  {/* Item total */}
                  <p className="text-base font-bold text-[#4A2418]">
                    ₹
                    {(item.sellingprice * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] p-5 shadow-[5px_5px_0_#4A2418]">
          <h2 className="text-lg font-bold text-[#4A2418]">Order Summary</h2>

          <div className="my-4 border-t-2 border-dashed border-[#4A2418]/25" />

          <div className="flex items-center justify-between text-sm text-[#4A2418]/70">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-[#4A2418]/70">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>

          <div className="my-4 border-t-2 border-dashed border-[#4A2418]/25" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#4A2418]">Total</span>

            <span className="rounded-full border-2 border-[#4A2418] bg-[#FF8FB8] px-3 py-0.5 text-xl font-bold text-[#4A2418]">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-5 w-full rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-5 py-3 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;