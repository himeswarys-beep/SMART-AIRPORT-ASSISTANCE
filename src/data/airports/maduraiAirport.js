export const maduraiAirport = {
  id: "madurai",
  name: "Madurai Airport",
  code: "IXM",
  city: "Madurai",
  terminalName: "Integrated Cultural Terminal",
  description: "Cultural hub airport with heritage Dravidian artwork, streamlined security, fast check-in, and temple tourist guidance counters.",
  stats: {
    area: "35,000 sq.m",
    gates: "4 Boarding Gates",
    floors: "Single Level Passenger Concourse"
  },
  mapLayout: {
    width: 1000,
    height: 600,
    background: "slate",
    buildingOutline: [
      { x: 90, y: 80 },
      { x: 910, y: 80 },
      { x: 910, y: 520 },
      { x: 90, y: 520 }
    ],
    concourses: [
      { id: "ixm-gates-pier", label: "Gates 1 to 4 Departure Lounge", bounds: { x: 130, y: 100, w: 740, h: 110 } },
      { id: "ixm-security-zone", label: "Domestic & DigiYatra Security", bounds: { x: 300, y: 240, w: 400, h: 65 } },
      { id: "ixm-checkin-zone", label: "Airline Check-in Desks 1-12", bounds: { x: 220, y: 330, w: 560, h: 75 } },
      { id: "ixm-entrance-zone", label: "Departure Forecourt & Porch", bounds: { x: 300, y: 430, w: 400, h: 60 } }
    ]
  },
  locations: [
    {
      id: "ixm-entry",
      name: "Main Entry Gate 1",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 460 },
      level: "L1",
      details: "Passenger terminal main entry with identity verification counter",
      nearestNodeId: "ixm-node-entry"
    },
    {
      id: "ixm-checkin-indigo",
      name: "IndiGo & SpiceJet Check-in (Desks 1-6)",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 340, y: 365 },
      level: "L1",
      details: "Baggage drop and boarding pass issuance for domestic routes",
      nearestNodeId: "cjb-node-checkin-a"
    },
    {
      id: "ixm-checkin-airindia",
      name: "Air India & AirAsia Check-in (Desks 7-12)",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 660, y: 365 },
      level: "L1",
      details: "Chennai and Mumbai non-stop flight check-in desks",
      nearestNodeId: "cjb-node-checkin-b"
    },
    {
      id: "ixm-security",
      name: "Security Screening Checkpoint",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 500, y: 270 },
      level: "L1",
      details: "X-ray baggage scanner & passenger metal detector gate",
      nearestNodeId: "ixm-node-security"
    },
    {
      id: "ixm-gate-1",
      name: "Boarding Gate 1 (Aerobridge)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 220, y: 155 },
      level: "L1",
      details: "Chennai & Hyderabad jet bridge departure gate",
      nearestNodeId: "ixm-node-g1"
    },
    {
      id: "ixm-gate-2",
      name: "Boarding Gate 2 (Aerobridge)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 410, y: 155 },
      level: "L1",
      details: "Bengaluru & Mumbai direct flight gate",
      nearestNodeId: "ixm-node-g2"
    },
    {
      id: "ixm-gate-3",
      name: "Boarding Gate 3 (Bus Gate)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 600, y: 155 },
      level: "L1",
      details: "Ground level shuttle bus departure lounge",
      nearestNodeId: "ixm-node-g3"
    },
    {
      id: "ixm-gate-4",
      name: "Boarding Gate 4 (International)",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 790, y: 155 },
      level: "L1",
      details: "Colombo (SriLankan Airlines) departure gate",
      nearestNodeId: "ixm-node-g4"
    },
    {
      id: "ixm-cafe",
      name: "Jasmine Temple Art Cafe & Filter Coffee",
      category: "cafe",
      icon: "Coffee",
      color: "#d97706",
      position: { x: 300, y: 200 },
      level: "L1",
      details: "Fresh South Indian tiffin, vada, and hot tea",
      nearestNodeId: "ixm-node-g2"
    },
    {
      id: "ixm-lounge",
      name: "Meenakshi Executive Lounge",
      category: "lounge",
      icon: "Armchair",
      color: "#8b5cf6",
      position: { x: 500, y: 200 },
      level: "L1",
      details: "Quiet recliner lounge, snack counter & newsstands",
      nearestNodeId: "ixm-node-center"
    },
    {
      id: "ixm-restroom",
      name: "Restrooms & Baby Care",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 700, y: 200 },
      level: "L1",
      details: "Modern sanitised restrooms and nursing room",
      nearestNodeId: "ixm-node-g3"
    },
    {
      id: "ixm-baggage",
      name: "Baggage Claim Belts 1 & 2",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 780, y: 365 },
      level: "L1",
      details: "Arrival belt with lost luggage assistance counter",
      nearestNodeId: "ixm-node-exit"
    },
    {
      id: "ixm-exit",
      name: "Arrival Exit & Prepaid Taxi Desk",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 780, y: 460 },
      level: "L1",
      details: "Exit to city buses, auto rickshaws, and taxi rank",
      nearestNodeId: "ixm-node-exit"
    }
  ],
  nodes: [
    { id: "ixm-node-entry", name: "Entry Porch Node", x: 500, y: 460 },
    { id: "cjb-node-checkin-a", name: "Checkin Row A", x: 340, y: 365 },
    { id: "cjb-node-checkin-b", name: "Checkin Row B", x: 660, y: 365 },
    { id: "ixm-node-security", name: "Security Check", x: 500, y: 270 },
    { id: "ixm-node-center", name: "Lounge Hub", x: 500, y: 200 },
    { id: "ixm-node-g1", name: "Gate 1 Node", x: 220, y: 160 },
    { id: "ixm-node-g2", name: "Gate 2 Node", x: 410, y: 160 },
    { id: "ixm-node-g3", name: "Gate 3 Node", x: 600, y: 160 },
    { id: "ixm-node-g4", name: "Gate 4 Node", x: 790, y: 160 },
    { id: "ixm-node-exit", name: "Arrival Exit Node", x: 780, y: 460 }
  ],
  connections: [
    { from: "ixm-node-entry", to: "cjb-node-checkin-a", weight: 30 },
    { from: "ixm-node-entry", to: "cjb-node-checkin-b", weight: 30 },
    { from: "cjb-node-checkin-a", to: "ixm-node-security", weight: 35 },
    { from: "cjb-node-checkin-b", to: "ixm-node-security", weight: 35 },
    { from: "ixm-node-security", to: "ixm-node-center", weight: 25 },
    { from: "ixm-node-center", to: "ixm-node-g2", weight: 25 },
    { from: "ixm-node-g2", to: "ixm-node-g1", weight: 45 },
    { from: "ixm-node-center", to: "ixm-node-g3", weight: 25 },
    { from: "ixm-node-g3", to: "ixm-node-g4", weight: 45 },
    { from: "ixm-node-entry", to: "ixm-node-exit", weight: 70 }
  ]
};

export default maduraiAirport;
