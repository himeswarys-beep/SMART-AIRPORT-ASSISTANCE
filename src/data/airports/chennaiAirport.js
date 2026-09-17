export const chennaiAirport = {
  id: "chennai",
  name: "Chennai International Airport",
  code: "MAA",
  city: "Chennai",
  terminalName: "Integrated Terminal T2 (Domestic & International)",
  description: "Primary hub for Tamil Nadu with state-of-the-art integrated concourses, DigiYatra fast-track lanes, and metro connectivity.",
  stats: {
    area: "140,000 sq.m",
    gates: "18 Boarding Gates",
    floors: "2 Levels (L1 Departures, L0 Arrivals)"
  },
  mapLayout: {
    width: 1000,
    height: 650,
    background: "slate",
    buildingOutline: [
      { x: 60, y: 50 },
      { x: 940, y: 50 },
      { x: 940, y: 580 },
      { x: 60, y: 580 }
    ],
    concourses: [
      { id: "wing-a", label: "Concourse A (Gates A1 - A10)", bounds: { x: 520, y: 70, w: 390, h: 140 } },
      { id: "wing-b", label: "Concourse B (Gates B1 - B8)", bounds: { x: 90, y: 70, w: 390, h: 140 } },
      { id: "security-zone", label: "Security & DigiYatra Screening", bounds: { x: 250, y: 250, w: 500, h: 70 } },
      { id: "checkin-hall", label: "Check-in Desks 1-32 & Kiosks", bounds: { x: 180, y: 350, w: 640, h: 80 } },
      { id: "forecourt", label: "Main Entrance & Departures Curb", bounds: { x: 220, y: 460, w: 560, h: 70 } },
      { id: "duty-free", label: "Central Rotunda & Duty Free Shops", bounds: { x: 380, y: 170, w: 240, h: 65 } }
    ]
  },
  locations: [
    // Entrance / Exit
    {
      id: "entrance-gate3",
      name: "Main Entry Gate 3 (DigiYatra)",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 500, y: 500 },
      level: "L1",
      details: "Express entry gate for DigiYatra facial recognition passengers",
      nearestNodeId: "n-entry"
    },
    {
      id: "entrance-gate1",
      name: "Entry Gate 1 (General)",
      category: "entrance",
      icon: "DoorClosed",
      color: "#3b82f6",
      position: { x: 260, y: 500 },
      level: "L1",
      details: "Standard departure hall entry for economy passengers",
      nearestNodeId: "n-entry-1"
    },
    {
      id: "arrival-exit",
      name: "Arrival Exit & Taxi Pickup",
      category: "exit",
      icon: "DoorOpen",
      color: "#10b981",
      position: { x: 740, y: 500 },
      level: "L0",
      details: "Prepaid taxi counters, Ola/Uber pick-up point & Metro walkway",
      nearestNodeId: "n-exit"
    },

    // Check-in
    {
      id: "checkin-indigo",
      name: "IndiGo Check-in Counters 1-12",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 300, y: 380 },
      level: "L1",
      details: "Priority bag drop and web check-in verification for 6E flights",
      nearestNodeId: "n-checkin-a"
    },
    {
      id: "checkin-airindia",
      name: "Air India & Alliance Counters 13-24",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 500, y: 380 },
      level: "L1",
      details: "Business class, Star Alliance Gold & economy bag drop",
      nearestNodeId: "n-checkin-b"
    },
    {
      id: "checkin-spicejet",
      name: "SpiceJet & Akasa Counters 25-32",
      category: "checkin",
      icon: "Ticket",
      color: "#6366f1",
      position: { x: 700, y: 380 },
      level: "L1",
      details: "Domestic check-in counters and oversized baggage desk",
      nearestNodeId: "n-checkin-c"
    },

    // Security & Immigration
    {
      id: "security-digiyatra",
      name: "DigiYatra Security Lane 1",
      category: "security",
      icon: "ShieldCheck",
      color: "#10b981",
      position: { x: 420, y: 285 },
      level: "L1",
      details: "Biometric e-gate fast-track security screening (Avg wait: 2 mins)",
      nearestNodeId: "n-security-1"
    },
    {
      id: "security-general",
      name: "General Security Checkpoint B",
      category: "security",
      icon: "ShieldCheck",
      color: "#f59e0b",
      position: { x: 580, y: 285 },
      level: "L1",
      details: "Standard passenger screening and hand baggage X-ray scanner",
      nearestNodeId: "n-security-2"
    },
    {
      id: "immigration-desk",
      name: "International Immigration Counters",
      category: "immigration",
      icon: "UserCheck",
      color: "#8b5cf6",
      position: { x: 500, y: 240 },
      level: "L1",
      details: "Passport control and e-Visa verification desks",
      nearestNodeId: "n-immigration"
    },

    // Boarding Gates
    {
      id: "gate-a12",
      name: "Boarding Gate A12",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 750, y: 110 },
      level: "L1",
      details: "Widebody aerobridge gate for flight 6E 204 to Mumbai",
      nearestNodeId: "n-gate-a12"
    },
    {
      id: "gate-a4",
      name: "Boarding Gate A04",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 580, y: 110 },
      level: "L1",
      details: "Domestic departure gate with charging stations",
      nearestNodeId: "n-gate-a4"
    },
    {
      id: "gate-b4",
      name: "Boarding Gate B04",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 280, y: 110 },
      level: "L1",
      details: "Regional ATR departure gate with shuttle bus lounge",
      nearestNodeId: "n-gate-b4"
    },
    {
      id: "gate-b1",
      name: "Boarding Gate B01",
      category: "gates",
      icon: "Plane",
      color: "#ef4444",
      position: { x: 140, y: 110 },
      level: "L1",
      details: "Bus gate for remote bay departures",
      nearestNodeId: "n-gate-b1"
    },

    // Dining & Shopping
    {
      id: "food-court",
      name: "South Indian Food Plaza & Saravana Bhavan",
      category: "food",
      icon: "Utensils",
      color: "#f97316",
      position: { x: 670, y: 200 },
      level: "L1",
      details: "Authentic filter coffee, dosas, biryani, and continental dining",
      nearestNodeId: "n-food"
    },
    {
      id: "cafe-costa",
      name: "Costa Coffee & Bakery Kiosk",
      category: "cafe",
      icon: "Coffee",
      color: "#d97706",
      position: { x: 450, y: 195 },
      level: "L1",
      details: "Espresso, sandwiches, snacks and charging ports",
      nearestNodeId: "n-rotunda"
    },
    {
      id: "duty-free",
      name: "Flemingo Duty Free & Souvenirs",
      category: "dutyfree",
      icon: "ShoppingBag",
      color: "#ec4899",
      position: { x: 380, y: 195 },
      level: "L1",
      details: "Perfumes, chocolates, electronics, and handicraft souvenirs",
      nearestNodeId: "n-rotunda"
    },

    // Lounges & Facilities
    {
      id: "tfs-lounge",
      name: "TFS Executive Lounge",
      category: "lounge",
      icon: "Armchair",
      color: "#8b5cf6",
      position: { x: 490, y: 150 },
      level: "L1",
      details: "Complimentary buffet, high-speed Wi-Fi, shower rooms & recliner seats",
      nearestNodeId: "n-lounge"
    },
    {
      id: "baggage-claim-3",
      name: "Baggage Belt 3 & 4",
      category: "baggage",
      icon: "Luggage",
      color: "#06b6d4",
      position: { x: 760, y: 440 },
      level: "L0",
      details: "Domestic flight luggage carousel with real-time screen feed",
      nearestNodeId: "n-baggage"
    },
    {
      id: "atm-sbi",
      name: "SBI & HDFC Multi-Bank ATM",
      category: "atm",
      icon: "Banknote",
      color: "#10b981",
      position: { x: 340, y: 450 },
      level: "L1",
      details: "24/7 cash dispenser supporting international debit/credit cards",
      nearestNodeId: "n-checkin-a"
    },
    {
      id: "restroom-central",
      name: "Executive Restrooms & Baby Care",
      category: "restroom",
      icon: "Users",
      color: "#0284c7",
      position: { x: 620, y: 150 },
      level: "L1",
      details: "Touchless restrooms, handicap accessible stalls & diaper station",
      nearestNodeId: "n-rotunda"
    },
    {
      id: "drinking-water",
      name: "RO Drinking Water Fountain",
      category: "water",
      icon: "Droplets",
      color: "#38bdf8",
      position: { x: 420, y: 140 },
      level: "L1",
      details: "Free purified hot and cold drinking water refilling station",
      nearestNodeId: "n-rotunda"
    },
    {
      id: "medical-center",
      name: "Apollo Emergency Medical Room",
      category: "medical",
      icon: "HeartPulse",
      color: "#ef4444",
      position: { x: 230, y: 285 },
      level: "L1",
      details: "First aid, doctor on call, defibrillator & emergency paramedic unit",
      nearestNodeId: "n-security-1"
    },
    {
      id: "info-desk",
      name: "Integrated Information & Help Desk",
      category: "info",
      icon: "Info",
      color: "#3b82f6",
      position: { x: 500, y: 440 },
      level: "L1",
      details: "Terminal assistance, lost & found, passenger inquiry counter",
      nearestNodeId: "n-entry"
    },
    {
      id: "elevator-main",
      name: "Glass Elevator to Level 0 Arrivals",
      category: "elevator",
      icon: "ArrowUpDown",
      color: "#64748b",
      position: { x: 350, y: 285 },
      level: "L1",
      details: "Step-free elevator connecting Departures (L1) to Arrivals (L0)",
      nearestNodeId: "n-security-1"
    }
  ],

  // Graph nodes for Dijkstra Pathfinding
  nodes: [
    { id: "n-entry-1", name: "Gate 1 Entry Node", x: 260, y: 470 },
    { id: "n-entry", name: "Main Forecourt Hub", x: 500, y: 470 },
    { id: "n-exit", name: "Arrival Exit Node", x: 740, y: 470 },

    { id: "n-checkin-a", name: "Check-in Row A", x: 300, y: 390 },
    { id: "n-checkin-b", name: "Check-in Row B", x: 500, y: 390 },
    { id: "n-checkin-c", name: "Check-in Row C", x: 700, y: 390 },

    { id: "n-security-1", name: "Security Check West", x: 380, y: 290 },
    { id: "n-security-2", name: "Security Check East", x: 620, y: 290 },
    { id: "n-immigration", name: "Immigration Central", x: 500, y: 240 },

    { id: "n-rotunda", name: "Central Duty Free Rotunda", x: 500, y: 190 },
    { id: "n-lounge", name: "Lounge Walkway", x: 490, y: 155 },
    { id: "n-food", name: "Food Court Entrance", x: 670, y: 190 },

    { id: "n-concourse-a", name: "Concourse A Spine", x: 680, y: 130 },
    { id: "n-gate-a4", name: "Gate A4 Node", x: 580, y: 130 },
    { id: "n-gate-a12", name: "Gate A12 Node", x: 750, y: 130 },

    { id: "n-concourse-b", name: "Concourse B Spine", x: 280, y: 130 },
    { id: "n-gate-b4", name: "Gate B4 Node", x: 280, y: 130 },
    { id: "n-gate-b1", name: "Gate B1 Node", x: 140, y: 130 },

    { id: "n-baggage", name: "Baggage Claim Hall", x: 760, y: 420 }
  ],

  // Graph edge connections with walking weights in meters
  connections: [
    { from: "n-entry-1", to: "n-entry", weight: 40 },
    { from: "n-entry", to: "n-checkin-b", weight: 35 },
    { from: "n-entry-1", to: "n-checkin-a", weight: 30 },
    { from: "n-entry", to: "n-checkin-c", weight: 45 },

    { from: "n-checkin-a", to: "n-checkin-b", weight: 50 },
    { from: "n-checkin-b", to: "n-checkin-c", weight: 50 },

    { from: "n-checkin-a", to: "n-security-1", weight: 40 },
    { from: "n-checkin-b", to: "n-security-1", weight: 35 },
    { from: "n-checkin-b", to: "n-security-2", weight: 35 },
    { from: "n-checkin-c", to: "n-security-2", weight: 40 },

    { from: "n-security-1", to: "n-immigration", weight: 35 },
    { from: "n-security-2", to: "n-immigration", weight: 35 },

    { from: "n-immigration", to: "n-rotunda", weight: 30 },
    { from: "n-security-1", to: "n-rotunda", weight: 45 },
    { from: "n-security-2", to: "n-rotunda", weight: 45 },

    { from: "n-rotunda", to: "n-lounge", weight: 20 },
    { from: "n-rotunda", to: "n-food", weight: 45 },

    { from: "n-rotunda", to: "n-gate-a4", weight: 35 },
    { from: "n-gate-a4", to: "n-concourse-a", weight: 35 },
    { from: "n-concourse-a", to: "n-gate-a12", weight: 40 },

    { from: "n-rotunda", to: "n-concourse-b", weight: 60 },
    { from: "n-concourse-b", to: "n-gate-b4", weight: 10 },
    { from: "n-gate-b4", to: "n-gate-b1", weight: 50 },

    { from: "n-entry", to: "n-exit", weight: 60 },
    { from: "n-exit", to: "n-baggage", weight: 30 }
  ]
};

export default chennaiAirport;
