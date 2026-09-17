import React from 'react';
import { Filter, ArrowUpDown, DollarSign, Plane, Clock } from 'lucide-react';
import { AIRLINES } from '../../data/booking/airlinesData';

export const FlightFilters = ({
  sortBy,
  setSortBy,
  selectedAirlines,
  setSelectedAirlines,
  maxPrice,
  setMaxPrice,
  stopsFilter,
  setStopsFilter,
  onResetFilters
}) => {
  const toggleAirline = (code) => {
    if (selectedAirlines.includes(code)) {
      setSelectedAirlines(selectedAirlines.filter((c) => c !== code));
    } else {
      setSelectedAirlines([...selectedAirlines, code]);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      {/* Header & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
          <Filter size={18} color="var(--sky-blue)" />
          <span>Filters & Sort</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          style={{ background: 'transparent', color: 'var(--accent-peach)', fontSize: '0.78rem', fontWeight: 600 }}
        >
          Reset All
        </button>
      </div>

      {/* Sorting Tabs */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Sort Flights By
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
          {[
            { id: 'cheapest', label: 'Cheapest' },
            { id: 'fastest', label: 'Fastest' },
            { id: 'earliest', label: 'Earliest Dep' },
            { id: 'latest', label: 'Latest Dep' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSortBy(tab.id)}
              style={{
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: sortBy === tab.id ? 'var(--gradient-sky)' : 'rgba(5, 11, 24, 0.6)',
                color: sortBy === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: sortBy === tab.id ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Stops */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Stops
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { id: 'all', label: 'All Flights' },
            { id: 'nonstop', label: 'Non-stop Only' },
            { id: '1stop', label: '1 Stop' }
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStopsFilter(s.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: stopsFilter === s.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: stopsFilter === s.id ? 'var(--sky-blue-light)' : 'var(--text-secondary)',
                border: stopsFilter === s.id ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Airlines */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Airlines
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {AIRLINES.map((al) => {
            const isChecked = selectedAirlines.includes(al.code);
            return (
              <button
                key={al.code}
                type="button"
                onClick={() => toggleAirline(al.code)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: isChecked ? 'rgba(37, 99, 235, 0.3)' : 'rgba(5, 11, 24, 0.5)',
                  color: isChecked ? '#ffffff' : 'var(--text-secondary)',
                  border: isChecked ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    background: al.color,
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {al.code}
                </span>
                <span>{al.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
          <span>Max Price</span>
          <span style={{ color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="2000"
          max="15000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--sky-blue)' }}
        />
      </div>
    </div>
  );
};
