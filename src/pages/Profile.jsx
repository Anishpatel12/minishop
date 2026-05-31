// src/pages/Profile.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaSave,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const {
    user,
    logout,
  } = useAuth();

  // STATES
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [profile, setProfile] =
    useState({
      name: "",

      email: "",

      password: "",

      avatar: "",
    });

  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const { data } =
            await API.get(
              "/users/profile"
            );

          setProfile({
            name: data.name,

            email: data.email,

            password: "",

            avatar:
              data.avatar,
          });
        } catch (error) {
          toast.error(
            "Failed To Load Profile"
          );
        } finally {
          setLoading(false);
        }
      };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setProfile({
      ...profile,

      [e.target.name]:
        e.target.value,
    });
  };

  // UPDATE PROFILE
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        await API.put(
          "/users/profile",

          profile
        );

        toast.success(
          "Profile Updated"
        );
      } catch (error) {
        toast.error(
          "Update Failed"
        );
      } finally {
        setSaving(false);
      }
    };

  // NO USER
  if (!user) {
    return (
      <Navigate to="/auth" />
    );
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">
            My Profile
          </h1>

          <p className="text-gray-500 text-lg">
            Manage your account
            settings and personal
            information.
          </p>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="bg-white rounded-[35px] shadow-2xl p-8 text-center h-fit">
            {/* AVATAR */}
            <div className="relative w-fit mx-auto mb-8">
              <img
                src={
                  profile.avatar
                }
                alt="avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-600"
              />

              <button className="absolute bottom-2 right-2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <FaCamera />
              </button>
            </div>

            {/* NAME */}
            <h2 className="text-3xl font-bold mb-3">
              {profile.name}
            </h2>

            {/* EMAIL */}
            <p className="text-gray-500 mb-6">
              {profile.email}
            </p>

            {/* ROLE */}
            <div className="flex justify-center mb-8">
              <span
                className={`px-5 py-3 rounded-full font-semibold ${
                  user.role ===
                  "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role ===
                "admin" ? (
                  <span className="flex items-center gap-2">
                    <FaUserShield />

                    Admin
                  </span>
                ) : (
                  "User"
                )}
              </span>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-4 rounded-2xl hover:bg-red-600 transition font-semibold flex items-center justify-center gap-3"
            >
              <FaSignOutAlt />

              Logout
            </button>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 bg-white rounded-[35px] shadow-2xl p-8 lg:p-10">
            <h2 className="text-4xl font-bold mb-10">
              Edit Profile
            </h2>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-8"
            >
              {/* NAME */}
              <div>
                <label className="font-semibold mb-3 block text-lg">
                  Full Name
                </label>

                <div className="relative">
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={
                      profile.name
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 focus:border-blue-600 outline-none px-14 py-5 rounded-2xl text-lg"
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="font-semibold mb-3 block text-lg">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={
                      profile.email
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 focus:border-blue-600 outline-none px-14 py-5 rounded-2xl text-lg"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              {/* AVATAR */}
              <div>
                <label className="font-semibold mb-3 block text-lg">
                  Avatar URL
                </label>

                <input
                  type="text"
                  name="avatar"
                  value={
                    profile.avatar
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border-2 border-gray-200 focus:border-blue-600 outline-none px-6 py-5 rounded-2xl text-lg"
                  placeholder="Enter Avatar URL"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="font-semibold mb-3 block text-lg">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={
                      profile.password
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 focus:border-blue-600 outline-none px-14 py-5 rounded-2xl text-lg"
                    placeholder="Enter New Password"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center gap-3 shadow-lg"
              >
                <FaSave />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}