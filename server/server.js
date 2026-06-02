const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();

// DATABASE
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://minishop-rr2g20ru7-anishpatel12s-projects.vercel.app",
    ],
    credentials: true,
  })
);

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoryRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mini Shop API Running",
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ERROR HANDLER
app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err.message ||
        "Server Error",
    });
  }
);

// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});