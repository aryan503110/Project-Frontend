import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Status = "loading" | "success" | "error";

const BasketSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [message, setMessage] = useState("Confirming your payment...");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const createBasket = async () => {
      try {
        const savedData = sessionStorage.getItem("customBasketData");

        if (!savedData || !sessionId) {
          setMessage(
            "Unable to find your basket details. Please contact support.",
          );
          setStatus("error");
          return;
        }

        const { items, isGift, giftMessage } = JSON.parse(savedData);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/customer/createbasket`,
          {
            sessionId,
            items,
            isGift,
            giftMessage,
          },
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          sessionStorage.removeItem("customBasketData");
          setMessage("Custom Basket Order Placed Successfully!");
          setStatus("success");
        } else {
          setMessage(res.data.message || "Unable to create your basket.");
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong while confirming your basket.");
        setStatus("error");
      }
    };

    if (sessionId) {
      createBasket();
    } else {
      setMessage("Payment session not found.");
      setStatus("error");
    }
  }, [sessionId]);

  return (
    <div className="explore-candy flex min-h-[70vh] items-center justify-center px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .explore-candy { font-family: 'Fredoka', system-ui, sans-serif; }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-md rounded-3xl border-2 border-[#4A2418] bg-[#FFF8EC] p-8 text-center shadow-[6px_6px_0_#4A2418] sm:p-10"
      >
        {/* Icon */}
        <div
          className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#4A2418] text-3xl shadow-[3px_3px_0_#4A2418] ${
            status === "error" ? "bg-[#FF8FB8]" : "bg-[#FFD166]"
          }`}
        >
          {status === "loading" && (
            <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#4A2418]/20 border-t-[#4A2418]" />
          )}
          {status === "success" && <span aria-hidden="true">🎉</span>}
          {status === "error" && <span aria-hidden="true">🍪</span>}
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold leading-snug text-[#4A2418] sm:text-3xl">
          {message}
        </h1>

        {status === "success" && (
          <p className="mt-2 text-sm text-[#4A2418]/70">
            Thank you! Your sweet basket is on its way to being packed.
          </p>
        )}

        {status !== "loading" && (
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="mt-6 rounded-full border-2 border-[#4A2418] bg-[#4A2418] px-6 py-2.5 text-sm font-semibold text-[#FFF8EC] transition hover:bg-[#FFD166] hover:text-[#4A2418] active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8FB8]/60"
          >
            Continue Shopping
          </button>
        )}
      </div>
    </div>
  );
};

export default BasketSuccess;
