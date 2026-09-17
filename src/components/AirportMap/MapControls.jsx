import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Box,
  Layers,
  Edit3,
  QrCode,
  Radio,
  MapPin,
  CheckCircle2,
  Lock,
  Save
} from 'lucide-react';

export const MapControls = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isIsometric,
  onToggleIsometric,
  isEditMode,
  onToggleEditMode,
  locationMode, // 'manual' | 'qr' | 'ble'
  onChangeLocationMode,
  onOpenQRModal
}) => {
  return (
    <div className="map-controls-toolbar">
      {/* Location Positioning Mode Switcher */}
      <div className="location-mode-pill">
        <span className="mode-label">Positioning:</span>
        <button
          type="button"
          className={`mode-btn ${locationMode === 'manual' ? 'active' : ''}`}
          onClick={() => onChangeLocationMode('manual')}
          title="Manual location select"
        >
          <MapPin size={13} />
          <span>Manual</span>
        </button>

        <button
          type="button"
          className={`mode-btn ${locationMode === 'qr' ? 'active' : ''}`}
          onClick={() => {
            onChangeLocationMode('qr');
            onOpenQRModal();
          }}
          title="Scan Airport Location QR Code"
        >
          <QrCode size={13} />
          <span>QR Scanner</span>
        </button>

        <button
          type="button"
          className={`mode-btn ${locationMode === 'ble' ? 'active' : ''}`}
          onClick={() => onChangeLocationMode('ble')}
          title="Simulated BLE Beacon Indoor Positioning"
        >
          <Radio size={13} className={locationMode === 'ble' ? 'animate-pulse' : ''} />
          <span>BLE Beacon</span>
        </button>
      </div>

      {/* View & Edit Controls */}
      <div className="ctrl-button-group">
        {/* Isometric 3D vs 2D Flat Toggle */}
        <button
          type="button"
          className={`ctrl-icon-btn ${isIsometric ? 'active' : ''}`}
          onClick={onToggleIsometric}
          title={isIsometric ? "Switch to 2D Blueprint View" : "Switch to 3D Isometric View"}
        >
          <Box size={16} />
          <span className="btn-text">{isIsometric ? '3D Isometric' : '2D Blueprint'}</span>
        </button>

        {/* Edit Map Mode Toggle */}
        <button
          type="button"
          className={`ctrl-icon-btn edit-toggle-btn ${isEditMode ? 'active-editing' : ''}`}
          onClick={onToggleEditMode}
          title="Edit map locations, icons, and coordinates"
        >
          <Edit3 size={16} />
          <span className="btn-text">{isEditMode ? 'Editing Map Mode' : 'Edit Map'}</span>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls-cluster">
        <button type="button" className="zoom-btn" onClick={onZoomIn} title="Zoom In (+)">
          <ZoomIn size={16} />
        </button>
        <div className="zoom-display">{(zoomLevel * 100).toFixed(0)}%</div>
        <button type="button" className="zoom-btn" onClick={onZoomOut} title="Zoom Out (-)">
          <ZoomOut size={16} />
        </button>
        <button type="button" className="zoom-btn" onClick={onResetZoom} title="Reset View">
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
