import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Role = "" | "admin" | "salesperson" | "customer";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupdata: SignUpData = { name, email, password, role };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/user/signup",
        signupdata,
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
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Pick the role you work in and you're in.
          </p>

          <form onSubmit={handleSignUp} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className={label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Cooper"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={field}
              />
            </div>

            <div>
              <label htmlFor="email" className={label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={field}
              />
            </div>

            <div>
              <label htmlFor="password" className={label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={field}
              />
            </div>

            <div>
              <label htmlFor="role" className={label}>
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                required
                className={`${field} cursor-pointer appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11 [&>option]:bg-[#1c1c1c] [&>option]:text-zinc-100 ${
                  role === "" ? "text-zinc-600" : ""
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">Choose a role</option>
                <option value="admin">Admin</option>
                <option value="salesperson">Salesperson</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="!mt-7 w-full rounded-xl bg-[#d4a853] px-4 py-3 text-[15px] font-semibold text-[#221b0c] transition hover:bg-[#e0b66a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4a853]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-zinc-200 underline decoration-[#d4a853]/50 underline-offset-4 transition hover:text-[#d4a853]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
