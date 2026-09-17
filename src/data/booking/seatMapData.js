// Airplane seat configuration generator (3x3 Airbus A320 / Boeing 737 layout)
export const generateSeatLayout = () => {
  const rows = 24; // 24 rows
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seats = [];

  // Occupied seat numbers for simulation
  const occupiedSet = new Set(['1A', '2B', '3C', '4F', '7A', '8D', '10C', '12B', '14E', '16F', '18A', '20D', '22B']);

  for (let r = 1; r <= rows; r++) {
    for (let c of cols) {
      const seatNumber = `${r}${c}`;
      let seatType = 'Standard';
      let extraCharge = 0;
      let isPremium = false;
      let isExtraLegroom = false;

      // Rows 1-3: Premium Business / Front Row
      if (r <= 3) {
        seatType = 'Premium Business Front';
        extraCharge = 750;
        isPremium = true;
      } else if (r === 12 || r === 13) {
        // Exit rows
        seatType = 'Extra Legroom Exit Row';
        extraCharge = 450;
        isExtraLegroom = true;
      } else if (c === 'A' || c === 'F') {
        seatType = 'Window Seat';
        extraCharge = 200;
      } else if (c === 'C' || c === 'D') {
        seatType = 'Aisle Seat';
        extraCharge = 150;
      } else {
        seatType = 'Middle Seat';
        extraCharge = 0;
      }

      const isOccupied = occupiedSet.has(seatNumber);

      seats.push({
        id: seatNumber,
        row: r,
        col: c,
        seatNumber,
        seatType,
        extraCharge,
        isPremium,
        isExtraLegroom,
        isOccupied,
        position: c === 'A' || c === 'F' ? 'Window' : c === 'C' || c === 'D' ? 'Aisle' : 'Middle'
      });
    }
  }

  return seats;
};

export const SEAT_LEGEND = [
  { label: 'Available', type: 'available', color: 'rgba(56, 189, 248, 0.25)', border: 'var(--sky-blue)' },
  { label: 'Selected', type: 'selected', color: 'var(--accent-peach-bright)', border: 'var(--accent-peach)' },
  { label: 'Occupied', type: 'occupied', color: 'rgba(148, 163, 184, 0.2)', border: 'rgba(148, 163, 184, 0.4)' },
  { label: 'Premium (Rows 1-3)', type: 'premium', color: 'rgba(168, 85, 247, 0.3)', border: '#c084fc' },
  { label: 'Extra Legroom (Exit)', type: 'extra-legroom', color: 'rgba(16, 185, 129, 0.3)', border: '#34d399' }
];
