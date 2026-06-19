import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleVerify =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const { data } =
          await API.post(
            "/auth/verify-otp",
            {
              email,
              otp,
            }
          );

        localStorage.setItem(
          "token",
          data.token
        );

        login(data.user);

        toast.success(
          "Login Successful"
        );

        if (
          data.user.role ===
          "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "OTP Verification Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          OTP sent to
          <br />
          <strong>
            {email}
          </strong>
        </p>

        <form
          onSubmit={
            handleVerify
          }
          className="space-y-5"
        >
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            placeholder="Enter OTP"
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-center text-2xl tracking-widest outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}