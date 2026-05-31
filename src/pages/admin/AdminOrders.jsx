// src/pages/admin/AdminOrders.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  FaBoxOpen,
  FaTruck,
  FaSyncAlt,
  FaRupeeSign,
} from "react-icons/fa";

import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";

import API from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  //
  // FETCH ORDERS
  //
  const fetchOrders =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await API.get(
            "/orders"
          );

        setOrders(data);
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Failed To Load Orders"
        );
      } finally {
        setLoading(false);
      }
    };

  //
  // LOAD
  //
  useEffect(() => {
    fetchOrders();
  }, []);

  //
  // UPDATE STATUS
  //
  const handleStatusChange =
    async (id, status) => {
      try {
        await API.put(
          `/orders/${id}`,
          { status }
        );

        toast.success(
          "Order Updated"
        );

        fetchOrders();
      } catch (error) {
        console.log(error);

        toast.error(
          "Update Failed"
        );
      }
    };

  //
  // STATUS COLOR
  //
  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Out For Delivery":
        return "bg-purple-100 text-purple-700";

      case "Shipped":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  //
  // FILTERED ORDERS
  //
 const filteredOrders =
  orders.filter((order) => {
    const searchTerm =
      search.toLowerCase();

    return (
      order?._id
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?._id
        ?.slice(-6)
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?.shipping?.fullName
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?.shipping?.phone
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?.shipping?.city
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?.shipping?.state
        ?.toLowerCase()
        ?.includes(
          searchTerm
        ) ||

      order?.status
        ?.toLowerCase()
        ?.includes(
          searchTerm
        )
    );
  });

  //
  // STATS
  //
  const totalRevenue =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        (order.total || 0),
      0
    );

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Delivered"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Processing"
    ).length;

  //
  // LOADING
  //
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-10 gap-5">
          <div>
            <h1 className="text-5xl font-bold flex items-center gap-4">
              <FaBoxOpen />
              Manage Orders
            </h1>

            <p className="text-gray-500 mt-3">
              Track and manage all
              customer orders
            </p>
          </div>

          <button
            onClick={
              fetchOrders
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-blue-700"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        {/* DASHBOARD */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">
              Total Orders
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">
              Revenue
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2 flex items-center">
              <FaRupeeSign />
              {totalRevenue}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">
              Delivered
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {
                deliveredOrders
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-gray-500">
              Processing
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {
                processingOrders
              }
            </h2>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, Phone, City, Status..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-500"
          />
        </div>

        {/* EMPTY */}
        {filteredOrders.length ===
        0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <FaTruck className="text-7xl text-blue-600 mx-auto mb-6" />

            <h2 className="text-4xl font-bold">
              No Orders Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-5 text-left">
                    Order ID
                  </th>

                  <th className="p-5 text-left">
                    Customer
                  </th>

                  <th className="p-5 text-left">
                    Products
                  </th>

                  <th className="p-5 text-left">
                    Amount
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map(
                  (order) => (
                    <tr
                      key={
                        order._id
                      }
                      className="border-b hover:bg-gray-50"
                    >
                      {/* ID */}
                      <td className="p-5 font-bold">
                        #
                        {order._id.slice(
                          -6
                        )}
                      </td>

                      {/* CUSTOMER */}
                      <td className="p-5">
                        <div className="space-y-2">
                          <h3 className="font-bold">
                            {
                              order
                                .shipping
                                ?.fullName
                            }
                          </h3>

                          <p className="text-gray-500 text-sm">
                            📞{" "}
                            {
                              order
                                .shipping
                                ?.phone
                            }
                          </p>

                          <p className="text-gray-500 text-sm">
                            🏠{" "}
                            {
                              order
                                .shipping
                                ?.address
                            }
                          </p>

                          <p className="text-gray-500 text-sm">
                            {
                              order
                                .shipping
                                ?.city
                            }
                            ,
                            {" "}
                            {
                              order
                                .shipping
                                ?.state
                            }
                          </p>

                          <p className="text-gray-500 text-sm">
                            {
                              order
                                .shipping
                                ?.country
                            }
                            {" - "}
                            {
                              order
                                .shipping
                                ?.pincode
                            }
                          </p>
                        </div>
                      </td>

                      {/* PRODUCTS */}
                      <td className="p-5">
                        <div className="space-y-3">
                          {order.products?.map(
                            (
                              product,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.title
                                  }
                                  className="w-12 h-12 rounded-xl object-cover"
                                />

                                <div>
                                  <h4 className="font-semibold text-sm">
                                    {
                                      product.title
                                    }
                                  </h4>

                                  <p className="text-xs text-gray-500">
                                    Qty:
                                    {" "}
                                    {
                                      product.quantity
                                    }
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="p-5 font-bold text-blue-600">
                        ₹
                        {
                          order.total
                        }
                      </td>

                      {/* STATUS */}
                      <td className="p-5">
                        <div
                          className={`inline-block px-3 py-2 rounded-xl mb-3 text-sm font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {
                            order.status
                          }
                        </div>

                        <select
                          value={
                            order.status
                          }
                          onChange={(
                            e
                          ) =>
                            handleStatusChange(
                              order._id,
                              e
                                .target
                                .value
                            )
                          }
                          className="w-full border-2 px-4 py-3 rounded-xl"
                        >
                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Out For Delivery">
                            Out For Delivery
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      {/* DATE */}
                      <td className="p-5 text-gray-500">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
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
  );
}