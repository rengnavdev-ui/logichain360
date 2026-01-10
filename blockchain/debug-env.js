const result = require("dotenv").config();
console.log("Dotenv result:", result);
console.log("PRIVATE_KEY loaded:", process.env.PRIVATE_KEY ? "Yes" : "No");
if (process.env.PRIVATE_KEY) {
    console.log("PRIVATE_KEY length:", process.env.PRIVATE_KEY.length);
}
console.log("Current Directory:", process.cwd());
