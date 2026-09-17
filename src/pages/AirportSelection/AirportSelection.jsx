import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  MapPin,
  ArrowRight,
  Plane,
  Building2,
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { airportsList } from '../../data/airports';
import { useAirport } from '../../context/AirportContext';
import './AirportSelection.css';

export const AirportSelection = () => {
  const navigate = useNavigate();
  const { setActiveAirport } = useAirport();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAirports = airportsList.filter((ap) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      ap.name.toLowerCase().includes(q) ||
      ap.city.toLowerCase().includes(q) ||
      ap.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="airport-selection-page animate-fade-in">
      {/* Hero Section */}
      <section className="selection-hero">
        <div className="selection-title-badge">
          <Compass size={16} />
          <span>Tamil Nadu Indoor Navigation Network</span>
        </div>
        <h1 className="selection-main-title">Select Your Airport</h1>
        <p className="selection-subtitle">
          Navigate your airport with ease using interactive 3D indoor floor blueprints, turn-by-turn wayfinding, and live position tracking.
        </p>

        {/* Airport Search Bar */}
        <div className="airport-search-bar">
          <Search size={18} className="airport-search-icon" />
          <input
            type="text"
            className="airport-search-input"
            placeholder="Search Chennai, Coimbatore, Trichy, Madurai..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Grid of Tamil Nadu Airports */}
      <div className="airports-grid">
        {filteredAirports.map((airport) => (
          <div
            key={airport.id}
            className="airport-card"
            onClick={() => {
              setActiveAirport(airport);
              navigate(`/dashboard`);
            }}
          >
            <div className="airport-card-glow" />

            <div>
              <div className="airport-card-header">
                <div className="airport-icon-box">
                  ✈️
                </div>
                <div className="airport-code-badge">
                  {airport.code} • {airport.city}
                </div>
              </div>

              <div className="airport-card-body">
                <h2 className="airport-card-title">{airport.name}</h2>
                <div className="airport-card-meta">
                  <Building2 size={14} color="var(--sky-blue)" />
                  <span>{airport.terminalName}</span>
                </div>

                <div className="airport-card-stats">
                  <span className="stat-pill">{airport.stats.gates}</span>
                  <span className="stat-pill">{airport.stats.floors}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="explore-map-btn"
            >
              <span>Explore Map</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirportSelection;
