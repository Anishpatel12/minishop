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
        { command }
      );

    setResponse(data);

    if (data.success) {
      toast.success(
        data.message
      );

      // Product actions ke baad
      if (
        data.message.includes(
          "Product"
        ) ||
        data.message.includes(
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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        AI Product Assistant
      </h1>

      <textarea
        className="border rounded-lg p-4 w-full"
        rows="5"
        placeholder="Add product Nike Shoes price 1999 stock 50 category Footwear brand Nike description Running Shoes"
        value={command}
        onChange={(e) =>
          setCommand(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
      >
        {loading
          ? "Processing..."
          : "Send"}
      </button>

      {response && (
        <div className="mt-6 border rounded-lg p-4">
          <h2 className="font-bold text-lg mb-2">
            AI Response
          </h2>

          <p>
            {response.message}
          </p>

          {response.product && (
            <div className="mt-4">
              <p>
                <b>Title:</b>{" "}
                {
                  response.product
                    .title
                }
              </p>

              <p>
                <b>Price:</b> ₹
                {
                  response.product
                    .price
                }
              </p>

              <p>
                <b>Stock:</b>{" "}
                {
                  response.product
                    .stock
                }
              </p>

              <p>
                <b>Category:</b>{" "}
                {
                  response.product
                    .category
                }
              </p>

              <p>
                <b>Brand:</b>{" "}
                {
                  response.product
                    .brand
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}