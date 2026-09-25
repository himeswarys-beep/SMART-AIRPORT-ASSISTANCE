import React, { useState } from 'react';
import { Search, Plane } from 'lucide-react';
import { getFlightByNumber } from '../services/flightService';
import { getDelayPrediction, getQueuePrediction } from '../services/predictionService';
import { getGateAssignment } from '../services/flightService';
import { getBaggageTracking } from '../services/baggageService';
import { useAirport } from '../context/AirportContext';

export const FlightSearch = ({ onFlightDataFetched }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useAirport();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const flight = await getFlightByNumber(searchTerm);
      if (!flight) {
        throw new Error('Flight not found. Please check the flight number.');
      }
      
      // Fetch related data in parallel
      const [delay, queue, gate, baggage] = await Promise.all([
        getDelayPrediction(flight.flight_number).catch(() => null),
        getQueuePrediction(flight.departure_airport || 'MAA').catch(() => null),
        getGateAssignment(flight.flight_number).catch(() => null),
        getBaggageTracking(flight.flight_number).catch(() => null)
      ]);
      
      onFlightDataFetched({
        flight,
        delay,
        queue,
        gate,
        baggage
      });
      addToast('Flight Found', `Loaded live details for ${flight.flight_number}`, 'success');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to connect to airport data service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', width: '100%' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Flight Search (Live Supabase Data)</h3>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Enter flight number (e.g. 6E 204)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ width: '100%', paddingLeft: '44px', paddingRight: '16px', height: '48px', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0 24px', height: '48px', borderRadius: '8px', fontSize: '1rem' }}>
          {loading ? 'Searching...' : <><Plane size={18} /><span>Track</span></>}
        </button>
      </form>
      {error && <div style={{ color: '#ef4444', marginTop: '12px', fontSize: '0.9rem', fontWeight: 600 }}>{error}</div>}
    </div>
  );
};
