const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DeliveryEscrow", function () {
  let DeliveryEscrow, escrow;
  let owner, driver, otherAccount;

  beforeEach(async function () {
    [owner, driver, otherAccount] = await ethers.getSigners();
    DeliveryEscrow = await ethers.getContractFactory("DeliveryEscrow");
    escrow = await DeliveryEscrow.deploy();
  });

  it("Should create a shipment with value", async function () {
    const shipmentId = "SHIP-001";
    const value = ethers.parseEther("1.0");

    await expect(escrow.createShipment(shipmentId, driver.address, { value }))
      .to.emit(escrow, "ShipmentCreated")
      .withArgs(shipmentId, owner.address, value);

    const shipment = await escrow.getShipment(shipmentId);
    expect(shipment.sender).to.equal(owner.address);
    expect(shipment.driver).to.equal(driver.address);
    expect(shipment.amount).to.equal(value);
    expect(shipment.status).to.equal(0); // Created
  });

  it("Should confirm pickup by driver", async function () {
    const shipmentId = "SHIP-002";
    const value = ethers.parseEther("0.5");
    
    await escrow.createShipment(shipmentId, driver.address, { value });

    await expect(escrow.connect(driver).confirmPickup(shipmentId))
      .to.emit(escrow, "ShipmentPickedUp")
      .withArgs(shipmentId, driver.address);

    const shipment = await escrow.getShipment(shipmentId);
    expect(shipment.status).to.equal(1); // PickedUp
  });

  it("Should confirm delivery and release funds", async function () {
    const shipmentId = "SHIP-003";
    const value = ethers.parseEther("2.0");
    
    await escrow.createShipment(shipmentId, driver.address, { value });
    await escrow.connect(driver).confirmPickup(shipmentId);

    // Check driver balance before
    // const balBefore = await ethers.provider.getBalance(driver.address);

    const balBefore = await ethers.provider.getBalance(await escrow.getAddress());
    
    await expect(escrow.connect(driver).confirmDelivery(shipmentId))
      .to.emit(escrow, "ShipmentDelivered")
      .withArgs(shipmentId, driver.address, value);

    const balAfter = await ethers.provider.getBalance(await escrow.getAddress());
    expect(balBefore - balAfter).to.equal(value);

    const shipment = await escrow.getShipment(shipmentId);
    expect(shipment.status).to.equal(2); // Delivered
  });
});
