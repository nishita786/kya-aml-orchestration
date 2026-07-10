const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const kycRoutes = require("./routes/kycRoutes");
const auditRoutes = require("./routes/auditRoutes");

const app = express();

// ================= Middleware =================

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// ================= Swagger =================

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
);

// ================= Routes =================

app.use("/api/auth", authRoutes);

app.use("/api/kyc", kycRoutes);

app.use("/api/audit", auditRoutes);

// ================= Root =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "KYC AML Orchestration API",
    version: "1.0.0",
    message: "Server Running Successfully 🚀"
  });
});

// ================= Debug =================

console.log("Swagger Paths:");
console.log(swaggerSpec.paths);

// ================= Export =================

module.exports = app;