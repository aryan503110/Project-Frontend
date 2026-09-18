import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface VerifyOTPData {
  email: string;
  otp: number;
}

const OTPAuthenticator = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // digits only, capped at 6
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  axios.defaults.withCredentials = true;

  const handleSubmitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      navigate("/forgot-password");
      return;
    }

    const verifyotpdata: VerifyOTPData = {
      email,
      otp: Number(otp),
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/user/verify-otp",
        verifyotpdata,
      );

      toast.success(res.data.message);
      navigate(`/reset-password?email=${email}`);
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

  const label = "mb-2 block text-[13px] font-medium text-zinc-400";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#222222] px-4 py-14">
      {/* soft light source behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,83,0.22) 0%, rgba(212,168,83,0) 70%)",
        }}
      />

      <div className="relative w-full max-w-[420px]">
        <div className="rounded-[20px] border border-white/10 bg-[#262626] p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:p-10">
          <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-zinc-50">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {email ? (
              <>
                Enter the 6-digit code we sent to{" "}
                <span className="text-zinc-300">{email}</span>.
              </>
            ) : (
              "Enter the 6-digit code we sent you."
            )}
          </p>

          <form onSubmit={handleSubmitOTP} className="mt-8 space-y-5">
            <div>
              <label htmlFor="otp" className={label}>
                Verification code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                value={otp}
                onChange={handleOTPChange}
                required
                maxLength={6}
                className="w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 text-center text-[22px] font-semibold tracking-[0.5em] text-zinc-100 placeholder-zinc-700 outline-none transition hover:border-white/20 focus:border-[#d4a853]/60 focus:bg-[#191919] focus:ring-4 focus:ring-[#d4a853]/10 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="!mt-7 w-full rounded-xl bg-[#d4a853] px-4 py-3 text-[15px] font-semibold text-[#221b0c] transition hover:bg-[#e0b66a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a853]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify code"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Didn't get a code?{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-zinc-200 underline decoration-[#d4a853]/50 underline-offset-4 transition hover:text-[#d4a853]"
          >
            Try again
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPAuthenticator;