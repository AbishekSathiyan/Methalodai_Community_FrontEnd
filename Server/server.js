require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const DB_NAME = "Methalodai-Community";

// ====== Middleware ======
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== Routes ======
// Auth routes (register + login + profile + update-profile)
app.use("/api/auth", require("./routes/auth"));

// OTP routes
app.use("/api/otp", require("./routes/otp"));

// Friends routes
app.use("/api/user/friends", require("./routes/friends"));

// Admin / Users listing
app.use("/api/users", require("./routes/users"));

// General root routes
app.use("/api", require("./routes/index"));

// ====== Health Check ======
app.get("/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date() })
);

// ====== 404 Handler ======
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Endpoint not found" })
);

// ====== Debug: List Endpoints ======
function listEndpoints(app, basePath = "") {
  if (!app._router) return;

  const routes = [];

  function traverse(stack, currentPath) {
    stack.forEach((middleware) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods)
          .join(", ")
          .toUpperCase();
        routes.push({ path: currentPath + middleware.route.path, methods });
      } else if (middleware.name === "router" && middleware.handle.stack) {
        const newBasePath =
          currentPath +
          middleware.regexp.source
            .replace("^\\", "")
            .replace("\\/?(?=\\/|$)", "")
            .replace(/\\\//g, "/")
            .replace(/\$$/, "")
            .replace(/\\\./g, ".");
        traverse(middleware.handle.stack, newBasePath);
      }
    });
  }

  traverse(app._router.stack, basePath);

  if (basePath === "") {
    console.log("✅ Registered Endpoints:");
    console.table(routes);
  }
}

// ====== MongoDB Connection / Server Start ======
mongoose
  .connect(process.env.MONGO_URI, { dbName: DB_NAME })
  .then(() => {
    console.log(`✅ MongoDB connected to ${DB_NAME}`);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      listEndpoints(app);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
