import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HeartPulse,
  CalendarDays,
  FileCheck2,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowDown,
  Lock as LockIcon,
} from "lucide-react";

import { loginUser } from "@/api/auth";

const Login = () => {
  const navigate = useNavigate();

  // Local UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const scrollToForm = () => {
    const formSection = document.getElementById("login-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const data = await loginUser(email, password);

    // 1. Save token and user details to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Optional: Also set sessionStorage if rememberMe is false, 
    // but ensure localStorage has it so AuthGuard passes.
    if (!rememberMe) {
      sessionStorage.setItem("token", data.token);
    }

    // 2. Navigate to the protected dashboard route (NOT "/")
    navigate("/dashboard");
  } catch (err: any) {
    const message = err.response?.data?.error || "Login failed. Please try again.";
    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-[100dvh] bg-[#F4F6F8] text-slate-800">
      <div className="grid min-h-[100dvh] lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-between overflow-hidden bg-[#09101d] px-4 pb-4 pt-6 text-center sm:px-12 sm:pb-8 sm:pt-10 lg:px-20">
          {/* Header Bar */}
          <div className="relative z-10 flex w-full max-w-7xl items-start justify-between text-left">
            <div>
              <h1 className="text-base font-bold text-white sm:text-lg">
                E-Health &amp; Sanitation Hub
              </h1>
              <p className="text-[11px] text-slate-400">
                Republic of the Philippines • Local Government Unit
              </p>
            </div>
          </div>

            {/* Central Hero Section */}
            <div className="relative z-10 my-auto flex max-w-2xl flex-col items-center justify-center py-4 sm:py-8">
            <div className="relative flex flex-col items-center justify-center">
              {/* Background Seal Watermark */}

              <div className="relative flex w-full flex-col items-center justify-center text-center">
              {/* Perfectly Centered Seal Watermark */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-25">
                <div className="h-[320px] w-[320px] sm:h-[450px] sm:w-[450px]">
                  <img
                    src="/logo-circle.png"
                    alt="Government Seal"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Main Heading */}
              <h2 className="relative z-10 text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl">
                Health
                <br />
                and
                <br />
                Sanitation
              </h2>


                  {/* Subheading Description */}
                  <p className="mt-4 max-w-lg text-center text-xs leading-relaxed text-slate-300 sm:mt-5 sm:text-sm">
                    Access health services, appointments, sanitation permits, health records, and community health programs through one convenient platform.
                  </p>

                  {/* Feature Grid */}
                  <div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-3 text-left">
                    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                      <HeartPulse className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-white">Health Services</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                      <CalendarDays className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-white">Appointments</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                      <FileCheck2 className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-white">Sanitation Permits</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                      <ShieldCheck className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-white">Health Records</span>
                    </div>
                  </div>
                </div>

              {/* Mobile Scroll Button */}
              <div className="mt-8 flex flex-col items-center lg:hidden">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 active:scale-95"
                >
                  <span>Proceed to Login</span>
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-10 mb-3 w-full max-w-7xl">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>

          {/* Footer Bar */}
          <div className="relative z-10 flex w-full max-w-7xl items-center justify-between text-[9px] uppercase tracking-wider text-slate-400 sm:text-[10px]">
            <span className="truncate pr-2">Official LGU Portal</span>
            <span className="truncate pl-2 text-right">
              Republic of the Philippines
            </span>
          </div>
        </section>

        {/* ================= RIGHT SIDE ================= */}
        <section
          id="login-form-section"
          className="flex min-h-[100dvh] items-center justify-center bg-[#F4F6F8] px-5 py-12 sm:px-8"
        >
          <div className="w-full max-w-[400px]">
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-lg backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-blue-600 before:via-cyan-500 before:to-blue-400 sm:p-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Sign in to access your health services.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-700">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-[#EBF2FE] px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                      <div className="relative"> 

                        <input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          placeholder="Enter your password" 
                          autoComplete="current-password" 
                          required 
                          className="h-11 w-full rounded-lg border border-slate-200 bg-[#EBF2FE] px-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20" 
                        /> 

                        <button 
                          type="button" 
                          onClick={() => setShowPassword((prev) => !prev)} 
                          className="absolute left-110 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600" 
                          aria-label={showPassword ? "Hide password" : "Show password"} 
                        > 
                          {showPassword ? ( 
                            <EyeOff className="h-4 w-4" /> 
                          ) : ( 
                            <Eye className="h-4 w-4" /> 
                          )} 
                        </button> 

                      </div>

              {/* Remember Me Option (Fixed Right-Aligned) */}
              <div className="mt-1 flex items-center justify-end gap-2 text-right">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="!h-4 !w-4 !min-w-[16px] shrink-0 rounded border-slate-300 text-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="select-none text-xs text-slate-600 cursor-pointer whitespace-nowrap"
                >
                  Remember me
                </label>
              </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
                  >
                    Register
                  </Link>
                </p>
              </div>

              {/* Security note */}
              <div className="mt-7 border-t border-slate-100 pt-5 text-center">
                <p className="text-[10px] leading-5 text-slate-400">
                  Your information is securely handled by GovServe.
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-7 flex items-center justify-center gap-1.5 text-[10px] italic text-slate-400">
              <LockIcon className="h-3 w-3 text-slate-400" />
              <span>256-Bit SSL Encrypted &bull; Powered by GovServe</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;