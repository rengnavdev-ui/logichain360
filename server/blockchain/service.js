const { ethers } = require("hardhat");
const DeliveryEscrowArtifact = require("../../blockchain/artifacts/contracts/DeliveryEscrow.sol/DeliveryEscrow.json");

// In a real production app, we wouldn't use hardhat in the backend (it's heavy).
// We'd use clean 'ethers' with a provider.
// However, since we are in a monorepo workspace and verified hardhat works locally, we can use it, or fallback to direct ethers.
// Given the CJS fix, let's use direct ethers for stability and speed in the backend context, if possible, 
// OR just use the installed ethers dependency directly.

const { ethers: ethersLib } = require("ethers");

class BlockchainService {
    constructor() {
        this.provider = null;
        this.wallet = null;
        this.contract = null;
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        this.rpcUrl = process.env.ALCHEMY_AMOY_URL;
        this.privateKey = process.env.PRIVATE_KEY;
        
        console.log("Blockchain Service Init:");
        console.log("Contract:", this.contractAddress);
        console.log("RPC:", this.rpcUrl ? "Configured" : "Missing");

        this.init();
    }

    init() {
        if (!this.rpcUrl || !this.privateKey || !this.contractAddress) {
            console.warn("Blockchain configuration missing. skipping init.");
            return;
        }

        try {
            this.provider = new ethersLib.JsonRpcProvider(this.rpcUrl);
            this.wallet = new ethersLib.Wallet(this.privateKey, this.provider);
            this.contract = new ethersLib.Contract(
                this.contractAddress,
                DeliveryEscrowArtifact.abi,
                this.wallet
            );
            console.log("Blockchain Service initialized successfully.");
        } catch (error) {
            console.error("Blockchain init failed:", error.message);
        }
    }

    async createShipmentOnChain(shipmentId, driverAddress, price) {
        if (!this.contract) throw new Error("Blockchain not initialized");
        
        console.log(`Creating shipment ${shipmentId} on-chain with price ${price}...`);
        // Note: 'price' is in ETH/MATIC string, e.g. "0.01"
        const tx = await this.contract.createShipment(
            shipmentId,
            driverAddress, // Must be a valid Ethereum address
            { value: ethersLib.parseEther(price.toString()) }
        );
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        console.log("Transaction confirmed:", tx.hash);
        return tx.hash;
    }

    async getShipment(shipmentId) {
        if (!this.contract) throw new Error("Blockchain not initialized");
        return await this.contract.getShipment(shipmentId);
    }
}

module.exports = new BlockchainService();
