import React from 'react';
import { Luggage, CheckCircle2 } from 'lucide-react';

export const BaggageTrackingCard = ({ baggage }) => {
  if (!baggage) return null;

  return (
    <div className="stat-card" style={{ flex: 1, minWidth: '250px' }}>
      <div className="icon-badge-cyan" style={{ background: 'rgba(139, 92, 246, 0.2)' }}><Luggage size={22} color="#a78bfa" /></div>
      <div className="stat-card-info">
        <div className="stat-card-label">Baggage Tracker</div>
        <div className="stat-card-val" style={{ fontSize: '1.1rem' }}>
          {baggage.baggage_tag || 'No Tag'}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Location: {baggage.current_location || 'Pending Check-in'}
        </div>
        <div className="stat-card-footer" style={{ marginTop: '12px' }}>
          <span className="trend-indicator" style={{ color: '#a78bfa' }}>
            <CheckCircle2 size={14} /> <span style={{ marginLeft: '4px' }}>{baggage.baggage_status || 'Registered'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
