// src/pages/Home.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaStar,
  FaShippingFast,
  FaHeadset,
  FaLock,
  FaShoppingCart,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";

import { useCart } from "../context/CartContext";

export default function Home() {
  const navigate = useNavigate();

  const { addToCart } =
    useCart();

  // STATES
  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const { data } =
            await API.get(
              "/products"
            );

          setProducts(data);
        } catch (error) {
          toast.error(
            "Failed To Load Products"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  // DYNAMIC CATEGORIES
  const categories = [
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  // ADD TO CART
  const handleAddToCart =
    async (product) => {
      try {
        await addToCart({
          id: product._id,

          title:
            product.title,

          price:
            product.price,

          image:
            product.images?.[0],

          quantity: 1,
        });

        toast.success(
          "Added To Cart"
        );
      } catch (error) {
        toast.error(
          "Add Failed"
        );
      }
    };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-7xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Loading Store...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 items-center gap-14">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              Discover Amazing
              Products at Best
              Prices
            </h1>

            <p className="text-xl text-gray-200 leading-9 mb-10">
              Shop premium
              electronics, fashion,
              accessories and much
              more with secure
              payments and fast
              delivery.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() =>
                  navigate(
                    "/products"
                  )
                }
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition text-lg shadow-xl"
              >
                Shop Now
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/categories"
                  )
                }
                className="border-2 border-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition text-lg"
              >
                Explore
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="hero"
              className="rounded-[40px] shadow-2xl w-full max-w-xl h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-8">
        {/* DELIVERY */}
        <div className="bg-white p-8 rounded-[30px] shadow-xl hover:-translate-y-2 transition">
          <FaShippingFast className="text-5xl text-blue-600 mb-6" />

          <h3 className="text-2xl font-bold mb-4">
            Fast Delivery
          </h3>

          <p className="text-gray-600 leading-8">
            Lightning-fast delivery
            service for all your
            orders nationwide.
          </p>
        </div>

        {/* SUPPORT */}
        <div className="bg-white p-8 rounded-[30px] shadow-xl hover:-translate-y-2 transition">
          <FaHeadset className="text-5xl text-blue-600 mb-6" />

          <h3 className="text-2xl font-bold mb-4">
            24/7 Support
          </h3>

          <p className="text-gray-600 leading-8">
            Dedicated customer
            support team available
            anytime.
          </p>
        </div>

        {/* PAYMENT */}
        <div className="bg-white p-8 rounded-[30px] shadow-xl hover:-translate-y-2 transition">
          <FaLock className="text-5xl text-blue-600 mb-6" />

          <h3 className="text-2xl font-bold mb-4">
            Secure Payment
          </h3>

          <p className="text-gray-600 leading-8">
            100% secure payment
            gateway with encrypted
            transactions.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold">
            Shop By Categories
          </h2>

          <Link
            to="/categories"
            className="text-blue-600 font-bold text-lg"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories
            .slice(0, 8)
            .map(
              (
                category,
                index
              ) => (
                <Link
                  key={index}
                  to={`/search?q=${category}`}
                  className="bg-white rounded-[30px] shadow-xl p-10 text-center hover:bg-blue-600 hover:text-white transition"
                >
                  <h3 className="text-2xl font-bold">
                    {category}
                  </h3>
                </Link>
              )
            )}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="text-blue-600 font-bold text-lg"
          >
            View All
          </Link>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products
            .slice(0, 8)
            .map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                {/* IMAGE */}
                <Link
                  to={`/product/${product._id}`}
                  className="overflow-hidden block"
                >
                  <img
                    src={
                      product
                        .images?.[0]
                    }
                    alt={
                      product.title
                    }
                    className="h-72 w-full object-cover hover:scale-110 transition duration-500"
                  />
                </Link>

                {/* CONTENT */}
                <div className="p-6">
                  {/* CATEGORY */}
                  <p className="text-blue-600 font-semibold mb-2">
                    {
                      product.category
                    }
                  </p>

                  {/* TITLE */}
                  <Link
                    to={`/product/${product._id}`}
                    className="text-2xl font-bold hover:text-blue-600 transition line-clamp-2"
                  >
                    {
                      product.title
                    }
                  </Link>

                  {/* RATING */}
                  <div className="flex items-center gap-2 text-yellow-500 mt-4">
                    <FaStar />

                    <span className="text-gray-700 font-semibold">
                      {product.rating ||
                        4.8}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-4 mt-5">
                    <span className="text-3xl font-bold text-blue-600">
                      ₹
                      {
                        product.price
                      }
                    </span>

                    <span className="text-gray-400 line-through">
                      ₹
                      {product.price +
                        1000}
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-gray-100 py-4 rounded-2xl text-center hover:bg-gray-200 transition font-semibold"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        handleAddToCart(
                          product
                        )
                      }
                      className="bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart />

                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-blue-600 text-white py-20 mt-10">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">
            Big Summer Sale 🔥
          </h2>

          <p className="text-xl text-gray-200 mb-10 leading-9">
            Get up to 50% OFF on
            selected products for a
            limited time only.
          </p>

          <button
            onClick={() =>
              navigate(
                "/products"
              )
            }
            className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition text-lg shadow-xl"
          >
            Shop Deals
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          What Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Rahul",
            "Aman",
            "Priya",
          ].map(
            (
              name,
              index
            ) => (
              <div
                key={index}
                className="bg-white p-10 rounded-[30px] shadow-xl"
              >
                <div className="flex text-yellow-500 mb-6">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <p className="text-gray-600 leading-8 mb-8">
                  Amazing shopping
                  experience with
                  excellent product
                  quality and super
                  fast delivery.
                </p>

                <h4 className="font-bold text-2xl">
                  {name}
                </h4>
              </div>
            )
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">
            Subscribe Newsletter
          </h2>

          <p className="text-gray-300 text-lg mb-10 leading-8">
            Get updates about new
            arrivals, exclusive
            offers and discounts.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-5 rounded-2xl text-black outline-none text-lg"
            />

            <button className="bg-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition text-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-5">
              MiniStore
            </h2>

            <p className="leading-8">
              Your one-stop
              destination for
              premium shopping
              experience.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-white"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-white"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Support
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-white">
                Help Center
              </li>

              <li className="hover:text-white">
                Privacy Policy
              </li>

              <li className="hover:text-white">
                Terms &
                Conditions
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Contact
            </h3>

            <p className="mb-3">
              support@ministore.com
            </p>

            <p className="mb-3">
              +91 9876543210
            </p>

            <p>India</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            © 2026 MiniStore. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}