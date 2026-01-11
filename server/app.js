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

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Health check (hackathon judges will hit this)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    project: "NexLogica",
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

// API entry point (expand safely later)
app.use("/api", require("./routes"));

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('=== ERROR ===');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

module.exports = app;

