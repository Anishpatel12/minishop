// src/pages/admin/AddProduct.jsx

import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaImage,
  FaTag,
  FaRupeeSign,
  FaLayerGroup,
  FaWarehouse,
  FaStar,
} from "react-icons/fa";

import AdminSidebar from "../../components/admin/AdminSidebar";

import toast from "react-hot-toast";

import API from "../../services/api";

export default function AddProduct() {
  const navigate = useNavigate();

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // FORM DATA
  const [formData, setFormData] =
    useState({
      title: "",

      price: "",

      category: "",

      brand: "",

      description: "",

      image: "",

      stock: "",

      featured: false,
    });

  // HANDLE INPUT
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      // PRODUCT DATA
      const productData = {
        title: formData.title,

        price: Number(
          formData.price
        ),

        category:
          formData.category,

        brand: formData.brand,

        description:
          formData.description,

        images: [formData.image],

        stock: Number(
          formData.stock
        ),

        featured:
          formData.featured,
      };

      // API CALL
      await API.post(
        "/products",
        productData
      );

      toast.success(
        "Product Added Successfully"
      );

      // REDIRECT
      navigate(
        "/admin/products"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed To Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6 lg:p-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">
            Add New Product
          </h1>

          <p className="text-gray-500 text-lg">
            Create premium products
            for your ecommerce
            store.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-[35px] shadow-2xl p-8 lg:p-12">
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* TITLE */}
            <div>
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaBoxOpen />

                Product Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaRupeeSign />

                Product Price
              </label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaLayerGroup />

                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Electronics"
                value={
                  formData.category
                }
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* BRAND */}
            <div>
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaTag />

                Brand
              </label>

              <input
                type="text"
                name="brand"
                placeholder="Apple"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaImage />

                Product Image URL
              </label>

              <input
                type="text"
                name="image"
                placeholder="Paste image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* STOCK */}
            <div>
              <label className="font-semibold mb-3 flex items-center gap-2">
                <FaWarehouse />

                Stock Quantity
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Enter stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* FEATURED */}
            <div className="flex items-center gap-4 mt-10">
              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleChange
                }
                className="w-6 h-6"
              />

              <label className="font-semibold flex items-center gap-2">
                <FaStar className="text-yellow-500" />

                Featured Product
              </label>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="font-semibold mb-3 block">
                Product Description
              </label>

              <textarea
                name="description"
                rows="6"
                placeholder="Write product description..."
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
                className="w-full border-2 border-gray-200 p-4 rounded-2xl outline-none focus:border-blue-600 transition resize-none"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl disabled:bg-gray-400"
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}