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
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#faf7ef] text-[#b18a3e]">
          <FiShoppingBag size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#222]">
          Your cart is empty
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add some products to your cart and they will appear here.
        </p>

        <button
          type="button"
          onClick={() => navigate("/explore")}
          className="mt-5 rounded-xl bg-[#222] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#b18a3e]">
            Shopping
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#222] sm:text-3xl">
            Your Cart
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="text-xs font-medium text-gray-400 transition hover:text-red-500"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems?.map((item) => (
            <div
              key={item.salespersonstockid}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Image */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f7f6f3]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="truncate text-sm font-bold text-[#222]">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.sellingprice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          salespersonstockid: item.salespersonstockid,
                        }),
                      )
                    }
                    className="text-gray-400 transition hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity */}
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            salespersonstockid: item.salespersonstockid,
                          }),
                        )
                      }
                      className="px-2.5 py-1.5 text-gray-500 transition hover:text-[#222]"
                    >
                      <FiMinus size={13} />
                    </button>

                    <span className="min-w-[30px] text-center text-xs font-semibold text-[#222]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            salespersonstockid: item.salespersonstockid,
                          }),
                        )
                      }
                      className="px-2.5 py-1.5 text-gray-500 transition hover:text-[#222]"
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>

                  {/* Item total */}
                  <p className="text-sm font-bold text-[#222]">
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
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-[#222]">Order Summary</h2>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#222]">Total</span>

            <span className="text-xl font-bold text-[#b18a3e]">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-5 w-full rounded-xl bg-[#222] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
