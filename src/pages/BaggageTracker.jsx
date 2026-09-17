import React, { useState } from 'react';
import {
  Luggage,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Plane,
  Truck,
  PlusCircle,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const BaggageTracker = () => {
  const { baggageQuery, setBaggageQuery, baggageStatus, lostBaggageReports, reportLostBaggage, addToast } = useAirport();
  const [searchInput, setSearchInput] = useState(baggageQuery);
  const [showReportModal, setShowReportModal] = useState(false);

  // Report Form state
  const [lostTag, setLostTag] = useState('');
  const [lostFlight, setLostFlight] = useState('6E 204');
  const [lostDesc, setLostDesc] = useState('');
  const [contactPhone, setContactPhone] = useState('+91 98401 23456');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setBaggageQuery(searchInput.trim());
    addToast('Baggage Tag Scanned', `Retrieved telemetry for ${searchInput.trim()}`, 'success');
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!lostDesc.trim()) return;
    reportLostBaggage({
      baggageTag: lostTag || 'TAG-UNKNOWN',
      flight: lostFlight,
      passenger: 'Arun Kumar',
      description: lostDesc,
      contact: contactPhone
    });
    setShowReportModal(false);
    setLostDesc('');
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">RFID Telemetry</span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Real-time Baggage Handling System (BHS)
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Smart Baggage & Lost Luggage Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Continuous RFID sensor tracking across check-in, X-ray scanning, apron transit, aircraft hold loading, and carousel delivery.
        </p>
      </div>

      {/* Search Bar & Fast Report Trigger */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="navbar-search-input"
              style={{ background: 'rgba(5, 11, 24, 0.6)', paddingLeft: '42px' }}
              placeholder="Enter Baggage Tag (e.g. TAG-6E-99214)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            <span>Search Tag</span>
          </button>
        </form>

        <button
          type="button"
          className="btn-peach"
          onClick={() => setShowReportModal(true)}
          style={{ padding: '10px 20px', fontSize: '0.88rem' }}
        >
          <AlertTriangle size={16} />
          <span>Report Delayed / Lost Baggage</span>
        </button>
      </div>

      {/* Main Grid: Live Timeline Card (Left) + Baggage Details & Complaints (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(300px, 1fr)', gap: '24px' }}>
        {/* ------------------------------------------------------------------
            RFID STATUS TIMELINE
            ------------------------------------------------------------------ */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <span className="hero-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-on-time)' }}>
                ● Active Tag Monitored
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                {baggageStatus.tag}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DESTINATION CAROUSEL</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-peach)' }}>
                {baggageStatus.destinationCarousel}
              </div>
            </div>
          </div>

          {/* 6-Step Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {baggageStatus.steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    position: 'relative'
                  }}
                >
                  {/* Timeline connecting vertical line */}
                  {idx < baggageStatus.steps.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '19px',
                        top: '38px',
                        bottom: '-16px',
                        width: '2px',
                        background: isCompleted ? 'var(--status-on-time)' : 'rgba(56, 189, 248, 0.2)',
                        zIndex: 1
                      }}
                    />
                  )}

                  {/* Step Icon Beacon */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isCompleted
                        ? 'rgba(16, 185, 129, 0.2)'
                        : isCurrent
                        ? 'rgba(251, 146, 60, 0.25)'
                        : 'rgba(16, 33, 71, 0.6)',
                      border: `2px solid ${
                        isCompleted
                          ? 'var(--status-on-time)'
                          : isCurrent
                          ? 'var(--accent-peach-bright)'
                          : 'rgba(56, 189, 248, 0.2)'
                      }`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted
                        ? 'var(--status-on-time)'
                        : isCurrent
                        ? 'var(--accent-peach-bright)'
                        : 'var(--text-muted)',
                      flexShrink: 0,
                      zIndex: 2,
                      animation: isCurrent ? 'pulseGlow 2s infinite' : 'none'
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <span>{step.id}</span>}
                  </div>

                  {/* Step Content */}
                  <div
                    style={{
                      flex: 1,
                      padding: '14px 18px',
                      background: isCurrent ? 'rgba(30, 58, 138, 0.35)' : 'rgba(5, 11, 24, 0.5)',
                      border: `1px solid ${isCurrent ? 'var(--sky-blue)' : 'rgba(56, 189, 248, 0.15)'}`,
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                        {step.time}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Location: <strong style={{ color: 'var(--sky-blue-light)' }}>{step.location}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            RIGHT SIDE: BAGGAGE SPECS & COMPLAINTS TRACKER
            ------------------------------------------------------------------ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Luggage Specification Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>Baggage Specifications</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Item Type:</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{baggageStatus.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Registered Weight:</span>
                <span style={{ fontWeight: 600, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
                  {baggageStatus.weight}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Flight Assigned:</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{baggageStatus.flight}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Passenger Name:</span>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>{baggageStatus.passenger}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Last Scanned:</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-peach-bright)' }}>
                  {baggageStatus.lastScanTime}
                </span>
              </div>
            </div>
          </div>

          {/* Lost Baggage Complaint Status Tracker */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Lost Baggage Inquiries</h3>
              <span className="module-badge">{lostBaggageReports.length} Cases</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lostBaggageReports.map((rep) => (
                <div
                  key={rep.id}
                  style={{
                    padding: '14px',
                    background: 'rgba(5, 11, 24, 0.6)',
                    border: '1px solid rgba(251, 146, 60, 0.3)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-peach-bright)', fontSize: '0.9rem' }}>
                      {rep.id}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(251, 146, 60, 0.2)', color: 'var(--accent-peach)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {rep.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Tag: {rep.baggageTag} • Flight {rep.flight}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#ffffff', marginTop: '4px' }}>
                    "{rep.description}"
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--sky-blue-light)', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                    Assigned: {rep.assignedOfficer} ({rep.contact})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          REPORT LOST BAGGAGE MODAL
          -------------------------------------------------------------------- */}
      {showReportModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '30px',
              background: 'rgba(11, 23, 50, 0.95)',
              border: '1px solid rgba(251, 146, 60, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={22} color="var(--accent-peach-bright)" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Report Delayed / Lost Baggage</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                style={{ background: 'transparent', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label className="form-label">Baggage Tag Number (From Boarding Pass)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. TAG-6E-99214"
                  value={lostTag}
                  onChange={(e) => setLostTag(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Flight Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={lostFlight}
                  onChange={(e) => setLostFlight(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Baggage Description & Distinguishing Marks</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Color, brand (e.g. Samsonite/Delsey), ribbon tag, hard/soft case..."
                  value={lostDesc}
                  onChange={(e) => setLostDesc(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number for Updates</label>
                <input
                  type="tel"
                  className="form-input"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-peach"
                >
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaggageTracker;
