import React from 'react';
import { PlaneTakeoff, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export const FlightStatusCard = ({ flight }) => {
  if (!flight) return null;

  return (
    <div className="stat-card" style={{ flex: 1, minWidth: '250px' }}>
      <div className="icon-badge-cyan"><PlaneTakeoff size={22} /></div>
      <div className="stat-card-info">
        <div className="stat-card-label">Live Flight Status</div>
        <div className="stat-card-val" style={{ fontSize: '1.1rem' }}>
          {flight.airline} {flight.flight_number}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {flight.departure_airport} ➔ {flight.arrival_airport}
        </div>
        <div className="stat-card-footer" style={{ marginTop: '12px' }}>
          <span className="trend-indicator" style={{ color: flight.status === 'Delayed' ? 'var(--status-delayed)' : 'var(--status-on-time)' }}>
            {flight.status === 'Delayed' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
            <span style={{ marginLeft: '4px' }}>{flight.status || 'On Time'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
