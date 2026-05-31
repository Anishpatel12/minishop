// src/pages/Products.jsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  FaSearch,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaFilter,
  FaBoxOpen,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";

import API from "../services/api";

export default function Products() {
  // PRODUCTS
  const [products, setProducts] =
    useState([]);

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // ERROR
  const [error, setError] =
    useState("");

  // SEARCH
  const [search, setSearch] =
    useState("");

  // CATEGORY
  const [category, setCategory] =
    useState("All");

  // SORT
  const [sort, setSort] =
    useState("latest");

  // CART
  const { addToCart } = useCart();

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoading(true);

          const { data } =
            await API.get(
              "/products"
            );

          setProducts(data);
        } catch (error) {
          setError(
            "Failed to load products"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  // CATEGORIES
  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        products.map(
          (product) =>
            product.category
        )
      ),
    ],
    [products]
  );

  // FILTERED PRODUCTS
  const filteredProducts =
    useMemo(() => {
      let filtered =
        products.filter(
          (product) => {
            const matchSearch =
              product.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||
              product.brand
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchCategory =
              category === "All"
                ? true
                : product.category ===
                  category;

            return (
              matchSearch &&
              matchCategory
            );
          }
        );

      // SORTING
      if (sort === "low") {
        filtered.sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (sort === "high") {
        filtered.sort(
          (a, b) =>
            b.price - a.price
        );
      }

      return filtered;
    }, [
      products,
      search,
      category,
      sort,
    ]);

  // ADD TO CART
  const handleAddToCart = (
    product
  ) => {
    addToCart({
      id: product._id,

      title: product.title,

      price: product.price,

      image:
        product.images?.[0],

      quantity: 1,
    });

    toast.success(
      "Added To Cart"
    );
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h2 className="text-3xl font-bold">
            Loading Products...
          </h2>
        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            Error
          </h2>

          <p className="text-gray-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row justify-between gap-6 mb-12">
          {/* TITLE */}
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Explore Products
            </h1>

            <p className="text-gray-500 text-lg">
              Discover premium products
              from MiniStore.
            </p>
          </div>

          {/* SEARCH */}
          <div className="bg-white rounded-2xl shadow-lg flex items-center overflow-hidden w-full xl:w-[420px]">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full px-5 py-4 outline-none"
            />

            <button className="bg-blue-600 text-white px-6 py-5">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-5 rounded-3xl shadow-lg mb-10">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {/* CATEGORIES */}
            <div className="flex flex-wrap gap-3">
              {categories.map(
                (cat, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCategory(cat)
                    }
                    className={`px-5 py-3 rounded-2xl font-semibold transition ${
                      category === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* SORT */}
            <div className="flex items-center gap-3">
              <FaFilter className="text-blue-600 text-xl" />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value
                  )
                }
                className="border px-5 py-3 rounded-2xl outline-none"
              >
                <option value="latest">
                  Latest
                </option>

                <option value="low">
                  Price Low → High
                </option>

                <option value="high">
                  Price High → Low
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length >
        0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(
              (product) => (
                <div
                  key={product._id}
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

                    {/* FEATURED */}
                    {product.featured && (
                      <span className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        Featured
                      </span>
                    )}

{/* STOCK BADGE */}
{product.stock === 0 ? (
  <span className="absolute top-16 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
    Out Of Stock
  </span>
) : product.stock <= 5 ? (
  <span className="absolute top-16 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
    Only {product.stock} Left
  </span>
) : null}
                    {/* WISHLIST */}
                    <button className="absolute top-4 right-4 bg-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition">
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
                      {product.title}
                    </Link>

                    {/* BRAND */}
                    <p className="text-gray-500 mt-2">
                      Brand:{" "}
                      {
                        product.brand
                      }
                    </p>

                   {/* STOCK */}
{/* STOCK */}
<div className="mt-4">
  {product.stock === 0 ? (
    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Out Of Stock
    </span>
  ) : product.stock <= 5 ? (
    <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Only {product.stock} Left
    </span>
  ) : (
    <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      {product.stock} In Stock
    </span>
  )}
</div>

                    {/* RATING */}
                    <div className="flex items-center gap-1 text-yellow-500 mt-3">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />

                      <span className="text-gray-500 ml-2">
                        (4.9)
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

                      {/* CART */}
                      <button
  onClick={() =>
    handleAddToCart(product)
  }
  disabled={
    product.stock === 0
  }
  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition ${
    product.stock === 0
      ? "bg-red-400 cursor-not-allowed text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
>
  <FaShoppingCart />

  {product.stock === 0
    ? "Out Of Stock"
    : "Add To Cart"}
</button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* EMPTY */
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <FaBoxOpen className="text-7xl text-blue-600 mx-auto mb-6" />

            <h2 className="text-4xl font-bold mb-4">
              No Products Found
            </h2>

            <p className="text-gray-500 text-lg">
              Try another search or
              category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}