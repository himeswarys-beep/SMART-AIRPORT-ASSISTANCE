import { INDIAN_AIRPORTS, getAirportByCode } from './airportsData';
import { AIRLINES } from './airlinesData';

// Generates realistic mock flight search results dynamically based on route and class
export const generateMockFlights = ({
  fromCode = 'MAA',
  toCode = 'BLR',
  departureDate = '2026-09-16',
  cabinClass = 'Economy'
}) => {
  const origin = getAirportByCode(fromCode);
  const destination = getAirportByCode(toCode);

  // Default base price multiplier based on cabin class
  const classMultiplier = cabinClass === 'Business' ? 3.4 : cabinClass === 'Premium Economy' ? 1.8 : 1.0;

  // Base flight templates
  const flightTemplates = [
    {
      airlineCode: '6E',
      flightNumber: `6E ${Math.floor(100 + Math.random() * 900)}`,
      depTime: '06:15',
      arrTime: '07:30',
      duration: '1h 15m',
      stops: 0,
      baseFare: 2450,
      aircraft: 'Airbus A320neo',
      availableSeats: 14,
      gate: 'A12',
      terminal: origin.terminal
    },
    {
      airlineCode: 'AI',
      flightNumber: `AI ${Math.floor(400 + Math.random() * 500)}`,
      depTime: '08:45',
      arrTime: '10:05',
      duration: '1h 20m',
      stops: 0,
      baseFare: 2890,
      aircraft: 'Boeing 787-8 Dreamliner',
      availableSeats: 8,
      gate: 'B04',
      terminal: origin.terminal
    },
    {
      airlineCode: 'QP',
      flightNumber: `QP ${Math.floor(1100 + Math.random() * 500)}`,
      depTime: '11:20',
      arrTime: '12:35',
      duration: '1h 15m',
      stops: 0,
      baseFare: 2200,
      aircraft: 'Boeing 737 MAX 8',
      availableSeats: 22,
      gate: 'A08',
      terminal: origin.terminal
    },
    {
      airlineCode: 'IX',
      flightNumber: `IX ${Math.floor(700 + Math.random() * 200)}`,
      depTime: '14:10',
      arrTime: '15:25',
      duration: '1h 15m',
      stops: 0,
      baseFare: 2150,
      aircraft: 'Airbus A320neo',
      availableSeats: 5,
      gate: 'B02',
      terminal: origin.terminal
    },
    {
      airlineCode: 'SG',
      flightNumber: `SG ${Math.floor(3000 + Math.random() * 500)}`,
      depTime: '16:50',
      arrTime: '18:10',
      duration: '1h 20m',
      stops: 0,
      baseFare: 2350,
      aircraft: 'Q400 Bombardier / B737',
      availableSeats: 12,
      gate: 'A02',
      terminal: origin.terminal
    },
    {
      airlineCode: '9I',
      flightNumber: `9I ${Math.floor(500 + Math.random() * 200)}`,
      depTime: '18:30',
      arrTime: '20:45',
      duration: '2h 15m',
      stops: 1,
      stopDetails: '1 Stop via CJB (30m layover)',
      baseFare: 1980,
      aircraft: 'ATR 72-600',
      availableSeats: 7,
      gate: 'A04',
      terminal: origin.terminal
    },
    {
      airlineCode: '6E',
      flightNumber: `6E ${Math.floor(2000 + Math.random() * 900)}`,
      depTime: '20:15',
      arrTime: '21:30',
      duration: '1h 15m',
      stops: 0,
      baseFare: 2600,
      aircraft: 'Airbus A321neo',
      availableSeats: 19,
      gate: 'A14',
      terminal: origin.terminal
    }
  ];

  return flightTemplates.map((t, idx) => {
    const airline = AIRLINES.find((a) => a.code === t.airlineCode) || AIRLINES[0];
    const base = Math.round(t.baseFare * classMultiplier);
    const taxes = Math.round(base * 0.18); // 18% GST + Airport Development Fee
    const totalFare = base + taxes;

    return {
      id: `fl-search-${fromCode}-${toCode}-${idx + 1}`,
      airline: airline.name,
      airlineCode: airline.code,
      airlineLogo: airline.logo,
      airlineColor: airline.color,
      accentColor: airline.accentColor,
      flightNumber: t.flightNumber,
      from: fromCode,
      fromCity: origin.city,
      fromAirport: origin.name,
      fromTerminal: origin.terminal,
      to: toCode,
      toCity: destination.city,
      toAirport: destination.name,
      toTerminal: destination.terminal,
      depTime: t.depTime,
      arrTime: t.arrTime,
      departureDate,
      duration: t.duration,
      stops: t.stops,
      stopDetails: t.stopDetails || 'Non-stop',
      aircraft: t.aircraft,
      availableSeats: t.availableSeats,
      baggageCheckin: airline.baggageCheckin,
      baggageCabin: airline.baggageCabin,
      cancellationFee: airline.cancellationFee,
      changeFee: airline.changeFee,
      mealPolicy: airline.mealPolicy,
      mealAvailable: true,
      cabinClass: cabinClass,
      baseFare: base,
      taxes: taxes,
      totalFare: totalFare,
      gate: t.gate,
      status: 'On Time'
    };
  });
};

// Default initial flights for direct view
export const DEFAULT_MOCK_FLIGHTS = generateMockFlights({
  fromCode: 'MAA',
  toCode: 'BLR',
  departureDate: new Date().toISOString().split('T')[0],
  cabinClass: 'Economy'
});
