import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const createOrder = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/customer/create-order`, {
          sessionId,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (sessionId) {
      createOrder();
    }
  }, [sessionId]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#222]">
          Payment Successful 🎉
        </h1>

        <p className="mt-2 text-sm text-gray-500">Thank you for your order.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
