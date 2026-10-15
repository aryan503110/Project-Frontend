import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../Redux/store";
axios.defaults.withCredentials = true;

const AddCustomize = () => {
  const navigate = useNavigate();
  const customerId = useSelector((state: RootState) => state.auth.userId);
  const [productList, setProductList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/availablecustomerproducts?search=${encodeURIComponent(search)}`,
        );

        setProductList(res?.data?.stock || []);
      } catch (err) {
        toast.error(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Something went wrong"
            : "Something went wrong",
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const addItem = (stock: any, change: number) => {
    setItems((prev) => {
      const existing = prev?.find(
        (item) => item.salespersonStock === stock._id,
      );

      const currentQuantity = existing?.quantity ?? 0;
      const newQuantity = currentQuantity + change;

      // Don't allow negative quantities or quantities above stock
      if (newQuantity < 0 || newQuantity > stock?.stock) {
        return prev;
      }

      // Remove item when quantity becomes 0
      if (newQuantity === 0) {
        return prev?.filter((item) => item?.salespersonStock !== stock._id);
      }

      // Update existing item quantity
      if (existing) {
        return prev?.map((item) =>
          item.salespersonStock === stock._id
            ? { ...item, quantity: newQuantity }
            : item,
        );
      }

      // Add new item
      return [
        ...prev,
        {
          salespersonStock: stock._id,
          quantity: newQuantity,
        },
      ];
    });
  };

  const th = "px-4 py-3 text-sm font-semibold sm:px-6 sm:py-4";

  const totalAmount = items.reduce((total, item) => {
    const stock = productList.find(
      (stock) => stock._id === item.salespersonStock,
    );

    const price = stock?.subscriptionSellingPrice ?? 0;

    return total + price * item.quantity;
  }, 0);

  const handleAddBasket = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Please select a product");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer/createbasketcheckout`,
        { customerId, items, isGift, giftMessage },
      );

      if (res.data.success && res.data.url) {
        sessionStorage.setItem(
          "customBasketData",
          JSON.stringify({ items, isGift, giftMessage }),
        );

        window.location.href = res.data.url;
      } else {
        toast.error(res.data.message || "Unable to start payment");
        setLoading(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }

      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="explore-candy w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4A2418] sm:text-4xl">
          Create Custom Basket
        </h1>
        <p className="mt-1 text-base text-[#4A2418]/70">
          Select products from different salespeople.
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="mb-8 w-full rounded-full border-2 border-[#4A2418] bg-[#FFF8EC] px-5 py-2.5 text-sm font-medium text-[#4A2418] shadow-[3px_3px_0_#4A2418] outline-none transition placeholder:text-[#4A2418]/45 focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50 sm:w-80"
      />

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] shadow-[5px_5px_0_#4A2418]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left">
            <thead className="bg-[#4A2418] text-[#FFF8EC]">
              <tr>
                <th className={th}>Product</th>
                <th className={th}>Salesperson</th>
                <th className={th}>Price</th>
                <th className={th}>Available Stock</th>
                <th className={th}>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {productList?.map((stock) => {
                const product = stock?.product;
                const image =
                  product?.images?.[0] || product?.image || product?.imageUrl;

                const selected = items.find(
                  (item) => item.salespersonStock === stock._id,
                );

                const price = stock.subscriptionSellingPrice ?? 0;

                return (
                  <tr
                    key={stock?._id}
                    className="border-b-2 border-dashed border-[#4A2418]/20 transition last:border-b-0 hover:bg-[#FFF0C9]"
                  >
                    <td className="px-4 py-3 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#4A2418] bg-[#FFE3EE]">
                          {image ? (
                            <img
                              src={image}
                              alt={product?.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] text-[#4A2418]/60">
                              No image
                            </span>
                          )}
                        </div>

                        <span className="text-sm font-semibold text-[#4A2418]">
                          {product?.name || product?.productName || "Product"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm font-medium text-[#4A2418]/80 sm:px-6">
                      {stock?.salesperson?.name ||
                        stock?.salesperson?.fullName ||
                        "—"}
                    </td>

                    <td className="px-4 py-3 text-sm font-bold text-[#4A2418] sm:px-6">
                      ₹{Number(price).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-3 sm:px-6">
                      <span className="rounded-full border-2 border-[#4A2418] bg-[#FFD166] px-3 py-0.5 text-xs font-semibold text-[#4A2418]">
                        {stock.stock}
                      </span>
                    </td>

                    <td className="px-4 py-3 sm:px-6">
                      <div className="inline-flex items-center rounded-full border-2 border-[#4A2418] bg-white">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => addItem(stock, -1)}
                          disabled={!selected || selected.quantity <= 0}
                          className="rounded-l-full px-3.5 py-1 text-lg text-[#4A2418] transition hover:bg-[#FFD166] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center text-sm font-semibold text-[#4A2418]">
                          {selected?.quantity ?? 0}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => addItem(stock, 1)}
                          disabled={(selected?.quantity ?? 0) >= stock.stock}
                          className="rounded-r-full px-3.5 py-1 text-lg text-[#4A2418] transition hover:bg-[#FFD166] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {productList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-4xl">🍪</div>
                    <p className="mt-2 text-sm font-medium text-[#4A2418]/70">
                      No products found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border-2 border-[#4A2418] bg-[#FFD166] p-5 shadow-[4px_4px_0_#4A2418] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#4A2418]/70">
            Total Basket Amount
          </p>
          <p className="text-2xl font-bold text-[#4A2418]">
            ₹{totalAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <p className="text-sm font-semibold text-[#4A2418]">
          {items?.reduce((total, item) => total + item.quantity, 0)} items
          selected
        </p>
      </div>
      <div className="space-y-3 mt-5">
        <label className="flex w-fit cursor-pointer items-center gap-3 text-sm font-semibold text-[#4A2418]">
          <input
            type="checkbox"
            checked={isGift}
            onChange={() => setIsGift((prev) => !prev)}
            className="peer sr-only"
          />
          {/* Custom checkbox */}
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-[#4A2418] bg-[#FFF8EC] text-sm font-bold text-transparent shadow-[2px_2px_0_#4A2418] transition peer-checked:bg-[#FFD166] peer-checked:text-[#4A2418] peer-focus-visible:ring-4 peer-focus-visible:ring-[#FF8FB8]/60"
          >
            ✓
          </span>
          Is Gift?
        </label>

        {isGift && (
          <input
            type="text"
            onChange={(e) => {
              setGiftMessage(e.target.value);
            }}
            placeholder="Enter your message"
            className="w-full rounded-full border-2 border-[#4A2418] bg-[#FFF8EC] px-5 py-2.5 text-sm font-medium text-[#4A2418] shadow-[3px_3px_0_#4A2418] outline-none transition placeholder:text-[#4A2418]/45 focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/50 sm:max-w-md"
          />
        )}
      </div>
      <div className="mt-5 flex align-center justify-end">
        <button
          type="button"
          onClick={handleAddBasket}
          className="w-full rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-5 py-2.5 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#4A2418] disabled:hover:text-[#FFF8EC] sm:w-auto sm:px-8"
        >
          Create Basket
        </button>
      </div>
    </div>
  );
};

export default AddCustomize;
