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
  MapPin
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
  const markerColor = location.color || '#00b4d8';

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
      {/* 3D Ground Shadow Ellipse */}
      <ellipse cx="0" cy="18" rx="16" ry="7" fill="rgba(0, 0, 0, 0.55)" filter="blur(2px)" />

      {/* 3D Standoff Pole Stem */}
      <line x1="0" y1="16" x2="0" y2="-6" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Outer Pulse aura for active destination or start */}
      {(isSelected || isDestination || isStart) && (
        <circle
          cx="0"
          cy="-14"
          r="28"
          fill={isDestination ? 'rgba(249, 115, 22, 0.25)' : isStart ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 180, 216, 0.25)'}
          className="beacon-pulse-ring"
        />
      )}

      {/* 3D Floating Pin Head */}
      <g className="marker-pin-body" transform="translate(0, -14)">
        {/* Outer Glow Halo */}
        <circle
          cx="0"
          cy="0"
          r={isSelected ? '21' : '17'}
          fill={isDestination ? '#ea580c' : isStart ? '#10b981' : markerColor}
          opacity="0.35"
          filter="blur(4px)"
        />

        {/* Main Marker Sphere */}
        <circle
          cx="0"
          cy="0"
          r={isSelected ? '19' : '15'}
          fill={isDestination ? 'linear-gradient(135deg, #f97316, #ea580c)' : isStart ? 'linear-gradient(135deg, #10b981, #059669)' : isSelected ? '#021a36' : markerColor}
          stroke={isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)'}
          strokeWidth={isSelected ? '3' : '2'}
          style={{ filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.5))' }}
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
              color: '#ffffff'
            }}
          >
            <IconComponent size={13} strokeWidth={2.5} />
          </div>
        </foreignObject>
      </g>

      {/* Edit Drag Handle */}
      {isEditMode && (
        <circle
          cx="14"
          cy="-24"
          r="8"
          fill="#ef4444"
          stroke="#ffffff"
          strokeWidth="2"
          className="edit-drag-handle"
          onMouseDown={(e) => {
            e.stopPropagation();
            onDragStart(location, e);
          }}
        />
      )}

      {/* Floating 3D Label Pill */}
      <g transform="translate(0, 26)">
        <rect
          x="-52"
          y="0"
          width="104"
          height="20"
          rx="10"
          fill={isSelected ? 'rgba(2, 26, 54, 0.96)' : 'rgba(15, 23, 42, 0.88)'}
          stroke={isSelected ? '#00b4d8' : 'rgba(56, 189, 248, 0.3)'}
          strokeWidth="1.2"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
        />
        <text
          x="0"
          y="13"
          fill={isSelected ? '#ffffff' : '#38bdf8'}
          fontSize="9.5"
          fontWeight={isSelected ? '800' : '700'}
          textAnchor="middle"
          style={{ userSelect: 'none', pointerEvents: 'none', letterSpacing: '0.02em' }}
        >
          {location.name.length > 15 ? location.name.slice(0, 13) + '..' : location.name}
        </text>
      </g>
    </g>
  );
};

export default LocationMarker;

