// src/pages/admin/AdminCategories.jsx

import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTags,
  FaSearch,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
} from "react-icons/fa";

export default function AdminCategories() {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      title: "",
      image: "",
      color:
        "from-blue-500 to-indigo-600",
      status: "Active",
    });

  const [stats, setStats] =
    useState({
      total: 0,
      active: 0,
      inactive: 0,
      products: 0,
    });

  // FETCH CATEGORIES
  const fetchCategories =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await API.get(
            "/categories"
          );

        setCategories(data);

        setStats({
          total: data.length,

          active: data.filter(
            (c) =>
              c.status ===
              "Active"
          ).length,

          inactive:
            data.filter(
              (c) =>
                c.status ===
                "Inactive"
            ).length,

          products:
            data.reduce(
              (sum, c) =>
                sum +
                (c.productCount ||
                  0),
              0
            ),
        });
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed To Load Categories"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  // HANDLE INPUT
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (editingId) {
          await API.put(
            `/categories/${editingId}`,
            form
          );

          toast.success(
            "Category Updated"
          );
        } else {
          await API.post(
            "/categories",
            form
          );

          toast.success(
            "Category Added"
          );
        }

        setForm({
          title: "",
          image: "",
          color:
            "from-blue-500 to-indigo-600",
          status:
            "Active",
        });

        setEditingId(
          null
        );

        fetchCategories();
      } catch (error) {
        console.log(error);

        toast.error(
          "Save Failed"
        );
      }
    };

  // EDIT
  const handleEdit =
    (category) => {
      setEditingId(
        category._id
      );

      setForm({
        title:
          category.title,
        image:
          category.image,
        color:
          category.color,
        status:
          category.status,
      });

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  // DELETE
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this category?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/categories/${id}`
        );

        toast.success(
          "Category Deleted"
        );

        fetchCategories();
      } catch (error) {
        console.log(error);

        toast.error(
          "Delete Failed"
        );
      }
    };

  // FILTER
  const filteredCategories =
    categories.filter(
      (category) => {
        const matchSearch =
          category.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchStatus =
          statusFilter ===
            "All" ||
          category.status ===
            statusFilter;

        return (
          matchSearch &&
          matchStatus
        );
      }
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Categories...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <FaTags className="text-5xl text-blue-600" />

        <div>
          <h1 className="text-4xl font-bold">
            Categories
            Management
          </h1>

          <p className="text-gray-500">
            Manage your
            store
            categories
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <FaLayerGroup className="text-4xl text-blue-600 mb-3" />

          <h3 className="text-gray-500">
            Total Categories
          </h3>

          <h2 className="text-4xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <FaCheckCircle className="text-4xl text-green-500 mb-3" />

          <h3 className="text-gray-500">
            Active
          </h3>

          <h2 className="text-4xl font-bold">
            {stats.active}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <FaTimesCircle className="text-4xl text-red-500 mb-3" />

          <h3 className="text-gray-500">
            Inactive
          </h3>

          <h2 className="text-4xl font-bold">
            {stats.inactive}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <FaBox className="text-4xl text-purple-600 mb-3" />

          <h3 className="text-gray-500">
            Products
          </h3>

          <h2 className="text-4xl font-bold">
            {stats.products}
          </h2>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-bold mb-6">
          {editingId
            ? "Update Category"
            : "Add Category"}
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Category Name"
            value={
              form.title
            }
            onChange={
              handleChange
            }
            required
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={
              form.image
            }
            onChange={
              handleChange
            }
            required
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            name="color"
            placeholder="Gradient Color"
            value={
              form.color
            }
            onChange={
              handleChange
            }
            className="border p-4 rounded-xl"
          />

          <select
            name="status"
            value={
              form.status
            }
            onChange={
              handleChange
            }
            className="border p-4 rounded-xl"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl p-4 font-semibold flex items-center justify-center gap-3 hover:bg-blue-700 transition"
          >
            <FaPlus />

            {editingId
              ? "Update Category"
              : "Add Category"}
          </button>
        </form>

        {form.image && (
          <div className="mt-6">
            <img
              src={
                form.image
              }
              alt="Preview"
              className="h-52 rounded-2xl object-cover"
            />
          </div>
        )}
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-5 rounded-3xl shadow-xl mb-10 flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-3 flex-1">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Category..."
            value={
              search
            }
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full outline-none"
          />
        </div>

        <select
          value={
            statusFilter
          }
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border px-4 py-3 rounded-xl"
        >
          <option value="All">
            All
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCategories.map(
          (
            category
          ) => (
            <div
              key={
                category._id
              }
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <img
                src={
                  category.image
                }
                alt={
                  category.title
                }
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {
                    category.title
                  }
                </h2>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">
                    {
                      category.productCount
                    }{" "}
                    Products
                  </span>

                  <span
                    className={`px-4 py-1 rounded-full text-white text-sm ${
                      category.status ===
                      "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {
                      category.status
                    }
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleEdit(
                        category
                      )
                    }
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
                  >
                    <FaEdit className="mx-auto" />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        category._id
                      )
                    }
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    <FaTrash className="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}