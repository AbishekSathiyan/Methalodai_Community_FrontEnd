import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60s countdown
  const inputsRef = useRef([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendTimer === 0) return;
    const timerId = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [resendTimer]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      if (val && idx < 5) inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpStr = otp.join("");
    if (otpStr.length < 6) return setError("Please enter the 6-digit OTP.");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpStr }),
      });

      const data = await res.json();
      if (!data.success) return setError(data.message || "Invalid OTP.");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendTimer > 0) return; // prevent spam
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.success) setError(data.message || "Failed to resend OTP.");
      else {
        alert("OTP resent! Check your email.");
        setResendTimer(60); // reset timer
      }
    } catch (err) {
      console.error(err);
      setError("Failed to resend OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          {success ? "Email Verified!" : "Verify Your Email"}
        </h2>
        <p className="mb-6">
          {success
            ? "Redirecting to login..."
            : `Enter the 6-digit OTP sent to ${email}`}
        </p>

        {!success && (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between space-x-2">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={val}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-green-300 focus:ring-green-200"
                    }`}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              onClick={resendOtp}
              disabled={loading || resendTimer > 0}
              className={`mt-4 font-semibold ${
                resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-green-700 hover:underline"
              }`}
            >
              {resendTimer > 0
                ? `Resend OTP in ${resendTimer}s`
                : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
