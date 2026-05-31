// src/pages/admin/EditProduct.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";

import API from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // FORM
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

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const { data } =
            await API.get(
              `/products/${id}`
            );

          setFormData({
            title: data.title,

            price: data.price,

            category:
              data.category,

            brand: data.brand,

            description:
              data.description,

            image:
              data.images?.[0],

            stock: data.stock,

            featured:
              data.featured,
          });
        } catch (error) {
          toast.error(
            "Failed To Load Product"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  // HANDLE CHANGE
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

  // UPDATE
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.put(
        `/products/${id}`,

        {
          title: formData.title,

          price: Number(
            formData.price
          ),

          category:
            formData.category,

          brand: formData.brand,

          description:
            formData.description,

          images: [
            formData.image,
          ],

          stock: Number(
            formData.stock
          ),

          featured:
            formData.featured,
        }
      );

      toast.success(
        "Product Updated"
      );

      navigate(
        "/admin/products"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Update Failed"
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-10">
          Edit Product
        </h1>

        <div className="bg-white p-10 rounded-3xl shadow-xl">
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={
                formData.category
              }
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl"
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl md:col-span-2"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl"
            />

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleChange
                }
                className="w-5 h-5"
              />

              <label className="font-semibold">
                Featured Product
              </label>
            </div>

            <textarea
              name="description"
              rows="5"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              required
              className="border-2 p-4 rounded-2xl md:col-span-2"
            ></textarea>

            <button className="bg-blue-600 text-white py-4 rounded-2xl font-semibold md:col-span-2 hover:bg-blue-700 transition">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}