import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Plane,
  ShieldCheck,
  Utensils,
  Coffee,
  Luggage,
  Users,
  Banknote,
  Armchair,
  Navigation,
  X,
  ChevronRight,
  Info
} from 'lucide-react';

export const SearchPanel = ({
  locations = [],
  onSelectLocation,
  onStartNavigation
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Places', icon: MapPin },
    { id: 'gates', label: 'Gates', icon: Plane },
    { id: 'checkin', label: 'Check-in', icon: Navigation },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'food', label: 'Dining & Cafes', icon: Utensils },
    { id: 'lounge', label: 'Lounges', icon: Armchair },
    { id: 'restroom', label: 'Restrooms', icon: Users },
    { id: 'atm', label: 'ATMs', icon: Banknote },
    { id: 'baggage', label: 'Baggage', icon: Luggage }
  ];

  // Filter locations by query & category
  const filteredLocations = locations.filter((loc) => {
    const matchesCategory =
      activeCategory === 'all' ||
      loc.category === activeCategory ||
      (activeCategory === 'food' && (loc.category === 'cafe' || loc.category === 'food'));

    const matchesQuery =
      !query ||
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.category.toLowerCase().includes(query.toLowerCase()) ||
      (loc.details && loc.details.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className={`floating-search-panel ${isOpen ? 'expanded' : ''}`}>
      {/* Floating Main Bar */}
      <div className="search-bar-header">
        <div className="search-input-box" onClick={() => setIsOpen(true)}>
          <Search size={18} className="search-icon-glass" />
          <input
            type="text"
            className="search-main-input"
            placeholder="Search a place, gate or facility..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
          />
          {query && (
            <button
              type="button"
              className="clear-query-btn"
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="toggle-search-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={18} /> : <Search size={18} />}
        </button>
      </div>

      {/* Expanded Category Filter Pills & Search Results */}
      {isOpen && (
        <div className="search-drawer-content animate-fade-in">
          {/* Category Filter Pills */}
          <div className="search-category-pills">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`search-cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results List */}
          <div className="search-results-scroll">
            {filteredLocations.length === 0 ? (
              <div className="no-search-results">
                <Info size={20} />
                <span>No matching airport locations found for "{query}".</span>
              </div>
            ) : (
              filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="search-result-card"
                  onClick={() => {
                    onSelectLocation(loc);
                    setIsOpen(false);
                  }}
                >
                  <div className="result-info">
                    <div className="result-title-row">
                      <span className="result-name">{loc.name}</span>
                      <span className="result-cat-badge" style={{ backgroundColor: `${loc.color}25`, color: loc.color, borderColor: `${loc.color}50` }}>
                        {loc.category}
                      </span>
                    </div>
                    <p className="result-details">{loc.details || `Located at Level 1 Concourse`}</p>
                  </div>

                  <button
                    type="button"
                    className="btn-navigate-shortcut"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLocation(loc);
                      onStartNavigation(loc);
                      setIsOpen(false);
                    }}
                    title="Navigate to this location"
                  >
                    <Navigation size={14} />
                    <span>Navigate</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
