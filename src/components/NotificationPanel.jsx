import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Plane, 
  MapPin, 
  Luggage, 
  ShieldAlert, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsAsRead, addToast } = useAirport();

  if (!isOpen) return null;

  const getIconForType = (type) => {
    switch (type) {
      case 'gate':
        return <MapPin size={18} color="var(--accent-peach-bright)" />;
      case 'flight':
        return <Plane size={18} color="var(--sky-blue)" />;
      case 'baggage':
        return <Luggage size={18} color="var(--status-on-time)" />;
      case 'queue':
        return <ShieldAlert size={18} color="var(--sky-blue-light)" />;
      default:
        return <Bell size={18} color="var(--accent-peach)" />;
    }
  };

  const simulateNewNotification = () => {
    addToast('Simulated Airport Push Alert', 'Gate change broadcast received on PIDS network', 'warning');
  };

  return (
    <div className="notification-panel-overlay" onClick={onClose}>
      <div
        className="notification-panel-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div className="panel-header">
          <div className="panel-title">
            <Bell size={20} color="var(--sky-blue)" />
            <span>Notification Center</span>
          </div>
          <button
            type="button"
            className="nav-icon-btn"
            style={{ width: '32px', height: '32px' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Actions bar */}
        <div
          style={{
            padding: '12px 20px',
            background: 'rgba(5, 11, 24, 0.6)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {notifications.filter((n) => n.unread).length} Unread Updates
          </span>
          <button
            type="button"
            onClick={markAllNotificationsAsRead}
            style={{
              background: 'transparent',
              color: 'var(--sky-blue)',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        </div>

        {/* Notification List */}
        <div className="notification-list">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.unread ? 'unread' : ''}`}
            >
              <div className="notif-icon">{getIconForType(n.type)}</div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-desc">{n.desc}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel Footer / Live Simulator */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(5, 11, 24, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <button
            type="button"
            onClick={simulateNewNotification}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              background: 'rgba(37, 99, 235, 0.25)',
              border: '1px dashed rgba(56, 189, 248, 0.4)',
              color: 'var(--sky-blue-light)',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={15} color="var(--accent-peach)" />
            <span>Simulate Live Airport Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
