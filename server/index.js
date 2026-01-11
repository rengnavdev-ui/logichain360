const dns = require("node:dns");
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.error("Failed to set custom DNS servers", e);
}

require("dotenv").config();
const http = require("http");
const app = require("./app");
const socket = require("./socket");

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
socket.init(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 NexLogica backend running on port ${PORT}`);
});
