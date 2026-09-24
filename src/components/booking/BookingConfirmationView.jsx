import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Plane, QrCode, Compass, ArrowLeftRight, Luggage, Printer, X, Sparkles, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAirport } from '../../context/AirportContext';
import BoardingPassCard from './BoardingPassCard';

export const BookingConfirmationView = ({ booking, onNewBooking }) => {
  const { addToast } = useAirport();
  const navigate = useNavigate();
  const [showPrintModal, setShowPrintModal] = useState(false);

  React.useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, []);

  const handleDownloadTicket = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowPrintModal(true);
    addToast('E-Ticket Ready', 'Digital flight ticket generated for download/print', 'success');
  };

  return (
    <div className="animate-fade-in">
      {/* 1. SUCCESS HERO BANNER */}
      <div
        className="glass-panel"
        style={{
          padding: '36px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(10, 21, 46, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          marginBottom: '28px'
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.25)',
            border: '2px solid var(--status-on-time)',
            color: 'var(--status-on-time)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <span className="hero-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', marginBottom: '8px' }}>
          Booking Confirmed ✓
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '4px' }}>
          Flight Ticket Issued Successfully!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '8px auto 0' }}>
          Your booking confirmation & e-ticket have been sent to your registered email. Have a safe & comfortable flight!
        </p>

        <div
          style={{
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(5, 11, 24, 0.8)',
            padding: '10px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>PNR REFERENCE:</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
            {booking.pnr}
          </span>
        </div>
      </div>

      {/* 2. TICKET SUMMARY CARD */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px dashed rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: booking.airlineColor || '#1e3a8a',
                color: '#fff',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {booking.airlineLogo || booking.airlineCode}
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>{booking.airline}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)' }}>
                Flight {booking.flightNumber} • {booking.aircraft}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>DEPARTURE DATE</div>
            <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
              {booking.departureDate}
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DEPARTURE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {booking.depTime}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--sky-blue-light)' }}>{booking.from} ({booking.fromCity})</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Terminal: {booking.fromTerminal}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ARRIVAL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {booking.arrTime}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--accent-peach)' }}>{booking.to} ({booking.toCity})</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Terminal: {booking.toTerminal}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PASSENGERS</div>
            <div style={{ fontWeight: 700, color: '#ffffff' }}>
              {booking.passengers?.map((p) => p.fullName).join(', ') || '1 Adult'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--status-on-time)', marginTop: '4px' }}>
              Assigned Seat(s): {booking.seatsAssigned?.join(', ') || booking.seat || '12A'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TOTAL PAID</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--status-on-time)', fontFamily: 'var(--font-mono)' }}>
              ₹{booking.totalPaid?.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--sky-blue)' }}>Status: {booking.paymentStatus || 'SUCCESSFUL'}</div>
          </div>
        </div>

        {/* 3. ACTION BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button type="button" className="btn-primary" onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', fontSize: '0.9rem', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
            <Home size={16} />
            <span>Return to Dashboard</span>
          </button>

          <button type="button" className="btn-outline" onClick={handleDownloadTicket}>
            <Download size={16} />
            <span>Download & Print Ticket</span>
          </button>

          <Link to="/boarding" className="btn-peach">
            <QrCode size={16} />
            <span>View Boarding Pass</span>
          </Link>

          <Link to="/my-trips" className="btn-outline">
            <Luggage size={16} />
            <span>Go to My Trips</span>
          </Link>

          <Link to="/flights" className="btn-outline">
            <Plane size={16} />
            <span>View Flight Status</span>
          </Link>

          <Link to="/seat-swap" className="btn-outline">
            <ArrowLeftRight size={16} />
            <span>Request Seat Swap</span>
          </Link>

          <Link to="/navigation" className="btn-outline">
            <Compass size={16} />
            <span>Indoor Navigation</span>
          </Link>
        </div>
      </div>

      {/* Printable Modal Preview */}
      {showPrintModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(5, 11, 24, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              maxWidth: '920px',
              width: '100%',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setShowPrintModal(false)}
              style={{
                position: 'absolute',
                top: '6px',
                right: '12px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <X size={18} color="#ffffff" />
            </button>

            <BoardingPassCard flightData={booking} theme="reference" />
          </div>
        </div>
      )}
    </div>
  );
};
