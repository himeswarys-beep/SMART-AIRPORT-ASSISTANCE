import React from 'react';
import { ArrowLeft, Check, X, Plane, Shield, Utensils, Luggage } from 'lucide-react';

export const FlightComparison = ({ comparedFlights, onSelectFlight, onRemoveCompare, onClose }) => {
  if (!comparedFlights || comparedFlights.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <h3>No Flights Selected for Comparison</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Select 2 or more flight checkboxes from search results to compare them side-by-side.
        </p>
        <button type="button" className="btn-primary" onClick={onClose} style={{ marginTop: '16px' }}>
          Back to Results
        </button>
      </div>
    );
  }

  const specRows = [
    { key: 'airline', label: 'Airline' },
    { key: 'flightNumber', label: 'Flight No.' },
    { key: 'depTime', label: 'Departure' },
    { key: 'arrTime', label: 'Arrival' },
    { key: 'duration', label: 'Duration' },
    { key: 'stops', label: 'Stops' },
    { key: 'baggageCheckin', label: 'Check-in Baggage' },
    { key: 'baggageCabin', label: 'Cabin Baggage' },
    { key: 'availableSeats', label: 'Seats Left' },
    { key: 'baseFare', label: 'Base Fare', format: (val) => `₹${val}` },
    { key: 'taxes', label: 'Taxes & Fees', format: (val) => `₹${val}` },
    { key: 'totalFare', label: 'Total Price', highlight: true, format: (val) => `₹${val?.toLocaleString('en-IN')}` },
    { key: 'cancellationFee', label: 'Cancellation Fee' },
    { key: 'changeFee', label: 'Reschedule Fee' },
    { key: 'mealPolicy', label: 'Meal Availability' },
    { key: 'cabinClass', label: 'Cabin Class' }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
            style={{ padding: '6px 14px', fontSize: '0.8rem', marginBottom: '8px' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Results</span>
          </button>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Side-by-Side Flight Comparison</h2>
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          overflowX: 'auto'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', width: '180px', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                Feature / Spec
              </th>
              {comparedFlights.map((fl) => (
                <th key={fl.id} style={{ padding: '12px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ position: 'relative', background: 'rgba(5, 11, 24, 0.7)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <button
                      type="button"
                      onClick={() => onRemoveCompare(fl.id)}
                      style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={12} />
                    </button>
                    <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>{fl.airline}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)' }}>{fl.flightNumber}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-peach)', margin: '10px 0 6px', fontFamily: 'var(--font-mono)' }}>
                      ₹{fl.totalFare?.toLocaleString('en-IN')}
                    </div>
                    <button
                      type="button"
                      className="btn-peach"
                      onClick={() => onSelectFlight(fl)}
                      style={{ width: '100%', padding: '8px', fontSize: '0.82rem', marginTop: '6px' }}
                    >
                      Select This Flight
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {specRows.map((row) => (
              <tr key={row.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '12px', fontWeight: 700, fontSize: '0.84rem', color: row.highlight ? 'var(--accent-peach)' : 'var(--text-secondary)' }}>
                  {row.label}
                </td>
                {comparedFlights.map((fl) => {
                  const val = fl[row.key];
                  const displayVal = row.format ? row.format(val) : val;
                  return (
                    <td
                      key={`${fl.id}-${row.key}`}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: row.highlight ? '1.1rem' : '0.84rem',
                        fontWeight: row.highlight ? 900 : 500,
                        color: row.highlight ? 'var(--sky-blue-light)' : '#ffffff',
                        fontFamily: row.key.includes('Fare') || row.key === 'depTime' || row.key === 'arrTime' ? 'var(--font-mono)' : 'inherit'
                      }}
                    >
                      {displayVal}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
