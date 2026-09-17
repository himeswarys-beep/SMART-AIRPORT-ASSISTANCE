export const coimbatoreAirport = {
  id: "coimbatore",
  name: "Coimbatore International Airport",
  code: "CJB",
  city: "Coimbatore",
  terminalName: "Integrated Peelamedu Terminal",
  description: "Modernized regional hub serving Western Tamil Nadu with streamlined departure gates, executive lounge, and textile craft boutiques.",
  stats: {
    area: "45,000 sq.m",
    gates: "6 Boarding Gates",
    floors: "Single Level Terminal"
  },
  mapLayout: {
    width: 1000,
    height: 600,
    background: "slate",
    buildingOutline: [
      { x: 80, y: 70 },
      { x: 920, y: 70 },
      { x: 920, y: 530 },
      { x: 80, y: 530 }
    ],
    concourses: [
      { id: "gate-pier", label: "Departure Gates 1 - 6 Pier", bounds: { x: 120, y: 90, w: 760, h: 120 } },
      { id: "security-hall", label: "Central Security Checkpoint", bounds: { x: 300, y: 240, w: 400, h: 70 } },
      { id: "checkin-area", label: "Airline Check-in Counters 1-16", bounds: { x: 200, y: 340, w: 600, h: 80 } },
      { id: "entrance-lobby", label: "Main Departure Entrance & Canopy", bounds: { x: 280, y: 440, w: 440, h: 65 } }
    ]
  },
  locations: [
    // Entry / Exit
    {
      id: "cjb-entry-1",
      name: "Main Departure Entrance Gate 1",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 470 },
      level: "L1",
      details: "Passenger departure hall entry gate with baggage scanning at entry",
      nearestNodeId: "cjb-node-entry"
    },
    {
      id: "cjb-exit",
      name: "Arrival Exit & Prepaid Taxi Desk",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 800, y: 470 },
      level: "L1",
      details: "Arrival concourse exit with taxi, auto, and bus drop points",
      nearestNodeId: "cjb-node-exit"
    },

    // Check-in Counters
    {
      id: "cjb-checkin-1",
      name: "IndiGo & Star Air Check-in (Desks 1-8)",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 350, y: 370 },
      level: "L1",
      details: "Boarding pass print, baggage drop, and fast-track help desk",
      nearestNodeId: "cjb-node-checkin-a"
    },
    {
      id: "cjb-checkin-2",
      name: "Air India & AirAsia Check-in (Desks 9-16)",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 650, y: 370 },
      level: "L1",
      details: "Executive check-in, priority baggage, and special assistance desk",
      nearestNodeId: "cjb-node-checkin-b"
    },

    // Security Check
    {
      id: "cjb-security",
      name: "Central Security Checkpoint",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 500, y: 275 },
      level: "L1",
      details: "Domestic passenger security screening and DigiYatra facial scanner lane",
      nearestNodeId: "cjb-node-security"
    },

    // Gates
    {
      id: "cjb-gate-1",
      name: "Boarding Gate 1 (Aerobridge)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 200, y: 140 },
      level: "L1",
      details: "Aerobridge gate for Chennai and Bengaluru flights",
      nearestNodeId: "cjb-node-gate1"
    },
    {
      id: "cjb-gate-2",
      name: "Boarding Gate 2 (Aerobridge)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 380, y: 140 },
      level: "L1",
      details: "Aerobridge gate for Delhi and Mumbai non-stop flights",
      nearestNodeId: "cjb-node-gate2"
    },
    {
      id: "cjb-gate-3",
      name: "Boarding Gate 3 (Bus Gate)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 620, y: 140 },
      level: "L1",
      details: "Ground level apron shuttle bus gate",
      nearestNodeId: "cjb-node-gate3"
    },
    {
      id: "cjb-gate-4",
      name: "Boarding Gate 4",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 800, y: 140 },
      level: "L1",
      details: "International departure gate for Singapore & Sharjah flights",
      nearestNodeId: "cjb-node-gate4"
    },

    // Facilities & Food
    {
      id: "cjb-lounge",
      name: "Black Box VIP Executive Lounge",
      category: "lounge",
      icon: "Armchair",
      color: "#8b5cf6",
      position: { x: 500, y: 190 },
      level: "L1",
      details: "Buffet dining, peaceful lounge seating, and high-speed Wi-Fi",
      nearestNodeId: "cjb-node-center"
    },
    {
      id: "cjb-cafe",
      name: "Kovai Filter Coffee & Refreshments",
      category: "cafe",
      icon: "Coffee",
      color: "#d97706",
      position: { x: 300, y: 200 },
      level: "L1",
      details: "Traditional South Indian filter coffee, snacks & sandwiches",
      nearestNodeId: "cjb-node-gate2"
    },
    {
      id: "cjb-crafts",
      name: "Coimbatore Silk & Handicrafts Shop",
      category: "dutyfree",
      icon: "ShoppingBag",
      color: "#ec4899",
      position: { x: 700, y: 200 },
      level: "L1",
      details: "Kanchipuram silks, organic cottons, and Kovai souvenirs",
      nearestNodeId: "cjb-node-gate3"
    },
    {
      id: "cjb-restroom",
      name: "Restroom & Baby Care Unit",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 440, y: 190 },
      level: "L1",
      details: "Clean restrooms and infant changing facilities",
      nearestNodeId: "cjb-node-center"
    },
    {
      id: "cjb-atm",
      name: "Canara Bank & Axis ATM",
      category: "atm",
      icon: "Banknote",
      color: "#10b981",
      position: { x: 230, y: 370 },
      level: "L1",
      details: "Multi-currency cash ATM near entrance",
      nearestNodeId: "cjb-node-checkin-a"
    },
    {
      id: "cjb-water",
      name: "RO Water Dispenser",
      category: "water",
      icon: "Droplets",
      color: "#38bdf8",
      position: { x: 560, y: 190 },
      level: "L1",
      details: "Free cold and warm drinking water",
      nearestNodeId: "cjb-node-center"
    },
    {
      id: "cjb-baggage",
      name: "Baggage Claim Carousel 1 & 2",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 800, y: 370 },
      level: "L1",
      details: "Arrival luggage belts with trolley bay",
      nearestNodeId: "cjb-node-exit"
    }
  ],
  nodes: [
    { id: "cjb-node-entry", name: "Main Entry Door", x: 500, y: 460 },
    { id: "cjb-node-exit", name: "Arrival Exit Door", x: 800, y: 460 },
    { id: "cjb-node-checkin-a", name: "Checkin Row West", x: 350, y: 370 },
    { id: "cjb-node-checkin-b", name: "Checkin Row East", x: 650, y: 370 },
    { id: "cjb-node-security", name: "Security Gate Center", x: 500, y: 275 },
    { id: "cjb-node-center", name: "Airside Rotunda", x: 500, y: 200 },
    { id: "cjb-node-gate1", name: "Gate 1 Walkway", x: 200, y: 150 },
    { id: "cjb-node-gate2", name: "Gate 2 Walkway", x: 380, y: 150 },
    { id: "cjb-node-gate3", name: "Gate 3 Walkway", x: 620, y: 150 },
    { id: "cjb-node-gate4", name: "Gate 4 Walkway", x: 800, y: 150 }
  ],
  connections: [
    { from: "cjb-node-entry", to: "cjb-node-checkin-a", weight: 30 },
    { from: "cjb-node-entry", to: "cjb-node-checkin-b", weight: 30 },
    { from: "cjb-node-checkin-a", to: "cjb-node-security", weight: 35 },
    { from: "cjb-node-checkin-b", to: "cjb-node-security", weight: 35 },
    { from: "cjb-node-security", to: "cjb-node-center", weight: 25 },
    { from: "cjb-node-center", to: "cjb-node-gate2", weight: 35 },
    { from: "cjb-node-gate2", to: "cjb-node-gate1", weight: 45 },
    { from: "cjb-node-center", to: "cjb-node-gate3", weight: 35 },
    { from: "cjb-node-gate3", to: "cjb-node-gate4", weight: 45 },
    { from: "cjb-node-entry", to: "cjb-node-exit", weight: 75 }
  ]
};

export default coimbatoreAirport;
