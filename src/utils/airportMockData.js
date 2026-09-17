export const generateFlightsForAirport = (airportCode, airportCity) => {
  const airlines = [
    { name: 'IndiGo', code: '6E' },
    { name: 'Air India', code: 'AI' },
    { name: 'SpiceJet', code: 'SG' },
    { name: 'Akasa Air', code: 'QP' },
    { name: 'Vistara', code: 'UK' }
  ];

  const destinations = [
    { code: 'BOM', city: 'Mumbai' },
    { code: 'DEL', city: 'New Delhi' },
    { code: 'MAA', city: 'Chennai' },
    { code: 'BLR', city: 'Bengaluru' },
    { code: 'HYD', city: 'Hyderabad' }
  ].filter(d => d.code !== airportCode);

  const statuses = ['On Time', 'Boarding', 'Delayed', 'Landed'];

  const generatedFlights = [];
  
  for (let i = 1; i <= 8; i++) {
    const isDeparture = i % 2 !== 0;
    const airline = airlines[i % airlines.length];
    const destination = destinations[i % destinations.length];
    
    // For departure, from is current airport, to is destination
    // For arrival, from is destination, to is current airport
    const from = isDeparture ? airportCode : destination.code;
    const fromCity = isDeparture ? airportCity : destination.city;
    const to = isDeparture ? destination.code : airportCode;
    const toCity = isDeparture ? destination.city : airportCity;
    
    generatedFlights.push({
      id: `fl-${airportCode}-${i}`,
      flightNumber: `${airline.code} ${100 + i * 14}`,
      airline: airline.name,
      airlineCode: airline.code,
      type: isDeparture ? 'departure' : 'arrival',
      from,
      fromCity,
      to,
      toCity,
      scheduledTime: `1${8 + Math.floor(i / 2)}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60}`,
      estimatedTime: `1${8 + Math.floor(i / 2)}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60}`,
      gate: `Gate ${i}`,
      terminal: 'T1',
      status: statuses[i % statuses.length],
      aircraft: i % 2 === 0 ? 'ATR 72-600' : 'Airbus A320neo',
      baggageBelt: `Belt 0${(i % 3) + 1}`
    });
  }

  return generatedFlights;
};

export const generateQueueMetricsForAirport = (airportCode) => {
  return {
    checkInCounters: [
      { name: 'IndiGo Domestic', waitTime: `${Math.floor(Math.random() * 10) + 2} mins`, length: '12 people', status: 'low' },
      { name: 'Air India / Alliance', waitTime: `${Math.floor(Math.random() * 15) + 5} mins`, length: '20 people', status: 'medium' }
    ],
    securityCheckpoints: [
      { name: 'Fast-Track / DigiYatra', waitTime: '2 mins', throughput: '45 pax/min', status: 'low', recommended: true },
      { name: 'Main Security Checkpoint', waitTime: `${Math.floor(Math.random() * 20) + 5} mins`, throughput: '20 pax/min', status: 'medium' }
    ],
    boardingLanes: [
      { gate: 'Gate 1', waitTime: '5 mins', status: 'low', zoneCalling: 'Zone 1 & 2' },
      { gate: 'Gate 2', waitTime: '10 mins', status: 'medium', zoneCalling: 'All Zones' }
    ]
  };
};

export const generateDelayPredictionForAirport = (airportCode, flights) => {
  const selectedFlight = flights.find(f => f.type === 'departure') || flights[0];
  const flightStr = selectedFlight ? `${selectedFlight.flightNumber} (${selectedFlight.from} → ${selectedFlight.to})` : 'No Flight';
  
  return {
    selectedFlight: flightStr,
    riskLevel: 'Low Risk',
    riskPercentage: Math.floor(Math.random() * 20) + 5,
    predictedDepartureDelay: '+5 mins (On Time)',
    onTimeProbability: `${Math.floor(Math.random() * 15) + 80}%`,
    weatherCondition: {
      status: 'Favorable',
      visibility: '4800 meters',
      windSpeed: '11 knots',
      precipitation: '0% (Clear)',
      radarIndex: 96
    },
    airTrafficCongestion: {
      status: 'Moderate',
      runwayQueues: '2 Aircraft awaiting takeoff',
      airspaceHolding: '0 mins',
      trafficIndex: 72
    },
    inboundTurnaround: {
      aircraftId: 'VT-IZB',
      inboundFrom: 'DEL',
      inboundStatus: 'Landed safely',
      groundTurnaroundTime: 'Optimal'
    },
    aiSummary: `Operational parameters for ${airportCode} are optimal. High likelihood of on-schedule pushback.`
  };
};

export const generateAssistanceBookingsForAirport = (airportCode) => {
  return [
    {
      id: `AST-${airportCode}-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceType: 'Wheelchair Assistance (Ramp & Cabin)',
      passengerName: 'Arun Kumar',
      flightNumber: '6E 204',
      date: new Date().toISOString().split('T')[0],
      pickupPoint: 'Main Entry / Drop-Off Zone',
      status: 'Confirmed & Officer Assigned',
      officerName: 'Airport Staff',
      officerPhone: '+91 94440 98765'
    }
  ];
};

export const generateBaggageStatusForAirport = (airportCode) => {
  return {
    tag: 'TAG-6E-99214',
    pnr: 'IXM782P',
    passenger: 'Arun Kumar',
    flight: '6E 204',
    weight: '14.2 kg',
    type: 'Check-in Trolley Bag',
    lastScanLocation: `${airportCode} Baggage Makeup Area`,
    lastScanTime: '20 mins ago',
    currentStatus: 'Loaded on Aircraft',
    destinationCarousel: 'Belt 01',
    steps: [
      { id: 1, title: 'Checked In', location: `${airportCode} Counter`, time: '16:45', status: 'completed' },
      { id: 2, title: 'Security Screening', location: 'Inline Scanner', time: '17:10', status: 'completed' },
      { id: 3, title: 'Baggage Makeup Area', location: 'Trolley Cart', time: '17:40', status: 'completed' },
      { id: 4, title: 'Loaded on Aircraft', location: 'Cargo Hold', time: '18:15', status: 'current' },
      { id: 5, title: 'In Transit / Flight', location: 'Cruising', time: 'Est. 19:40', status: 'pending' }
    ]
  };
};
