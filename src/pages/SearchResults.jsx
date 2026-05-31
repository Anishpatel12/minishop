// src/pages/SearchResults.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaSpinner,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";

import { useCart } from "../context/CartContext";

export default function SearchResults() {
  const location =
    useLocation();

  const { addToCart } =
    useCart();

  // QUERY
  const query =
    new URLSearchParams(
      location.search
    ).get("q") || "";

  // STATES
  const [loading, setLoading] =
    useState(true);

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  // SEARCH PRODUCTS
  useEffect(() => {
    const fetchSearch =
      async () => {
        try {
          setLoading(true);

          const { data } =
            await API.get(
              `/products/search?q=${query}`
            );

          setFilteredProducts(
            data
          );
        } catch (error) {
          toast.error(
            "Search Failed"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchSearch();
  }, [query]);

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-7xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Searching Products...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-5 mb-5">
            {/* ICON */}
            <div className="bg-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl">
              <FaSearch />
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-5xl font-bold">
                Search Results
              </h1>

              <p className="text-gray-500 text-lg mt-3">
                Showing results
                for:
                <span className="font-bold text-blue-600 ml-2">
                  "{query}"
                </span>
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="bg-white px-6 py-4 rounded-2xl shadow-lg inline-block">
            <span className="font-semibold text-lg">
              {
                filteredProducts.length
              }{" "}
              Products Found
            </span>
          </div>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length >
        0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(
              (product) => (
                <div
                  key={
                    product._id
                  }
                  className="bg-white rounded-[30px] shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative group overflow-hidden">
                    <Link
                      to={`/product/${product._id}`}
                    >
                      <img
                        src={
                          product
                            .images?.[0]
                        }
                        alt={
                          product.title
                        }
                        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                      />
                    </Link>

                    {/* WISHLIST */}
                    <button className="absolute top-4 right-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition">
                      <FaHeart />
                    </button>
                  </div>

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

                    {/* BRAND */}
                    <p className="text-gray-500 mt-2">
                      Brand:{" "}
                      {
                        product.brand
                      }
                    </p>

                    {/* RATING */}
                    <div className="flex items-center gap-1 text-yellow-500 mt-3">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />

                      <span className="text-gray-500 ml-2">
                        (
                        {product.rating ||
                          4.9}
                        )
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-5 flex items-center gap-4">
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
                      {/* VIEW */}
                      <Link
                        to={`/product/${product._id}`}
                        className="text-center bg-gray-100 py-4 rounded-2xl hover:bg-gray-200 transition font-semibold"
                      >
                        View
                      </Link>

                      {/* ADD */}
                      <button
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition font-semibold"
                      >
                        <FaShoppingCart />

                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* EMPTY */
          <div className="bg-white rounded-[40px] shadow-2xl p-20 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaSearch className="text-6xl text-gray-400" />
            </div>

            <h2 className="text-5xl font-bold mb-6">
              No Products Found
            </h2>

            <p className="text-gray-500 text-lg leading-8 max-w-2xl mx-auto mb-10">
              We couldn't find any
              products matching your
              search keyword. Try
              another search.
            </p>

            <Link
              to="/products"
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition shadow-xl"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}