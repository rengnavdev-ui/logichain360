require("dotenv").config();
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 LogiChain360 backend running on port ${PORT}`);
});

