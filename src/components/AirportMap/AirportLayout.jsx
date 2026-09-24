import React from 'react';

export const AirportLayout = ({ mapLayout, isIsometric }) => {
  const { width = 1000, height = 650, concourses = [] } = mapLayout || {};

  return (
    <g className="airport-layout-graphics">
      <defs>
        {/* 3D Floor Grid Pattern */}
        <pattern id="isoGrid3D" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 20 L 40 40 L 80 20 Z" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
          <line x1="0" y1="20" x2="80" y2="20" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="0.8" />
        </pattern>

        {/* 3D Floor Base Slab Gradients */}
        <linearGradient id="floorSlabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0b192e" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#0f2444" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#081224" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="floorSlabBevel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="concourse3DGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#132a4a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0a1628" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="wallExtrusionSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#031f4b" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="wallExtrusionFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
        </linearGradient>

        {/* Realistic Ground Drop Shadow Filter */}
        <filter id="depthDropShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="12" dy="22" stdDeviation="10" floodColor="#000000" floodOpacity="0.75" />
          <feDropShadow dx="4" dy="8" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.25" />
        </filter>

        <filter id="wallGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ground Shadow Projection Base */}
      {isIsometric && (
        <rect
          x="48"
          y="56"
          width={width - 80}
          height={height - 80}
          rx="28"
          fill="#000000"
          opacity="0.6"
          filter="blur(16px)"
        />
      )}

      {/* 3D Extruded Outer Foundation Bottom Layer */}
      {isIsometric && (
        <rect
          x="40"
          y="54"
          width={width - 80}
          height={height - 70}
          rx="28"
          fill="url(#wallExtrusionSide)"
          opacity="0.85"
        />
      )}

      {/* Main Terminal 3D Floor Surface */}
      <rect
        x="40"
        y="40"
        width={width - 80}
        height={height - 80}
        rx="26"
        fill="url(#floorSlabGrad)"
        stroke="url(#floorSlabBevel)"
        strokeWidth="2.5"
        filter="url(#depthDropShadow)"
      />

      {/* Tile Grid Texture Overlay */}
      <rect x="40" y="40" width={width - 80} height={height - 80} rx="26" fill="url(#isoGrid3D)" opacity="0.8" />

      {/* Exterior Architectural Glass Curtain Wall Rim */}
      {isIsometric && (
        <g className="outer-3d-wall-rim">
          <path
            d={`M 40,${height - 40} L 40,${height - 24} Q 40,${height - 12} 56,${height - 12} L ${width - 56},${height - 12} Q ${width - 40},${height - 12} ${width - 40},${height - 24} L ${width - 40},${height - 40} Z`}
            fill="url(#wallExtrusionFront)"
            opacity="0.85"
          />
          <path
            d={`M 40,40 L 26,52 L 26,${height - 32} L 40,${height - 40} Z`}
            fill="url(#wallExtrusionSide)"
            opacity="0.75"
          />
        </g>
      )}

      {/* 3D Extruded Building Concourse Zones */}
      {concourses.map((concourse) => {
        const { bounds, label, id } = concourse;
        if (!bounds) return null;

        const wallHeight = isIsometric ? 12 : 0;

        return (
          <g key={id} className="concourse-3d-zone">
            {/* Ground Shadow for Concourse Box */}
            {isIsometric && (
              <rect
                x={bounds.x + 4}
                y={bounds.y + 8}
                width={bounds.w}
                height={bounds.h}
                rx="14"
                fill="#000000"
                opacity="0.45"
                filter="blur(6px)"
              />
            )}

            {/* Concourse Extruded Side Wall Face */}
            {isIsometric && (
              <rect
                x={bounds.x}
                y={bounds.y + bounds.h - wallHeight}
                width={bounds.w}
                height={wallHeight}
                rx="6"
                fill="url(#wallExtrusionSide)"
                opacity="0.9"
              />
            )}

            {/* Concourse Roof/Floor Top Surface */}
            <rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.w}
              height={bounds.h - (isIsometric ? wallHeight / 2 : 0)}
              rx="14"
              fill="url(#concourse3DGrad)"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeOpacity="0.45"
            />

            {/* Inner Glass Partition Accent Lines */}
            <rect
              x={bounds.x + 6}
              y={bounds.y + 6}
              width={bounds.w - 12}
              height={bounds.h - 12 - (isIsometric ? wallHeight / 2 : 0)}
              rx="10"
              fill="none"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1"
              strokeDasharray="6 4"
            />

            {/* Concourse Label Badge Floating Header */}
            <g transform={`translate(${bounds.x + bounds.w / 2}, ${bounds.y + 22})`}>
              <rect
                x="-50"
                y="-12"
                width="100"
                height="20"
                rx="10"
                fill="rgba(15, 23, 42, 0.85)"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="1"
              />
              <text
                x="0"
                y="2"
                fill="#38bdf8"
                fontSize="10"
                fontWeight="800"
                letterSpacing="1.2"
                textAnchor="middle"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {label.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}

      {/* Illuminated 3D Corridors & Main Spine Walkways */}
      <g className="walkway-spine-lines">
        {/* Horizontal Main Spine */}
        <line x1="120" y1="200" x2={width - 120} y2="200" stroke="#00b4d8" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
        <line x1="120" y1="200" x2={width - 120} y2="200" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.8" />

        {/* Vertical Center Spine */}
        <line x1="500" y1="120" x2="500" y2="480" stroke="#00b4d8" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
        <line x1="500" y1="120" x2="500" y2="480" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.8" />

        {/* Decorative Entrance Threshold Portal */}
        <rect x="470" y="475" width="60" height="12" rx="4" fill="#0284c7" opacity="0.6" />
        <text x="500" y="468" fill="#a5f3fc" fontSize="9" fontWeight="800" textAnchor="middle">ENTRANCE PORTAL</text>
      </g>
    </g>
  );
};

export default AirportLayout;

