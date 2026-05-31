// src/components/admin/AdminSidebar.jsx

import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaTags,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [stats, setStats] =
    useState({
      users: 0,
      products: 0,
      orders: 0,
    });

  //
  // FETCH ADMIN STATS
  //
  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const [
            usersRes,
            productsRes,
            ordersRes,
          ] =
            await Promise.all([
              API.get(
                "/users"
              ),
              API.get(
                "/products"
              ),
              API.get(
                "/orders"
              ),
            ]);

          setStats({
            users:
              usersRes.data
                ?.length ||
              0,

            products:
              productsRes.data
                ?.length ||
              0,

            orders:
              ordersRes.data
                ?.length ||
              0,
          });
        } catch (error) {
          console.log(
            error
          );
        }
      };

    if (
      user?.role ===
      "admin"
    ) {
      fetchStats();
    }
  }, [user]);

  //
  // LOGOUT
  //
  const handleLogout =
    () => {
      logout();

      localStorage.removeItem(
        "token"
      );

      navigate("/auth");
    };

  //
  // MENUS
  //
  const menus = [
    {
      title:
        "Dashboard",
      icon: (
        <FaTachometerAlt />
      ),
      path: "/admin",
    },

    {
      title:
        "Products",
      icon: <FaBox />,
      path:
        "/admin/products",
    },

    {
      title:
        "Add Product",
      icon: <FaPlus />,
      path:
        "/admin/add-product",
    },

    {
      title:
        "Orders",
      icon: (
        <FaShoppingCart />
      ),
      path:
        "/admin/orders",
    },

    {
      title:
        "Users",
      icon: <FaUsers />,
      path:
        "/admin/users",
    },
{
  title: "Categories",
  icon: <FaBox />,
  path: "/admin/categories",
},
  ];

  return (
    <div className="bg-white w-80 min-h-screen shadow-xl border-r sticky top-0 flex flex-col">
      {/* HEADER */}
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-blue-600">
          Admin Panel
        </h1>
      </div>

      {/* ADMIN INFO */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.avatar ||
              "https://i.pravatar.cc/300"
            }
            alt="admin"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />

          <div>
            <h3 className="font-bold text-lg">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-500">
              {
                user?.email
              }
            </p>

            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {
                user?.role
              }
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b">
        <div className="bg-blue-50 p-3 rounded-xl text-center">
          <h4 className="font-bold text-blue-600">
            {
              stats.orders
            }
          </h4>

          <p className="text-xs">
            Orders
          </p>
        </div>

        <div className="bg-green-50 p-3 rounded-xl text-center">
          <h4 className="font-bold text-green-600">
            {
              stats.products
            }
          </h4>

          <p className="text-xs">
            Products
          </p>
        </div>

        <div className="bg-purple-50 p-3 rounded-xl text-center">
          <h4 className="font-bold text-purple-600">
            {
              stats.users
            }
          </h4>

          <p className="text-xs">
            Users
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4 space-y-2">
        {menus.map(
          (
            menu,
            index
          ) => (
            <NavLink
              key={index}
              to={
                menu.path
              }
              className={({
                isActive,
              }) =>
                `flex items-center gap-4 p-4 rounded-2xl font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-50 text-gray-700"
                }`
              }
            >
              {
                menu.icon
              }

              {
                menu.title
              }
            </NavLink>
          )
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <button
          onClick={
            handleLogout
          }
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

        <Link
          to="/"
          className="block text-center mt-3 text-blue-600 font-semibold"
        >
          Back To Store
        </Link>
      </div>
    </div>
  );
}