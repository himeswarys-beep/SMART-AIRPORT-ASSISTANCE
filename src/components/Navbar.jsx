import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plane,
  Bell,
  Search,
  User,
  MapPin,
  Clock,
  CloudSun,
  ChevronDown,
  LogOut,
  CheckCircle,
  Compass,
  Globe
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { airportsList } from '../data/airports';
import { ASSETS } from '../assets/images';

export const Navbar = ({ onOpenNotifications }) => {
  const { user, activeBooking, clearActiveBooking, activeAirport, setActiveAirport, notifications, isLoggedIn, setIsLoggedIn, language, setLanguage } = useAirport();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const airports = airportsList;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('gate') || q.includes('map') || q.includes('navigate') || q.includes('route')) {
      navigate('/navigation');
    } else if (q.includes('bag') || q.includes('tag') || q.includes('luggage')) {
      navigate('/baggage');
    } else if (q.includes('meal') || q.includes('food') || q.includes('eat') || q.includes('veg')) {
      navigate('/meals');
    } else if (q.includes('delay') || q.includes('weather') || q.includes('predict')) {
      navigate('/delay-prediction');
    } else if (q.includes('queue') || q.includes('security') || q.includes('crowd')) {
      navigate('/queues');
    } else if (q.includes('board') || q.includes('pass') || q.includes('seat')) {
      navigate('/boarding');
    } else if (q.includes('assist') || q.includes('wheelchair') || q.includes('special')) {
      navigate('/assistance');
    } else {
      navigate('/flights');
    }
  };

  return (
    <header className="top-navbar">
      {/* Brand Logo & Name */}
      <Link to="/dashboard" className="navbar-brand">
        <img src={ASSETS.logo} alt="Aerova" className="brand-logo-img" />
        <div className="brand-info">
          <span className="brand-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
            Aerova
          </span>
          <span className="brand-subtitle" style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 700, letterSpacing: '0.04em' }}>
            Your Journey, Our Priority
          </span>
        </div>
      </Link>

      {/* Header Reference Tagline */}
      <div className="header-reference-tagline" style={{ display: 'none', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 180, 216, 0.08)', border: '1px solid rgba(0, 180, 216, 0.2)', borderRadius: '9999px', fontSize: '0.78rem', color: 'var(--cyan-dark)', fontWeight: 700 }}>
        <span>Smarter Travel</span>
        <span style={{ color: 'var(--cyan-primary)' }}>•</span>
        <span>Seamless Experience</span>
        <span style={{ color: 'var(--cyan-primary)' }}>•</span>
        <span>All in One App</span>
      </div>

      {/* Global Interactive Search Bar */}
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search flights, gates, baggage tags, food, routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Right Navigation Actions */}
      <div className="navbar-actions">
        {/* Quick Language Toggle Button */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(0, 180, 216, 0.1)',
            border: '1px solid rgba(0, 180, 216, 0.25)',
            color: 'var(--cyan-dark)',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Switch Language / மொழியை மாற்ற"
        >
          <Globe size={15} color="var(--cyan-primary)" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        {/* Airport / Terminal Switcher Badge */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="terminal-badge"
            onClick={() => setShowAirportDropdown(!showAirportDropdown)}
          >
            <span className="terminal-live-dot"></span>
            <MapPin size={15} />
            <span>{activeAirport.code} T2</span>
            <ChevronDown size={14} />
          </button>

          {showAirportDropdown && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '270px',
                padding: '8px',
                zIndex: 60,
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ padding: '8px 12px', fontSize: '0.72rem', color: 'var(--cyan-dark)', fontWeight: 800, textTransform: 'uppercase' }}>
                Select Active Airport / Terminal
              </div>
              {airports.map((ap) => (
                <div
                  key={ap.code}
                  onClick={() => {
                    setActiveAirport(ap);
                    setShowAirportDropdown(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: activeAirport.code === ap.code ? 'rgba(0, 180, 216, 0.12)' : 'transparent',
                    color: activeAirport.code === ap.code ? 'var(--cyan-dark)' : 'var(--text-primary)',
                    fontWeight: activeAirport.code === ap.code ? 700 : 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem' }}>{ap.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ap.city} • 29°C</div>
                  </div>
                  {activeAirport.code === ap.code && <CheckCircle size={15} color="var(--cyan-primary)" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Weather & Time Capsule */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--shadow-sm)'
          }}
          className="desktop-weather-widget"
        >
          <CloudSun size={15} color="var(--cyan-dark)" />
          <span>{activeAirport.temp}</span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <Clock size={14} color="var(--cyan-primary)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>18:15 IST</span>
        </div>

        {/* Notification Bell Button with Badge */}
        <button
          type="button"
          className="nav-icon-btn"
          onClick={onOpenNotifications}
          title="Open Notifications"
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>

        {/* User Profile Pill */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile-pill"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="user-avatar">
              {user.name.charAt(0)}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-seat-tag">
                {user.flightNumber ? `Seat ${user.seat} • ${user.flightNumber}` : 'Passenger Profile'}
              </span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {showUserDropdown && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '250px',
                padding: '12px',
                zIndex: 60,
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ padding: '8px 8px 12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{user.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--cyan-dark)', marginTop: '4px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {user.pnr ? `PNR: ${user.pnr} | Flight ${user.flightNumber}` : 'No Active Flight Booked'}
                </div>
              </div>

              <Link
                to="/boarding"
                onClick={() => setShowUserDropdown(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  transition: 'background 0.15s'
                }}
              >
                <Plane size={16} color="var(--cyan-primary)" />
                <span>My Boarding Pass</span>
              </Link>

              <Link
                to="/navigation"
                onClick={() => setShowUserDropdown(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  transition: 'background 0.15s'
                }}
              >
                <Compass size={16} color="var(--cyan-dark)" />
                <span>{user.gate ? `Navigate to Gate ${user.gate}` : 'Airport Navigation'}</span>
              </Link>

              {activeBooking && (
                <div
                  onClick={() => {
                    setShowUserDropdown(false);
                    clearActiveBooking();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#f97316',
                    cursor: 'pointer',
                    marginTop: '6px',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <LogOut size={16} />
                  <span>Reset Active Booking</span>
                </div>
              )}

              <div
                onClick={() => {
                  setShowUserDropdown(false);
                  setIsLoggedIn(false);
                  navigate('/auth');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--status-cancelled)',
                  cursor: 'pointer',
                  marginTop: activeBooking ? '2px' : '6px',
                  borderTop: activeBooking ? 'none' : '1px solid var(--border-subtle)'
                }}
              >
                <LogOut size={16} />
                <span>Sign Out / Switch User</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
