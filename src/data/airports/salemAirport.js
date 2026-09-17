 export const salemAirport = {
  id: "salem",
  name: "Salem Airport",
  code: "SXV",
  city: "Salem",
  terminalName: "Regional UDAN Passenger Terminal",
  description: "Efficient regional feeder airport under UDAN scheme connecting Salem to Chennai, Thoothukudi, and Hyderabad with quick security and friendly concourses.",
  stats: {
    area: "15,000 sq.m",
    gates: "2 Departure Gates",
    floors: "Compact Single Level Terminal"
  },
  mapLayout: {
    width: 1000,
    height: 550,
    background: "slate",
    buildingOutline: [
      { x: 120, y: 80 },
      { x: 880, y: 80 },
      { x: 880, y: 480 },
      { x: 120, y: 480 }
    ],
    concourses: [
      { id: "sxv-gate-pier", label: "Gates 1 & 2 Departure Hold Area", bounds: { x: 180, y: 100, w: 640, h: 100 } },
      { id: "sxv-sec-hall", label: "Passenger Security Gate", bounds: { x: 350, y: 220, w: 300, h: 60 } },
      { id: "sxv-checkin-hall", label: "IndiGo & Alliance Check-in Counters 1-6", bounds: { x: 250, y: 300, w: 500, h: 70 } },
      { id: "sxv-entry-hall", label: "Terminal Front Canopy & Security Check", bounds: { x: 320, y: 390, w: 360, h: 60 } }
    ]
  },
  locations: [
    {
      id: "sxv-entry",
      name: "Main Entry Canopy Gate",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 420 },
      level: "L1",
      details: "Single entrance portal with initial ID verification",
      nearestNodeId: "sxv-node-entry"
    },
    {
      id: "sxv-checkin",
      name: "IndiGo & Star Air Check-in Desks 1-4",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 380, y: 335 },
      level: "L1",
      details: "Boarding pass collection and luggage check-in counter",
      nearestNodeId: "sxv-node-checkin"
    },
    {
      id: "sxv-security",
      name: "Security Screening Gate",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 500, y: 250 },
      level: "L1",
      details: "Single window security check with body scanner",
      nearestNodeId: "sxv-node-security"
    },
    {
      id: "sxv-gate-1",
      name: "Boarding Gate 1 (ATR/Q400 Apron Walk)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 300, y: 150 },
      level: "L1",
      details: "Chennai & Thoothukudi regional flight gate",
      nearestNodeId: "sxv-node-g1"
    },
    {
      id: "sxv-gate-2",
      name: "Boarding Gate 2 (Hyderabad)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 700, y: 150 },
      level: "L1",
      details: "Direct flight to Hyderabad Rajiv Gandhi International",
      nearestNodeId: "sxv-node-g2"
    },
    {
      id: "sxv-cafe",
      name: "Salem Filter Coffee & Snack Bar",
      category: "cafe",
      icon: "Coffee",
      color: "#d97706",
      position: { x: 500, y: 150 },
      level: "L1",
      details: "Fresh beverages, cookies, tea, and packaged snacks",
      nearestNodeId: "sxv-node-center"
    },
    {
      id: "sxv-restroom",
      name: "Restrooms & Baby Station",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 580, y: 150 },
      level: "L1",
      details: "Clean restrooms and infant facility",
      nearestNodeId: "sxv-node-center"
    },
    {
      id: "sxv-baggage",
      name: "Arrival Baggage Belt 1",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 700, y: 335 },
      level: "L1",
      details: "Direct ground arrival belt",
      nearestNodeId: "sxv-node-exit"
    },
    {
      id: "sxv-exit",
      name: "Arrival Exit & Auto/Taxi Point",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 700, y: 420 },
      level: "L1",
      details: "Exit to parking lot and taxi drop off",
      nearestNodeId: "sxv-node-exit"
    }
  ],
  nodes: [
    { id: "sxv-node-entry", name: "Entry Node", x: 500, y: 420 },
    { id: "sxv-node-checkin", name: "Check-in Node", x: 380, y: 335 },
    { id: "sxv-node-security", name: "Security Node", x: 500, y: 250 },
    { id: "sxv-node-center", name: "Central Waiting Node", x: 500, y: 150 },
    { id: "sxv-node-g1", name: "Gate 1 Node", x: 300, y: 150 },
    { id: "sxv-node-g2", name: "Gate 2 Node", x: 700, y: 150 },
    { id: "sxv-node-exit", name: "Arrival Exit Node", x: 700, y: 420 }
  ],
  connections: [
    { from: "sxv-node-entry", to: "sxv-node-checkin", weight: 25 },
    { from: "sxv-node-checkin", to: "sxv-node-security", weight: 30 },
    { from: "sxv-node-security", to: "sxv-node-center", weight: 25 },
    { from: "sxv-node-center", to: "sxv-node-g1", weight: 35 },
    { from: "sxv-node-center", to: "sxv-node-g2", weight: 35 },
    { from: "sxv-node-entry", to: "sxv-node-exit", weight: 50 }
  ]
};

export default salemAirport;
