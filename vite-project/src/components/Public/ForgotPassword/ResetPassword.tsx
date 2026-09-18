import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ResetPasswordData {
  email: string;
  newPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  axios.defaults.withCredentials = true;

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing");
      navigate("/forgot-password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const resetpassworddata: ResetPasswordData = { email, newPassword };

    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:3000/user/reset-password",
        resetpassworddata,
      );

      toast.success(res.data.message);
      navigate("/login");
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

  const field =
    "w-full rounded-xl border border-white/10 bg-[#1c1c1c] px-4 py-3 text-[15px] text-zinc-100 placeholder-zinc-600 outline-none transition " +
    "hover:border-white/20 focus:border-[#d4a853]/60 focus:bg-[#191919] focus:ring-4 focus:ring-[#d4a853]/10 disabled:opacity-50";

  const label = "mb-2 block text-[13px] font-medium text-zinc-400";

  const passwordsTyped = newPassword.length > 0 && confirmPassword.length > 0;
  const passwordsMismatch = passwordsTyped && newPassword !== confirmPassword;

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
            Set a new password
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {email ? (
              <>
                Choose a new password for{" "}
                <span className="text-zinc-300">{email}</span>.
              </>
            ) : (
              "Choose a new password for your account."
            )}
          </p>

          <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
            <div>
              <label htmlFor="newPassword" className={label}>
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className={field}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={label}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className={`${field} ${
                  passwordsMismatch
                    ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10"
                    : ""
                }`}
              />
              {passwordsMismatch && (
                <p className="mt-1.5 text-[13px] text-red-400">
                  Passwords don't match.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || passwordsMismatch}
              className="!mt-7 w-full rounded-xl bg-[#d4a853] px-4 py-3 text-[15px] font-semibold text-[#221b0c] transition hover:bg-[#e0b66a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a853]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;