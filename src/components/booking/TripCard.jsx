import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, QrCode, Compass, ArrowLeftRight, Download, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

export const TripCard = ({ trip, onCancelTrip, onViewTicket }) => {
  const isUpcoming = trip.tripStatus === 'Upcoming' || !trip.tripStatus;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        marginBottom: '20px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(135deg, rgba(16, 33, 71, 0.75) 0%, rgba(10, 21, 46, 0.9) 100%)'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: trip.airlineColor || '#1e3a8a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem'
            }}
          >
            {trip.airlineLogo || trip.airlineCode}
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>{trip.airline}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)' }}>
              {trip.flightNumber} • PNR: <strong style={{ color: '#ffffff' }}>{trip.pnr}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Booking status badge */}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: trip.tripStatus === 'Cancelled' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: trip.tripStatus === 'Cancelled' ? '#ef4444' : 'var(--status-on-time)',
              border: trip.tripStatus === 'Cancelled' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            {trip.tripStatus || 'CONFIRMED'}
          </span>

          {/* Live Flight status badge */}
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--sky-blue-light)',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}
          >
            Status: {trip.flightStatus || 'On Time'}
          </span>
        </div>
      </div>

      {/* Main Route Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px', padding: '16px', background: 'rgba(5, 11, 24, 0.6)', borderRadius: 'var(--radius-md)' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FROM</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{trip.from}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{trip.fromCity}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--sky-blue-light)' }}>{trip.depTime} IST ({trip.departureDate})</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{trip.duration || 'Direct'}</div>
          <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #f97316)', position: 'relative', margin: '6px 0' }}>
            <Plane size={14} color="var(--accent-peach)" style={{ position: 'absolute', top: '-6px', left: '45%' }} />
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent-peach)' }}>Gate {trip.gate || 'A12'}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TO</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{trip.to}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{trip.toCity}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-peach)' }}>{trip.arrTime} IST</div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SEAT & PASSENGER</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
            Seat {trip.seatsAssigned?.join(', ') || trip.seat || '12A'}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {trip.passengers?.[0]?.fullName || trip.passenger || 'Arun Kumar'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button type="button" className="btn-primary" onClick={() => onViewTicket(trip)} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <Download size={14} />
            <span>View Ticket</span>
          </button>

          <Link to="/boarding" className="btn-peach" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <QrCode size={14} />
            <span>Boarding Pass</span>
          </Link>

          <Link to="/flights" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <Plane size={14} />
            <span>Flight Status</span>
          </Link>

          <Link to="/navigation" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <Compass size={14} />
            <span>Indoor Map</span>
          </Link>

          <Link to="/seat-swap" className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <ArrowLeftRight size={14} />
            <span>Seat Swap</span>
          </Link>
        </div>

        {isUpcoming && onCancelTrip && (
          <button
            type="button"
            onClick={() => onCancelTrip(trip.id || trip.pnr)}
            style={{ background: 'transparent', color: '#ef4444', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Trash2 size={13} />
            <span>Cancel Trip</span>
          </button>
        )}
      </div>
    </div>
  );
};
