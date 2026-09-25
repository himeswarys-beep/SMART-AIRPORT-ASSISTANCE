import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export const GateInformationCard = ({ gate }) => {
  if (!gate) return null;

  return (
    <div className="stat-card" style={{ flex: 1, minWidth: '250px' }}>
      <div className="icon-badge-cyan" style={{ background: 'rgba(251, 146, 60, 0.2)' }}><MapPin size={22} color="var(--accent-peach)" /></div>
      <div className="stat-card-info">
        <div className="stat-card-label">Gate Information</div>
        <div className="stat-card-val" style={{ fontSize: '1.2rem' }}>
          Term {gate.terminal} • Gate {gate.gate_number}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Status: <strong style={{ color: gate.gate_status === 'Open' ? 'var(--status-on-time)' : 'var(--text-primary)' }}>{gate.gate_status}</strong>
        </div>
        <div className="stat-card-footer" style={{ marginTop: '12px' }}>
          <span className="trend-indicator">
            <Clock size={14} /> <span style={{ marginLeft: '4px' }}>Boarding: {gate.boarding_time || '--:--'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
