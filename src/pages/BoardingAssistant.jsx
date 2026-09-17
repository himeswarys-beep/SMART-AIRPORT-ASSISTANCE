import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode,
  Plane,
  Clock,
  MapPin,
  Compass,
  AlertTriangle,
  Download,
  Share2,
  BellRing,
  Sparkles,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAirport } from '../context/AirportContext';

export const BoardingAssistant = () => {
  const { user, boardingCountdown, addToast } = useAirport();
  const [isAlertActive, setIsAlertActive] = useState(true);

  const padZero = (n) => (n < 10 ? `0${n}` : n);

  const handleDownloadPass = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    addToast('Boarding Pass Downloaded', 'Digital Boarding Pass PDF saved to device', 'success');
  };

  const handleAddToWallet = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    addToast('Pass Added to Wallet', 'Synced with Apple Wallet & Google Wallet NFC pass', 'success');
  };

  const handleSetReminder = () => {
    addToast('Boarding Alarm Set', 'Push notification scheduled 15 mins prior to gate close', 'success');
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Smart Pass</span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Flight {user.flightNumber} • {user.airline}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Smart Boarding Assistant</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Live electronic boarding pass, countdown timer, priority gate navigation, and automated boarding alerts.
        </p>
      </div>

      {/* Gate Change Alert Banner */}
      {isAlertActive && (
        <div
          className="glass-panel-peach"
          style={{
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(251, 146, 60, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-peach-bright)',
                flexShrink: 0
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                Operational Gate Change: Gate {user.gateOriginal} ➔ Gate {user.gate}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Airport ground ops has assigned Flight 6E 204 to Concourse A. Estimated walk time: 4 mins.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/navigation" className="btn-peach" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Compass size={15} />
              <span>Wayfind to Gate {user.gate}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Grid: Boarding Pass + Countdown Widget */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 1.4fr) minmax(300px, 1fr)',
          gap: '24px'
        }}
      >
        {/* ------------------------------------------------------------------
            DIGITAL BOARDING PASS (Aviation Style Card)
            ------------------------------------------------------------------ */}
        <div
          className="glass-panel"
          style={{
            padding: 0,
            borderRadius: '24px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'linear-gradient(135deg, rgba(16, 33, 71, 0.95) 0%, rgba(10, 21, 46, 0.98) 100%)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg), 0 0 35px rgba(37, 99, 235, 0.25)'
          }}
        >
          {/* Airline Header Bar */}
          <div
            style={{
              padding: '20px 28px',
              background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid rgba(56, 189, 248, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  color: '#1e3a8a',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                6E
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
                  {user.airline}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--sky-blue-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Electronic Boarding Pass
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-peach)', fontWeight: 600 }}>PNR CODE</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {user.pnr}
              </div>
            </div>
          </div>

          {/* Route Section */}
          <div style={{ padding: '24px 28px 18px', borderBottom: '1px dashed rgba(255,255,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {user.from}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {user.fromCity}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                  {user.fromTerminal}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--sky-blue)', fontFamily: 'var(--font-mono)' }}>
                  {user.flightNumber}
                </span>
                <div style={{ width: '90px', height: '2px', background: 'linear-gradient(90deg, #38bdf8, #f97316)', position: 'relative' }}>
                  <Plane size={16} color="var(--accent-peach)" style={{ position: 'absolute', top: '-7px', left: '36px' }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Non-Stop</span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {user.to}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {user.toCity}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                  {user.toTerminal}
                </div>
              </div>
            </div>
          </div>

          {/* Passenger & Flight Details Grid */}
          <div
            style={{
              padding: '20px 28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              borderBottom: '1px dashed rgba(255,255,255,0.15)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>PASSENGER</div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{user.name}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>BOARDING TIME</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-peach-bright)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>
                {user.boardingTime} IST
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>DEPARTURE TIME</div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>
                {user.departureTime} IST
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GATE</div>
              <div style={{ fontWeight: 900, color: 'var(--sky-blue-light)', fontSize: '1.3rem', fontFamily: 'var(--font-mono)' }}>
                {user.gate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEAT</div>
              <div style={{ fontWeight: 900, color: '#ffffff', fontSize: '1.3rem', fontFamily: 'var(--font-mono)' }}>
                {user.seat}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ZONE</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-peach)', fontSize: '1.15rem' }}>
                {user.zone}
              </div>
            </div>
          </div>

          {/* Barcode & QR Code Section */}
          <div
            style={{
              padding: '24px 28px',
              background: 'rgba(5, 11, 24, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}
          >
            {/* Realistic Simulated Barcode */}
            <div style={{ flex: 1, minWidth: '180px' }}>
              <div
                style={{
                  height: '42px',
                  background: 'repeating-linear-gradient(90deg, #ffffff, #ffffff 2px, transparent 2px, transparent 4px, #ffffff 4px, #ffffff 7px, transparent 7px, transparent 9px, #ffffff 9px, #ffffff 13px, transparent 13px, transparent 15px)',
                  opacity: 0.85
                }}
              />
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>
                {user.barcode}
              </div>
            </div>

            {/* Scannable Gate QR Code Visual */}
            <div
              style={{
                width: '74px',
                height: '74px',
                background: '#ffffff',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <QrCode size={60} color="#0f172a" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            COUNTDOWN & QUICK ACTIONS SIDEBAR
            ------------------------------------------------------------------ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Live Countdown Circle Card */}
          <div
            className="glass-panel"
            style={{
              padding: '28px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="hero-tag" style={{ marginBottom: '14px' }}>
              Boarding Countdown
            </span>

            {/* Glowing circular timer */}
            <div
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                border: '4px solid rgba(56, 189, 248, 0.2)',
                borderTopColor: 'var(--accent-peach-bright)',
                borderRightColor: 'var(--sky-blue)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 0 25px rgba(251, 146, 60, 0.2)',
                position: 'relative'
              }}
            >
              <Clock size={22} color="var(--accent-peach)" style={{ marginBottom: '4px' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                {padZero(boardingCountdown.minutes)}m {padZero(boardingCountdown.seconds)}s
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Gate A12 Closes 19:10</span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.4 }}>
              Boarding calls for <strong style={{ color: 'var(--accent-peach)' }}>Zone 1 & 2</strong> have commenced. Please be present at Gate A12.
            </p>

            <button
              type="button"
              className="btn-outline"
              onClick={handleSetReminder}
              style={{ marginTop: '16px', width: '100%', fontSize: '0.85rem' }}
            >
              <BellRing size={16} color="var(--sky-blue)" />
              <span>Set Boarding Alarm</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleAddToWallet}
              style={{ width: '100%' }}
            >
              <Smartphone size={17} />
              <span>Add to Apple / Google Wallet</span>
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={handleDownloadPass}
              style={{ width: '100%' }}
            >
              <Download size={17} />
              <span>Download Digital PDF Pass</span>
            </button>

            <Link
              to="/navigation"
              className="btn-peach"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Compass size={17} />
              <span>Live Walking Route to Gate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingAssistant;
