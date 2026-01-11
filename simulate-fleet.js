const { io } = require('socket.io-client');
const socket = io('http://localhost:5000');

console.log('🚀 Starting High-Fidelity Fleet Simulator (18 Vehicles)...');

// Helper to interpolate between two points
function moveTowards(current, target, speed) {
    const dx = target.lat - current.lat;
    const dy = target.lng - current.lng;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < speed) return target; // Arrived

    const ratio = speed / distance;
    return {
        lat: current.lat + dx * ratio,
        lng: current.lng + dy * ratio
    };
}

// 18 Vehicles with predefined routes (waypoints) across India
const fleet = [
    // North India
    { id: 'VH-101', type: 'Heavy Truck', driver: 'Rajesh Kumar', route: [{ lat: 28.7041, lng: 77.1025 }, { lat: 28.4595, lng: 77.0266 }, { lat: 26.9124, lng: 75.7873 }] }, // Delhi -> Jaipur
    { id: 'VH-102', type: 'Medium Van', driver: 'Suresh Singh', route: [{ lat: 28.6139, lng: 77.2090 }, { lat: 28.5355, lng: 77.3910 }, { lat: 28.4089, lng: 77.3178 }] }, // Delhi Local
    { id: 'VH-103', type: 'Cold Chain', driver: 'Amit Verma', route: [{ lat: 30.7333, lng: 76.7794 }, { lat: 29.9695, lng: 76.8783 }, { lat: 28.7041, lng: 77.1025 }] }, // Chandigarh -> Delhi

    // West India
    { id: 'VH-201', type: 'Heavy Truck', driver: 'Vikram Seth', route: [{ lat: 19.0760, lng: 72.8777 }, { lat: 19.9975, lng: 73.7898 }, { lat: 21.1702, lng: 72.8311 }] }, // Mumbai -> Surat
    { id: 'VH-202', type: 'Container', driver: 'Rahul Patil', route: [{ lat: 18.5204, lng: 73.8567 }, { lat: 19.0330, lng: 73.0297 }, { lat: 18.9446, lng: 72.9648 }] }, // Pune -> Mumbai Port
    { id: 'VH-203', type: 'Medium Van', driver: 'Ganesh Naik', route: [{ lat: 19.0760, lng: 72.8777 }, { lat: 19.2183, lng: 72.9781 }, { lat: 19.1136, lng: 72.8697 }] }, // Mumbai Local

    // South India
    { id: 'VH-301', type: 'Heavy Truck', driver: 'Karthik R', route: [{ lat: 12.9716, lng: 77.5946 }, { lat: 12.2958, lng: 76.6394 }, { lat: 11.4102, lng: 76.6950 }] }, // Bangalore -> Ooty
    { id: 'VH-302', type: 'Cold Chain', driver: 'Mani S', route: [{ lat: 13.0827, lng: 80.2707 }, { lat: 12.9165, lng: 79.1325 }, { lat: 12.9716, lng: 77.5946 }] }, // Chennai -> Bangalore
    { id: 'VH-303', type: 'Container', driver: 'Arjun K', route: [{ lat: 9.9312, lng: 76.2673 }, { lat: 10.5276, lng: 76.2144 }, { lat: 11.0168, lng: 76.9558 }] }, // Kochi -> Coimbatore

    // East India
    { id: 'VH-401', type: 'Heavy Truck', driver: 'Debasish M', route: [{ lat: 22.5726, lng: 88.3639 }, { lat: 23.2324, lng: 87.8615 }, { lat: 23.6102, lng: 85.2799 }] }, // Kolkata -> Ranchi
    { id: 'VH-402', type: 'Medium Van', driver: 'Sourav G', route: [{ lat: 20.2961, lng: 85.8245 }, { lat: 19.8135, lng: 85.8312 }, { lat: 17.6868, lng: 83.2185 }] }, // Bhubaneswar -> Vizag

    // Central India
    { id: 'VH-501', type: 'Heavy Truck', driver: 'Ravi Yadav', route: [{ lat: 23.2599, lng: 77.4126 }, { lat: 22.7196, lng: 75.8577 }, { lat: 21.1458, lng: 79.0882 }] }, // Bhopal -> Indore -> Nagpur
    { id: 'VH-502', type: 'Heavy Truck', driver: 'Ankit Tiwari', route: [{ lat: 26.8467, lng: 80.9462 }, { lat: 26.4499, lng: 80.3319 }, { lat: 25.3176, lng: 82.9739 }] }, // Lucknow -> Kanpur -> Varanasi

    // Express Delivery
    { id: 'VH-601', type: 'Bike Courier', driver: 'Speedy Singh', route: [{ lat: 28.5562, lng: 77.1000 }, { lat: 28.5244, lng: 77.1855 }, { lat: 28.6129, lng: 77.2295 }] }, // Delhi Deliveries
    { id: 'VH-602', type: 'Bike Courier', driver: 'Rocket Ramesh', route: [{ lat: 19.1136, lng: 72.8697 }, { lat: 19.0760, lng: 72.8777 }, { lat: 18.9220, lng: 72.8347 }] }, // Mumbai Deliveries

    // Inter-State Long Haul
    { id: 'VH-701', type: 'Trailer', driver: 'Big John', route: [{ lat: 28.6139, lng: 77.2090 }, { lat: 25.18, lng: 75.83 }, { lat: 19.0760, lng: 72.8777 }] }, // Delhi -> Mumbai (Approx)
    { id: 'VH-702', type: 'Trailer', driver: 'Heavy Harry', route: [{ lat: 22.5726, lng: 88.3639 }, { lat: 21.1458, lng: 79.0882 }, { lat: 19.0760, lng: 72.8777 }] }, // Kolkata -> Mumbai
    { id: 'VH-703', type: 'Trailer', driver: 'Captain Cool', route: [{ lat: 13.0827, lng: 80.2707 }, { lat: 17.3850, lng: 78.4867 }, { lat: 21.1458, lng: 79.0882 }] }, // Chennai -> Hyderabad -> Nagpur

    // North East & Mountain
    { id: 'VH-801', type: 'Heavy Truck', driver: 'Tenzing N', route: [{ lat: 27.3389, lng: 88.6065 }, { lat: 26.7271, lng: 88.3953 }, { lat: 26.1445, lng: 91.7362 }] }, // Gangtok -> Siliguri -> Guwahati
    { id: 'VH-802', type: 'Medium Van', driver: 'Arun Das', route: [{ lat: 26.1445, lng: 91.7362 }, { lat: 25.5788, lng: 91.8933 }, { lat: 24.8170, lng: 93.9368 }] }, // Guwahati -> Shillong -> Imphal

    // Industrial Corridors
    { id: 'VH-901', type: 'Tanker', driver: 'Balwinder S', route: [{ lat: 30.9010, lng: 75.8573 }, { lat: 28.6139, lng: 77.2090 }, { lat: 27.1767, lng: 78.0081 }] }, // Ludhiana -> Delhi -> Agra
    { id: 'VH-902', type: 'Container', driver: 'Jose P', route: [{ lat: 9.9312, lng: 76.2673 }, { lat: 8.5241, lng: 76.9366 }, { lat: 8.0860, lng: 77.5385 }] }, // Kochi -> Trivandrum -> Kanyakumari

    // City Logistics
    { id: 'VH-903', type: 'Electric Van', driver: 'Green Go', route: [{ lat: 12.9716, lng: 77.5946 }, { lat: 12.9352, lng: 77.6245 }, { lat: 12.9141, lng: 77.6100 }] }, // Bangalore Tech Park Loop
    { id: 'VH-904', type: 'Bike Courier', driver: 'Fast Eddie', route: [{ lat: 17.3850, lng: 78.4867 }, { lat: 17.4401, lng: 78.3489 }, { lat: 17.4065, lng: 78.4772 }] }, // Hyderabad Gachibowli Loop
];

// Initialize vehicle states
const activeVehicles = fleet.map(v => ({
    ...v,
    currentPos: v.route[0],
    targetIndex: 1,
    speedFactor: 0.0005 + Math.random() * 0.001 // Random speed per vehicle
}));

socket.on('connect', () => {
    console.log('✅ Connected to Server. Broadcasting fleet data...');

    setInterval(() => {
        activeVehicles.forEach(v => {
            const target = v.route[v.targetIndex];
            const newPos = moveTowards(v.currentPos, target, v.speedFactor);

            // Check if reached target
            if (newPos === target) {
                // Move to next waypoint or loop back
                v.targetIndex = (v.targetIndex + 1) % v.route.length;
            }

            v.currentPos = newPos;

            // Emit update
            socket.emit('gps:stream', {
                vehicleId: v.id,
                driverId: v.id, // For compatibility
                vehicleType: v.type,
                driverName: v.driver,
                lat: newPos.lat,
                lng: newPos.lng,
                speed: (v.speedFactor * 100000).toFixed(1), // Rough km/h conversion
                heading: Math.random() * 360,
                timestamp: Date.now()
            });
        });

    }, 1000); // 1-second updates for smooth animation
});

socket.on('disconnect', () => console.log('❌ Disconnected'));
