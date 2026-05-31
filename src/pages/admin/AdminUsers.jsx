// src/pages/admin/AdminUsers.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  FaTrash,
  FaUserShield,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";

import API from "../../services/api";

export default function AdminUsers() {
  // USERS
  const [users, setUsers] =
    useState([]);

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // FETCH USERS
  const fetchUsers =
    async () => {
      try {
        const { data } =
          await API.get("/users");

        setUsers(data);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed To Load Users"
        );
      } finally {
        setLoading(false);
      }
    };

  // LOAD
  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/users/${id}`
        );

        toast.success(
          "User Deleted"
        );

        setUsers(
          users.filter(
            (user) =>
              user._id !== id
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Delete Failed"
        );
      }
    };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading Users...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6 lg:p-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-4">
            <FaUsers />

            Manage Users
          </h1>

          <p className="text-gray-500 text-lg">
            View and manage all
            registered users.
          </p>
        </div>

        {/* EMPTY */}
        {users.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <h2 className="text-4xl font-bold">
              No Users Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">
            <table className="w-full">
              {/* HEAD */}
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-5 text-left">
                    User
                  </th>

                  <th className="p-5 text-left">
                    Email
                  </th>

                  <th className="p-5 text-left">
                    Role
                  </th>

                  <th className="p-5 text-left">
                    Joined
                  </th>

                  <th className="p-5 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* USER */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                          {user.role ===
                          "admin" ? (
                            <FaUserShield />
                          ) : (
                            <FaUser />
                          )}
                        </div>

                        <div>
                          <h2 className="font-bold text-lg">
                            {
                              user.name
                            }
                          </h2>

                          <p className="text-gray-500">
                            ID:{" "}
                            {
                              user._id
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="p-5 font-medium">
                      {user.email}
                    </td>

                    {/* ROLE */}
                    <td className="p-5">
                      {user.role ===
                      "admin" ? (
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                          User
                        </span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="p-5 text-gray-500">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-5">
                      <div className="flex justify-center">
                        {user.role !==
                          "admin" && (
                          <button
                            onClick={() =>
                              handleDelete(
                                user._id
                              )
                            }
                            className="bg-red-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-red-600 transition"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}