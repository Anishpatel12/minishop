// src/pages/Cart.jsx

import {
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  // CART CONTEXT
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  // TOTAL ITEMS
  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,

      0
    );

  // SAVINGS
  const totalSavings =
    cartItems.reduce(
      (total, item) =>
        total +
        ((item.oldPrice ||
          item.price + 500) -
          item.price) *
          item.quantity,

      0
    );

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center">
            {/* ICON */}
            <FaShoppingCart className="text-8xl text-blue-600 mx-auto mb-8" />

            {/* TITLE */}
            <h1 className="text-5xl font-bold mb-5">
              Your Cart Is Empty
            </h1>

            {/* DESC */}
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-8">
              Looks like you haven't
              added anything to your
              cart yet.
            </p>

            {/* BUTTON */}
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-2xl hover:bg-blue-700 transition text-lg font-semibold shadow-lg"
            >
              <FaArrowLeft />

              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <FaShoppingCart className="text-4xl text-blue-600" />

          <div>
            <h1 className="text-5xl font-bold">
              Shopping Cart
            </h1>

            <p className="text-gray-500 mt-2">
              {totalItems} Items In
              Your Cart
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-[35px] shadow-xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition"
              >
                {/* IMAGE */}
                <Link
                  to={`/product/${item.productId}`}
                  className="shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-48 h-48 object-cover rounded-3xl hover:scale-105 transition duration-300"
                  />
                </Link>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* TITLE */}
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-3xl font-bold hover:text-blue-600 transition"
                    >
                      {item.title}
                    </Link>

                    {/* PRICE */}
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-3xl font-bold text-blue-600">
                        ₹{item.price}
                      </span>

                      <span className="text-gray-400 line-through text-xl">
                        ₹
                        {(item.oldPrice ||
                          item.price +
                            500)}
                      </span>
                    </div>

                    {/* STOCK */}
                    <div className="mt-4">
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          decreaseQty(
                            item.productId
                          )
                        }
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg"
                      >
                        <FaMinus />
                      </button>

                      <span className="text-2xl font-bold min-w-[40px] text-center">
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(
                            item.productId
                          )
                        }
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.productId
                        )
                      }
                      className="flex items-center gap-3 text-red-500 hover:text-red-700 font-semibold text-lg"
                    >
                      <FaTrash />

                      Remove
                    </button>
                  </div>
                </div>

                {/* SUBTOTAL */}
                <div className="flex flex-col justify-between items-end">
                  <div className="text-right">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">
                      ₹
                      {item.price *
                        item.quantity}
                    </h2>
                  </div>
                </div>
              </div>
            ))}

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="inline-flex items-center gap-3 border-2 border-gray-300 px-8 py-4 rounded-2xl hover:bg-white transition font-semibold text-lg"
            >
              <FaArrowLeft />

              Continue Shopping
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-white rounded-[35px] shadow-2xl p-8 sticky top-24">
              {/* TITLE */}
              <h2 className="text-4xl font-bold mb-10">
                Order Summary
              </h2>

              {/* SUMMARY */}
              <div className="space-y-6">
                <div className="flex justify-between text-lg">
                  <span>
                    Total Items
                  </span>

                  <span className="font-semibold">
                    {totalItems}
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
                    Savings
                  </span>

                  <span className="text-green-600 font-semibold">
                    ₹
                    {
                      totalSavings
                    }
                  </span>
                </div>

                {/* TOTAL */}
                <div className="border-t pt-6 flex justify-between text-4xl font-bold">
                  <span>Total</span>

                  <span className="text-blue-600">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}
              <button
                onClick={() =>
                  navigate(
                    "/checkout"
                  )
                }
                className="w-full mt-10 bg-blue-600 text-white py-5 rounded-2xl hover:bg-blue-700 transition text-xl font-semibold shadow-xl"
              >
                Proceed To Checkout
              </button>

              {/* FEATURES */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4 text-gray-600">
                  <FaTruck className="text-blue-600 text-xl" />

                  <span>
                    Free Delivery
                    Available
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <FaShieldAlt className="text-blue-600 text-xl" />

                  <span>
                    Secure Payment
                    Guaranteed
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                  <FaTag className="text-blue-600 text-xl" />

                  <span>
                    Exclusive
                    Discounts Applied
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}