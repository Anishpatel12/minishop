// src/pages/Orders.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaDownload,
  FaStar,
  FaShoppingBag,
  FaSpinner,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import { useCart } from "../context/CartContext";

export default function Orders() {
  const navigate = useNavigate();

  const { addToCart } =
    useCart();

  // STATES
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders =
      async () => {
        try {
          const { data } =
            await API.get(
              "/orders/my-orders"
            );

          setOrders(data);
        } catch (error) {
          toast.error(
            "Failed To Load Orders"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchOrders();
  }, []);

  // CANCEL ORDER
const handleCancelOrder =
  async (id) => {
    const confirmCancel =
      window.confirm(
        "Cancel this order?"
      );

    if (!confirmCancel)
      return;

    try {
      await API.put(
        `/orders/cancel/${id}`
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                status:
                  "Cancelled",
              }
            : order
        )
      );

      toast.success(
        "Order Cancelled"
      );
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Cancel Failed"
      );
    }
  };

  // REORDER
  const handleReorder = (
    order
  ) => {
   (order?.products || [])
  .forEach(
      (product) => {
        addToCart({
          id:
            product.productId,

          title:
            product.title,

          image:
            product.image,

          price:
            product.price,

          quantity:
            product.quantity,
        });
      }
    );

    toast.success(
      "Products Added To Cart"
    );

    navigate("/cart");
  };

  // STATUS COLOR
  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Loading Orders...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <FaBoxOpen className="text-5xl text-blue-600" />

            <div>
              <h1 className="text-5xl font-bold">
                My Orders
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Track and manage all
                your purchases
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition font-semibold flex items-center gap-3 w-fit"
          >
            <FaShoppingBag />

            Continue Shopping
          </Link>
        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-[35px] shadow-xl p-16 text-center">
            <FaBoxOpen className="text-8xl text-blue-600 mx-auto mb-8" />

            <h2 className="text-4xl font-bold mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-500 text-lg mb-10">
              Start shopping to see
              your orders here.
            </p>

            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition text-lg font-semibold inline-flex items-center gap-3"
            >
              <FaShoppingBag />

              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-[35px] shadow-xl overflow-hidden"
              >
                {/* TOP */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div>
                    <h2 className="text-3xl font-bold mb-4">
  Order #
  {order?._id?.slice(-6) ||
    "N/A"}
</h2>

                      <div className="flex items-center gap-3 text-lg">
                        <FaClock />

                        <span>
                          {order?.createdAt
  ? new Date(
      order.createdAt
    ).toLocaleString()
  : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="flex items-center">
                      <span
                        className={`px-6 py-3 rounded-full font-bold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {
                          order?.status || "N/A"
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-8 grid lg:grid-cols-3 gap-10">
                  {/* PRODUCTS */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-8">
                      Ordered Products
                    </h3>

                    <div className="space-y-6">
                    {order?.products?.map(
                        (
                          product,
                          index
                        ) => (
                          <div
                            key={
                              index
                            }
                            className="flex flex-col md:flex-row gap-5 border-b pb-6"
                          >
                            {/* IMAGE */}
                           <img
  src={
    product?.image ||
    "https://via.placeholder.com/300x300?text=No+Image"
  }
                              alt={
                                product.title
                              }
                              className="w-full md:w-32 h-32 rounded-2xl object-cover"
                            />

                            {/* DETAILS */}
                            <div className="flex-1">
                              <h2 className="text-2xl font-bold">
                                {
                                  product.title
                                }
                              </h2>

                              <p className="text-gray-500 mt-3">
                                Quantity:{" "}
                                {
                                  product.quantity
                                }
                              </p>

                              <div className="flex items-center gap-2 mt-4 text-yellow-500">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                              </div>
                            </div>

                            {/* PRICE */}
                            <div className="text-3xl font-bold text-blue-600">
                              ₹
                              {product.price *
                                product.quantity}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* SHIPPING */}
                  <div>
                    <h3 className="text-2xl font-bold mb-8">
                      Shipping Details
                    </h3>

                    <div className="bg-gray-100 p-6 rounded-3xl space-y-5">
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-blue-600 text-xl" />

                        <span className="font-bold text-lg">
                          {
                            order
                              .shipping
                              ?.fullName
                          }
                        </span>
                      </div>

                      <p>
                        {
                          order
                            .shipping
                            ?.phone
                        }
                      </p>

                      <p>
                        {
                          order
                            .shipping
                            ?.address
                        }
                      </p>

                      <p>
                        {
                          order
                            .shipping
                            ?.city
                        }
                        ,{" "}
                        {
                          order
                            .shipping
                            ?.state
                        }
                      </p>

                      <p>
                        {
                          order
                            .shipping
                            ?.pincode
                        }
                      </p>

                      {/* DELIVERY */}
                      <div className="flex items-center gap-3 bg-white p-4 rounded-2xl">
                        <FaTruck className="text-blue-600" />

                        <span className="font-semibold">
                          Estimated
                          Delivery:
                          2-4 Days
                        </span>
                      </div>

                      {/* TOTAL */}
                      <div className="border-t pt-5 flex justify-between text-3xl font-bold">
                        <span>Total</span>

                        <span className="text-blue-600">
                        ₹{order?.total || 0}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid gap-4 mt-8">
                      {/* TRACK */}
                      <Link
                        to={`/track-order/${order._id}`}
                        className="bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-3"
                      >
                        <FaTruck />

                        Track Order
                      </Link>

                      {/* REORDER */}
                      <button
                        onClick={() =>
                          handleReorder(
                            order
                          )
                        }
                        className="border-2 border-gray-300 py-4 rounded-2xl hover:bg-gray-100 transition font-semibold"
                      >
                        Reorder
                      </button>

                      {/* DOWNLOAD */}
                      <button className="border-2 border-gray-300 py-4 rounded-2xl hover:bg-gray-100 transition font-semibold flex items-center justify-center gap-3">
                        <FaDownload />

                        Download Invoice
                      </button>

                      {/* CANCEL */}
                      {order.status !==
                        "Cancelled" &&
                        order.status !==
                          "Delivered" && (
                          <button
                            onClick={() =>
                              handleCancelOrder(
                                order._id
                              )
                            }
                            className="bg-red-500 text-white py-4 rounded-2xl hover:bg-red-600 transition font-semibold"
                          >
                            Cancel Order
                          </button>
                        )}

                      {/* DELIVERED */}
                      {order.status ===
                        "Delivered" && (
                        <div className="bg-green-100 text-green-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                          <FaCheckCircle />

                          Delivered
                          Successfully
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}