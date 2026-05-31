// src/pages/admin/AdminProducts.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaBoxOpen,
} from "react-icons/fa";

import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";

import API from "../../services/api";

export default function AdminProducts() {
  // PRODUCTS
  const [products, setProducts] =
    useState([]);

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // FETCH PRODUCTS
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

  // LOAD
  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/products/${id}`
        );

        toast.success(
          "Product Deleted"
        );

        // REMOVE UI
        setProducts(
          products.filter(
            (product) =>
              product._id !== id
          )
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Delete Failed"
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
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className="flex-1 p-6 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <h1 className="text-5xl font-bold mb-3">
              Manage Products
            </h1>

            <p className="text-gray-500 text-lg">
              Control all products in
              your store.
            </p>
          </div>

          {/* ADD BUTTON */}
          <Link
            to="/admin/add-product"
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-blue-700 transition shadow-lg"
          >
            <FaPlus />

            Add Product
          </Link>
        </div>

        {/* EMPTY */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <FaBoxOpen className="text-7xl text-blue-600 mx-auto mb-6" />

            <h2 className="text-4xl font-bold mb-4">
              No Products Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-5 text-left">
                    Product
                  </th>

                  <th className="p-5 text-left">
                    Category
                  </th>

                  <th className="p-5 text-left">
                    Brand
                  </th>

                  <th className="p-5 text-left">
                    Price
                  </th>

                  <th className="p-5 text-left">
                    Stock
                  </th>

                  <th className="p-5 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* PRODUCT */}
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product
                                .images?.[0]
                            }
                            alt={
                              product.title
                            }
                            className="w-20 h-20 object-cover rounded-2xl"
                          />

                          <div>
                            <h2 className="font-bold text-lg">
                              {
                                product.title
                              }
                            </h2>

                            <p className="text-gray-500">
                              ID:{" "}
                              {
                                product._id
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="p-5 font-semibold">
                        {
                          product.category
                        }
                      </td>

                      {/* BRAND */}
                      <td className="p-5">
                        {
                          product.brand
                        }
                      </td>

                      {/* PRICE */}
                      <td className="p-5 text-blue-600 font-bold text-lg">
                        ₹
                        {
                          product.price
                        }
                      </td>

                      {/* STOCK */}
                      <td className="p-5">
                        {product.stock >
                        0 ? (
                          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            In Stock (
                            {
                              product.stock
                            }
                            )
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Out Of Stock
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-5">
                        <div className="flex justify-center gap-4">
                          {/* EDIT */}
                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="bg-yellow-400 text-black w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-yellow-500 transition"
                          >
                            <FaEdit />
                          </Link>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="bg-red-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-red-600 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}