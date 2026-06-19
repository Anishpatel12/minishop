// src/pages/Auth.jsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // LOGIN STATE
  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });

  // REGISTER STATE
  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // LOGIN CHANGE
  const handleLoginChange = (
    e
  ) => {
    setLoginData({
      ...loginData,

      [e.target.name]:
        e.target.value,
    });
  };

  // REGISTER CHANGE
  const handleRegisterChange = (
    e
  ) => {
    setRegisterData({
      ...registerData,

      [e.target.name]:
        e.target.value,
    });
  };

  // REGISTER
  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/register",
          registerData
        );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // LOGIN USER
      login(data.user);

      toast.success(
        "Registration Successful"
      );

      // ADMIN REDIRECT
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
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

     const { data } =
  await API.post(
    "/auth/login",
    loginData
  );

   console.log(
  "LOGIN RESPONSE:",
  data
);
// OTP Required
if (
  data.otpRequired
) {
  navigate(
    "/verify-otp",
    {
      state: {
        email:
          data.email,
      },
    }
  );

  return;
}
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-7xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LOGIN */}
        <div className="p-10 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-4">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 text-lg">
              Login to continue shopping
              with MiniStore.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={loginData.email}
                onChange={
                  handleLoginChange
                }
                className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                value={
                  loginData.password
                }
                onChange={
                  handleLoginChange
                }
                className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
            >
              {loading
                ? "Please Wait..."
                : "Login"}
            </button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="bg-gray-50 p-10 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-4">
              Create Account 🚀
            </h1>

            <p className="text-gray-500 text-lg">
              Join MiniStore and start
              shopping today.
            </p>
          </div>

          <form
            onSubmit={
              handleRegister
            }
            className="space-y-6"
          >
            {/* NAME */}
            <div>
              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                placeholder="Enter full name"
                value={
                  registerData.name
                }
                onChange={
                  handleRegisterChange
                }
                className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                value={
                  registerData.email
                }
                onChange={
                  handleRegisterChange
                }
                className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                placeholder="Create password"
                value={
                  registerData.password
                }
                onChange={
                  handleRegisterChange
                }
                className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                required
              />

              <p className="text-gray-500 text-sm">
                I agree to the Terms &
                Conditions
              </p>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-900 transition text-lg font-semibold shadow-lg"
            >
              {loading
                ? "Please Wait..."
                : "Create Account"}
            </button>
          </form>

          {/* INFO */}
          <div className="mt-10 bg-white p-6 rounded-2xl border">
            <h3 className="text-xl font-bold mb-3">
              Why Join MiniStore?
            </h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                ✅ Fast Delivery
              </li>

              <li>
                ✅ Secure Payments
              </li>

              <li>
                ✅ Exclusive Discounts
              </li>

              <li>
                ✅ Premium Products
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}