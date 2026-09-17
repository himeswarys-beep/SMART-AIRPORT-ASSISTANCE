import React, { useState } from 'react';
import {
  Activity,
  CloudSun,
  Wind,
  Eye,
  Plane,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Sparkles,
  TrendingUp,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const DelayPrediction = () => {
  const { delayPrediction, flights } = useAirport();
  const [selectedFlightCode, setSelectedFlightCode] = useState('6E 204');

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">AI Predictive ML Model</span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Airport Weather & Turnaround Intelligence
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Flight Delay Prediction & Risk Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Predictive machine learning algorithms analyzing Doppler weather radar, inbound aircraft turnaround, and runway congestion.
        </p>
      </div>

      {/* Flight Selector Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Analyze Target Flight:
          </span>
          <select
            value={selectedFlightCode}
            onChange={(e) => setSelectedFlightCode(e.target.value)}
            className="form-input"
            style={{ padding: '8px 14px', background: 'rgba(5, 11, 24, 0.6)', width: 'auto', minWidth: '220px' }}
          >
            {flights.map((f) => (
              <option key={f.id} value={f.flightNumber}>
                {f.flightNumber} ({f.from} ➔ {f.to}) - {f.airline}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Radio size={14} color="var(--sky-blue)" className="animate-pulse-glow" />
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
            Model Accuracy: 96.4% (Based on 140,000 MAA departures)
          </span>
        </div>
      </div>

      {/* Main Grid: AI Risk Gauge & Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(320px, 1.8fr)', gap: '24px', marginBottom: '24px' }}>
        {/* ------------------------------------------------------------------
            AI RISK METER GAUGE
            ------------------------------------------------------------------ */}
        <div
          className="glass-panel"
          style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <span className="hero-tag" style={{ marginBottom: '14px' }}>
            Risk Score Evaluation
          </span>

          {/* Semicircular Gauge Representation */}
          <div style={{ position: 'relative', width: '220px', height: '120px', margin: '10px 0 20px' }}>
            <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%' }}>
              <path
                d="M 20,100 A 80,80 0 0,1 180,100"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                stroke-width="18"
                stroke-linecap="round"
              />
              <path
                d="M 20,100 A 80,80 0 0,1 180,100"
                fill="none"
                stroke="url(#riskGrad)"
                stroke-width="18"
                stroke-linecap="round"
                stroke-dasharray="251"
                stroke-dashoffset={251 - (251 * (100 - delayPrediction.riskPercentage)) / 100}
              />
              <defs>
                <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10b981" />
                  <stop offset="60%" stop-color="#38bdf8" />
                  <stop offset="100%" stop-color="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Gauge Needle / Center Score */}
            <div
              style={{
                position: 'absolute',
                bottom: '0px',
                left: '0',
                right: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--status-on-time)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {delayPrediction.riskPercentage}%
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Delay Probability
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--status-on-time)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '12px'
            }}
          >
            {delayPrediction.riskLevel} • {delayPrediction.predictedDepartureDelay}
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4, maxWidth: '280px' }}>
            {delayPrediction.aiSummary}
          </p>
        </div>

        {/* ------------------------------------------------------------------
            3 KEY DRIVER METRIC CARDS
            ------------------------------------------------------------------ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Weather Driver */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sky-blue)' }}>
                <CloudSun size={20} />
              </div>
              <span className="module-badge">{delayPrediction.weatherCondition.status}</span>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Weather Radar</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>Visibility: <strong style={{ color: '#ffffff' }}>{delayPrediction.weatherCondition.visibility}</strong></div>
              <div>Wind Speed: <strong style={{ color: '#ffffff' }}>{delayPrediction.weatherCondition.windSpeed}</strong></div>
              <div>Precipitation: <strong style={{ color: 'var(--status-on-time)' }}>{delayPrediction.weatherCondition.precipitation}</strong></div>
            </div>
          </div>

          {/* Airport Air Traffic */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(251, 146, 60, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-peach-bright)' }}>
                <Plane size={20} />
              </div>
              <span className="module-badge badge-peach">{delayPrediction.airTrafficCongestion.status}</span>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Runway Traffic</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>Runway Queue: <strong style={{ color: '#ffffff' }}>{delayPrediction.airTrafficCongestion.runwayQueues}</strong></div>
              <div>Holding Time: <strong style={{ color: 'var(--status-on-time)' }}>{delayPrediction.airTrafficCongestion.airspaceHolding}</strong></div>
              <div>Traffic Congestion Index: <strong style={{ color: 'var(--sky-blue)' }}>{delayPrediction.airTrafficCongestion.trafficIndex} / 100</strong></div>
            </div>
          </div>

          {/* Inbound Aircraft Turnaround */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--status-on-time)' }}>
                <Clock size={20} />
              </div>
              <span className="module-badge">Turnaround OK</span>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>Inbound Aircraft</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>Reg: <strong style={{ color: 'var(--accent-peach)' }}>{delayPrediction.inboundTurnaround.aircraftId}</strong></div>
              <div>Origin: <strong style={{ color: '#ffffff' }}>{delayPrediction.inboundTurnaround.inboundFrom}</strong></div>
              <div>Status: <strong style={{ color: 'var(--status-on-time)' }}>{delayPrediction.inboundTurnaround.inboundStatus}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Performance Trends Chart Visual */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 size={20} color="var(--sky-blue)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Past 7 Days Route Reliability (MAA ✈ BLR)</h3>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--status-on-time)', fontWeight: 700 }}>
            94.2% On-Time Average
          </span>
        </div>

        {/* Bar Graph Simulation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '12px',
            alignItems: 'flex-end',
            height: '160px',
            padding: '16px 10px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {[
            { day: 'Mon', onTime: 96, delay: 0 },
            { day: 'Tue', onTime: 92, delay: 5 },
            { day: 'Wed', onTime: 98, delay: 0 },
            { day: 'Thu', onTime: 85, delay: 14 },
            { day: 'Fri', onTime: 94, delay: 4 },
            { day: 'Sat', onTime: 96, delay: 0 },
            { day: 'Today', onTime: 95, delay: 3, isToday: true }
          ].map((bar, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.72rem', color: bar.isToday ? 'var(--accent-peach-bright)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {bar.onTime}%
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '44px',
                  height: `${bar.onTime}%`,
                  borderRadius: '6px 6px 0 0',
                  background: bar.isToday
                    ? 'linear-gradient(180deg, var(--accent-peach-bright), #ea580c)'
                    : 'linear-gradient(180deg, var(--sky-blue), var(--royal-blue))',
                  boxShadow: bar.isToday ? '0 0 15px rgba(251, 146, 60, 0.4)' : 'none'
                }}
              />
              <span style={{ fontSize: '0.74rem', color: bar.isToday ? '#ffffff' : 'var(--text-secondary)', fontWeight: bar.isToday ? 700 : 400 }}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DelayPrediction;
