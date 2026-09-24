import React, { useState, useRef } from 'react';
import AirportLayout from './AirportLayout';
import LocationMarker from './LocationMarker';
import NavigationRoute from './NavigationRoute';
import MapControls from './MapControls';

export const AirportMap = ({
  airport,
  selectedLocation,
  startLocation,
  destinationLocation,
  pathCoordinates,
  totalDistance,
  isEditMode,
  onToggleEditMode,
  onSelectLocation,
  onUpdateLocationPosition,
  locationMode,
  onChangeLocationMode,
  onOpenQRModal
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isIsometric, setIsIsometric] = useState(true);

  // Dragging marker state in Edit Mode
  const [draggingMarkerId, setDraggingMarkerId] = useState(null);

  const svgRef = useRef(null);

  const { mapLayout = {}, locations = [] } = airport;
  const width = mapLayout.width || 1000;
  const height = mapLayout.height || 650;

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Pan handlers
  const handleMouseDown = (e) => {
    if (draggingMarkerId) return;
    if (e.target.tagName === 'svg' || e.target.classList.contains('map-viewport-bg')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (isEditMode && draggingMarkerId && svgRef.current) {
      // Calculate SVG matrix coordinates for precise marker relocation
      const rect = svgRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const rawY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

      // Map SVG viewBox coordinates ratio
      const svgX = Math.round(Math.max(20, Math.min(width - 20, (rawX / rect.width) * width * zoomLevel)));
      const svgY = Math.round(Math.max(20, Math.min(height - 20, (rawY / rect.height) * height * zoomLevel)));

      onUpdateLocationPosition(draggingMarkerId, { x: svgX, y: svgY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingMarkerId(null);
  };

  // Start dragging marker in Edit Mode
  const handleMarkerDragStart = (loc, e) => {
    e.stopPropagation();
    if (isEditMode) {
      setDraggingMarkerId(loc.id);
      onSelectLocation(loc);
    }
  };

  return (
    <div className="airport-map-viewport-card glass-card">
      {/* Top Floating Map Controls Bar */}
      <MapControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        isIsometric={isIsometric}
        onToggleIsometric={() => setIsIsometric(!isIsometric)}
        isEditMode={isEditMode}
        onToggleEditMode={onToggleEditMode}
        locationMode={locationMode}
        onChangeLocationMode={onChangeLocationMode}
        onOpenQRModal={onOpenQRModal}
      />

      {/* SVG Canvas Area */}
      <div
        className="map-canvas-wrapper"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : draggingMarkerId ? 'crosshair' : 'grab' }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className={`airport-svg-viewport ${isIsometric ? 'isometric-mode' : 'flat-mode'}`}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel}) ${isIsometric ? 'perspective(1200px) rotateX(38deg) rotateZ(-10deg)' : ''}`,
            transformOrigin: 'center center',
            transition: isPanning || draggingMarkerId ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Background Click catcher */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="transparent"
            className="map-viewport-bg"
            onClick={() => onSelectLocation(null)}
          />

          {/* Airport Structural Layout Base */}
          <AirportLayout mapLayout={mapLayout} isIsometric={isIsometric} />

          {/* Navigation Route Overlay Line */}
          {destinationLocation && (
            <NavigationRoute
              pathCoordinates={pathCoordinates}
              startPoint={startLocation}
              destinationPoint={destinationLocation}
              totalDistance={totalDistance}
            />
          )}

          {/* Interactive Location Markers */}
          {locations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const isStart = startLocation?.id === loc.id;
            const isDest = destinationLocation?.id === loc.id;

            return (
              <LocationMarker
                key={loc.id}
                location={loc}
                isSelected={isSelected}
                isStart={isStart}
                isDestination={isDest}
                isEditMode={isEditMode}
                onSelect={onSelectLocation}
                onDragStart={handleMarkerDragStart}
              />
            );
          })}
        </svg>
      </div>

      {/* Active Edit Mode Indicator Banner */}
      {isEditMode && (
        <div className="edit-mode-active-banner">
          <div className="banner-pulse-dot" />
          <span>Edit Mode Active: Click or drag any marker on the map to re-position. Use the side panel to edit details.</span>
        </div>
      )}
    </div>
  );
};

export default AirportMap;
