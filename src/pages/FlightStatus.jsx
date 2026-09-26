import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlaneTakeoff,
  PlaneLanding,
  Search,
  Filter,
  Clock,
  MapPin,
  Compass,
  Luggage,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const FlightStatus = () => {
  const { flights, activeAirport } = useAirport();
  const [activeTab, setActiveTab] = useState('departure'); // 'departure' or 'arrival'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAirline, setSelectedAirline] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFlightDetail, setSelectedFlightDetail] = useState(null);

  // Filter flights
  const filteredFlights = flights.filter((f) => {
    if (f.type !== activeTab) return false;
    if (
      searchQuery &&
      !f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.toCity.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.fromCity.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.airline.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedAirline !== 'all' && f.airlineCode !== selectedAirline) {
      return false;
    }
    if (selectedStatus !== 'all' && f.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'on time':
        return <span className="module-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-on-time)' }}>On Time</span>;
      case 'boarding':
        return <span className="module-badge badge-peach" style={{ animation: 'pulseGlow 2s infinite' }}>Boarding</span>;
      case 'delayed':
        return <span className="module-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-delayed)' }}>Delayed</span>;
      case 'landed':
        return <span className="module-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--sky-blue)' }}>Landed</span>;
      default:
        return <span className="module-badge">{status}</span>;
    }
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Live Air Traffic</span>
          <span style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
            {activeAirport.name} ({activeAirport.code})
          </span>
        </div>
        <h1 style={{ fontSize: '2rem',color:'#043d61ff', fontWeight: 800 }}>Flight Schedule & Live Status</h1>
        <p style={{ color: '#043d61ff', fontSize: '0.9rem' }}>
          Live flight information display system with real-time gate updates, delay tracking, and baggage belt allocations.
        </p>
      </div>

      {/* Tabs & Search Filter Controls */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Departures vs Arrivals Tabs */}
          <div className="level-switcher">
            <button
              type="button"
              className={`level-btn ${activeTab === 'departure' ? 'active' : ''}`}
              onClick={() => setActiveTab('departure')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <PlaneTakeoff size={16} />
              <span>Departures</span>
            </button>
            <button
              type="button"
              className={`level-btn ${activeTab === 'arrival' ? 'active' : ''}`}
              onClick={() => setActiveTab('arrival')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <PlaneLanding size={16} />
              <span>Arrivals</span>
            </button>
          </div>

          {/* Quick Refresh */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
              ● Live Sync active (Updated 10s ago)
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={17} />
            <input
              type="text"
              className="navbar-search-input"
              style={{ background: 'rgba(245, 248, 255, 0.97)', paddingLeft: '40px' }}
              placeholder="Search flight number, city, or airline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Airline Select */}
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="form-input"
            style={{ padding: '10px 14px', background: 'rgba(245, 247, 252, 1)6)' }}
          >
            <option value="all">All Airlines</option>
            <option value="6E">IndiGo (6E)</option>
            <option value="AI">Air India (AI)</option>
            <option value="QP">Akasa Air (QP)</option>
            <option value="SG">SpiceJet (SG)</option>
            <option value="UK">Vistara (UK)</option>
            <option value="EK">Emirates (EK)</option>
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-input"
            style={{ padding: '10px 14px', background: 'rgba(249, 250, 252, 1)' }}
          >
            <option value="all">All Flight Statuses</option>
            <option value="on time">On Time</option>
            <option value="boarding">Boarding</option>
            <option value="delayed">Delayed</option>
            <option value="landed">Landed</option>
          </select>
        </div>
      </div>

      {/* Flight Cards / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                flexWrap: 'wrap',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedFlightDetail(flight)}
            >
              {/* Flight & Airline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '180px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(56, 189, 248, 0.2))',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {flight.airlineCode}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {flight.flightNumber}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {flight.airline} • {flight.aircraft}
                  </div>
                </div>
              </div>

              {/* Route */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    {flight.from}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{flight.fromCity}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Direct</span>
                  <div style={{ width: '60px', height: '2px', background: 'rgba(56, 189, 248, 0.4)', position: 'relative' }}>
                    <PlaneTakeoff size={12} color="var(--sky-blue)" style={{ position: 'absolute', top: '-5px', left: '22px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                    {flight.to}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{flight.toCity}</div>
                </div>
              </div>

              {/* Time */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Scheduled / Est.
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--sky-blue-light)' }}>
                  {flight.scheduledTime} IST
                </span>
                {flight.status === 'Delayed' && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--status-delayed)' }}>
                    Est: {flight.estimatedTime}
                  </span>
                )}
              </div>

              {/* Terminal / Gate */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: '90px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Gate / Belt
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-peach)' }}>
                  Gate {flight.gate}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {flight.terminal} • {flight.baggageBelt}
                </span>
              </div>

              {/* Status Badge */}
              <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                {getStatusBadge(flight.status)}
              </div>
            </div>
          ))
        ) : (
          <div
            className="glass-panel"
            style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}
          >
            <AlertCircle size={32} color="var(--sky-blue)" style={{ margin: '0 auto 10px' }} />
            <h3>No flights found</h3>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Try clearing your search query or adjusting the airline/status filters.
            </p>
          </div>
        )}
      </div>

      {/* Flight Detail Modal */}
      {selectedFlightDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedFlightDetail(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '30px',
              background: 'rgba(11, 23, 50, 0.95)',
              border: '1px solid rgba(56, 189, 248, 0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="hero-tag">{selectedFlightDetail.airline}</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  Flight {selectedFlightDetail.flightNumber}
                </h2>
              </div>
              {getStatusBadge(selectedFlightDetail.status)}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                padding: '16px',
                background: 'rgba(5, 11, 24, 0.6)',
                borderRadius: '12px',
                marginBottom: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DEPARTURE AIRPORT</div>
                <div style={{ fontWeight: 700, color: '#ffffff' }}>{selectedFlightDetail.fromCity} ({selectedFlightDetail.from})</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                  {selectedFlightDetail.scheduledTime} IST
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DESTINATION AIRPORT</div>
                <div style={{ fontWeight: 700, color: '#ffffff' }}>{selectedFlightDetail.toCity} ({selectedFlightDetail.to})</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--sky-blue-light)' }}>
                  {selectedFlightDetail.terminal}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DEPARTURE GATE</div>
                <div style={{ fontWeight: 700, color: 'var(--accent-peach-bright)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                  Gate {selectedFlightDetail.gate}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BAGGAGE BELT</div>
                <div style={{ fontWeight: 700, color: 'var(--sky-blue-light)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                  {selectedFlightDetail.baggageBelt}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setSelectedFlightDetail(null)}
              >
                Close
              </button>
              <Link
                to="/navigation"
                className="btn-primary"
                onClick={() => setSelectedFlightDetail(null)}
              >
                <Compass size={16} />
                <span>Indoor Route to Gate {selectedFlightDetail.gate}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
