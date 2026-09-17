import React from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Footprints,
  Accessibility,
  ArrowRight,
  X,
  Navigation,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const NavigationPanel = ({
  locations = [],
  startLocation,
  destinationLocation,
  onSelectStartLocation,
  onSelectDestinationLocation,
  onStartNavigation,
  onCancelNavigation,
  isNavigating,
  totalDistance,
  estimatedTime,
  stepCount,
  isAccessibleRoute,
  onToggleAccessibleRoute
}) => {
  return (
    <div className="navigation-header-panel glass-card">
      <div className="nav-panel-inputs">
        {/* Start Location Selector */}
        <div className="nav-input-group">
          <div className="nav-pin-icon start">
            <span className="dot-pulse" />
          </div>
          <div className="input-content">
            <label className="input-label">Current Location (Start)</label>
            <select
              className="nav-select-dropdown"
              value={startLocation?.id || ''}
              onChange={(e) => {
                const loc = locations.find((l) => l.id === e.target.value);
                if (loc) onSelectStartLocation(loc);
              }}
            >
              {locations.map((loc) => (
                <option key={`start-${loc.id}`} value={loc.id}>
                  📍 {loc.name} ({loc.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="nav-arrow-connector">
          <ArrowRight size={16} />
        </div>

        {/* Destination Location Selector */}
        <div className="nav-input-group">
          <div className="nav-pin-icon dest">
            <MapPin size={16} color="#fb923c" />
          </div>
          <div className="input-content">
            <label className="input-label">Destination</label>
            <select
              className="nav-select-dropdown"
              value={destinationLocation?.id || ''}
              onChange={(e) => {
                const loc = locations.find((l) => l.id === e.target.value);
                if (loc) onSelectDestinationLocation(loc);
              }}
            >
              <option value="" disabled>-- Select Destination --</option>
              {locations.map((loc) => (
                <option key={`dest-${loc.id}`} value={loc.id}>
                  🎯 {loc.name} ({loc.category})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Direct Stats & Action Row */}
      {destinationLocation && (
        <div className="nav-summary-bar">
          <div className="metrics-cluster">
            <div className="metric-chip">
              <Clock size={16} color="#fb923c" />
              <span className="chip-value">{estimatedTime}</span>
            </div>

            <div className="metric-chip">
              <Footprints size={16} color="#38bdf8" />
              <span className="chip-value">{totalDistance}m ({stepCount} steps)</span>
            </div>

            {/* Wheelchair Accessibility Toggle */}
            <label className={`accessible-route-toggle ${isAccessibleRoute ? 'active' : ''}`}>
              <Accessibility size={15} />
              <input
                type="checkbox"
                checked={isAccessibleRoute}
                onChange={(e) => onToggleAccessibleRoute(e.target.checked)}
                style={{ display: 'none' }}
              />
              <span>Wheelchair / Step-Free Path</span>
            </label>
          </div>

          <div className="nav-action-buttons">
            {isNavigating ? (
              <button
                type="button"
                className="btn-cancel-nav"
                onClick={onCancelNavigation}
              >
                <X size={16} />
                <span>End Navigation</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary btn-start-nav"
                onClick={onStartNavigation}
              >
                <Navigation size={16} />
                <span>Navigate Shortest Route</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;
