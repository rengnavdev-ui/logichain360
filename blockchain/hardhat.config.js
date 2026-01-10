require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const networks = {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
};

// Only load Amoy if keys look valid (basic length check for 0x + 64 hex chars = 66)
const privateKey = process.env.PRIVATE_KEY;
if (process.env.ALCHEMY_AMOY_URL && privateKey && privateKey.length === 66) {
    networks.amoy = {
        url: process.env.ALCHEMY_AMOY_URL,
        accounts: [privateKey]
    };
} else if (process.env.PRIVATE_KEY) {
    console.warn("Warning: PRIVATE_KEY present but invalid length. Amoy network disabled.");
}

module.exports = {
  solidity: "0.8.19",
  networks: networks
};
