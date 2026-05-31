// src/main.jsx

import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

// CONTEXTS
import { CartProvider } from "./context/CartContext";

import { AuthProvider } from "./context/AuthContext";

// TOAST
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    {/* ONLY ONE ROUTER */}
    <BrowserRouter>
      {/* AUTH CONTEXT */}
      <AuthProvider>
        {/* CART CONTEXT */}
        <CartProvider>
          {/* APP */}
          <App />

          {/* TOAST */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,

              style: {
                borderRadius: "14px",

                background: "#111827",

                color: "#fff",

                padding: "14px 18px",

                fontSize: "15px",
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);