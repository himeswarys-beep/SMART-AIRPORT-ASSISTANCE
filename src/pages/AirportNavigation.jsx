import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Footprints,
  Clock,
  ArrowRight,
  Accessibility,
  Layers,
  Search,
  Utensils,
  Coffee,
  ShieldCheck,
  Luggage,
  Sparkles,
  Navigation,
  Car,
  HeartPulse,
  Info,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const AirportNavigation = () => {
  const {
    navigationPOIs,
    activeDestination,
    setActiveDestination,
    accessibleRoute,
    setAccessibleRoute,
    selectedFloor,
    setSelectedFloor,
    activeAirport,
    user
  } = useAirport();

  const [activeCategory, setActiveCategory] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [poiSearch, setPoiSearch] = useState('');

  // Fallback destination if none is selected
  const defaultDestination = {
    id: 'gate-a12',
    name: 'Gate A12',
    terminal: 'Concourse A',
    x: 735,
    y: 132,
    level: 'L1',
    category: 'gates',
    walkTime: '4 mins',
    distance: '280m',
    directions: [
      'Exit Security Checkpoint into Central Concourse Rotunda',
      'Follow directional signs towards Boarding Gates',
      'Arrive at Gate A12'
    ]
  };

  const currentDest = activeDestination || (navigationPOIs && navigationPOIs.length > 0 ? navigationPOIs[0] : defaultDestination);
  const destX = currentDest.x ?? currentDest.position?.x ?? 735;
  const destY = currentDest.y ?? currentDest.position?.y ?? 132;
  const destDirections = Array.isArray(currentDest.directions) && currentDest.directions.length > 0
    ? currentDest.directions
    : [
        `Proceed from your current location towards ${currentDest.name || 'Destination'}`,
        `Follow overhead illuminated signage in ${currentDest.level || 'L1'}`,
        `Arrive at ${currentDest.name || 'Destination'}`
      ];

  // Start point coordinates: Entrance Gate 3 (Level 1)
  const startPoint = { x: 500, y: 460, name: 'Main Terminal Entry Gate 3' };

  // Filter POIs
  const filteredPOIs = (navigationPOIs || []).filter((poi) => {
    if (activeCategory !== 'all' && poi.category !== activeCategory) return false;
    if (poiSearch && !poi.name?.toLowerCase().includes(poiSearch.toLowerCase()) && !poi.terminal?.toLowerCase().includes(poiSearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Calculate dynamic SVG route path from startPoint to activeDestination
  const generateRoutePath = () => {
    const startX = startPoint.x;
    const startY = startPoint.y;
    const endX = destX;
    const endY = destY;

    // Route waypoints through security checkpoint (500, 270)
    if (currentDest.category === 'gates' || currentDest.category === 'lounge' || currentDest.category === 'food' || currentDest.category === 'restroom') {
      return `M ${startX},${startY} L 500,350 L 500,270 L ${endX},${endY + 20} L ${endX},${endY}`;
    } else if (currentDest.category === 'baggage' || currentDest.category === 'transport') {
      return `M ${startX},${startY} L 500,410 L ${endX},${endY}`;
    }
    return `M ${startX},${startY} L 500,340 L ${endX},${endY}`;
  };

  const categories = [
    { id: 'all', label: 'All Places', icon: MapPin },
    { id: 'gates', label: 'Gates', icon: Compass },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'food', label: 'Food & Dining', icon: Utensils },
    { id: 'lounge', label: 'Lounges', icon: Coffee },
    { id: 'baggage', label: 'Baggage', icon: Luggage },
    { id: 'transport', label: 'Taxi & Metro', icon: Car }
  ];

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Wayfinder 3D</span>
          <span style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
            {activeAirport?.name || 'Tamil Nadu Airport'} • {activeAirport?.terminalName || 'Main Terminal'}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Airport Navigation & Indoor GPS</h1>
        <p style={{ color: '#043d61ff', fontSize: '0.9rem' }}>
          Interactive terminal floor blueprint with real-time indoor pathfinding, walking distance estimates, and accessibility routing for {activeAirport?.name || 'your airport'}.
        </p>
      </div>

      {/* Main Grid: Blueprint Canvas (Left) + Wayfinding Control Panel (Right) */}
      <div className="wayfinder-container">
        {/* ------------------------------------------------------------------
            LEFT: AIRPORT BLUEPRINT CANVAS (SVG MAP)
            ------------------------------------------------------------------ */}
        <div className="map-canvas-card blueprint-grid">
          {/* Map Top Bar Controls */}
          <div className="map-header-bar">
            {/* Level Switcher */}
            <div className="level-switcher">
              <button
                type="button"
                className={`level-btn ${selectedFloor === 'L1' ? 'active' : ''}`}
                onClick={() => setSelectedFloor('L1')}
              >
                Level 1: Departures & Gates
              </button>
              <button
                type="button"
                className={`level-btn ${selectedFloor === 'L0' ? 'active' : ''}`}
                onClick={() => setSelectedFloor('L0')}
              >
                Level 0: Arrivals & Belts
              </button>
            </div>

            {/* Accessibility Route Toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: accessibleRoute ? 'rgba(37, 99, 235, 0.4)' : 'rgba(5, 11, 24, 0.5)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                color: accessibleRoute ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Accessibility size={15} color={accessibleRoute ? 'var(--accent-peach)' : 'var(--sky-blue)'} />
              <input
                type="checkbox"
                checked={accessibleRoute}
                onChange={(e) => setAccessibleRoute(e.target.checked)}
                style={{ display: 'none' }}
              />
              <span>Wheelchair / Step-Free Route</span>
            </label>

            {/* Map Zoom Controls */}
            <div className="map-controls-group">
              <button
                type="button"
                className="map-ctrl-btn"
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.45))}
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                className="map-ctrl-btn"
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                className="map-ctrl-btn"
                onClick={() => setZoomLevel(1)}
                title="Reset View"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* SVG Map Container with dynamic transform zoom */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <svg
              viewBox="0 0 1000 600"
              className="airport-svg-viewport"
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.3s ease',
                width: '100%',
                height: 'auto',
                maxWidth: '960px'
              }}
            >
              <defs>
                <linearGradient id="hallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0f1f3d" stop-opacity="0.8" />
                  <stop offset="100%" stop-color="#09142b" stop-opacity="0.9" />
                </linearGradient>
                <linearGradient id="concourseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#142850" stop-opacity="0.7" />
                  <stop offset="100%" stop-color="#0a1936" stop-opacity="0.8" />
                </linearGradient>
                <filter id="svgGlow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Terminal Blueprint Outer Structural Walls */}
              <rect x="50" y="40" width="900" height="520" rx="30" fill="url(#hallGrad)" stroke="#38bdf8" stroke-width="2" stroke-opacity="0.4" />

              {/* Concourse A (East Wing - Gates A1 to A12) */}
              <path d="M 520,70 L 890,70 L 890,190 L 520,190 Z" fill="url(#concourseGrad)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 4" />
              <text x="700" y="95" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="2" text-anchor="middle">
                CONCOURSE A (GATES A1 - A12)
              </text>

              {/* Concourse B (West Wing - Gates B1 to B8) */}
              <path d="M 110,70 L 480,70 L 480,190 L 110,190 Z" fill="url(#concourseGrad)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 4" />
              <text x="295" y="95" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="2" text-anchor="middle">
                CONCOURSE B (GATES B1 - B8)
              </text>

              {/* Central Airside Spine & Duty-Free Node */}
              <rect x="360" y="190" width="280" height="60" rx="12" fill="#1e3a8a" fill-opacity="0.3" stroke="#60a5fa" stroke-width="1" />
              <text x="500" y="225" fill="#93c5fd" font-size="11" font-weight="600" text-anchor="middle">
                DUTY FREE PLAZA & CENTRAL ROTUNDA
              </text>

              {/* Security Checkpoint Zone */}
              <rect x="260" y="260" width="480" height="60" rx="14" fill="#0f2942" stroke="#38bdf8" stroke-width="1.5" />
              <text x="500" y="295" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1.5" text-anchor="middle">
                SECURITY CHECKPOINT A & DIGIYATRA LANES
              </text>

              {/* Check-in Desks Area */}
              <g stroke="#38bdf8" stroke-width="1" stroke-opacity="0.4" fill="#1e293b" fill-opacity="0.6">
                <rect x="180" y="340" width="180" height="40" rx="8" />
                <text x="270" y="365" fill="#cbd5e1" font-size="10" text-anchor="middle">CHECK-IN ROWS 1-8</text>

                <rect x="420" y="340" width="160" height="40" rx="8" />
                <text x="500" y="365" fill="#cbd5e1" font-size="10" text-anchor="middle">INDIGO / AIR INDIA (9-16)</text>

                <rect x="640" y="340" width="180" height="40" rx="8" />
                <text x="730" y="365" fill="#cbd5e1" font-size="10" text-anchor="middle">CHECK-IN ROWS 17-24</text>
              </g>

              {/* Main Entrance Foyer & Drop-off Curb */}
              <rect x="250" y="420" width="500" height="70" rx="16" fill="#0c1830" stroke="#38bdf8" stroke-width="1.5" />
              <text x="500" y="450" fill="#fed7aa" font-size="12" font-weight="bold" text-anchor="middle">
                TERMINAL DEPARTURES FORECOURT & ENTRY GATES 1-4
              </text>

              {/* Individual Gate Pods visual in Concourse A & B */}
              {/* Gate A12 (User Gate) */}
              <rect
                x="700"
                y="110"
                width="70"
                height="45"
                rx="8"
                fill={currentDest.id === 'gate-a12' ? '#ea580c' : '#1e3a8a'}
                stroke="#fed7aa"
                stroke-width="2"
                className="svg-zone"
                onClick={() => {
                  const target = navigationPOIs.find((p) => p.id === 'gate-a12');
                  if (target) setActiveDestination(target);
                }}
              />
              <text x="735" y="138" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">
                GATE A12
              </text>

              {/* Gate A4 */}
              <rect
                x="500"
                y="110"
                width="65"
                height="45"
                rx="8"
                fill={currentDest.id === 'gate-a4' ? '#ea580c' : '#1e293b'}
                stroke="#38bdf8"
                stroke-width="1.5"
                className="svg-zone"
                onClick={() => {
                  const target = navigationPOIs.find((p) => p.id === 'gate-a4');
                  if (target) setActiveDestination(target);
                }}
              />
              <text x="532" y="138" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">
                GATE A04
              </text>

              {/* Gate B4 */}
              <rect
                x="260"
                y="110"
                width="65"
                height="45"
                rx="8"
                fill={currentDest.id === 'gate-b04' ? '#ea580c' : '#1e293b'}
                stroke="#38bdf8"
                stroke-width="1.5"
                className="svg-zone"
                onClick={() => {
                  const target = navigationPOIs.find((p) => p.id === 'gate-b04');
                  if (target) setActiveDestination(target);
                }}
              />
              <text x="292" y="138" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">
                GATE B04
              </text>

              {/* Food Court */}
              <rect
                x="600"
                y="220"
                width="80"
                height="40"
                rx="8"
                fill={currentDest.id === 'food-court' ? '#ea580c' : '#14532d'}
                fill-opacity="0.7"
                stroke="#22c55e"
                stroke-width="1.5"
                className="svg-zone"
                onClick={() => {
                  const target = navigationPOIs.find((p) => p.id === 'food-court');
                  if (target) setActiveDestination(target);
                }}
              />
              <text x="640" y="244" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">
                FOOD COURT
              </text>

              {/* TFS Lounge */}
              <rect
                x="370"
                y="190"
                width="80"
                height="35"
                rx="6"
                fill={currentDest.id === 'tfs-lounge' ? '#ea580c' : '#451a03'}
                fill-opacity="0.7"
                stroke="#fb923c"
                stroke-width="1.5"
                className="svg-zone"
                onClick={() => {
                  const target = navigationPOIs.find((p) => p.id === 'tfs-lounge');
                  if (target) setActiveDestination(target);
                }}
              />
              <text x="410" y="212" fill="#fed7aa" font-size="9" font-weight="bold" text-anchor="middle">
                TFS LOUNGE
              </text>

              {/* --------------------------------------------------------------
                  DYNAMIC WALKING ROUTE PATH (GLOWING ANIMATED DASH)
                  -------------------------------------------------------------- */}
              <path d={generateRoutePath()} className="route-glow-underlay" fill="none" />
              <path d={generateRoutePath()} className="walking-route-path" fill="none" />

              {/* START LOCATION PIN (Current Location: Gate 3) */}
              <g transform={`translate(${startPoint.x}, ${startPoint.y})`} filter="url(#svgGlow)">
                <circle cx="0" cy="0" r="14" fill="rgba(56, 189, 248, 0.35)" className="current-user-beacon" />
                <circle cx="0" cy="0" r="8" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
                <text x="0" y="24" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">
                  YOU ARE HERE
                </text>
              </g>

              {/* TARGET DESTINATION PIN */}
              <g transform={`translate(${destX}, ${destY})`} filter="url(#svgGlow)">
                <circle cx="0" cy="0" r="16" fill="rgba(251, 146, 60, 0.35)" className="current-user-beacon" />
                <circle cx="0" cy="0" r="10" fill="#fb923c" stroke="#ffffff" stroke-width="2" />
                <text x="0" y="-14" fill="#fed7aa" font-size="11" font-weight="800" text-anchor="middle">
                  ★ DESTINATION
                </text>
              </g>
            </svg>
          </div>

          {/* Map Footer status */}
          <div
            style={{
              padding: '12px 20px',
              background: 'rgba(5, 11, 24, 0.8)',
              borderTop: '1px solid rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Footprints size={15} color="var(--accent-peach)" />
              <span>
                Origin: <strong style={{ color: '#ffffff' }}>Gate 3 Entrance</strong> ➔ Target:{' '}
                <strong style={{ color: 'var(--accent-peach-bright)' }}>{currentDest.name}</strong>
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--sky-blue)' }}>
              GPS Accuracy: ±1.2m (Indoor BLE Beacon Network)
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            RIGHT: DESTINATION SELECTOR & TURN-BY-TURN PANEL
            ------------------------------------------------------------------ */}
        <div className="wayfinder-sidebar">
          {/* Summary Metric Card */}
          <div className="route-summary-card">
            <div className="route-meta-badge">
              <div className="walk-time-chip">
                <Clock size={20} />
                <span>{currentDest.walkTime || '3 mins'}</span>
              </div>
              <div className="walk-dist-chip">
                {currentDest.distance || '180m'} • ~{parseInt(currentDest.distance || '180') * 1.3} steps
              </div>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {currentDest.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--sky-blue-light)' }}>
              {currentDest.terminal || 'Main Terminal'} • {currentDest.level === 'L1' ? 'Level 1 (Departures)' : 'Level 0 (Arrivals)'}
            </div>

            {/* Turn-by-Turn Steps */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--accent-peach)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Turn-by-Turn Navigation Steps
              </div>

              <div className="step-list">
                {destDirections.map((step, idx) => (
                  <div key={idx} className="step-item">
                    <div className="step-num">{idx + 1}</div>
                    <div className="step-content">
                      <div className="step-instruction">{step}</div>
                      <div className="step-distance">Proceed following illuminated floor beacons</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Destination Selector Container */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Where do you want to go?</h3>
            </div>

            {/* Search POIs */}
            <div className="search-input-wrapper" style={{ marginBottom: '14px' }}>
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Search gates, lounge, food, ATMs..."
                value={poiSearch}
                onChange={(e) => setPoiSearch(e.target.value)}
                style={{ paddingLeft: '38px', fontSize: '0.84rem' }}
              />
            </div>

            {/* Category Quick Filters */}
            <div className="dest-categories">
              {categories.slice(0, 6).map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`dest-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <Icon size={16} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* POI Fast Selector List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '16px',
                maxHeight: '220px',
                overflowY: 'auto'
              }}
            >
              {filteredPOIs.map((poi) => (
                <div
                  key={poi.id}
                  onClick={() => setActiveDestination(poi)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: currentDest.id === poi.id ? 'rgba(37, 99, 235, 0.35)' : 'rgba(16, 33, 71, 0.4)',
                    border: `1px solid ${currentDest.id === poi.id ? 'var(--sky-blue)' : 'rgba(56, 189, 248, 0.15)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', color: '#ffffff' }}>
                      {poi.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {poi.terminal}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {poi.walkTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportNavigation;
