import React from 'react';
import {
  UsersRound,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAirport } from '../context/AirportContext';

export const QueueManagement = () => {
  const { queueMetrics, activeAirport } = useAirport();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'low':
        return <span className="module-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-on-time)' }}>Low Wait (Fast)</span>;
      case 'medium':
        return <span className="module-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--status-delayed)' }}>Moderate</span>;
      case 'high':
        return <span className="module-badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--status-cancelled)' }}>Heavy Queue</span>;
      default:
        return null;
    }
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Computer Vision Crowd Analytics</span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            {activeAirport.name} (All Terminals)
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Airport Queue & Crowd Management</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          AI-driven live crowd density tracking across check-in desks, security lanes, and boarding gates to minimize passenger wait times.
        </p>
      </div>

      {/* --------------------------------------------------------------------
          SMART QUEUE RECOMMENDATION HIGHLIGHT BANNER
          -------------------------------------------------------------------- */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 23, 51, 0.85) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.25)',
              border: '1px solid var(--status-on-time)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-on-time)',
              flexShrink: 0
            }}
          >
            <Zap size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--status-on-time)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ⚡ Smart Fast-Track Route Recommended
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
              Use DigiYatra Gate 2 (Avg. Wait: 2 Mins)
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Biometric facial recognition bypasses standard manual queues, saving you approximately <strong style={{ color: 'var(--accent-peach)' }}>17 minutes</strong>.
            </p>
          </div>
        </div>

        <Link to="/navigation" className="btn-primary" style={{ padding: '10px 20px' }}>
          <Compass size={16} />
          <span>Indoor Route to DigiYatra</span>
        </Link>
      </div>

      {/* --------------------------------------------------------------------
          QUEUE SECTIONS: SECURITY, CHECK-IN & BOARDING
          -------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* 1. SECURITY CHECKPOINTS */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <ShieldCheck size={22} color="var(--sky-blue)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Security Checkpoints</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {queueMetrics.securityCheckpoints.map((q, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  background: q.recommended ? 'rgba(30, 58, 138, 0.35)' : 'rgba(5, 11, 24, 0.5)',
                  border: `1px solid ${q.recommended ? 'var(--sky-blue)' : 'rgba(56, 189, 248, 0.15)'}`,
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{q.name}</span>
                  {getStatusBadge(q.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Est. Waiting Time:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-peach)', fontSize: '1rem' }}>
                    {q.waitTime}
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Throughput: {q.throughput}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. AIRLINE CHECK-IN DESKS */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <UsersRound size={22} color="var(--accent-peach-bright)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Airline Check-in Rows</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {queueMetrics.checkInCounters.map((q, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  background: 'rgba(5, 11, 24, 0.5)',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{q.name}</span>
                  {getStatusBadge(q.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Queue Length:</span>
                  <span style={{ color: '#ffffff' }}>{q.length}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>Est. Waiting Time:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--sky-blue-light)', fontSize: '1rem' }}>
                    {q.waitTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. BOARDING GATES QUEUES */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Clock size={22} color="var(--status-on-time)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Boarding Gates Flow</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {queueMetrics.boardingLanes.map((q, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  background: 'rgba(5, 11, 24, 0.5)',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                    {q.gate}
                  </span>
                  {getStatusBadge(q.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Active Boarding Calling:</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{q.zoneCalling}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>Avg. Gate Processing:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--sky-blue-light)' }}>
                    {q.waitTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueManagement;
