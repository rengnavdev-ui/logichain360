const { ethers } = require("hardhat");

async function main() {
  const Escrow = await ethers.getContractFactory("DeliveryEscrow");
  const escrow = await Escrow.deploy();

  await escrow.waitForDeployment();

  console.log(`DeliveryEscrow deployed to: ${await escrow.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
