export const thoothukudiAirport = {
  id: "thoothukudi",
  name: "Thoothukudi Airport",
  code: "TCR",
  city: "Thoothukudi",
  terminalName: "Pearl Coast Regional Terminal",
  description: "Coastal regional gateway serving Tuticorin port city with streamlined passenger flow, check-in desks, and sea-breeze waiting lounge.",
  stats: {
    area: "18,000 sq.m",
    gates: "2 Boarding Gates",
    floors: "Single Level Coastal Concourse"
  },
  mapLayout: {
    width: 1000,
    height: 550,
    background: "slate",
    buildingOutline: [
      { x: 110, y: 75 },
      { x: 890, y: 75 },
      { x: 890, y: 485 },
      { x: 110, y: 485 }
    ],
    concourses: [
      { id: "tcr-lounge-pier", label: "Pearl Gates 1 & 2 Departure Lounge", bounds: { x: 160, y: 95, w: 680, h: 105 } },
      { id: "tcr-security-hall", label: "Central Security Screening", bounds: { x: 340, y: 220, w: 320, h: 65 } },
      { id: "tcr-checkin-desks", label: "IndiGo Check-in Desks 1-6", bounds: { x: 230, y: 305, w: 540, h: 70 } },
      { id: "tcr-entry-canopy", label: "Terminal Front Canopy & Drop-off", bounds: { x: 300, y: 395, w: 400, h: 65 } }
    ]
  },
  locations: [
    {
      id: "tcr-entry",
      name: "Main Canopy Gate 1",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 430 },
      level: "L1",
      details: "Main passenger terminal gate with ticket verification",
      nearestNodeId: "tcr-node-entry"
    },
    {
      id: "tcr-checkin",
      name: "IndiGo Check-in Counters 1-6",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 370, y: 340 },
      level: "L1",
      details: "Boarding pass print & luggage drop for Chennai flights",
      nearestNodeId: "tcr-node-checkin"
    },
    {
      id: "tcr-security",
      name: "Passenger Security Checkpoint",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 500, y: 250 },
      level: "L1",
      details: "Hand baggage scanning & security frisking booth",
      nearestNodeId: "tcr-node-security"
    },
    {
      id: "tcr-gate-1",
      name: "Boarding Gate 1 (Chennai Direct)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 280, y: 145 },
      level: "L1",
      details: "IndiGo ATR 72 non-stop to Chennai (MAA)",
      nearestNodeId: "tcr-node-g1"
    },
    {
      id: "tcr-gate-2",
      name: "Boarding Gate 2 (Chennai & Coimbatore)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 720, y: 145 },
      level: "L1",
      details: "IndiGo ATR 72 to Chennai (MAA) and Coimbatore (CJB)",
      nearestNodeId: "tcr-node-g2"
    },
    {
      id: "tcr-lounge",
      name: "Pearl Coast VIP Lounge",
      category: "lounge",
      icon: "Armchair",
      color: "#8b5cf6",
      position: { x: 500, y: 145 },
      level: "L1",
      details: "Comfortable air-conditioned lounge with tea and coffee",
      nearestNodeId: "tcr-node-center"
    },
    {
      id: "tcr-cafe",
      name: "Tuticorin Sea Breeze Snack Bar",
      category: "cafe",
      icon: "Coffee",
      color: "#d97706",
      position: { x: 400, y: 145 },
      level: "L1",
      details: "Macaroons, filter coffee, cool drinks and sandwiches",
      nearestNodeId: "tcr-node-center"
    },
    {
      id: "tcr-restroom",
      name: "Restroom & Washrooms",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 600, y: 145 },
      level: "L1",
      details: "Clean restrooms and baby care station",
      nearestNodeId: "tcr-node-center"
    },
    {
      id: "tcr-baggage",
      name: "Baggage Carousel 1",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 720, y: 340 },
      level: "L1",
      details: "Ground arrival luggage belt",
      nearestNodeId: "tcr-node-exit"
    },
    {
      id: "tcr-exit",
      name: "Arrival Exit & Port Taxi Bay",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 720, y: 430 },
      level: "L1",
      details: "Prepaid taxis, port shuttles, and city transport link",
      nearestNodeId: "tcr-node-exit"
    }
  ],
  nodes: [
    { id: "tcr-node-entry", name: "Entry Door", x: 500, y: 430 },
    { id: "tcr-node-checkin", name: "Check-in Row", x: 370, y: 340 },
    { id: "tcr-node-security", name: "Security Check", x: 500, y: 250 },
    { id: "tcr-node-center", name: "Central Waiting Concourse", x: 500, y: 145 },
    { id: "tcr-node-g1", name: "Gate 1 Walkway", x: 280, y: 145 },
    { id: "tcr-node-g2", name: "Gate 2 Walkway", x: 720, y: 145 },
    { id: "tcr-node-exit", name: "Arrival Exit Node", x: 720, y: 430 }
  ],
  connections: [
    { from: "tcr-node-entry", to: "tcr-node-checkin", weight: 25 },
    { from: "tcr-node-checkin", to: "tcr-node-security", weight: 30 },
    { from: "tcr-node-security", to: "tcr-node-center", weight: 25 },
    { from: "tcr-node-center", to: "tcr-node-g1", weight: 35 },
    { from: "tcr-node-center", to: "tcr-node-g2", weight: 35 },
    { from: "tcr-node-entry", to: "tcr-node-exit", weight: 55 }
  ]
};

export default thoothukudiAirport;
