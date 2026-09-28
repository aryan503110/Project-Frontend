import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiArrowLeft, FiShoppingCart, FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Slice/cartSlice";

const ExploreProductById = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getById = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/customer/productbyidcustomer/" + id,
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#d4a853]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-[#222]">Product not found</h2>

        <p className="mt-1 text-sm text-gray-500">
          This product may no longer be available.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-5 rounded-lg bg-[#222] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
        >
          Go Back
        </button>
      </div>
    );
  }

  const productInfo = product?.product;

  return (
    <div className="w-full">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#b18a3e]"
      >
        <FiArrowLeft size={16} />
        Back to Products
      </button>

      {/* Product */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="flex min-h-[420px] items-center justify-center bg-[#f7f6f3] p-8 lg:min-h-[520px]">
            <img
              src={productInfo?.image}
              alt={productInfo?.name}
              className="h-full max-h-[460px] w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col p-7 sm:p-10">
            {/* Category / availability */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b18a3e]">
                Product
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-semibold text-green-700">
                <FiCheck size={13} />
                {product?.stock} Available
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-4 text-3xl font-bold leading-tight text-[#222] sm:text-4xl">
              {productInfo?.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
              {productInfo?.description}
            </p>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-100" />

            {/* Prices */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Pricing
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {/* Regular */}
                <div className="rounded-xl bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-400">Regular Price</p>

                  <p className="mt-1 text-xl font-bold text-[#222]">
                    ₹{product?.normalSellingPrice?.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Subscription */}
                <div className="rounded-xl bg-[#faf7ef] px-4 py-3">
                  <p className="text-xs text-[#b18a3e]">Subscription</p>

                  <p className="mt-1 text-xl font-bold text-[#b18a3e]">
                    ₹
                    {product?.subscriptionSellingPrice?.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
              <span className="text-sm text-gray-500">Available Stock</span>

              <span className="text-sm font-bold text-[#222]">
                {product?.stock} units
              </span>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium text-gray-500">Quantity</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    className="px-4 py-2.5 text-lg text-gray-500 transition hover:text-[#222] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="min-w-[40px] text-center text-sm font-semibold text-[#222]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product?.stock}
                    className="px-4 py-2.5 text-lg text-gray-500 transition hover:text-[#222] disabled:cursor-not-allowed disabled:opacity-30"
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
                        sellingprice: product?.normalSellingPrice,
                        availableStock: product?.stock,
                      }),
                    );

                    toast.success("Product added to cart");
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d4a853] hover:text-black"
                >
                  <FiShoppingCart size={17} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProductById;
