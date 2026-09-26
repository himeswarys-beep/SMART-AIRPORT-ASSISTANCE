import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  Plane,
  PlaneTakeoff,
  QrCode,
  MapPin,
  Luggage,
  UtensilsCrossed,
  Bot,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  Ticket,
  ArrowLeftRight,
  CloudSun,
  Search,
  Compass,
  CheckCircle2,
  CalendarPlus
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { ModuleCard } from '../components/ModuleCard';
import { ASSETS } from '../assets/images';

export const Dashboard = () => {
  const { user, activeBooking, boardingCountdown, activeAirport, queueMetrics, baggageStatus, delayPrediction, myTrips, flights } = useAirport();
  const navigate = useNavigate();

  const padZero = (n) => (n < 10 ? `0${n}` : n);

  // Use activeBooking as source of truth for flight details
  const bk = activeBooking;

  const modules = [
    {
      to: '/flight-booking',
      title: 'Flight Search & Booking',
      description: 'Search domestic Indian flights across IndiGo, Air India, Akasa Air, SpiceJet & select seats.',
      icon: Plane,
      badgeText: 'Book Flight',
      badgeType: 'peach'
    },
    {
      to: '/my-trips',
      title: 'My Trips & E-Tickets',
      description: 'View upcoming itinerary, print digital boarding passes, manage baggage & seat allocation.',
      icon: Ticket,
      badgeText: `${myTrips.length} Active`,
      badgeType: 'default'
    },
    {
      to: '/seat-swap',
      title: 'Seat Swap Platform',
      description: 'Exchange seats with fellow passengers for window view, extra legroom, or family seating.',
      icon: ArrowLeftRight,
      badgeText: 'Exchange',
      badgeType: 'peach'
    },
    {
      to: '/flights',
      title: 'Flight Schedule & Live Status',
      description: 'Real-time departures, arrivals, terminal gates, baggage belts, and live airline flight radar.',
      icon: PlaneTakeoff,
      badgeText: '8 Live Flights',
      badgeType: 'default'
    },
    {
      to: '/boarding',
      title: 'Smart Boarding Assistant',
      description: 'Digital boarding pass with scannable QR code, live gate countdown, seat preview, and zone alerts.',
      icon: QrCode,
      badgeText: bk ? `Gate ${bk.gate}` : 'Smart Pass',
      badgeType: 'peach'
    },
    {
      to: '/navigation',
      title: 'Airport Navigation & Indoor GPS',
      description: 'Interactive SVG blueprint floor map with dynamic glowing walking route, turn-by-turn steps & walk times.',
      icon: MapPin,
      badgeText: 'Wayfinder 3D',
      badgeType: 'peach'
    },
    {
      to: '/baggage',
      title: 'Smart Baggage Tracker',
      description: 'Track RFID baggage scans across 6 live milestones from check-in to carousel claim, or report lost luggage.',
      icon: Luggage,
      badgeText: baggageStatus.currentStatus,
      badgeType: 'default'
    },
    {
      to: '/meals',
      title: 'In-Flight Meal Pre-Order',
      description: 'Curated hot gourmet meals: Pure Veg, Non-Veg, Jain Special, Diabetic Friendly & Kids meal combos.',
      icon: UtensilsCrossed,
      badgeText: 'Chef Menu',
      badgeType: 'default'
    },
    {
      to: '/delay-prediction',
      title: 'Flight Delay Prediction AI',
      description: 'Predictive machine learning risk score evaluating weather radar, incoming air traffic, and turnaround time.',
      icon: Bot,
      badgeText: `${delayPrediction.onTimeProbability} On-Time`,
      badgeType: 'default'
    },
    {
      to: '/queues',
      title: 'Airport Queue Management',
      description: 'Live crowd density, DigiYatra fast-track wait times, and shortest queue route recommendations.',
      icon: Users,
      badgeText: 'DigiYatra: 2m',
      badgeType: 'peach'
    },
    {
      to: '/assistance',
      title: 'Special Assistance Booking',
      description: '1-Click booking for wheelchair support, elderly escorts, unaccompanied minors, and medical oxygen care.',
      icon: ShieldCheck,
      badgeText: '24/7 Support',
      badgeType: 'default'
    }
  ];

  return (
    <div className="main-content animate-fade-in">
      {/* --------------------------------------------------------------------
          1. HERO BANNER FORMAT (Matching Reference Design)
          -------------------------------------------------------------------- */}
      <section className="dashboard-hero">
        {/* Modern Airport View Background Graphic */}
        <div 
          className="hero-bg-banner"
          style={{
            backgroundImage: `url(${ASSETS.airportBackground})`
          }}
        />
        <div className="hero-bg-overlay-swoosh" />

        <div className="hero-header">
          <div>
            <div className="hero-greeting">
              <span className="hero-tag">Passenger Companion</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {activeAirport.name} ({activeAirport.code})
              </span>
            </div>
            <h1 className="hero-title">
              Welcome to Aerova, <span className="gradient-text-sky">{user?.name || 'Passenger'}</span>
            </h1>
            <p className="hero-subtitle">
              Your digital guide to a seamless airport experience.
            </p>
          </div>

          {/* Gate Change Alert Pill - only shown when booking exists */}
          {bk && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              maxWidth: '360px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              <span style={{ fontWeight: 800, color: '#b45309' }}>Gate Alert: </span>
              Flight {bk.flightNumber} at <strong style={{ color: 'var(--cyan-dark)' }}>Gate {bk.gate}</strong>. Boarding begins shortly.
            </div>
          </div>
          )}
        </div>

        {/* Milestone Journey Progress Track - only shown when booking exists */}
        {bk && (
        <div className="hero-journey-track">
          <div className="journey-step-node">
            <div className="journey-node-circle">
              <Plane size={18} />
            </div>
            <div className="journey-step-info">
              <span className="journey-step-title">Check-in</span>
              <span className="journey-step-desc">Completed</span>
            </div>
          </div>

          <div className="journey-track-bar">
            <div className="journey-track-bar-fill" style={{ width: '100%' }} />
          </div>

          <div className="journey-step-node">
            <div className="journey-node-circle">
              <ShieldCheck size={18} />
            </div>
            <div className="journey-step-info">
              <span className="journey-step-title">Security</span>
              <span className="journey-step-desc">DigiYatra Cleared</span>
            </div>
          </div>

          <div className="journey-track-bar">
            <div className="journey-track-bar-fill" style={{ width: '100%' }} />
          </div>

          <div className="journey-step-node">
            <div className="journey-node-circle">
              <Luggage size={18} />
            </div>
            <div className="journey-step-info">
              <span className="journey-step-title">Baggage</span>
              <span className="journey-step-desc">Loaded</span>
            </div>
          </div>

          <div className="journey-track-bar">
            <div className="journey-track-bar-fill" style={{ width: '60%' }} />
          </div>

          <div className="journey-step-node">
            <div className="journey-node-circle" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
              <PlaneTakeoff size={18} />
            </div>
            <div className="journey-step-info">
              <span className="journey-step-title">Boarding</span>
              <span className="journey-step-desc">Gate {bk.gate}</span>
            </div>
          </div>
        </div>
        )}

        {/* Active Flight Fast-Track Card — conditional on booking */}
        {bk ? (
        <div className="hero-flight-card">
          <div className="flight-route-flow">
            <div className="flight-point">
              <span className="city-code">{bk.from}</span>
              <span className="city-name">{bk.fromCity}</span>
              <span className="point-time">{bk.depTime} IST</span>
            </div>

            <div className="flight-track-line">
              <span className="flight-duration">{bk.duration || '—'} Direct</span>
              <div className="track-line-visual">
                <PlaneTakeoff className="track-plane-icon" size={16} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--cyan-dark)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {bk.airline} • {bk.flightNumber}
              </span>
            </div>

            <div className="flight-point">
              <span className="city-code">{bk.to}</span>
              <span className="city-name">{bk.toCity}</span>
              <span className="point-time">{bk.arrTime} IST</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="hero-flight-metrics">
            <div className="metric-pill">
              <span className="metric-label">Terminal / Gate</span>
              <span className="metric-value">{bk.fromTerminal ? bk.fromTerminal.split(' ')[0] : 'T2'} • Gate {bk.gate}</span>
            </div>

            <div className="metric-pill">
              <span className="metric-label">Assigned Seat</span>
              <span className="metric-value">{bk.seatsAssigned?.[0] || bk.seat}</span>
            </div>

            <div className="metric-pill countdown-box">
              <span className="metric-label" style={{ color: '#0284c7' }}>Boarding Status</span>
              <span className="metric-value" style={{ fontSize: boardingCountdown.status === 'countdown' ? '0.82rem' : '0.95rem' }}>
                {boardingCountdown.displayText || 'Boarding time unavailable'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link to="/boarding" className="btn-primary" style={{ padding: '9px 16px', fontSize: '0.84rem' }}>
                <QrCode size={15} />
                <span>View Boarding Pass</span>
              </Link>

              <Link to="/navigation" className="btn-outline" style={{ padding: '9px 16px', fontSize: '0.84rem' }}>
                <MapPin size={15} />
                <span>Wayfind</span>
              </Link>
            </div>
          </div>
        </div>
        ) : (
        /* No Booking State: Book Your Flight CTA */
        <div className="hero-flight-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 24px', gap: '18px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(2,132,199,0.35)' }}>
            <CalendarPlus size={30} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Book Your Flight</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Search domestic flights, pick your seat and pay — your boarding pass will appear right here.</div>
          </div>
          <button
            id="dashboard-book-flight-btn"
            onClick={() => navigate('/flight-booking')}
            className="btn-primary"
            style={{ padding: '11px 28px', fontSize: '0.95rem', borderRadius: 'var(--radius-md)' }}
          >
            <Plane size={16} />
            <span>Book Flight</span>
          </button>
        </div>
        )}
      </section>

      

      {/* --------------------------------------------------------------------
          2. QUICK GLANCE METRIC STAT CARDS (4 Stat Cards with Trend Badges)
          -------------------------------------------------------------------- */}
      <section className="stat-cards-grid">
        {/* Card 1: Flight Status */}
        <div className="stat-card">
          <div className="icon-badge-cyan">
            <Plane size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Flight Status</div>
            <div className="stat-card-val">
              {bk ? `On Time • ${bk.flightNumber}` : 'No Flight Booked'}
            </div>
            <div className="stat-card-footer">
              <span className="trend-indicator">
                {bk ? '↑ 98.4% On Schedule' : 'Book a flight to get started'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Baggage Status */}
        <div className="stat-card">
          <div className="icon-badge-cyan">
            <Luggage size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">
              {bk ? `Baggage (${bk.baggageTag || baggageStatus.tag})` : 'Baggage Tracker'}
            </div>
            <div className="stat-card-val">
              {bk ? 'Cargo Hold B' : 'No Baggage Checked'}
            </div>
            <div className="stat-card-footer">
              <span className="trend-indicator">
                {bk ? '↑ RFID Verified' : 'Book a flight to track baggage'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Security Queue */}
        <div className="stat-card">
          <div className="icon-badge-cyan">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Security Queue</div>
            <div className="stat-card-val">DigiYatra Gate 2</div>
            <div className="stat-card-footer">
              <span className="trend-indicator">↑ 2m Fast Track</span>
            </div>
          </div>
        </div>

        {/* Card 4: AI Weather & Forecast */}
        <div className="stat-card">
          <div className="icon-badge-cyan">
            <CloudSun size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Weather & AI Risk</div>
            <div className="stat-card-val">Clear • 29°C</div>
            <div className="stat-card-footer">
              <span className="trend-indicator">↑ Low Turbulence</span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          3. MAIN SPLIT BODY (3x3 Modules Grid + Right Side Cards)
          -------------------------------------------------------------------- */}
      <div className="dashboard-body-layout">
        {/* Left Column: Modules Grid */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Airport Assistance Services</h2>
              <p style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
                Select any passenger service below for instant interactive guidance.
              </p>
            </div>
          </div>

          <div className="modules-grid">
            {modules.map((m) => (
              <ModuleCard
                key={m.to}
                to={m.to}
                title={m.title}
                description={m.description}
                icon={m.icon}
                badgeText={m.badgeText}
                badgeType={m.badgeType}
              />
            ))}
          </div>
        </section>

        {/* Right Column: Airport Map Card + Flight Schedule Timeline */}
        <aside className="side-cards-column">
          {/* Airport Map Quick View Card */}
          <div className="map-preview-card">
            <div className="map-preview-banner">
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.85, fontWeight: 700 }}>
                  Terminal Wayfinding
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                  {activeAirport.name}
                </div>
              </div>
              <div className="icon-badge-cyan-sm">
                <MapPin size={17} />
              </div>
            </div>

            <div className="map-preview-body">
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Navigate seamlessly across Terminal 2 gates, lounges, food courts, and baggage carousels with turn-by-turn indoor GPS.
              </div>

              <Link
                to="/navigation"
                className="btn-primary"
                style={{ width: '100%', marginTop: '4px', fontSize: '0.86rem' }}
              >
                <Compass size={16} />
                <span>Open 3D Terminal Map</span>
              </Link>
            </div>
          </div>

          {/* Live Flight Schedule & Activity Timeline Card */}
          <div className="activity-card">
            <div className="activity-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--cyan-dark)" />
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800 }}>Live Flight Schedule</h3>
              </div>
              <Link to="/flights" style={{ fontSize: '0.76rem', color: 'var(--cyan-dark)', fontWeight: 700 }}>
                View All
              </Link>
            </div>

            <div className="activity-list">
              {flights.slice(0, 4).map((f) => (
                <Link
                  key={f.id}
                  to="/flights"
                  className="activity-item"
                >
                  <div className="icon-badge-cyan-sm">
                    <PlaneTakeoff size={15} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {f.flightNumber}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: f.status === 'On Time' ? '#ecfdf5' : '#fffbeb',
                          color: f.status === 'On Time' ? '#10b981' : '#d97706'
                        }}
                      >
                        {f.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {f.fromCity} ➔ {f.toCity} • Gate {f.gate}
                    </div>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
