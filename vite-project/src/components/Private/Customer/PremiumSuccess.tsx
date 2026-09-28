import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PremiumSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const activatePremium = async () => {
      try {
        await axios.post(
          "http://localhost:3000/user/activate-premium",
          {
            sessionId,
          },
          {
            withCredentials: true,
          },
        );
      } catch (err) {
        console.log(err);
      }
    };

    if (sessionId) {
      activatePremium();
    }
  }, [sessionId]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#222]">Premium Activated 👑</h1>

        <p className="mt-2 text-gray-500">
          Your premium membership is now active for 30 days.
        </p>
      </div>
    </div>
  );
};

export default PremiumSuccess;
