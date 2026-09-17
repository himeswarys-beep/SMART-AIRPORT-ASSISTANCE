export const trichyAirport = {
  id: "trichy",
  name: "Tiruchirappalli International Airport",
  code: "TRZ",
  city: "Tiruchirappalli",
  terminalName: "New Integrated Express International Terminal",
  description: "State-of-the-art international gateway featuring architectural designs inspired by Tamil heritage, extensive Duty Free, and international immigration gates.",
  stats: {
    area: "75,000 sq.m",
    gates: "8 Boarding Gates",
    floors: "2 Levels (L1 International/Domestic, L0 Arrivals)"
  },
  mapLayout: {
    width: 1000,
    height: 600,
    background: "slate",
    buildingOutline: [
      { x: 70, y: 60 },
      { x: 930, y: 60 },
      { x: 930, y: 540 },
      { x: 70, y: 540 }
    ],
    concourses: [
      { id: "trz-gates-wing", label: "Aerobridge Boarding Concourse (Gates 1-8)", bounds: { x: 100, y: 80, w: 800, h: 120 } },
      { id: "trz-security", label: "Immigration & Customs Checkpoint", bounds: { x: 260, y: 230, w: 480, h: 70 } },
      { id: "trz-checkin", label: "International Check-in Counters 1-24", bounds: { x: 180, y: 340, w: 640, h: 80 } },
      { id: "trz-entry-canopy", label: "Departure Forecourt & Drop-off Gates", bounds: { x: 240, y: 450, w: 520, h: 65 } }
    ]
  },
  locations: [
    {
      id: "trz-entry",
      name: "Terminal Main Entrance Gate 2",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 480 },
      level: "L1",
      details: "International passenger entry gate with security scanners",
      nearestNodeId: "trz-node-entry"
    },
    {
      id: "trz-checkin-a",
      name: "AirAsia & Scoot Check-in Counters 1-12",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 300, y: 380 },
      level: "L1",
      details: "International flight bag drop and web check-in verification",
      nearestNodeId: "trz-node-checkin-a"
    },
    {
      id: "trz-checkin-b",
      name: "SriLankan & IndiGo Counters 13-24",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 700, y: 380 },
      level: "L1",
      details: "Colombo, Singapore & Kuala Lumpur check-in hall",
      nearestNodeId: "trz-node-checkin-b"
    },
    {
      id: "trz-security",
      name: "Central Security & Customs Inspection",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 500, y: 265 },
      level: "L1",
      details: "Hand baggage X-ray, DigiYatra lanes & customs scan",
      nearestNodeId: "trz-node-sec"
    },
    {
      id: "trz-gate-1",
      name: "Boarding Gate 1 (Kuala Lumpur)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 160, y: 130 },
      level: "L1",
      details: "International departure aerobridge gate",
      nearestNodeId: "trz-node-g1"
    },
    {
      id: "trz-gate-3",
      name: "Boarding Gate 3 (Singapore)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 380, y: 130 },
      level: "L1",
      details: "Scoot & IndiGo aerobridge boarding gate",
      nearestNodeId: "trz-node-g3"
    },
    {
      id: "trz-gate-5",
      name: "Boarding Gate 5 (Domestic)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 620, y: 130 },
      level: "L1",
      details: "Chennai and Bengaluru domestic gate",
      nearestNodeId: "trz-node-g5"
    },
    {
      id: "trz-gate-7",
      name: "Boarding Gate 7 (Middle East)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 840, y: 130 },
      level: "L1",
      details: "Dubai & Sharjah flight departure gate",
      nearestNodeId: "trz-node-g7"
    },
    {
      id: "trz-dutyfree",
      name: "Trichy International Duty Free Mall",
      category: "dutyfree",
      icon: "ShoppingBag",
      color: "#ec4899",
      position: { x: 500, y: 190 },
      level: "L1",
      details: "Perfumes, electronics, chocolates & traditional brass souvenirs",
      nearestNodeId: "trz-node-center"
    },
    {
      id: "trz-lounge",
      name: "Pearl City Executive Lounge",
      category: "lounge",
      icon: "Armchair",
      color: "#8b5cf6",
      position: { x: 300, y: 190 },
      level: "L1",
      details: "Premium dining, private work pods & shower amenities",
      nearestNodeId: "trz-node-g3"
    },
    {
      id: "trz-restroom",
      name: "Restroom & Baby Care Facility",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 700, y: 190 },
      level: "L1",
      details: "Accessible restrooms and infant nursing cubicle",
      nearestNodeId: "trz-node-g5"
    },
    {
      id: "trz-baggage",
      name: "Baggage Claim Belts 1, 2 & 3",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 840, y: 380 },
      level: "L0",
      details: "International baggage belt with customs inspection zone",
      nearestNodeId: "trz-node-exit"
    },
    {
      id: "trz-exit",
      name: "Arrival Exit & Forex Counter",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 840, y: 480 },
      level: "L0",
      details: "Currency exchange, prepaid taxi & bus terminal link",
      nearestNodeId: "trz-node-exit"
    }
  ],
  nodes: [
    { id: "trz-node-entry", name: "Entry Forecourt", x: 500, y: 470 },
    { id: "trz-node-checkin-a", name: "Checkin Wing A", x: 300, y: 380 },
    { id: "trz-node-checkin-b", name: "Checkin Wing B", x: 700, y: 380 },
    { id: "trz-node-sec", name: "Security Center", x: 500, y: 265 },
    { id: "trz-node-center", name: "Rotunda Central", x: 500, y: 190 },
    { id: "trz-node-g1", name: "Gate 1 Concourse", x: 160, y: 140 },
    { id: "trz-node-g3", name: "Gate 3 Concourse", x: 380, y: 140 },
    { id: "trz-node-g5", name: "Gate 5 Concourse", x: 620, y: 140 },
    { id: "trz-node-g7", name: "Gate 7 Concourse", x: 840, y: 140 },
    { id: "trz-node-exit", name: "Arrival Hall Node", x: 840, y: 470 }
  ],
  connections: [
    { from: "trz-node-entry", to: "trz-node-checkin-a", weight: 35 },
    { from: "trz-node-entry", to: "trz-node-checkin-b", weight: 35 },
    { from: "trz-node-checkin-a", to: "trz-node-sec", weight: 40 },
    { from: "trz-node-checkin-b", to: "trz-node-sec", weight: 40 },
    { from: "trz-node-sec", to: "trz-node-center", weight: 25 },
    { from: "trz-node-center", to: "trz-node-g3", weight: 30 },
    { from: "trz-node-g3", to: "trz-node-g1", weight: 50 },
    { from: "trz-node-center", to: "trz-node-g5", weight: 30 },
    { from: "trz-node-g5", to: "trz-node-g7", weight: 50 },
    { from: "trz-node-entry", to: "trz-node-exit", weight: 90 }
  ]
};

export default trichyAirport;
