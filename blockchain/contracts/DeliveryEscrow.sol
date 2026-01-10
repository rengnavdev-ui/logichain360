// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeliveryEscrow {
    enum ShipmentStatus {
        Created,
        PickedUp,
        Delivered
    }

    struct Shipment {
        address sender;
        address driver;
        uint256 amount;
        ShipmentStatus status;
        bool exists;
    }

    mapping(string => Shipment) public shipments;

    event ShipmentCreated(string shipmentId, address sender, uint256 amount);
    event ShipmentPickedUp(string shipmentId, address driver);
    event ShipmentDelivered(
        string shipmentId,
        address driver,
        uint256 amountReleased
    );

    function createShipment(
        string memory _shipmentId,
        address _driver
    ) external payable {
        require(!shipments[_shipmentId].exists, "Shipment ID already exists");
        require(msg.value > 0, "Amount must be greater than 0");

        shipments[_shipmentId] = Shipment({
            sender: msg.sender,
            driver: _driver,
            amount: msg.value,
            status: ShipmentStatus.Created,
            exists: true
        });

        emit ShipmentCreated(_shipmentId, msg.sender, msg.value);
    }

    function confirmPickup(string memory _shipmentId) external {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        require(
            msg.sender == shipment.driver,
            "Only assigned driver can confirm pickup"
        );
        require(
            shipment.status == ShipmentStatus.Created,
            "Invalid status transition"
        );

        shipment.status = ShipmentStatus.PickedUp;
        emit ShipmentPickedUp(_shipmentId, msg.sender);
    }

    function confirmDelivery(string memory _shipmentId) external {
        Shipment storage shipment = shipments[_shipmentId];
        require(shipment.exists, "Shipment does not exist");
        // In a real scenario, this might need multi-sig or OTP verification
        // For hackathon, allows the driver to claim upon delivery or sender to release
        require(
            msg.sender == shipment.driver || msg.sender == shipment.sender,
            "Unauthorized"
        );
        require(
            shipment.status == ShipmentStatus.PickedUp,
            "Invalid status transition"
        );

        shipment.status = ShipmentStatus.Delivered;
        (bool success, ) = payable(shipment.driver).call{
            value: shipment.amount
        }("");
        require(success, "Transfer failed");

        emit ShipmentDelivered(_shipmentId, shipment.driver, shipment.amount);
    }

    function getShipment(
        string memory _shipmentId
    ) external view returns (Shipment memory) {
        return shipments[_shipmentId];
    }
}
