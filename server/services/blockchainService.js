// server/services/blockchainService.js - Production-ready
const { ethers } = require('ethers');

/**
 * Blockchain service for interacting with the DeliveryEscrow smart contract
 */
class BlockchainService {
    constructor() {
        this.provider = null;
        this.contract = null;
        this.isConnected = false;
    }

    /**
     * Initialize blockchain connection
     */
    async connect() {
        try {
            if (!process.env.ALCHEMY_URL) {
                console.warn('⚠️  ALCHEMY_URL not set, blockchain features disabled');
                return false;
            }

            this.provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
            
            // Test connection
            await this.provider.getBlockNumber();
            
            this.isConnected = true;
            console.log('✅ Blockchain service connected');
            return true;
        } catch (error) {
            console.error('❌ Blockchain connection failed:', error.message);
            this.isConnected = false;
            return false;
        }
    }

    /**
     * Health check for blockchain connection
     */
    async healthCheck() {
        if (!this.isConnected) {
            return { status: 'disconnected', message: 'Blockchain not configured' };
        }

        try {
            const blockNumber = await this.provider.getBlockNumber();
            return {
                status: 'connected',
                blockNumber,
                network: (await this.provider.getNetwork()).name
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    /**
     * Get contract instance
     * @param {string} contractAddress
     * @param {Array} abi
     */
    getContract(contractAddress, abi) {
        if (!this.provider) {
            throw new Error('Blockchain provider not initialized');
        }
        
        return new ethers.Contract(contractAddress, abi, this.provider);
    }
}

// Export singleton instance
module.exports = new BlockchainService();
