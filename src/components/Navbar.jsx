// src/components/Navbar.jsx

import { useState } from "react";
import { useEffect } from "react";
import API from "../services/api";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaUserShield,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  // MOBILE MENU
  const [mobileMenu, setMobileMenu] =
    useState(false);

  // SEARCH
  const [search, setSearch] =
    useState("");

  // CART CONTEXT
  const { cartItems } = useCart();

  // AUTH CONTEXT
 const {
  user,
  logout,
  loading,
} = useAuth();

const isAdmin =
  user?.role === "admin";

  // CART COUNT
  const cartCount =
  cartItems?.reduce(
    (total, item) =>
      total +
      item.quantity,
    0
  ) || 0;

  // TEMP WISHLIST COUNT
  const wishlistCount = 2;

  // SEARCH HANDLER
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

   navigate(
  `/products?search=${search}`
);

    setSearch("");
  };

  // LOGOUT
const handleLogout = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  logout();

  navigate("/auth");
};
const [orderCount, setOrderCount] =
  useState(0);

  useEffect(() => {
  const fetchOrders =
    async () => {
      try {
        const { data } =
          await API.get(
            "/orders/my-orders"
          );

        setOrderCount(
          data.length
        );
      } catch {}
    };

  if (user)
    fetchOrders();
}, [user]);

  // ACTIVE LINK STYLE
  const navLinkStyle = ({
    isActive,
  }) =>
    isActive
      ? "text-blue-600 font-bold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* LEFT */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* LOGO */}
            <Link
              to="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap"
            >
              MiniStore
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-7">
              <NavLink
                to="/"
                className={navLinkStyle}
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={navLinkStyle}
              >
                Products
              </NavLink>

              <NavLink
                to="/categories"
                className={navLinkStyle}
              >
                Categories
              </NavLink>

              <NavLink
                to="/about"
                className={navLinkStyle}
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={navLinkStyle}
              >
                Contact
              </NavLink>

              {/* ADMIN */}
            {isAdmin && (
  <Link
    to="/admin"
    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl"
  >
    <FaUserShield />
    Admin
  </Link>
)}
            </div>
          </div>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex flex-1 max-w-[420px] items-center border-2 border-gray-200 rounded-full overflow-hidden bg-gray-50"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full min-w-0 px-5 py-3 outline-none bg-transparent"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-4 hover:bg-blue-700 transition"
            >
              <FaSearch />
            </button>
          </form>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            {/* WISHLIST */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-red-500 transition"
            >
              <FaHeart size={24} />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition"
            >
              <FaShoppingCart size={25} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                 <img
  src={
    user.avatar ||
    "https://i.pravatar.cc/300"
  }
  alt={user.name}
  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
/>

                  <span className="font-semibold max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* DROPDOWN */}
                <div className="absolute right-0 top-16 w-72 bg-white rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 overflow-hidden z-50">
                  {/* USER INFO */}
                  <div className="p-5 border-b">
                    <h3 className="font-bold text-lg truncate">
                      {user.name}
                    </h3>

                    <p className="text-gray-500 text-sm truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-blue-600 font-semibold mt-1">
  {user.role}
</p>
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-col p-3">
                    <Link
                      to="/profile"
                      className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/admin"
                      className="px-4 py-3 rounded-xl hover:bg-indigo-100 text-indigo-600 font-semibold transition"
                    >
                      Admin Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-left px-4 py-3 rounded-xl hover:bg-red-100 text-red-500 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-3xl flex-shrink-0"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            {mobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t shadow-xl w-full">
          <div className="flex flex-col p-6 gap-4">
            {/* MOBILE SEARCH */}
            <form
              onSubmit={handleSearch}
              className="flex border-2 border-gray-200 rounded-full overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full px-4 py-3 outline-none"
              />

              <button className="bg-blue-600 text-white px-5">
                <FaSearch />
              </button>
            </form>

            {/* LINKS */}
            <NavLink
              to="/"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/categories"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Categories
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/wishlist"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/cart"
              className={navLinkStyle}
              onClick={() =>
                setMobileMenu(false)
              }
            >
              Cart ({cartCount})
            </NavLink>

            {/* ADMIN */}
            <Link
              to="/admin"
              onClick={() =>
                setMobileMenu(false)
              }
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 rounded-2xl text-center font-semibold shadow-lg"
            >
              Admin Dashboard
            </Link>

            {/* USER */}
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={navLinkStyle}
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/orders"
                  className={navLinkStyle}
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >
                  Orders
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();

                    setMobileMenu(false);
                  }}
                  className="text-left text-red-500 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth"
                className={navLinkStyle}
                onClick={() =>
                  setMobileMenu(false)
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}