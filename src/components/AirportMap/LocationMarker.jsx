import React from 'react';
import {
  Plane,
  Ticket,
  ShieldCheck,
  UserCheck,
  Luggage,
  DoorOpen,
  DoorClosed,
  Users,
  Utensils,
  Coffee,
  Droplets,
  Baby,
  HeartPulse,
  Banknote,
  Armchair,
  Info,
  ShoppingBag,
  ArrowUpDown,
  TrendingUp,
  MapPin,
  Move
} from 'lucide-react';

const ICON_MAP = {
  Plane,
  Ticket,
  ShieldCheck,
  UserCheck,
  Luggage,
  DoorOpen,
  DoorClosed,
  Users,
  Utensils,
  Coffee,
  Droplets,
  Baby,
  HeartPulse,
  Banknote,
  Armchair,
  Info,
  ShoppingBag,
  ArrowUpDown,
  TrendingUp,
  MapPin
};

export const LocationMarker = ({
  location,
  isSelected,
  isStart,
  isDestination,
  isEditMode,
  onSelect,
  onDragStart
}) => {
  const IconComponent = ICON_MAP[location.icon] || MapPin;
  const markerColor = location.color || '#3b82f6';

  const { x, y } = location.position;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`map-marker-group ${isSelected ? 'selected' : ''} ${isStart ? 'is-start' : ''} ${isDestination ? 'is-dest' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(location);
      }}
      style={{ cursor: isEditMode ? 'grab' : 'pointer' }}
    >
      {/* Outer Pulse aura for active destination or start */}
      {(isSelected || isDestination) && (
        <circle
          cx="0"
          cy="0"
          r="26"
          fill={isDestination ? 'rgba(251, 146, 60, 0.25)' : 'rgba(56, 189, 248, 0.25)'}
          className="beacon-pulse-ring"
        />
      )}

      {/* Isometric Shadow Underlay */}
      <ellipse cx="0" cy="12" rx="14" ry="6" fill="rgba(0, 0, 0, 0.35)" />

      {/* Marker Base Shape */}
      <g className="marker-pin-body">
        {/* Main Marker Circle */}
        <circle
          cx="0"
          cy="0"
          r={isSelected ? "18" : "15"}
          fill={isSelected ? '#1e293b' : markerColor}
          stroke={isSelected ? (isDestination ? '#fb923c' : '#38bdf8') : '#ffffff'}
          strokeWidth={isSelected ? "3" : "2"}
          filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"
        />

        {/* Icon Component */}
        <foreignObject x="-9" y="-9" width="18" height="18" style={{ pointerEvents: 'none' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isSelected ? '#ffffff' : '#ffffff'
            }}
          >
            <IconComponent size={12} strokeWidth={2.5} />
          </div>
        </foreignObject>
      </g>

      {/* Edit Handle Badge in Edit Mode */}
      {isEditMode && (
        <circle
          cx="12"
          cy="-12"
          r="7"
          fill="#ef4444"
          stroke="#ffffff"
          strokeWidth="1.5"
          className="edit-drag-handle"
          onMouseDown={(e) => {
            e.stopPropagation();
            onDragStart(location, e);
          }}
        />
      )}

      {/* Label Badge */}
      <g transform="translate(0, 26)">
        <rect
          x="-50"
          y="0"
          width="100"
          height="18"
          rx="9"
          fill={isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.75)'}
          stroke={isSelected ? markerColor : 'rgba(255, 255, 255, 0.2)'}
          strokeWidth="1"
        />
        <text
          x="0"
          y="12"
          fill={isSelected ? '#ffffff' : '#e2e8f0'}
          fontSize="9.5"
          fontWeight={isSelected ? "bold" : "600"}
          textAnchor="middle"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {location.name.length > 15 ? location.name.slice(0, 13) + '..' : location.name}
        </text>
      </g>
    </g>
  );
};

export default LocationMarker;
