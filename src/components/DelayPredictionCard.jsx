import React from 'react';
import { Bot, AlertTriangle, Info } from 'lucide-react';

export const DelayPredictionCard = ({ delay }) => {
  if (!delay) return null;

  return (
    <div className="stat-card" style={{ flex: 1, minWidth: '250px' }}>
      <div className="icon-badge-cyan" style={{ background: 'rgba(56, 189, 248, 0.2)' }}><Bot size={22} color="var(--sky-blue)" /></div>
      <div className="stat-card-info">
        <div className="stat-card-label">AI Delay Prediction</div>
        <div className="stat-card-val" style={{ fontSize: '1.2rem', color: delay.predicted_delay_minutes > 15 ? 'var(--status-delayed)' : 'var(--status-on-time)' }}>
          {delay.probability}% Probability
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Predicted: +{delay.predicted_delay_minutes} mins
        </div>
        <div className="stat-card-footer" style={{ marginTop: '12px' }}>
          <span className="trend-indicator" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
            <Info size={14} /> <span style={{ marginLeft: '4px' }}>{delay.reason || 'Optimal conditions'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
