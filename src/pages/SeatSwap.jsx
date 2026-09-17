import React, { useState } from 'react';
import { useAirport } from '../context/AirportContext';
import { ArrowLeftRight, User, CheckCircle2, Clock, XCircle, Send, Sparkles, Shield, Compass } from 'lucide-react';

export const SeatSwap = () => {
  const { user, myTrips, addToast } = useAirport();

  // Active user trip
  const activeTrip = myTrips[0] || {
    flightNumber: user.flightNumber,
    airline: user.airline,
    from: user.from,
    to: user.to,
    seat: user.seat,
    pnr: user.pnr
  };

  // Demo Seat Swap Requests State
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 'SWAP-8912',
      currentSeat: '14B (Middle)',
      requestedSeat: '12A (Window Extra Legroom)',
      targetPassenger: 'Priya Sharma (Seat 12A)',
      reason: 'Traveling with elderly parent in Row 14, prefer window seat',
      status: 'Pending',
      createdAt: '10 mins ago'
    },
    {
      id: 'SWAP-4401',
      currentSeat: '18E (Middle)',
      requestedSeat: '14A (Window)',
      targetPassenger: 'Rajesh Nair (Seat 14A)',
      reason: 'Prefer window seat for photography',
      status: 'Accepted',
      createdAt: 'Yesterday'
    }
  ]);

  // Form State for New Request
  const [requestedSeat, setRequestedSeat] = useState('12A');
  const [targetPassenger, setTargetPassenger] = useState('Priya Sharma (Seat 12A)');
  const [reason, setReason] = useState('Traveling with family members in adjacent seats.');

  const handleSendSwapRequest = (e) => {
    e.preventDefault();
    const newReq = {
      id: `SWAP-${Math.floor(1000 + Math.random() * 9000)}`,
      currentSeat: activeTrip.seat || user.seat || '14B',
      requestedSeat,
      targetPassenger,
      reason,
      status: 'Pending',
      createdAt: 'Just now'
    };

    setSwapRequests([newReq, ...swapRequests]);
    addToast('Seat Swap Request Sent', `Request sent to ${targetPassenger}`, 'success');
  };

  const handleSimulateResponse = (reqId, newStatus) => {
    setSwapRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    );
    addToast(`Swap Request ${newStatus}`, `Passenger response updated to ${newStatus}`, newStatus === 'Accepted' ? 'success' : 'info');
  };

  // Mock eligible passengers on the flight
  const eligiblePassengers = [
    { seat: '12A', name: 'Priya Sharma', seatType: 'Window (Extra Legroom Row 12)' },
    { seat: '12C', name: 'Karthik Raja', seatType: 'Aisle (Extra Legroom Row 12)' },
    { seat: '14A', name: 'Siddharth V.', seatType: 'Window (Row 14)' },
    { seat: '15F', name: 'Anita Roy', seatType: 'Window (Row 15)' },
    { seat: '16C', name: 'Deepak Patel', seatType: 'Aisle (Row 16)' }
  ];

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag" style={{ background: 'rgba(251, 146, 60, 0.2)', color: 'var(--accent-peach-bright)' }}>
            Peer-to-Peer Seat Exchange
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Flight {activeTrip.flightNumber} ({activeTrip.from} ➔ {activeTrip.to})
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Seat Swap Platform</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Request seat swaps directly with fellow passengers on your booked flight for better comfort, extra legroom, or family seating.
        </p>
      </div>

      {/* Active Ticket Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          marginBottom: '28px',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid var(--sky-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--sky-blue)'
            }}
          >
            <ArrowLeftRight size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>YOUR CURRENT ASSIGNED SEAT</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              Seat {activeTrip.seat || user.seat || '14B'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--sky-blue)' }}>
              {activeTrip.airline} • Flight {activeTrip.flightNumber} • PNR: {activeTrip.pnr}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(280px, 360px)', gap: '24px' }}>
        {/* Send Request Form */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>Request Seat Swap</h2>

          <form onSubmit={handleSendSwapRequest}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Select Preferred Passenger / Seat */}
              <div className="search-field-group">
                <label className="search-field-label">Select Target Passenger & Preferred Seat</label>
                <select
                  className="search-select-custom"
                  value={requestedSeat}
                  onChange={(e) => {
                    const found = eligiblePassengers.find((p) => p.seat === e.target.value);
                    setRequestedSeat(e.target.value);
                    if (found) setTargetPassenger(`${found.name} (Seat ${found.seat})`);
                  }}
                >
                  {eligiblePassengers.map((p) => (
                    <option key={p.seat} value={p.seat}>
                      Seat {p.seat} - {p.name} ({p.seatType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Reason */}
              <div className="search-field-group">
                <label className="search-field-label">Optional Swap Reason</label>
                <textarea
                  className="search-input-custom"
                  rows={3}
                  placeholder="e.g. Traveling with family members, need window seat, tall passenger extra legroom..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn-peach" style={{ padding: '12px', fontSize: '0.95rem', width: '100%' }}>
                <Send size={16} />
                <span>Send Swap Request</span>
              </button>
            </div>
          </form>
        </div>

        {/* Requests Status Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>Swap Requests Activity</h2>

            {swapRequests.map((req) => (
              <div
                key={req.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(5, 11, 24, 0.6)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  marginBottom: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {req.id}
                  </span>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background:
                        req.status === 'Accepted'
                          ? 'rgba(16, 185, 129, 0.2)'
                          : req.status === 'Rejected'
                          ? 'rgba(239, 68, 68, 0.2)'
                          : 'rgba(245, 158, 11, 0.2)',
                      color:
                        req.status === 'Accepted'
                          ? 'var(--status-on-time)'
                          : req.status === 'Rejected'
                          ? '#ef4444'
                          : 'var(--status-delayed)'
                    }}
                  >
                    {req.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                  Swap {req.currentSeat} ➔ {req.requestedSeat}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Target: {req.targetPassenger}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                  "{req.reason}"
                </div>

                {/* Simulation Action Buttons for Demo */}
                {req.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      type="button"
                      onClick={() => handleSimulateResponse(req.id, 'Accepted')}
                      style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-on-time)', fontSize: '0.72rem', fontWeight: 700, border: '1px solid var(--status-on-time)' }}
                    >
                      Simulate Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateResponse(req.id, 'Rejected')}
                      style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.72rem', fontWeight: 700, border: '1px solid #ef4444' }}
                    >
                      Simulate Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSwap;
