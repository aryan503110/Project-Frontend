import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiArrowLeft, FiShoppingCart, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Slice/cartSlice";
import type { RootState } from "../../../Redux/store";

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

const ExploreProductById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = useSelector((state: RootState) => state.auth.isPremium);
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getById = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/productbyidcustomer/` + id,
        );

        setProduct(res?.data?.stock);
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

    getById();
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="explore-candy flex min-h-[60vh] items-center justify-center">
        <FontStyle />
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#4A2418]/20 border-t-[#FF8FB8]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="explore-candy flex min-h-[60vh] flex-col items-center justify-center text-center">
        <FontStyle />
        <div className="text-4xl">🍪</div>

        <h2 className="mt-2 text-xl font-bold text-[#4A2418]">
          Product not found
        </h2>

        <p className="mt-1 text-sm text-[#4A2418]/70">
          This product may no longer be available.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-5 rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-6 py-2.5 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
        >
          Go Back
        </button>
      </div>
    );
  }

  const productInfo = product?.product;

  return (
    <div className="explore-candy w-full">
      <FontStyle />

      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 rounded-full text-sm font-medium text-[#4A2418]/70 transition hover:text-[#4A2418] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50"
      >
        <FiArrowLeft size={16} />
        Back to Products
      </button>

      {/* Product */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl border-2 border-[#4A2418] bg-[#FFE3EE] shadow-[5px_5px_0_#4A2418]">
          <img
            src={productInfo?.image}
            alt={productInfo?.name}
            className="h-full max-h-115 min-h-72 w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {/* Availability */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#4A2418] bg-[#FFD166] px-3 py-1 text-xs font-semibold text-[#4A2418]">
              <FiCheck size={13} />
              {product?.stock} available
            </span>
          </div>

          {/* Name */}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-[#4A2418] sm:text-4xl">
            {productInfo?.name}
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#4A2418]/70">
            {productInfo?.description}
          </p>

          {/* Prices */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t-2 border-dashed border-[#4A2418]/25 pt-6">
            {/* Regular */}
            <div className="rounded-2xl border-2 border-[#4A2418] bg-[#FFF8EC] px-4 py-3">
              <p className="text-xs text-[#4A2418]/60">Regular price</p>

              <p className="mt-1 text-xl font-bold text-[#4A2418]">
                ₹{product?.normalSellingPrice?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Subscription */}
            <div className="rounded-2xl border-2 border-[#4A2418] bg-[#FF8FB8] px-4 py-3 shadow-[3px_3px_0_#4A2418]">
              <p className="text-xs text-[#4A2418]/80">Subscription</p>

              <p className="mt-1 text-xl font-bold text-[#4A2418]">
                ₹{product?.subscriptionSellingPrice?.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium text-[#4A2418]/70">
              Quantity
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border-2 border-[#4A2418] bg-[#FFF8EC]">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                  className="rounded-l-full px-4 py-2 text-lg text-[#4A2418] transition hover:bg-[#FFD166] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  −
                </button>

                <span className="min-w-10 text-center text-sm font-semibold text-[#4A2418]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product?.stock}
                  aria-label="Increase quantity"
                  className="rounded-r-full px-4 py-2 text-lg text-[#4A2418] transition hover:bg-[#FFD166] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  dispatch(
                    addToCart({
                      salespersonstockid: product?._id,
                      salespersonid: product?.salesperson?._id,
                      productid: product?.product?._id,
                      name: product?.product?.name,
                      image: product?.product?.image,
                      quantity: quantity,
                      sellingprice: isPremium
                        ? product?.subscriptionSellingPrice
                        : product?.normalSellingPrice,
                      availableStock: product?.stock,
                    }),
                  );

                  toast.success("Product added to cart");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-5 py-2.5 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
              >
                <FiShoppingCart size={17} />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProductById;