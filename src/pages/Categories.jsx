// src/pages/Categories.jsx

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FaLaptop,
  FaMobileAlt,
  FaGamepad,
  FaHeadphones,
  FaTshirt,
  FaCamera,
  FaClock,
  FaShoePrints,
  FaSpinner,
} from "react-icons/fa";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  //
  // ICON MAPPING
  //
  const getIcon = (
    categoryName
  ) => {
    switch (
      categoryName?.toLowerCase()
    ) {
      case "laptops":
        return <FaLaptop />;

      case "smartphones":
        return <FaMobileAlt />;

      case "gaming":
        return <FaGamepad />;

      case "audio":
        return <FaHeadphones />;

      case "fashion":
        return <FaTshirt />;

      case "cameras":
        return <FaCamera />;

      case "wearables":
        return <FaClock />;

      case "shoes":
        return <FaShoePrints />;

      default:
        return <FaLaptop />;
    }
  };

  //
  // FETCH CATEGORIES
  //
// FETCH CATEGORIES
useEffect(() => {
  const fetchCategories =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await API.get(
            "/categories"
          );

        const activeCategories =
          data.filter(
            (category) =>
              category.status ===
                "Active" ||
              !category.status
          );

        setCategories(
          activeCategories
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed To Load Categories"
        );
      } finally {
        setLoading(false);
      }
    };

  fetchCategories();
}, []);
  //
  // LOADING
  //
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Loading Categories...
          </h2>
        </div>
      </div>
    );
  }

  //
  // EMPTY
  //
  if (
    !categories ||
    categories.length === 0
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            No Categories Found
          </h2>

          <p className="text-gray-500">
            Add categories from Admin
            Panel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-5">
            Shop By Categories
          </h1>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore premium
            collections across
            multiple categories and
            discover your favorite
            products.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map(
            (category) => (
              <Link
                key={
                  category._id
                }
                to={`/products?category=${encodeURIComponent(
                  category.title
                )}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-[35px] shadow-2xl h-[380px]">
                  {/* IMAGE */}
                  <img
                    src={
                      category.image
                    }
                    alt={
                      category.title
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* OVERLAY */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      category.color ||
                      "from-blue-500 to-indigo-600"
                    } opacity-80`}
                  ></div>

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                    {/* ICON */}
                    <div className="text-6xl mb-6 bg-white/20 backdrop-blur-lg w-24 h-24 rounded-full flex items-center justify-center shadow-xl">
                      {getIcon(
                        category.title
                      )}
                    </div>

                    {/* TITLE */}
                    <h2 className="text-4xl font-bold mb-4">
                      {
                        category.title
                      }
                    </h2>

                    {/* PRODUCT COUNT */}
                    {category.productCount && (
                      <p className="mb-4 text-lg">
                        {
                          category.productCount
                        }{" "}
                        Products
                      </p>
                    )}

                    {/* BUTTON */}
                    <button className="mt-4 bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition">
                      Explore
                    </button>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        {/* EXTRA SECTION */}
        <div className="mt-24 bg-white rounded-[40px] p-12 shadow-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Discover Premium
            Products
          </h2>

          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-8 mb-10">
            Browse thousands of
            high-quality products
            from top brands with
            secure shopping
            experience, instant
            delivery, and amazing
            discounts.
          </p>

          <Link
            to="/products"
            className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}