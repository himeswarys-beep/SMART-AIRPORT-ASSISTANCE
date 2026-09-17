import React, { useState } from 'react';
import { generateSeatLayout, SEAT_LEGEND } from '../../data/booking/seatMapData';
import { Check, ShieldAlert, Sparkles, User } from 'lucide-react';

export const SeatMap = ({
  flight,
  passengers = [{ fullName: 'Passenger 1' }],
  selectedSeatsMap = {},
  onSeatSelect,
  onProceed
}) => {
  const [activePaxIndex, setActivePaxIndex] = useState(0);
  const seats = generateSeatLayout();

  // Helper to check if a seat is selected by ANY passenger
  const getSelectedByPax = (seatId) => {
    for (let idx in selectedSeatsMap) {
      if (selectedSeatsMap[idx]?.id === seatId) {
        return Number(idx);
      }
    }
    return null;
  };

  const handleSeatClick = (seat) => {
    if (seat.isOccupied) return;

    // Toggle or assign seat for current active passenger
    const existingPax = getSelectedByPax(seat.id);
    if (existingPax === activePaxIndex) {
      // Unselect
      onSeatSelect(activePaxIndex, null);
    } else {
      onSeatSelect(activePaxIndex, seat);
    }
  };

  // Calculate total seat charges across all passengers
  const totalSeatCharges = Object.values(selectedSeatsMap).reduce(
    (sum, seat) => sum + (seat?.extraCharge || 0),
    0
  );

  const currentPaxSeat = selectedSeatsMap[activePaxIndex];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Aircraft Seat Selection</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Flight {flight.flightNumber} ({flight.from} ➔ {flight.to}) • {flight.aircraft}
        </p>
      </div>

      {/* Passenger Selector Tabs if multiple passengers */}
      {passengers.length > 1 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {passengers.map((pax, idx) => {
            const assigned = selectedSeatsMap[idx];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePaxIndex(idx)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: activePaxIndex === idx ? 'var(--gradient-sky)' : 'rgba(11, 23, 50, 0.7)',
                  color: '#ffffff',
                  border: activePaxIndex === idx ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <User size={15} />
                <span>{pax.fullName || `Passenger ${idx + 1}`}</span>
                <span style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                  {assigned ? `Seat ${assigned.seatNumber}` : 'Select Seat'}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Seat Legend */}
      <div
        className="glass-panel"
        style={{
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        {SEAT_LEGEND.map((lg) => (
          <div key={lg.type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: lg.color,
                border: `1px solid ${lg.border}`
              }}
            />
            <span>{lg.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(280px, 340px)', gap: '24px' }}>
        {/* Visual Fuselage Map */}
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <div className="aircraft-fuselage">
            {/* Cockpit Front */}
            <div className="cockpit-header">
              <div style={{ fontSize: '0.75rem', color: 'var(--sky-blue-light)', fontWeight: 800, letterSpacing: '0.1em' }}>
                ▲ COCKPIT / NOSE ▲
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Front Exit & Galley</div>
            </div>

            {/* Seat Rows Grid */}
            <div>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((rowNum) => {
                const rowSeats = seats.filter((s) => s.row === rowNum);
                const isExitRow = rowNum === 12 || rowNum === 13;

                return (
                  <React.Fragment key={rowNum}>
                    {isExitRow && rowNum === 12 && (
                      <div style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 800, margin: '12px 0 6px', letterSpacing: '0.05em' }}>
                        ══ EMERGENCY EXIT ROW (EXTRA LEGROOM) ══
                      </div>
                    )}
                    <div className="seat-row-grid">
                      {/* Left A B C */}
                      {rowSeats.slice(0, 3).map((seat) => {
                        const selectedPax = getSelectedByPax(seat.id);
                        const isSelectedByCurrent = selectedPax === activePaxIndex;
                        const isSelectedByOther = selectedPax !== null && !isSelectedByCurrent;

                        let seatClass = 'seat-button ';
                        if (seat.isOccupied || isSelectedByOther) seatClass += 'occupied ';
                        else if (isSelectedByCurrent) seatClass += 'selected ';
                        else if (seat.isPremium) seatClass += 'premium ';
                        else if (seat.isExtraLegroom) seatClass += 'extra-legroom ';
                        else seatClass += 'available ';

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            className={seatClass}
                            disabled={seat.isOccupied || isSelectedByOther}
                            onClick={() => handleSeatClick(seat)}
                            title={`${seat.seatNumber} (${seat.seatType}) - ${seat.extraCharge > 0 ? `+₹${seat.extraCharge}` : 'Free'}`}
                          >
                            <span>{seat.col}</span>
                          </button>
                        );
                      })}

                      {/* Aisle label */}
                      <span className="aisle-label">{rowNum}</span>

                      {/* Right D E F */}
                      {rowSeats.slice(3, 6).map((seat) => {
                        const selectedPax = getSelectedByPax(seat.id);
                        const isSelectedByCurrent = selectedPax === activePaxIndex;
                        const isSelectedByOther = selectedPax !== null && !isSelectedByCurrent;

                        let seatClass = 'seat-button ';
                        if (seat.isOccupied || isSelectedByOther) seatClass += 'occupied ';
                        else if (isSelectedByCurrent) seatClass += 'selected ';
                        else if (seat.isPremium) seatClass += 'premium ';
                        else if (seat.isExtraLegroom) seatClass += 'extra-legroom ';
                        else seatClass += 'available ';

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            className={seatClass}
                            disabled={seat.isOccupied || isSelectedByOther}
                            onClick={() => handleSeatClick(seat)}
                            title={`${seat.seatNumber} (${seat.seatType}) - ${seat.extraCharge > 0 ? `+₹${seat.extraCharge}` : 'Free'}`}
                          >
                            <span>{seat.col}</span>
                          </button>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ▼ REAR GALLEY & RESTROOMS ▼
            </div>
          </div>
        </div>

        {/* Selected Seat Summary Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Seat Selection Summary</h3>

            {currentPaxSeat ? (
              <div style={{ background: 'rgba(5, 11, 24, 0.7)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(251, 146, 60, 0.4)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-peach)', fontWeight: 700 }}>SELECTED SEAT</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {currentPaxSeat.seatNumber}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sky-blue-light)', marginTop: '4px' }}>
                  {currentPaxSeat.seatType} ({currentPaxSeat.position})
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  Extra seat fee: <strong style={{ color: '#ffffff' }}>{currentPaxSeat.extraCharge > 0 ? `+₹${currentPaxSeat.extraCharge}` : 'Included Free'}</strong>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Click any available seat on the airplane map to assign for {passengers[activePaxIndex]?.fullName || `Passenger ${activePaxIndex + 1}`}.
              </div>
            )}

            {/* Total Seat Charge Summary */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Seat Fee:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                +₹{totalSeatCharges}
              </span>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={onProceed}
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <span>Confirm Seat & Continue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
