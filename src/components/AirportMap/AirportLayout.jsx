import React from 'react';

export const AirportLayout = ({ mapLayout, isIsometric }) => {
  const { width = 1000, height = 650, concourses = [] } = mapLayout || {};

  return (
    <g className="airport-layout-graphics">
      <defs>
        {/* Isometric Grid Pattern */}
        <pattern id="isoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 20 L 40 40 L 80 20 Z" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
        </pattern>

        {/* Building Floor Gradients */}
        <linearGradient id="floorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="concourseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="wall3DTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
        </linearGradient>

        {/* Soft Drop Shadow for Isometric Perspective */}
        <filter id="isoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="8" dy="12" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Main Terminal Floor Grid Base */}
      <rect
        x="40"
        y="40"
        width={width - 80}
        height={height - 80}
        rx="24"
        fill="url(#floorGrad)"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeOpacity="0.3"
        filter="url(#isoShadow)"
      />

      {/* Subtile Iso Grid Overlay */}
      <rect x="40" y="40" width={width - 80} height={height - 80} rx="24" fill="url(#isoGrid)" opacity="0.6" />

      {/* Outer Wall 3D Rim / Elevation Effect */}
      {isIsometric && (
        <path
          d={`M 40,${height - 40} L 40,${height - 30} Q 40,${height - 16} 56,${height - 16} L ${width - 56},${height - 16} Q ${width - 40},${height - 16} ${width - 40},${height - 30} L ${width - 40},${height - 40} Z`}
          fill="url(#wall3DTop)"
          opacity="0.6"
        />
      )}

      {/* Dynamic Concourses & Building Zones */}
      {concourses.map((concourse) => {
        const { bounds, label, id } = concourse;
        if (!bounds) return null;

        return (
          <g key={id} className="concourse-zone-group">
            {/* Zone Floor Pad */}
            <rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.w}
              height={bounds.h}
              rx="12"
              fill="url(#concourseGrad)"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeOpacity="0.4"
            />

            {/* 3D Wall Edge for Isometric depth */}
            {isIsometric && (
              <rect
                x={bounds.x}
                y={bounds.y + bounds.h - 4}
                width={bounds.w}
                height="6"
                rx="3"
                fill="#2563eb"
                opacity="0.4"
              />
            )}

            {/* Concourse Label Header */}
            <text
              x={bounds.x + bounds.w / 2}
              y={bounds.y + 20}
              fill="#94a3b8"
              fontSize="11"
              fontWeight="bold"
              letterSpacing="1.5"
              textAnchor="middle"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Illuminated Main Spine Walking Corridors */}
      <line x1="120" y1="200" x2={width - 120} y2="200" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <line x1="500" y1="120" x2="500" y2="480" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    </g>
  );
};

export default AirportLayout;
