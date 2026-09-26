import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Smartphone,
  CalendarPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAirport } from '../context/AirportContext';
import BoardingPassCard from '../components/booking/BoardingPassCard';
import { calculateBoardingCountdown } from '../utils/countdownUtils';

export const BoardingAssistant = () => {
  const { user, activeBooking, addToast } = useAirport();
  const navigate = useNavigate();
  const [isAlertActive, setIsAlertActive] = useState(true);

  const bk = activeBooking || (user?.flightNumber ? user : null);

  const [bkCountdown, setBkCountdown] = useState(() => calculateBoardingCountdown(bk));

  useEffect(() => {
    const update = () => {
      setBkCountdown(calculateBoardingCountdown(bk));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [bk]);

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

  if (!bk) {
    return (
      <div className="main-content animate-fade-in">
        <div style={{ marginBottom: '24px' }}>
          <span className="hero-tag">Smart Pass</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>Smart Boarding Assistant</h1>
          <p style={{ color: 'black', fontSize: '0.9rem' }}>
            Live electronic boarding pass, countdown timer, priority gate navigation, and automated boarding alerts.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', maxWidth: '580px', margin: '40px auto' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--sky-blue)' }}>
            <QrCode size={36} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>No Active Boarding Pass</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.5 }}>
            You do not have an active flight booking yet. Complete a flight booking to view your digital boarding pass and scannable barcode.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/flight-booking')}
            style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: 'var(--radius-md)' }}
          >
            <Plane size={17} />
            <span>Book Your Flight</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Smart Pass</span>
          <span style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
            Flight {bk.flightNumber} • {bk.airline}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem',color:'#043d61ff', fontWeight: 800 }}>Smart Boarding Assistant</h1>
        <p style={{ color: '#043d61ff', fontSize: '0.9rem' }}>
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
                Operational Gate: Gate {bk.gate}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#043d61ff' }}>
                Flight {bk.flightNumber} assigned to {bk.fromTerminal || 'Terminal 2'}. Boarding at Gate {bk.gate}.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/navigation" className="btn-peach" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Compass size={15} />
              <span>Wayfind to Gate {bk.gate}</span>
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
        {/* DIGITAL BOARDING PASS (Aviation Style Card) */}
        <BoardingPassCard flightData={bk} theme="reference" onDownload={handleDownloadPass} />

        {/* COUNTDOWN & QUICK ACTIONS SIDEBAR */}
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

            {/* Glowing countdown widget */}
            <div
              style={{
                minWidth: '220px',
                minHeight: '130px',
                padding: '16px',
                borderRadius: '24px',
                border: '3px solid rgba(56, 189, 248, 0.3)',
                background: 'rgba(11, 23, 54, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 0 25px rgba(251, 146, 60, 0.2)',
                position: 'relative'
              }}
            >
              <Clock size={22} color="var(--accent-peach)" style={{ marginBottom: '6px' }} />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: bkCountdown.status === 'countdown' ? '0.92rem' : '1.25rem',
                  fontWeight: 800,
                  color:
                    bkCountdown.status === 'now'
                      ? 'var(--status-on-time)'
                      : bkCountdown.status === 'closed'
                      ? '#ef4444'
                      : '#ffffff',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}
              >
                {bkCountdown.displayText}
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {bkCountdown.status === 'closed'
                  ? 'Gate Closed'
                  : bkCountdown.status === 'now'
                  ? 'Boarding in Progress'
                  : `Gate ${bk.gate} Departure`}
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.4 }}>
              Boarding calls for <strong style={{ color: 'var(--accent-peach)' }}>Zone 1 & 2</strong> have commenced. Please be present at Gate {bk.gate}.
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
