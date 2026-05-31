// src/pages/admin/AdminDashboard.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

import DashboardCard from "../../components/admin/DashboardCard";

import API from "../../services/api";

import toast from "react-hot-toast";

export default function AdminDashboard() {
  // STATES
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      users: 0,

      products: 0,

      orders: 0,

      revenue: 0,
    });

  const [recentProducts, setRecentProducts] =
    useState([]);

  // FETCH DASHBOARD DATA
  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          setLoading(true);

          // API CALLS
          const [
            usersRes,
            productsRes,
          ] = await Promise.all([
            API.get("/users"),

            API.get("/products"),
          ]);

          const users =
            usersRes.data || [];

          const products =
            productsRes.data || [];

          // ORDERS TEMP
          const orders =
            JSON.parse(
              localStorage.getItem(
                "orders"
              )
            ) || [];

          // REVENUE
          const revenue =
            orders.reduce(
              (
                total,
                order
              ) =>
                total +
                Number(
                  order.total
                ),

              0
            );

          // SET STATS
          setStats({
            users: users.length,

            products:
              products.length,

            orders:
              orders.length,

            revenue,
          });

          // RECENT PRODUCTS
          setRecentProducts(
            products.slice(0, 5)
          );
        } catch (error) {
          toast.error(
            "Failed To Load Dashboard"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-4xl font-bold">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6 lg:p-10 overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 text-lg">
              Monitor your ecommerce
              business in real-time.
            </p>
          </div>

          {/* STATUS */}
          <div className="bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 h-fit">
            <FaArrowUp />

            Store Performing Well
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {/* ORDERS */}
          <DashboardCard
            title="Total Orders"
            value={stats.orders}
            color="bg-blue-600"
            icon={
              <FaShoppingCart />
            }
          />

          {/* USERS */}
          <DashboardCard
            title="Total Users"
            value={stats.users}
            color="bg-green-600"
            icon={<FaUsers />}
          />

          {/* REVENUE */}
          <DashboardCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            color="bg-purple-600"
            icon={
              <FaRupeeSign />
            }
          />

          {/* PRODUCTS */}
          <DashboardCard
            title="Products"
            value={stats.products}
            color="bg-orange-600"
            icon={
              <FaBoxOpen />
            }
          />
        </div>

        {/* RECENT PRODUCTS */}
        <div className="bg-white rounded-[35px] shadow-2xl p-8">
          {/* TITLE */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Recent Products
            </h2>

            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
              {recentProducts.length}{" "}
              Products
            </span>
          </div>

          {/* EMPTY */}
          {recentProducts.length ===
          0 ? (
            <div className="text-center py-16">
              <FaBoxOpen className="text-7xl text-blue-600 mx-auto mb-6" />

              <h3 className="text-3xl font-bold mb-4">
                No Products Found
              </h3>

              <p className="text-gray-500">
                Add products to see
                them here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* HEAD */}
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-5">
                      Product
                    </th>

                    <th className="text-left py-5">
                      Category
                    </th>

                    <th className="text-left py-5">
                      Brand
                    </th>

                    <th className="text-left py-5">
                      Price
                    </th>

                    <th className="text-left py-5">
                      Stock
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {recentProducts.map(
                    (product) => (
                      <tr
                        key={
                          product._id
                        }
                        className="border-b hover:bg-gray-50 transition"
                      >
                        {/* PRODUCT */}
                        <td className="py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                product
                                  .images?.[0]
                              }
                              alt={
                                product.title
                              }
                              className="w-20 h-20 rounded-2xl object-cover"
                            />

                            <div>
                              <h3 className="font-bold text-lg">
                                {
                                  product.title
                                }
                              </h3>

                              <p className="text-gray-500">
                                {
                                  product._id
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td className="py-5 font-semibold">
                          {
                            product.category
                          }
                        </td>

                        {/* BRAND */}
                        <td className="py-5">
                          {
                            product.brand
                          }
                        </td>

                        {/* PRICE */}
                        <td className="py-5 text-blue-600 font-bold text-lg">
                          ₹
                          {
                            product.price
                          }
                        </td>

                        {/* STOCK */}
                        <td className="py-5">
                          {product.stock >
                          0 ? (
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                              In Stock (
                              {
                                product.stock
                              }
                              )
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                              Out Of Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}