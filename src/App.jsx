// src/App.jsx

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

// COMPONENTS
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";

// USER PAGES
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAI from "./pages/admin/AdminAI";
// AUTH
import { useAuth } from "./context/AuthContext";

// 404 PAGE
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6 text-center">
      {/* 404 */}
      <h1 className="text-[120px] font-extrabold text-blue-600 leading-none">
        404
      </h1>

      {/* TITLE */}
      <h2 className="text-5xl font-bold mt-4 mb-4">
        Page Not Found
      </h2>

      {/* DESC */}
      <p className="text-gray-500 text-lg max-w-xl leading-8 mb-10">
        The page you are looking for may
        have been removed, renamed, or is
        temporarily unavailable.
      </p>

      {/* BUTTON */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
      >
        Back To Home
      </Link>
    </div>
  );
}

// ADMIN PROTECTED ROUTE
function AdminRoute({
  children,
}) {
  const { user, loading } =
    useAuth();

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  // NOT ADMIN
  if (
    !user ||
    user.role !== "admin"
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500 mb-6">
          Access Denied
        </h1>

        <p className="text-gray-500 text-lg mb-8">
          Only admin can access this
          page.
        </p>

        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return children;
}

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* ========================= */}
        {/* USER PROTECTED ROUTES */}
        {/* ========================= */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
  path="/track-order/:id"
  element={<TrackOrder />}
/>

        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <AdminCategories />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ai"
          element={
            <AdminRoute>
              <AdminAI />
            </AdminRoute>
          }
        />

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}