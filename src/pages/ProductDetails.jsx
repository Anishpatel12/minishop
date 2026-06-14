// src/pages/ProductDetails.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaSpinner,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";

import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } =
    useCart();

  // STATES
  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const [mainImage, setMainImage] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          setLoading(true);

          // PRODUCT
          const productRes =
            await API.get(
              `/products/${id}`
            );

          setProduct(
            productRes.data
          );

          setMainImage(
            productRes.data
              ?.images?.[0]
          );

          // ALL PRODUCTS
          const productsRes =
            await API.get(
              "/products"
            );

          setProducts(
            productsRes.data
          );
        } catch (error) {
          toast.error(
            "Product Not Found"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-7xl text-blue-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Loading Product...
          </h2>
        </div>
      </div>
    );
  }

  // NO PRODUCT
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-16 rounded-[35px] shadow-2xl text-center">
          <h2 className="text-5xl font-bold mb-5">
            Product Not Found
          </h2>

          <Link
            to="/products"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl inline-block mt-5"
          >
            Back To Products
          </Link>
        </div>
      </div>
    );
  }

  // RELATED PRODUCTS
  const relatedProducts =
    products.filter(
      (item) =>
        item._id !== product._id
    );

  // QUANTITY
  const increaseQty = () => {
    setQuantity(
      quantity + 1
    );
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(
        quantity - 1
      );
    }
  };

  // ADD TO CART
  const handleAddToCart =
    async () => {
      try {
        await addToCart({
          id: product._id,

          title:
            product.title,

          price:
            product.price,

          image:
            product.images?.[0],

          quantity,
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

  // BUY NOW
  const handleBuyNow =
    async () => {
      await handleAddToCart();

      navigate("/checkout");
    };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* MAIN */}
        <div className="bg-white rounded-[40px] shadow-2xl p-6 lg:p-10 grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div>
            {/* IMAGE */}
            <div className="bg-gray-100 rounded-[35px] overflow-hidden">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
              {product.images?.map(
                (
                  img,
                  index
                ) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() =>
                      setMainImage(
                        img
                      )
                    }
                    className={`w-24 h-24 rounded-2xl object-cover cursor-pointer border-4 transition ${
                      mainImage ===
                      img
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                  />
                )
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {/* CATEGORY */}
            <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mb-5">
              {product.category}
            </div>

            {/* TITLE */}
           <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-5 leading-tight break-words">
              {product.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500 text-lg">
                <FaStar />

                <span className="ml-2 font-bold">
                  {product.rating ||
                    4.8}
                </span>
              </div>

              <span className="text-gray-500">
                (
                {product.reviews ||
                  124}{" "}
                Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-5 mb-8">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                ₹{product.price}
              </span>

              <span className="text-xl sm:text-2xl text-gray-400 line-through">
                ₹
                {product.oldPrice ||
                  product.price +
                    1000}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-lg leading-9 mb-8">
              {
                product.description
              }
            </p>

            {/* BRAND */}
            <div className="mb-4 text-lg">
              <span className="font-bold">
                Brand:
              </span>{" "}
              {product.brand}
            </div>

            {/* STOCK */}
            <div className="mb-8">
              {product.stock >
              0 ? (
                <span className="bg-green-100 text-green-700 px-5 py-3 rounded-full font-semibold">
                  In Stock (
                  {product.stock})
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-5 py-3 rounded-full font-semibold">
                  Out Of Stock
                </span>
              )}
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-5 mb-10">
              <span className="font-bold text-xl">
                Quantity:
              </span>

              <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={
                    decreaseQty
                  }
                  className="px-6 py-4 hover:bg-gray-200"
                >
                  <FaMinus />
                </button>

                <span className="px-8 text-xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={
                    increaseQty
                  }
                  className="px-6 py-4 hover:bg-gray-200"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              {/* ADD */}
              <button
                onClick={
                  handleAddToCart
                }
                className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-2xl hover:bg-blue-700 transition font-semibold text-lg w-full shadow-lg"
              >
                <FaShoppingCart />

                Add To Cart
              </button>

              {/* BUY */}
              <button
                onClick={
                  handleBuyNow
                }
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl hover:bg-gray-800 transition font-semibold text-lg w-full"
              >
                <FaBolt />

                Buy Now
              </button>

              {/* WISHLIST */}
              <button className="border-2 border-gray-300 p-5 rounded-2xl hover:bg-gray-100 transition">
                <FaHeart className="text-2xl" />
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-5">
              {/* DELIVERY */}
              <div className="bg-gray-50 p-6 rounded-3xl text-center">
                <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />

                <h3 className="font-bold mb-2">
                  Free Delivery
                </h3>

                <p className="text-sm text-gray-500">
                  On orders above
                  ₹999
                </p>
              </div>

              {/* RETURNS */}
              <div className="bg-gray-50 p-6 rounded-3xl text-center">
                <FaUndo className="text-4xl text-blue-600 mx-auto mb-4" />

                <h3 className="font-bold mb-2">
                  Easy Returns
                </h3>

                <p className="text-sm text-gray-500">
                  7 Days Return
                  Policy
                </p>
              </div>

              {/* PAYMENT */}
              <div className="bg-gray-50 p-6 rounded-3xl text-center">
                <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />

                <h3 className="font-bold mb-2">
                  Secure Payment
                </h3>

                <p className="text-sm text-gray-500">
                  100% Protected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-bold">
              Related Products
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
            {relatedProducts
              .slice(0, 4)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item.images?.[0]
                    }
                    alt={item.title}
                    className="h-72 w-full object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-600">
                        ₹{item.price}
                      </span>

                      <Link
                        to={`/product/${item._id}`}
                        className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}