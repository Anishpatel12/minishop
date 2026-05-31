// src/pages/TrackOrder.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

import API from "../services/api";

import toast from "react-hot-toast";

export default function TrackOrder() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [order, setOrder] =
    useState(null);

  //
  // FETCH ORDER
  //
 useEffect(() => {
  if (!id) {
    setLoading(false);
    return;
  }

  const fetchOrder =
    async () => {
      try {
        const { data } =
          await API.get(
            `/orders/track/${id}`
          );

        setOrder(data);
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed To Load Tracking"
        );
      } finally {
        setLoading(false);
      }
    };

  fetchOrder();
}, [id]);
  //
  // LOADING
  //
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-7xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Tracking Order...
          </h2>
        </div>
      </div>
    );
  }

  //
  // ORDER NOT FOUND
  //
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-4xl font-bold mb-5">
            Order Not Found
          </h2>

          <Link
            to="/orders"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl inline-block"
          >
            Back To Orders
          </Link>
        </div>
      </div>
    );
  }

  //
  // STATUS ICONS
  //
  const getIcon = (
    title
  ) => {
    switch (title) {
      case "Processing":
        return <FaBox />;

      case "Shipped":
        return (
          <FaShippingFast />
        );

      case "Out For Delivery":
        return <FaTruck />;

      case "Delivered":
        return (
          <FaCheckCircle />
        );

      default:
        return <FaBox />;
    }
  };

  //
  // STATUS COLOR
  //
  const getStatusColor =
    () => {
      switch (
        order.status
      ) {
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Track Order
              </h1>

              <p className="text-gray-500 text-lg">
                Order ID:
                <span className="font-bold text-blue-600 ml-2">
                  #
                  {order._id.slice(
                    -6
                  )}
                </span>
              </p>
            </div>

            <div>
              <span
                className={`px-6 py-3 rounded-full font-bold text-lg ${getStatusColor()}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* CURRENT STATUS */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Current Status
          </h2>

          <h3 className="text-5xl font-extrabold">
            {order.status}
          </h3>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Delivery Progress
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {order?.trackingSteps?.map(
              (
                step,
                index
              ) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-5 shadow-lg ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {getIcon(
                      step.title
                    )}
                  </div>

                  <h3 className="font-bold text-xl mb-2">
                    {step.title}
                  </h3>

                  <p
                    className={`font-semibold ${
                      step.completed
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.completed
                      ? "Completed"
                      : "Pending"}
                  </p>

                  {step.completedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(
                        step.completedAt
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* SHIPPING + DELIVERY */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ADDRESS */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Shipping Address
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />

                <span className="font-semibold">
                  {
                    order.shipping
                      ?.fullName
                  }
                </span>
              </div>

              <p>
                {
                  order.shipping
                    ?.address
                }
              </p>

              {order.shipping
                ?.landmark && (
                <p>
                  Landmark:
                  {" "}
                  {
                    order.shipping
                      ?.landmark
                  }
                </p>
              )}

              <p>
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
              </p>

              <p>
                {
                  order.shipping
                    ?.country
                }
                {" - "}
                {
                  order.shipping
                    ?.pincode
                }
              </p>

              <p>
                📞
                {" "}
                {
                  order.shipping
                    ?.phone
                }
              </p>
            </div>
          </div>

          {/* DELIVERY INFO */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Delivery Details
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <FaClock className="text-blue-600 text-2xl" />

                <div>
                  <p className="font-bold">
                    Estimated Delivery
                  </p>

                  <p className="text-gray-500">
                    {order.estimatedDelivery ||
                      "2-4 Business Days"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-500">
                  Total Amount
                </p>

                <h2 className="text-5xl font-bold text-blue-600">
                  ₹{order.total}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-8">
            Ordered Products
          </h2>

          <div className="space-y-4">
            {order.products?.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-5 border rounded-2xl p-4"
                >
                  <img
                    src={item.image}
                    alt={
                      item.title
                    }
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-gray-500">
                      Quantity:
                      {" "}
                      {
                        item.quantity
                      }
                    </p>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    ₹{item.price}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <Link
            to="/orders"
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700 transition font-semibold text-lg"
          >
            <FaArrowLeft />
            Back To Orders
          </Link>
        </div>
      </div>
    </div>
  );
}