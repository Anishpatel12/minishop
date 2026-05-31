// src/pages/Checkout.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaShieldAlt,
  FaTruck,
  FaSpinner,
  FaTag,
  FaUser,
  FaPhone,
  FaGlobe,
  FaStickyNote,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";

import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  //
  // SHIPPING STATE
  //
  const [shippingData, setShippingData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      notes: "",
    });

  //
  // PAYMENT
  //
  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  //
  // COUPON
  //
  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  //
  // LOADING
  //
  const [loading, setLoading] =
    useState(false);

  //
  // AUTO FILL USER
  //
  useEffect(() => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (user) {
      setShippingData(
        (prev) => ({
          ...prev,
          fullName:
            user.name || "",
        })
      );
    }
  }, []);

  //
  // EMPTY CART
  //
  useEffect(() => {
    if (
      !cartItems ||
      cartItems.length === 0
    ) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  //
  // HANDLE INPUT
  //
  const handleChange = (e) => {
    setShippingData({
      ...shippingData,

      [e.target.name]:
        e.target.value,
    });
  };

  //
  // APPLY COUPON
  //
  const applyCoupon = () => {
    if (
      coupon.toUpperCase() ===
      "SAVE10"
    ) {
      setDiscount(
        totalPrice * 0.1
      );

      toast.success(
        "Coupon Applied"
      );
    } else {
      toast.error(
        "Invalid Coupon"
      );
    }
  };

  //
  // FINAL TOTAL
  //
  const finalTotal =
    totalPrice - discount;

  //
  // PLACE ORDER
  //
  const handlePlaceOrder =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        //
        // VALIDATION
        //
        if (
          cartItems.length === 0
        ) {
          toast.error(
            "Cart Is Empty"
          );

          return;
        }

        //
        // ORDER DATA
        //
        const orderData = {
          products:
            cartItems.map(
              (item) => ({
                productId:
                  item.productId,

                title:
                  item.title,

                price:
                  item.price,

                image:
                  item.image,

                quantity:
                  item.quantity,
              })
            ),

          shipping:
            shippingData,

          total:
            finalTotal,

          paymentMethod,
        };

        //
        // API
        //
        const { data } =
          await API.post(
            "/orders",
            orderData
          );

        //
        // SUCCESS
        //
        toast.success(
          "Order Placed Successfully"
        );

        //
        // CLEAR CART
        //
        await clearCart();

        //
        // NAVIGATE
        //
        navigate(
          "/success",
          {
            state: {
              order: data,
            },
          }
        );
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Order Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-10 rounded-[35px] shadow-xl">
          {/* TITLE */}
          <div className="flex items-center gap-4 mb-10">
            <FaMapMarkerAlt className="text-4xl text-blue-600" />

            <h1 className="text-4xl font-bold">
              Checkout
            </h1>
          </div>

          {/* FORM */}
          <form
            onSubmit={
              handlePlaceOrder
            }
            className="space-y-10"
          >
            {/* SHIPPING */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Shipping Address
              </h2>

              {/* NAME + PHONE */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <FaUser className="absolute left-4 top-5 text-gray-400" />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    value={
                      shippingData.fullName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-5 text-gray-400" />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={
                      shippingData.phone
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <textarea
                name="address"
                placeholder="Full Address"
                rows="4"
                required
                value={
                  shippingData.address
                }
                onChange={
                  handleChange
                }
                className="w-full mt-6 border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600"
              ></textarea>

              {/* LANDMARK */}
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={
                  shippingData.landmark
                }
                onChange={
                  handleChange
                }
                className="w-full mt-6 border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600"
              />

              {/* CITY STATE */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={
                    shippingData.city
                  }
                  onChange={
                    handleChange
                  }
                  className="border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  value={
                    shippingData.state
                  }
                  onChange={
                    handleChange
                  }
                  className="border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                />
              </div>

              {/* COUNTRY + PIN */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="relative">
                  <FaGlobe className="absolute left-4 top-5 text-gray-400" />

                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    value={
                      shippingData.country
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border-2 border-gray-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                  />
                </div>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  required
                  value={
                    shippingData.pincode
                  }
                  onChange={
                    handleChange
                  }
                  className="border-2 border-gray-200 px-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                />
              </div>

              {/* NOTES */}
              <div className="relative mt-6">
                <FaStickyNote className="absolute left-4 top-5 text-gray-400" />

                <textarea
                  name="notes"
                  placeholder="Delivery Notes"
                  rows="3"
                  value={
                    shippingData.notes
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border-2 border-gray-200 pl-12 pr-5 py-4 rounded-2xl outline-none focus:border-blue-600"
                ></textarea>
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Payment Method
              </h2>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    name: "COD",
                    icon: (
                      <FaMoneyBillWave />
                    ),
                    color:
                      "text-green-600",
                    title:
                      "Cash On Delivery",
                  },

                  {
                    name: "UPI",
                    icon: (
                      <FaMobileAlt />
                    ),
                    color:
                      "text-purple-600",
                    title:
                      "UPI Payment",
                  },

                  {
                    name: "CARD",
                    icon: (
                      <FaCreditCard />
                    ),
                    color:
                      "text-blue-600",
                    title:
                      "Credit Card",
                  },
                ].map(
                  (method) => (
                    <button
                      key={
                        method.name
                      }
                      type="button"
                      onClick={() =>
                        setPaymentMethod(
                          method.name
                        )
                      }
                      className={`border-2 p-6 rounded-3xl transition text-center ${
                        paymentMethod ===
                        method.name
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div
                        className={`text-4xl mx-auto mb-4 ${method.color}`}
                      >
                        {
                          method.icon
                        }
                      </div>

                      <h3 className="font-bold text-lg">
                        {
                          method.title
                        }
                      </h3>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl hover:bg-blue-700 transition text-xl font-bold shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 lg:p-8 rounded-[35px] shadow-xl h-fit sticky top-24">
          {/* TITLE */}
          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          {/* PRODUCTS */}
          <div className="space-y-5 max-h-[350px] overflow-y-auto">
            {cartItems.map(
              (item) => (
                <div
                  key={
                    item.productId
                  }
                  className="flex items-center gap-4 border-b pb-5"
                >
                  <img
                    src={item.image}
                    alt={
                      item.title
                    }
                    className="w-20 h-20 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-500">
                      Qty:
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

          {/* COUPON */}
          <div className="mt-8">
            <label className="font-semibold flex items-center gap-2 mb-3">
              <FaTag />
              Coupon Code
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
                placeholder="SAVE10"
                className="flex-1 border-2 border-gray-200 px-4 py-3 rounded-2xl outline-none focus:border-blue-600"
              />

              <button
                onClick={
                  applyCoupon
                }
                type="button"
                className="bg-black text-white px-6 rounded-2xl"
              >
                Apply
              </button>
            </div>
          </div>

          {/* PRICE */}
          <div className="mt-8 space-y-5">
            <div className="flex justify-between text-lg">
              <span>
                Subtotal
              </span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <div className="flex justify-between text-lg">
              <span>
                Shipping
              </span>

              <span className="text-green-600 font-semibold">
                Free
              </span>
            </div>

            <div className="flex justify-between text-lg">
              <span>
                Discount
              </span>

              <span className="text-red-500 font-semibold">
                -₹{discount}
              </span>
            </div>

            <div className="border-t pt-5 flex justify-between text-3xl font-bold">
              <span>Total</span>

              <span className="text-blue-600">
                ₹{finalTotal}
              </span>
            </div>
          </div>

          {/* INFO */}
          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4 text-gray-600">
              <FaTruck className="text-blue-600" />

              <span>
                Estimated Delivery:
                2-4 Days
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <FaShieldAlt className="text-blue-600" />

              <span>
                100% Secure Payment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}