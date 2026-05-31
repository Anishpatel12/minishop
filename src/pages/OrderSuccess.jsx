// src/pages/OrderSuccess.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  FaCheckCircle,
  FaBoxOpen,
  FaHome,
  FaSpinner,
  FaTruck,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCopy,
  FaTimesCircle,
  FaFileInvoice,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState(null);

  const [countdown, setCountdown] =
    useState(10);

  const [copying, setCopying] =
    useState(false);

  //
  // FETCH ORDER
  //
  useEffect(() => {
    const fetchOrder =
      async () => {
        try {
          const { data } =
            await API.get(
              "/orders/latest"
            );

          setOrder(data);
        } catch (error) {
          console.log(error);

          toast.error(
            error.response?.data
              ?.message ||
              "Failed To Load Order"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchOrder();
  }, []);

  //
  // AUTO REDIRECT
  //
  useEffect(() => {
    if (!order) return;

    const timer =
      setTimeout(() => {
        navigate(
          `/track-order?id=${order._id}`
        );
      }, 10000);

    return () =>
      clearTimeout(timer);
  }, [order, navigate]);

  //
  // COUNTDOWN
  //
  useEffect(() => {
    const timer =
      setInterval(() => {
        setCountdown(
          (prev) =>
            prev > 0
              ? prev - 1
              : 0
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  //
  // COPY ORDER ID
  //
  const copyOrderId =
    async () => {
      try {
        await navigator.clipboard.writeText(
          order._id
        );

        setCopying(true);

        toast.success(
          "Order ID Copied"
        );

        setTimeout(() => {
          setCopying(false);
        }, 2000);
      } catch {
        toast.error(
          "Copy Failed"
        );
      }
    };

  //
  // CANCEL ORDER
  //
  const handleCancelOrder =
    async () => {
      try {
        await API.put(
          `/orders/cancel/${order._id}`
        );

        toast.success(
          "Order Cancelled"
        );

        const { data } =
          await API.get(
            "/orders/latest"
          );

        setOrder(data);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Cancel Failed"
        );
      }
    };

  //
  // STATUS COLOR
  //
  const getStatusColor =
    (status) => {
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
  // LOADING
  //
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-7xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Loading Order...
          </h2>
        </div>
      </div>
    );
  }

  //
  // NO ORDER
  //
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white p-12 rounded-[35px] shadow-xl text-center">
          <h2 className="text-5xl font-bold mb-5">
            No Order Found
          </h2>

          <Link
            to="/products"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl inline-block mt-6"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 lg:p-12">
          {/* SUCCESS */}
          <div className="text-center mb-12">
            <FaCheckCircle className="text-green-500 text-9xl mx-auto mb-8" />

            <h1 className="text-5xl lg:text-6xl font-bold mb-5">
              Order Confirmed 🎉
            </h1>

            <p className="text-gray-600 text-lg">
              Your order has been
              placed successfully.
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* ORDER DETAILS */}
            <div className="bg-gray-100 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-8">
                Order Details
              </h2>

              <div className="space-y-5">
                {/* ORDER ID */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <FaBoxOpen />
                    Order ID
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-blue-600">
                      #
                      {order._id.slice(
                        -6
                      )}
                    </span>

                    <button
                      onClick={
                        copyOrderId
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      <FaCopy />

                      {copying
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>

                {/* STATUS */}
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Status
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full font-bold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* PAYMENT */}
                <div className="flex justify-between">
                  <span className="font-semibold flex items-center gap-2">
                    <FaMoneyBillWave />
                    Payment
                  </span>

                  <span className="font-bold">
                    {order.paymentMethod ||
                      "COD"}
                  </span>
                </div>

                {/* PAYMENT STATUS */}
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Payment Status
                  </span>

                  <span
                    className={`font-bold ${
                      order.paymentStatus ===
                      "Paid"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.paymentStatus ||
                      "Pending"}
                  </span>
                </div>

                {/* DATE */}
                <div className="flex justify-between">
                  <span className="font-semibold flex items-center gap-2">
                    <FaClock />
                    Date
                  </span>

                  <span>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* DELIVERY */}
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Estimated Delivery
                  </span>

                  <span className="text-green-600 font-bold">
                    {order.estimatedDelivery ||
                      "2-4 Business Days"}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Total Items
                  </span>

                  <span className="font-bold">
                    {order.products
                      ?.length ||
                      0}
                  </span>
                </div>

                {/* TOTAL */}
                <div className="border-t pt-5 flex justify-between text-3xl font-bold">
                  <span>Total</span>

                  <span className="text-blue-600">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="bg-gray-100 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-8">
                Shipping Address
              </h2>

              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl mt-1" />

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {
                      order.shipping
                        ?.fullName
                    }
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {
                      order.shipping
                        ?.address
                    }
                    ,
                    {" "}
                    {
                      order.shipping
                        ?.city
                    }
                    ,
                    {" "}
                    {
                      order.shipping
                        ?.state
                    }
                    {" - "}
                    {
                      order.shipping
                        ?.pincode
                    }
                  </p>

                  <p className="mt-4 font-semibold">
                    📞
                    {" "}
                    {
                      order.shipping
                        ?.phone
                    }
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-5">
                  Products
                </h3>

                <div className="space-y-4 max-h-[280px] overflow-y-auto">
                  {order.products?.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          item._id ||
                          index
                        }
                        className="bg-white p-4 rounded-2xl flex items-center gap-4"
                      >
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.title
                          }
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <h4 className="font-bold">
                            {
                              item.title
                            }
                          </h4>

                          <p className="text-gray-500">
                            Qty:
                            {" "}
                            {
                              item.quantity
                            }
                          </p>
                        </div>

                        <span className="font-bold text-blue-600">
                          ₹
                          {item.price *
                            item.quantity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="grid md:grid-cols-5 gap-4 mt-12">
            <Link
              to={`/track-order?id=${order._id}`}
              className="bg-blue-600 text-white py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              <FaTruck />
              Track Order
            </Link>

            <Link
              to="/orders"
              className="bg-black text-white py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              <FaBoxOpen />
              My Orders
            </Link>

            <Link
              to="/products"
              className="border-2 border-gray-300 py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              <FaHome />
              Shop More
            </Link>

            <button className="bg-green-600 text-white py-4 rounded-2xl flex justify-center items-center gap-2">
              <FaFileInvoice />
              Invoice
            </button>

            {order.status ===
              "Processing" && (
              <button
                onClick={
                  handleCancelOrder
                }
                className="bg-red-600 text-white py-4 rounded-2xl flex justify-center items-center gap-2"
              >
                <FaTimesCircle />
                Cancel
              </button>
            )}
          </div>

          {/* REDIRECT */}
          <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
            <p className="text-blue-700 font-semibold flex justify-center items-center gap-3">
              Redirecting to tracking
              page in {countdown}
              seconds
              <FaArrowRight />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}