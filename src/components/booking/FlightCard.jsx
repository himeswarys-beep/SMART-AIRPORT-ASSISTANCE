import React, { useState } from 'react';
import { Plane, Luggage, Clock, Check, ChevronDown, ChevronUp, AlertCircle, ArrowRight } from 'lucide-react';

export const FlightCard = ({
  flight,
  onSelectFlight,
  onToggleCompare,
  isCompared,
  isSelected
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '20px 24px',
        marginBottom: '16px',
        border: isSelected ? '2px solid var(--accent-peach-bright)' : '1px solid rgba(56, 189, 248, 0.2)',
        background: isSelected ? 'rgba(251, 146, 60, 0.08)' : 'rgba(11, 23, 50, 0.65)',
        transition: 'all 0.25s ease'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1.2fr) minmax(280px, 2.5fr) minmax(180px, 1fr)', gap: '20px', alignItems: 'center' }}>
        {/* Airline Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: flight.airlineColor || '#1e3a8a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              flexShrink: 0
            }}
          >
            {flight.airlineLogo || flight.airlineCode}
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1rem' }}>{flight.airline}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)' }}>
              {flight.flightNumber}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{flight.aircraft}</div>
          </div>
        </div>

        {/* Departure -> Route -> Arrival */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          {/* Departure */}
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {flight.depTime}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {flight.from}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{flight.fromCity}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-peach)' }}>{flight.fromTerminal}</div>
          </div>

          {/* Timing Visual Line */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1, padding: '0 12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {flight.duration}
            </span>
            <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #f97316)', position: 'relative' }}>
              <Plane size={14} color="var(--accent-peach)" style={{ position: 'absolute', top: '-6px', left: '45%' }} />
            </div>
            <span
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: flight.stops === 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: flight.stops === 0 ? 'var(--status-on-time)' : 'var(--status-delayed)',
                fontWeight: 700
              }}
            >
              {flight.stopDetails || (flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`)}
            </span>
          </div>

          {/* Arrival */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {flight.arrTime}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {flight.to}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{flight.toCity}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-peach)' }}>{flight.toTerminal}</div>
          </div>
        </div>

        {/* Fare & Action Buttons */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Fare per adult</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              ₹{flight.totalFare?.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              Base ₹{flight.baseFare} + Tax ₹{flight.taxes}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare(flight)}
                style={{ accentColor: 'var(--sky-blue)', width: '15px', height: '15px' }}
              />
              <span>Compare</span>
            </label>

            <button
              type="button"
              className={isSelected ? 'btn-peach' : 'btn-primary'}
              onClick={() => onSelectFlight(flight)}
              style={{ padding: '8px 18px', fontSize: '0.86rem' }}
            >
              <span>{isSelected ? 'Selected' : 'Select Flight'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer bar with Baggage, Seats, and View Details toggle */}
      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Luggage size={14} color="var(--sky-blue)" />
            <span>Check-in: <strong>{flight.baggageCheckin}</strong> | Cabin: <strong>{flight.baggageCabin}</strong></span>
          </span>
          <span style={{ color: 'var(--status-on-time)', fontWeight: 600 }}>
            {flight.availableSeats} seats remaining
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          style={{
            background: 'transparent',
            color: 'var(--sky-blue)',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>{showDetails ? 'Hide Details' : 'View Details & Fees'}</span>
          {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expandable Details Drawer */}
      {showDetails && (
        <div
          style={{
            marginTop: '14px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(5, 11, 24, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            fontSize: '0.8rem'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: 'var(--accent-peach)', marginBottom: '4px' }}>Cancellation Policy</div>
            <div style={{ color: 'var(--text-primary)' }}>Standard Cancellation Fee: {flight.cancellationFee}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Non-refundable within 2 hours of departure.</div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: 'var(--sky-blue)', marginBottom: '4px' }}>Reschedule / Change Fee</div>
            <div style={{ color: 'var(--text-primary)' }}>Date Change Fee: {flight.changeFee} + Fare difference</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Free change up to 24 hrs prior for Flex fares.</div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>In-Flight Meal & Amenities</div>
            <div style={{ color: 'var(--text-primary)' }}>{flight.mealPolicy}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Complimentary USB charging port at every seat.</div>
          </div>
        </div>
      )}
    </div>
  );
};
