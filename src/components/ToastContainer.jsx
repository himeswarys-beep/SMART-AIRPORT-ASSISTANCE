import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAirport();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        let icon = <Info size={20} color="var(--sky-blue)" />;
        let statusClass = '';

        if (t.type === 'success') {
          icon = <CheckCircle2 size={20} color="var(--status-on-time)" />;
          statusClass = 'toast-success';
        } else if (t.type === 'warning') {
          icon = <AlertCircle size={20} color="var(--accent-peach-bright)" />;
          statusClass = 'toast-warning';
        }

        return (
          <div key={t.id} className={`toast-box ${statusClass}`}>
            <div style={{ flexShrink: 0 }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff' }}>
                {t.title}
              </div>
              {t.message && (
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {t.message}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
