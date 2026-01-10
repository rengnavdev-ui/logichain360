const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Global middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Health check (hackathon judges will hit this)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    project: "LogiChain360",
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

// API entry point (expand safely later)
app.use("/api", require("./routes"));

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;

