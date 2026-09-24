import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Plane,
  PlaneTakeoff,
  QrCode,
  MapPin,
  Luggage,
  UtensilsCrossed,
  Bot,
  Users,
  ShieldCheck,
  Ticket,
  ArrowLeftRight,
  ArrowRight,
  Send,
  CalendarPlus
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const Sidebar = () => {
  const { user, activeBooking } = useAirport();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/dashboard', label: 'Main Dashboard', icon: Home, badge: null },
    { to: '/flight-booking', label: 'Flight Booking', icon: Plane, badge: 'Book' },
    { to: '/my-trips', label: 'My Trips & Tickets', icon: Ticket, badge: 'Active' },
    { to: '/seat-swap', label: 'Seat Swap Platform', icon: ArrowLeftRight, badge: 'Swap' },
    { to: '/flights', label: 'Flight Status', icon: PlaneTakeoff, badge: 'Live' },
    { to: '/boarding', label: 'Boarding Pass', icon: QrCode, badge: activeBooking ? `Gate ${activeBooking.gate}` : null },
    { to: '/navigation', label: 'Indoor GPS & Map', icon: MapPin, badge: '3D GPS' },
    { to: '/baggage', label: 'Baggage Tracker', icon: Luggage, badge: activeBooking ? 'Loaded' : null },
    { to: '/meals', label: 'In-Flight Meals', icon: UtensilsCrossed, badge: 'Menu' },
    { to: '/delay-prediction', label: 'Delay Prediction AI', icon: Bot, badge: 'AI Risk' },
    { to: '/queues', label: 'Queue & Crowds', icon: Users, badge: 'Fast' },
    { to: '/assistance', label: 'Special Assistance', icon: ShieldCheck, badge: null }
  ];

  return (
    <>
      {/* Desktop Oceanic Gradient Sidebar */}
      <aside className="sidebar-wrapper">
        <nav className="sidebar-nav">
          <div className="nav-section-title">Passenger Journey</div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link-item ${isActive ? 'active' : ''}`
                }
              >
                <Icon className="nav-link-icon" size={18} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="nav-link-badge">{link.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: Active Ticket or Book Ticket CTA */}
        <div className="sidebar-footer">
          {activeBooking ? (
          <div className="sidebar-flight-widget">
            {/* SVG Glowing Flight Arc Trajectory */}
            <svg className="sidebar-curve-deco" viewBox="0 0 200 120" preserveAspectRatio="none">
              <path
                d="M 10 110 Q 70 80 120 40 T 180 15"
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              <span className="widget-label">Active Ticket</span>
              <span style={{ fontSize: '0.65rem', background: '#10b981', color: '#ffffff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800 }}>
                BOOKED
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              <div>
                <div className="widget-flight-code">{activeBooking.flightNumber} • {activeBooking.airline}</div>
                <div className="widget-flight-route">{activeBooking.from} ➔ {activeBooking.to} (Gate {activeBooking.gate})</div>
              </div>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <PlaneTakeoff size={18} />
              </div>
            </div>

            <NavLink
              to="/boarding"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
                color: '#ffffff',
                fontWeight: 700,
                marginTop: '4px',
                paddingTop: '6px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                position: 'relative',
                zIndex: 2
              }}
            >
              <span>View Barcode & Seat</span>
              <ArrowRight size={13} />
            </NavLink>
          </div>
          ) : (
          /* No booking: Book Your Ticket CTA */
          <div
            className="sidebar-flight-widget"
            id="sidebar-book-ticket-btn"
            onClick={() => navigate('/flight-booking')}
            style={{ cursor: 'pointer' }}
          >
            <svg className="sidebar-curve-deco" viewBox="0 0 200 120" preserveAspectRatio="none">
              <path
                d="M 10 110 Q 70 80 120 40 T 180 15"
                fill="none"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </svg>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 2 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CalendarPlus size={18} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>Book Your Ticket</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>No active booking yet</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.15)', position: 'relative', zIndex: 2 }}>
              <span>Search & Book a Flight</span>
              <ArrowRight size={13} />
            </div>
          </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="mobile-bottom-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <Home size={19} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/flights"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <PlaneTakeoff size={19} />
          <span>Flights</span>
        </NavLink>

        <NavLink
          to="/navigation"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <MapPin size={19} />
          <span>Indoor GPS</span>
        </NavLink>

        <NavLink
          to="/boarding"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <QrCode size={19} />
          <span>Pass</span>
        </NavLink>

        <NavLink
          to="/baggage"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <Luggage size={19} />
          <span>Baggage</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
