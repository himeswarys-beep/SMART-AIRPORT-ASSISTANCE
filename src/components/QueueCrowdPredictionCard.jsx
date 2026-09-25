import React from 'react';
import { Users, ShieldCheck } from 'lucide-react';

export const QueueCrowdPredictionCard = ({ queue }) => {
  if (!queue) return null;

  return (
    <div className="stat-card" style={{ flex: 1, minWidth: '250px' }}>
      <div className="icon-badge-cyan" style={{ background: 'rgba(16, 185, 129, 0.2)' }}><Users size={22} color="var(--status-on-time)" /></div>
      <div className="stat-card-info">
        <div className="stat-card-label">Queue & Crowd</div>
        <div className="stat-card-val" style={{ fontSize: '1.2rem' }}>
          {queue.estimated_queue_minutes}m Est. Wait
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Crowd: {queue.crowd_level || 'Moderate'} | Sec: {queue.security_level || 'Normal'}
        </div>
        <div className="stat-card-footer" style={{ marginTop: '12px' }}>
          <span className="trend-indicator" style={{ color: 'var(--status-on-time)' }}>
            <ShieldCheck size={14} /> <span style={{ marginLeft: '4px' }}>{queue.checked_in_passengers || 0} Checked-in</span>
          </span>
        </div>
      </div>
    </div>
  );
};
