import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  QrCode,
  Radio,
  MapPin,
  Building2,
  CheckCircle2,
  X,
  Sparkles,
  Info
} from 'lucide-react';

import {
  getAirportData,
  saveAirportData,
  resetAirportData
} from '../../data/airports';

import AirportMap from '../../components/AirportMap/AirportMap';
import SearchPanel from '../../components/Search/SearchPanel';
import NavigationPanel from '../../components/Navigation/NavigationPanel';
import DirectionsPanel from '../../components/Navigation/DirectionsPanel';
import EditMapPanel from '../../components/EditMap/EditMapPanel';

import { findShortestPath, findNearestNode } from '../../utils/pathFinding';
import { calculateWalkingTime, calculateStepCount } from '../../utils/distanceCalculator';
import { generateStepByStepDirections } from '../../utils/directionsGenerator';

import './IndoorNavigation.css';

export const IndoorNavigation = () => {
  const { airportId = 'chennai' } = useParams();
  const navigate = useNavigate();

  // Active Airport Data State
  const [airportData, setAirportData] = useState(() => getAirportData(airportId));

  // Locations state for live editing
  const [locations, setLocations] = useState(airportData.locations || []);
  const [nodes, setNodes] = useState(airportData.nodes || []);
  const [connections, setConnections] = useState(airportData.connections || []);

  // Selection & Navigation States
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);

  // Pathfinding Result States
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [directionsSteps, setDirectionsSteps] = useState([]);

  // Panel & Mode States
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDirectionsDrawer, setShowDirectionsDrawer] = useState(false);
  const [locationMode, setLocationMode] = useState('manual'); // 'manual' | 'qr' | 'ble'
  const [showQRModal, setShowQRModal] = useState(false);
  const [bleBeaconSignal, setBleBeaconSignal] = useState(98);

  // Reload airport data when URL airportId changes
  useEffect(() => {
    const data = getAirportData(airportId);
    setAirportData(data);
    setLocations(data.locations || []);
    setNodes(data.nodes || []);
    setConnections(data.connections || []);

    // Set default start location (Main Entrance or Gate 1)
    const defaultStart = (data.locations || []).find((l) => l.category === 'entrance') || data.locations[0];
    setStartLocation(defaultStart);
    setDestinationLocation(null);
    setSelectedLocation(null);
    setIsNavigating(false);
    setShowDirectionsDrawer(false);
  }, [airportId]);

  // Recalculate Path whenever start location, destination location, or graph nodes change
  useEffect(() => {
    if (startLocation && destinationLocation) {
      // Find nearest graph node IDs for start & destination
      const startNode = startLocation.nearestNodeId
        ? nodes.find((n) => n.id === startLocation.nearestNodeId)
        : findNearestNode(nodes, startLocation.position);

      const destNode = destinationLocation.nearestNodeId
        ? nodes.find((n) => n.id === destinationLocation.nearestNodeId)
        : findNearestNode(nodes, destinationLocation.position);

      const result = findShortestPath(
        nodes,
        connections,
        startNode?.id || nodes[0]?.id,
        destNode?.id || nodes[nodes.length - 1]?.id
      );

      // Prepend exact start position & append exact destination position
      const fullPathCoords = [
        { x: startLocation.position.x, y: startLocation.position.y },
        ...(result.pathCoordinates || []),
        { x: destinationLocation.position.x, y: destinationLocation.position.y }
      ];

      setPathCoordinates(fullPathCoords);
      setTotalDistance(result.totalDistance || 45);

      const steps = generateStepByStepDirections(startLocation, destinationLocation, fullPathCoords);
      setDirectionsSteps(steps);
    } else {
      setPathCoordinates([]);
      setTotalDistance(0);
      setDirectionsSteps([]);
    }
  }, [startLocation, destinationLocation, nodes, connections]);

  // Simulated BLE Beacon movement loop when BLE mode is active
  useEffect(() => {
    let timer;
    if (locationMode === 'ble') {
      timer = setInterval(() => {
        setBleBeaconSignal(Math.floor(88 + Math.random() * 11));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [locationMode]);

  // Handlers for Navigation
  const handleStartNavigation = (targetLoc) => {
    const target = targetLoc || destinationLocation;
    if (!target) return;

    setDestinationLocation(target);
    setSelectedLocation(target);
    setIsNavigating(true);
    setShowDirectionsDrawer(true);
  };

  const handleCancelNavigation = () => {
    setIsNavigating(false);
    setShowDirectionsDrawer(false);
  };

  // Handlers for Map Editing
  const handleUpdateLocationPosition = (locId, newPos) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === locId ? { ...loc, position: newPos } : loc))
    );
  };

  const handleUpdateLocation = (locId, updatedFields) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === locId ? { ...loc, ...updatedFields } : loc))
    );
  };

  const handleAddLocation = () => {
    const newId = `custom-${Date.now()}`;
    const newLocation = {
      id: newId,
      name: `New Gate / Facility ${locations.length + 1}`,
      category: 'gates',
      icon: 'Plane',
      color: '#ef4444',
      position: { x: 500, y: 300 },
      level: 'L1',
      details: 'Editable indoor location'
    };

    setLocations((prev) => [...prev, newLocation]);
    setSelectedLocation(newLocation);
  };

  const handleDeleteLocation = (locId) => {
    setLocations((prev) => prev.filter((l) => l.id !== locId));
    if (selectedLocation?.id === locId) setSelectedLocation(null);
  };

  const handleSaveChanges = () => {
    saveAirportData(airportId, locations, nodes, connections);
  };

  const handleResetDefaults = () => {
    const original = resetAirportData(airportId);
    setLocations(original.locations || []);
    setNodes(original.nodes || []);
    setConnections(original.connections || []);
    setSelectedLocation(null);
  };

  // QR Code Location Simulator scan selection
  const handleScanQRLocation = (loc) => {
    setStartLocation(loc);
    setSelectedLocation(loc);
    setShowQRModal(false);
  };

  const estimatedTimeStr = calculateWalkingTime(totalDistance);
  const stepCountVal = calculateStepCount(totalDistance);

  return (
    <div className="indoor-nav-page animate-fade-in">
      {/* Top Header Bar */}
      <div className="indoor-nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/indoor-navigation" className="back-to-airports-btn">
            <ArrowLeft size={16} />
            <span>← Back to Airports</span>
          </Link>

          <div className="header-airport-meta">
            <span className="header-code-pill">{airportData.code}</span>
            <div>
              <h1 className="header-title-text">{airportData.name}</h1>
              <p className="header-subtitle-text">{airportData.terminalName} • {airportData.city}</p>
            </div>
          </div>
        </div>

        {/* Telemetry Status Indicator */}
        <div className="positioning-telemetry-badge">
          {locationMode === 'manual' && (
            <>
              <MapPin size={14} />
              <span>Manual Navigation Mode</span>
            </>
          )}
          {locationMode === 'qr' && (
            <>
              <QrCode size={14} />
              <span>QR Positioning Active</span>
            </>
          )}
          {locationMode === 'ble' && (
            <>
              <Radio size={14} className="animate-pulse" />
              <span>BLE Beacon Network Connected ({bleBeaconSignal}% Signal)</span>
            </>
          )}
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="indoor-map-workspace">
        <div className="map-main-column">
          {/* Top Floating Navigation Selector Bar */}
          <NavigationPanel
            locations={locations}
            startLocation={startLocation}
            destinationLocation={destinationLocation}
            onSelectStartLocation={setStartLocation}
            onSelectDestinationLocation={(loc) => {
              setDestinationLocation(loc);
              setSelectedLocation(loc);
            }}
            onStartNavigation={() => handleStartNavigation(destinationLocation)}
            onCancelNavigation={handleCancelNavigation}
            isNavigating={isNavigating}
            totalDistance={totalDistance}
            estimatedTime={estimatedTimeStr}
            stepCount={stepCountVal}
            isAccessibleRoute={isAccessibleRoute}
            onToggleAccessibleRoute={setIsAccessibleRoute}
          />

          {/* SVG Map Canvas Viewport */}
          <AirportMap
            airport={{ ...airportData, locations }}
            selectedLocation={selectedLocation}
            startLocation={startLocation}
            destinationLocation={destinationLocation}
            pathCoordinates={pathCoordinates}
            totalDistance={totalDistance}
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onSelectLocation={setSelectedLocation}
            onUpdateLocationPosition={handleUpdateLocationPosition}
            locationMode={locationMode}
            onChangeLocationMode={setLocationMode}
            onOpenQRModal={() => setShowQRModal(true)}
          />
        </div>

        {/* Directions Side Panel Drawer */}
        {showDirectionsDrawer && (
          <DirectionsPanel
            steps={directionsSteps}
            startLocation={startLocation}
            destinationLocation={destinationLocation}
            totalDistance={totalDistance}
            estimatedTime={estimatedTimeStr}
            stepCount={stepCountVal}
            onClose={() => setShowDirectionsDrawer(false)}
          />
        )}

        {/* Edit Map Side Panel Drawer */}
        {isEditMode && (
          <EditMapPanel
            airportName={airportData.name}
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            onUpdateLocation={handleUpdateLocation}
            onAddLocation={handleAddLocation}
            onDeleteLocation={handleDeleteLocation}
            onSaveChanges={handleSaveChanges}
            onResetDefaults={handleResetDefaults}
            onClose={() => setIsEditMode(false)}
          />
        )}
      </div>

      {/* Floating Bottom Search Panel */}
      <SearchPanel
        locations={locations}
        onSelectLocation={setSelectedLocation}
        onStartNavigation={handleStartNavigation}
      />

      {/* Simulated QR Code Scan Modal */}
      {showQRModal && (
        <div className="qr-modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Scan Airport QR Code</h3>
              <button type="button" className="close-drawer-btn" onClick={() => setShowQRModal(false)}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Scan any QR code tag located on pillars, boarding gates, or check-in counters to calibrate your indoor position.
            </p>

            <div className="qr-viewfinder">
              <div className="qr-scan-line" />
              <QrCode size={64} color="var(--sky-blue)" opacity={0.6} />
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Select a simulated QR tag location below:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
              {locations.slice(0, 5).map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleScanQRLocation(loc)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(56,189,248,0.2)',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  📍 QR Code Tag: {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndoorNavigation;
