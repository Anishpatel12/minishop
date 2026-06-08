import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminAI() {
  const [command, setCommand] =
    useState("");

  const [response, setResponse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/ai/inventory",
          {
            command,
          }
        );

      setResponse(data);

      if (data.success) {
        toast.success(
          data.message ||
            "Success"
        );

        if (
          data.message?.includes(
            "Product"
          ) ||
          data.message?.includes(
            "Stock"
          )
        ) {
          setTimeout(() => {
            navigate(
              "/admin/products"
            );
          }, 1500);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "AI Command Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Product Assistant
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <textarea
          rows="7"
          value={command}
          onChange={(e) =>
            setCommand(
              e.target.value
            )
          }
          placeholder={`Examples:

Add a premium black Nike running shoe for men with price 2999 and stock 50

Generate 20 Samsung mobile products

Delete product Nike Air Zoom

Update stock Samsung Galaxy S25 100

Find product Samsung`}
          className="w-full border rounded-xl p-4 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Processing..."
            : "Send Command"}
        </button>
      </div>

      {response && (
        <div className="mt-8 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">
            AI Response
          </h2>

          <p className="mb-4">
            {response.message}
          </p>

          {/* Generated Products Count */}
          {response.count && (
            <div className="mb-6 p-4 bg-green-100 rounded-xl">
              <h3 className="font-bold text-lg">
                Products Generated
              </h3>

              <p>
                {response.count} products
                added successfully.
              </p>
            </div>
          )}

          {/* Product Details */}
          {response.product && (
            <div className="space-y-3">
              {response.product
                ?.images?.[0] && (
                <img
                  src={
                    response
                      .product
                      .images[0]
                  }
                  alt={
                    response
                      .product
                      .title
                  }
                  className="w-48 h-48 object-cover rounded-xl border"
                />
              )}

              <p>
                <strong>
                  Title:
                </strong>{" "}
                {
                  response
                    .product
                    .title
                }
              </p>

              <p>
                <strong>
                  Price:
                </strong>{" "}
                ₹
                {
                  response
                    .product
                    .price
                }
              </p>

              <p>
                <strong>
                  Stock:
                </strong>{" "}
                {
                  response
                    .product
                    .stock
                }
              </p>

              <p>
                <strong>
                  Category:
                </strong>{" "}
                {
                  response
                    .product
                    .category
                }
              </p>

              <p>
                <strong>
                  Brand:
                </strong>{" "}
                {
                  response
                    .product
                    .brand
                }
              </p>

              <p>
                <strong>
                  Description:
                </strong>{" "}
                {
                  response
                    .product
                    .description
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}