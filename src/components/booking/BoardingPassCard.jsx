import React, { useState } from 'react';
import { 
  Plane, 
  Download, 
  Share2, 
  CheckCircle2, 
  User, 
  Calendar, 
  Building2, 
  DoorOpen, 
  Armchair, 
  Luggage, 
  Clock, 
  PlaneTakeoff, 
  PlaneLanding 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './BoardingPassCard.css';

export const BoardingPassCard = ({
  flightData,
  showActions = true,
  onDownload
}) => {
  const [copied, setCopied] = useState(false);

  // Fallback default flight values aligned with Aerova context
  const ticket = {
    airline: flightData?.airline || 'AEROVA AIRWAYS',
    airlineCode: flightData?.airlineCode || flightData?.airlineLogo || 'AEV',
    pnr: flightData?.pnr || flightData?.pnrCode || 'AEV-8942',
    flightNumber: flightData?.flightNumber || flightData?.flight || 'AEV 204',
    passengerName:
      flightData?.passengerName ||
      flightData?.passengers?.[0]?.fullName ||
      flightData?.passenger ||
      flightData?.name ||
      'ARUN KUMAR',
    fromCode: flightData?.fromCode || flightData?.from || 'MAA',
    fromCity: flightData?.fromCity || 'CHENNAI',
    fromAirport: flightData?.fromAirport || 'Chennai Intl Airport',
    fromDate: flightData?.fromDate || flightData?.departureDate || 'JUN 24, 2026',
    fromTime: flightData?.fromTime || flightData?.depTime || flightData?.departureTime || '19:15 IST',
    fromTerminal: flightData?.fromTerminal || flightData?.terminal || 'T2',
    toCode: flightData?.toCode || flightData?.to || 'BLR',
    toCity: flightData?.toCity || 'BENGALURU',
    toAirport: flightData?.toAirport || 'Kempegowda Intl Airport',
    toDate: flightData?.toDate || flightData?.arrivalDate || flightData?.departureDate || 'JUN 24, 2026',
    toTime: flightData?.toTime || flightData?.arrTime || '20:30 IST',
    toTerminal: flightData?.toTerminal || 'T1',
    seat: flightData?.seat || flightData?.seatsAssigned?.[0] || '14A',
    gate: flightData?.gate || 'Gate A12',
    terminal: flightData?.fromTerminal || flightData?.terminal || 'T2',
    flightStatus: flightData?.flightStatus || flightData?.status || 'On Time',
    baggage: flightData?.baggage || (flightData?.baggageTag ? `15 kg • ${flightData.baggageTag}` : '15 kg • TAG-6E-99214'),
    notice: flightData?.notice || 'GATE CLOSES 20 MINUTES BEFORE DEPARTURE'
  };

  const handlePrintDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    if (onDownload) {
      onDownload();
    } else {
      window.print();
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Aerova Boarding Pass - PNR: ${ticket.pnr} | Flight: ${ticket.flightNumber} | Seat: ${ticket.seat}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="boarding-pass-wrapper animate-fade-in">
      {/* Top Action Bar */}
      {showActions && (
        <div className="boarding-pass-actions">
          <div className="boarding-pass-brand-badge">
            <Plane size={18} color="#0284c7" style={{ transform: 'rotate(-45deg)' }} />
            <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.88rem', letterSpacing: '0.04em' }}>
              AEROVA DIGITAL PASS
            </span>
          </div>

          <div className="ticket-action-btns">
            <button
              type="button"
              className="ticket-btn-action"
              onClick={handleShare}
              style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}
            >
              <Share2 size={15} />
              <span>{copied ? 'PNR Copied!' : 'Share Pass'}</span>
            </button>

            <button
              type="button"
              className="ticket-btn-action"
              onClick={handlePrintDownload}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none' }}
            >
              <Download size={15} />
              <span>Download / Print Pass</span>
            </button>
          </div>
        </div>
      )}

      {/* TICKET CONTAINER IN AEROVA GLASS MODE */}
      <div className="ticket-card theme-dark">
        {/* Semi-circular Cutout Notches */}
        <div className="ticket-notch ticket-notch-top ticket-notch-dark" />
        <div className="ticket-notch ticket-notch-bottom ticket-notch-dark" />
        <div className="ticket-perforation-line" />

        {/* =========================================================================
            LEFT MAIN STUB: AIRLINE TICKET & FLIGHT INFO
            ========================================================================= */}
        <div className="ticket-left-stub">
          {/* Header Bar */}
          <div className="ticket-header-left">
            <div className="ticket-header-title">
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plane size={18} color="#38bdf8" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.05em' }}>AEROVA</span>
                <span style={{ fontSize: '0.68rem', display: 'block', opacity: 0.8, fontWeight: 700 }}>SMART AIRPORT ASSISTANCE</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="ticket-status-pill">
                <CheckCircle2 size={13} color="#10b981" />
                <span>{ticket.flightStatus}</span>
              </div>
              <div className="ticket-airline-sub">
                PNR: <strong style={{ color: '#38bdf8' }}>{ticket.pnr}</strong>
              </div>
            </div>
          </div>

          {/* Main Ticket Content (Vertical Barcode + Flight Route + Details Grid) */}
          <div className="ticket-body-left">
            {/* Authentic Vertical Barcode Strip */}
            <div className="ticket-vertical-barcode" title="Scannable 1D Gate Barcode">
              <div className="barcode-vertical-graphic" />
            </div>

            {/* Flight Main Details */}
            <div className="ticket-content-left">
              {/* Route Section with Curved SVG Arc Path */}
              <div className="ticket-route-grid">
                {/* FROM */}
                <div className="ticket-city-block">
                  <div className="ticket-label-with-icon">
                    <PlaneTakeoff size={13} color="#38bdf8" />
                    <span>DEPARTURE</span>
                  </div>
                  <div className="ticket-city-code">{ticket.fromCode}</div>
                  <div className="ticket-city-name">{ticket.fromCity}</div>
                  <div className="ticket-city-sub">{ticket.fromAirport}</div>
                  <div className="ticket-city-time">{ticket.fromDate} • {ticket.fromTime}</div>
                </div>

                {/* Arc Trajectory Flight Graphic */}
                <div className="ticket-route-arc-container">
                  <svg className="ticket-route-svg" viewBox="0 0 180 50" fill="none">
                    <path
                      d="M 10 40 Q 90 5 170 40"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />
                    <g transform="translate(82, 4) rotate(0)">
                      <path
                        fill="#38bdf8"
                        d="M12 2L2 7l4 3-2 4 4-2 3 4 3-4 4 2-2-4 4-3-10-5z"
                      />
                    </g>
                  </svg>
                  <span className="route-direct-tag">DIRECT FLIGHT</span>
                </div>

                {/* TO */}
                <div className="ticket-city-block" style={{ textAlign: 'right' }}>
                  <div className="ticket-label-with-icon" style={{ justifyContent: 'flex-end' }}>
                    <span>ARRIVAL</span>
                    <PlaneLanding size={13} color="#38bdf8" />
                  </div>
                  <div className="ticket-city-code">{ticket.toCode}</div>
                  <div className="ticket-city-name">{ticket.toCity}</div>
                  <div className="ticket-city-sub">{ticket.toAirport}</div>
                  <div className="ticket-city-time">{ticket.toDate} • {ticket.toTime}</div>
                </div>
              </div>

              {/* Comprehensive Details Grid with Icons */}
              <div className="ticket-details-grid-v2">
                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <User size={13} color="#38bdf8" />
                    <span>PASSENGER NAME</span>
                  </div>
                  <div className="ticket-value-main">{ticket.passengerName}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <Plane size={13} color="#38bdf8" />
                    <span>FLIGHT NUMBER</span>
                  </div>
                  <div className="ticket-value-main ticket-value-mono">{ticket.flightNumber}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <Calendar size={13} color="#38bdf8" />
                    <span>DATE</span>
                  </div>
                  <div className="ticket-value-main ticket-value-mono">{ticket.fromDate}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <DoorOpen size={13} color="#38bdf8" />
                    <span>GATE</span>
                  </div>
                  <div className="ticket-value-main ticket-value-mono" style={{ color: '#fb923c' }}>{ticket.gate}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <Building2 size={13} color="#38bdf8" />
                    <span>TERMINAL</span>
                  </div>
                  <div className="ticket-value-main ticket-value-mono">{ticket.terminal}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <Armchair size={13} color="#38bdf8" />
                    <span>SEAT</span>
                  </div>
                  <div className="ticket-value-main ticket-value-mono" style={{ color: '#38bdf8' }}>{ticket.seat}</div>
                </div>

                <div className="ticket-detail-card">
                  <div className="ticket-label-with-icon">
                    <CheckCircle2 size={13} color="#10b981" />
                    <span>FLIGHT STATUS</span>
                  </div>
                  <div className="ticket-value-main" style={{ color: '#10b981' }}>{ticket.flightStatus}</div>
                </div>

                <div className="ticket-detail-card" style={{ gridColumn: 'span 2' }}>
                  <div className="ticket-label-with-icon">
                    <Luggage size={13} color="#38bdf8" />
                    <span>BAGGAGE INFO</span>
                  </div>
                  <div className="ticket-value-main" style={{ fontSize: '0.85rem' }}>{ticket.baggage}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice Banner */}
          <div className="ticket-footer-notice">
            <span>{ticket.notice}</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT STUB: BOARDING PASS (TEAR-OFF STUB)
            ========================================================================= */}
        <div className="ticket-right-stub">
          {/* Header Bar */}
          <div className="ticket-header-right">
            <span>BOARDING PASS</span>
          </div>

          {/* Stub Content */}
          <div className="ticket-body-right">
            {/* Route Summary */}
            <div className="ticket-stub-route">
              <div className="ticket-stub-city-block">
                <span className="ticket-label">FROM</span>
                <span className="ticket-stub-city-code">{ticket.fromCode}</span>
                <span className="ticket-stub-city-time">{ticket.fromTime}</span>
              </div>

              <div className="ticket-stub-line" />

              <div className="ticket-stub-city-block" style={{ textAlign: 'right' }}>
                <span className="ticket-label">TO</span>
                <span className="ticket-stub-city-code">{ticket.toCode}</span>
                <span className="ticket-stub-city-time">{ticket.toTime}</span>
              </div>
            </div>

            {/* Passenger & Flight */}
            <div className="ticket-stub-grid">
              <div className="ticket-detail-item">
                <span className="ticket-label">PASSENGER</span>
                <span className="ticket-value-main" style={{ fontSize: '0.85rem' }}>{ticket.passengerName}</span>
              </div>

              <div className="ticket-detail-item">
                <span className="ticket-label">FLIGHT</span>
                <span className="ticket-value-main ticket-value-mono" style={{ fontSize: '0.85rem' }}>{ticket.flightNumber}</span>
              </div>
            </div>

            {/* Seat, Gate, Terminal */}
            <div className="ticket-stub-grid-triplet">
              <div className="ticket-detail-item">
                <span className="ticket-label">GATE</span>
                <span className="ticket-value-main ticket-value-mono" style={{ color: '#fb923c' }}>{ticket.gate}</span>
              </div>

              <div className="ticket-detail-item">
                <span className="ticket-label">TERM</span>
                <span className="ticket-value-main ticket-value-mono">{ticket.terminal}</span>
              </div>

              <div className="ticket-detail-item">
                <span className="ticket-label">SEAT</span>
                <span className="ticket-value-main ticket-value-mono" style={{ color: '#38bdf8' }}>{ticket.seat}</span>
              </div>
            </div>

            {/* Stylized Non-Scannable 2D QR Code & Barcode Area */}
            <div className="ticket-qr-container">
              <svg className="ticket-qr-code" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="8" fill="#ffffff" />
                {/* Simulated 2D Matrix Code Corner Markers */}
                <rect x="6" y="6" width="26" height="26" fill="#0b1736" rx="4" />
                <rect x="10" y="10" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="14" y="14" width="10" height="10" fill="#0b1736" rx="1" />

                <rect x="68" y="6" width="26" height="26" fill="#0b1736" rx="4" />
                <rect x="72" y="10" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="#0b1736" rx="1" />

                <rect x="6" y="68" width="26" height="26" fill="#0b1736" rx="4" />
                <rect x="10" y="72" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="#0b1736" rx="1" />

                {/* Stylized Matrix Data Patterns */}
                <rect x="38" y="8" width="6" height="6" fill="#0284c7" />
                <rect x="48" y="8" width="12" height="6" fill="#0b1736" />
                <rect x="38" y="18" width="16" height="6" fill="#0b1736" />
                <rect x="44" y="28" width="18" height="6" fill="#0284c7" />
                <rect x="10" y="38" width="14" height="6" fill="#0b1736" />
                <rect x="30" y="40" width="6" height="14" fill="#0b1736" />
                <rect x="40" y="42" width="20" height="20" fill="#0b1736" rx="3" />
                <rect x="46" y="48" width="8" height="8" fill="#ffffff" rx="1" />
                <rect x="68" y="38" width="14" height="6" fill="#0284c7" />
                <rect x="80" y="40" width="12" height="12" fill="#0b1736" />
                <rect x="38" y="68" width="14" height="6" fill="#0b1736" />
                <rect x="56" y="70" width="14" height="14" fill="#0284c7" />
                <rect x="76" y="68" width="16" height="16" fill="#0b1736" />
                <rect x="38" y="86" width="24" height="8" fill="#0b1736" />
              </svg>

              {/* Small Barcode Graphic */}
              <div className="ticket-stub-mini-barcode" />
              <div className="ticket-pnr-tag">PNR: {ticket.pnr}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingPassCard;
