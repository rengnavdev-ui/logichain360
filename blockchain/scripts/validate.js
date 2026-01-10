const { ethers, config } = require("hardhat");

async function main() {
    console.log("Checking configuration...");
    const networkConfig = config.networks.amoy;
    console.log("Network URL:", networkConfig.url);
    
    if (!networkConfig.accounts || networkConfig.accounts.length === 0) {
        throw new Error("No accounts configured for Amoy network");
    }
    
    console.log("Accounts configured: Yes");
    
    // Check if URL is reachable (basic check)
    // Note: This doesn't validate the URL fully, but Ethers provider will fail if it's garbage
    
    try {
        const [deployer] = await ethers.getSigners();
        console.log("Deployer address:", deployer.address);
        const balance = await ethers.provider.getBalance(deployer.address);
        console.log("Deployer balance:", ethers.formatEther(balance));
    } catch (error) {
        console.error("Error connecting or getting signer:", error.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
