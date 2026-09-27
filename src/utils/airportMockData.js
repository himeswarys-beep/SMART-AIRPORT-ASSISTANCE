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

export const generatePredictionForFlight = (flightObj, airportCode = 'MAA') => {
  if (!flightObj) {
    return {
      flightNumber: 'IX 749',
      from: 'BBI',
      to: 'TRZ',
      airline: 'Air India Express',
      riskLevel: 'Low Risk',
      riskPercentage: 18,
      predictedDepartureDelay: '+5 mins (On Time)',
      onTimeProbability: '94%',
      weatherCondition: {
        status: 'Favorable',
        visibility: '4900 meters',
        windSpeed: '11 knots',
        precipitation: '0% (Clear)',
        radarIndex: 96
      },
      airTrafficCongestion: {
        status: 'Moderate',
        runwayQueues: '2 Aircraft awaiting takeoff',
        airspaceHolding: '0 mins',
        trafficIndex: 68
      },
      inboundTurnaround: {
        aircraftId: 'VT-IXD',
        inboundFrom: 'TRZ',
        inboundStatus: 'Landed safely',
        groundTurnaroundTime: 'Optimal'
      },
      aiSummary: 'Operational parameters for IX 749 (BBI → TRZ) are optimal. High likelihood of on-schedule pushback.',
      weeklyReliability: [
        { day: 'Mon', onTime: 96 },
        { day: 'Tue', onTime: 92 },
        { day: 'Wed', onTime: 98 },
        { day: 'Thu', onTime: 88 },
        { day: 'Fri', onTime: 94 },
        { day: 'Sat', onTime: 96 },
        { day: 'Today', onTime: 95, isToday: true }
      ],
      avgOnTime: '94.2'
    };
  }

  const fn = flightObj.flightNumber || 'IX 749';
  const from = flightObj.from || 'BBI';
  const to = flightObj.to || 'TRZ';
  const airline = flightObj.airline || 'Air India Express';

  const numHash = fn.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const codePrefix = (flightObj.airlineCode || fn.split(' ')[0] || 'IX').toUpperCase();

  let tailReg = 'VT-IXD';
  if (codePrefix.includes('6E')) tailReg = `VT-IF${String.fromCharCode(65 + (numHash % 20))}`;
  else if (codePrefix.includes('AI')) tailReg = `VT-AL${String.fromCharCode(65 + (numHash % 20))}`;
  else if (codePrefix.includes('IX')) tailReg = `VT-IX${String.fromCharCode(65 + (numHash % 20))}`;
  else if (codePrefix.includes('QP')) tailReg = `VT-YA${String.fromCharCode(65 + (numHash % 20))}`;
  else if (codePrefix.includes('SG')) tailReg = `VT-SE${String.fromCharCode(65 + (numHash % 20))}`;

  const riskPct = 12 + (numHash % 22);
  const windKnots = 8 + (numHash % 10);
  const visibilityMeters = 4400 + (numHash % 20) * 100;
  const queuesCount = 1 + (numHash % 3);
  const congestionIdx = 55 + (numHash % 25);
  const avgOnTime = (91 + (numHash % 7)).toFixed(1);

  return {
    flightNumber: fn,
    from,
    to,
    airline,
    riskLevel: riskPct < 25 ? 'Low Risk' : 'Moderate Risk',
    riskPercentage: riskPct,
    predictedDepartureDelay: riskPct < 25 ? '+5 mins (On Time)' : '+15 mins (Minor Delay)',
    onTimeProbability: `${100 - riskPct}%`,
    weatherCondition: {
      status: riskPct < 28 ? 'Favorable' : 'Moderate Wind',
      visibility: `${visibilityMeters} meters`,
      windSpeed: `${windKnots} knots`,
      precipitation: '0% (Clear)',
      radarIndex: 90 + (numHash % 8)
    },
    airTrafficCongestion: {
      status: congestionIdx < 70 ? 'Moderate' : 'Heavy',
      runwayQueues: `${queuesCount} Aircraft awaiting takeoff`,
      airspaceHolding: queuesCount > 2 ? '5 mins' : '0 mins',
      trafficIndex: congestionIdx
    },
    inboundTurnaround: {
      aircraftId: tailReg,
      inboundFrom: to,
      inboundStatus: 'Landed safely',
      groundTurnaroundTime: 'Optimal'
    },
    aiSummary: `Operational parameters for ${fn} (${from} → ${to}) are optimal. High likelihood of on-schedule pushback.`,
    weeklyReliability: [
      { day: 'Mon', onTime: Math.min(99, 90 + (numHash % 8)) },
      { day: 'Tue', onTime: Math.min(99, 88 + (numHash % 10)) },
      { day: 'Wed', onTime: Math.min(99, 92 + (numHash % 7)) },
      { day: 'Thu', onTime: Math.min(99, 85 + (numHash % 12)) },
      { day: 'Fri', onTime: Math.min(99, 93 + (numHash % 6)) },
      { day: 'Sat', onTime: Math.min(99, 95 + (numHash % 4)) },
      { day: 'Today', onTime: Math.min(99, 94 + (numHash % 5)), isToday: true }
    ],
    avgOnTime
  };
};

export const generateDelayPredictionForAirport = (airportCode, flights) => {
  const selectedFlight = (flights && flights.find(f => f.type === 'departure')) || flights?.[0] || { flightNumber: 'IX 749', from: 'BBI', to: 'TRZ' };
  return generatePredictionForFlight(selectedFlight, airportCode);
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

export const generateBaggageStatusForAirport = (airportCode, booking = null, user = null, customTag = null) => {
  const flight = booking?.flightNumber || user?.flightNumber || 'IX 749';
  const passenger = user?.name || booking?.passengerName || 'Malini';
  const airlineCode = booking?.airlineCode || user?.airlineCode || flight.split(' ')[0] || 'IX';
  const tag = customTag || booking?.baggageTag || user?.baggageTag || `TAG-${airlineCode}-99214`;
  const pnr = booking?.pnr || user?.pnr || 'PNR-IX-216614';
  const origin = booking?.from || user?.from || airportCode || 'MAA';

  return {
    tag,
    pnr,
    passenger,
    flight,
    weight: booking?.baggageWeight || '14.2 kg',
    type: 'Check-in Trolley Bag',
    lastScanLocation: `${origin} Baggage Makeup Area`,
    lastScanTime: '20 mins ago',
    currentStatus: 'Loaded on Aircraft',
    destinationCarousel: 'Belt 01',
    steps: [
      { id: 1, title: 'Checked In', location: `${origin} Counter`, time: '16:45', status: 'completed' },
      { id: 2, title: 'Security Screening', location: 'Inline Scanner', time: '17:10', status: 'completed' },
      { id: 3, title: 'Baggage Makeup Area', location: 'Trolley Cart', time: '17:40', status: 'completed' },
      { id: 4, title: 'Loaded on Aircraft', location: 'Cargo Hold', time: '18:15', status: 'current' },
      { id: 5, title: 'In Transit / Flight', location: 'Cruising', time: 'Est. 19:40', status: 'pending' }
    ]
  };
};
