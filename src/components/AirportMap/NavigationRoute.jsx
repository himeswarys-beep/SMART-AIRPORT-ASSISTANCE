import React from 'react';
import { Footprints, MapPin } from 'lucide-react';

export const NavigationRoute = ({
  pathCoordinates = [],
  startPoint,
  destinationPoint,
  totalDistance
}) => {
  if (!pathCoordinates || pathCoordinates.length < 2) {
    if (startPoint && destinationPoint) {
      pathCoordinates = [
        { x: startPoint.position.x, y: startPoint.position.y },
        { x: destinationPoint.position.x, y: destinationPoint.position.y }
      ];
    } else {
      return null;
    }
  }

  // SVG path string `M x0,y0 L x1,y1 L x2,y2 ...`
  const pathD = pathCoordinates.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x},${point.y}`;
    return `${acc} L ${point.x},${point.y}`;
  }, '');

  // Shifted ground shadow path
  const shadowPathD = pathCoordinates.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x + 8},${point.y + 14}`;
    return `${acc} L ${point.x + 8},${point.y + 14}`;
  }, '');

  const originX = startPoint?.position?.x ?? pathCoordinates[0].x;
  const originY = startPoint?.position?.y ?? pathCoordinates[0].y;
  const targetX = destinationPoint?.position?.x ?? pathCoordinates[pathCoordinates.length - 1].x;
  const targetY = destinationPoint?.position?.y ?? pathCoordinates[pathCoordinates.length - 1].y;

  return (
    <g className="navigation-route-3d-layer">
      <defs>
        {/* Glow & 3D Ribbon Filters */}
        <filter id="route3DGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="routeGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="30%" stopColor="#00b4d8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      {/* 3D Ground Drop Shadow Projection for Path Ribbon */}
      <path
        d={shadowPathD}
        fill="none"
        stroke="#000000"
        strokeWidth="12"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="blur(5px)"
      />

      {/* Outer Cyan Glow Backing */}
      <path
        d={pathD}
        fill="none"
        stroke="#00b4d8"
        strokeWidth="14"
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#route3DGlow)"
      />

      {/* Solid Elevated 3D Ribbon Base Line */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#routeGradient3D)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated Flow Dash Overlay */}
      <path
        d={pathD}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 10"
        className="animated-route-dash"
        opacity="0.95"
      />

      {/* Waypoint nodes along the path */}
      {pathCoordinates.map((pt, idx) => (
        <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        </g>
      ))}

      {/* YOU ARE HERE - 3D START BEACON */}
      <g transform={`translate(${originX}, ${originY})`}>
        <ellipse cx="0" cy="14" rx="14" ry="6" fill="rgba(0,0,0,0.5)" />
        <circle cx="0" cy="-14" r="22" fill="rgba(16, 185, 129, 0.25)" className="start-pulse-beacon" />
        <circle cx="0" cy="-14" r="12" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
        <g transform="translate(0, -42)">
          <rect x="-56" y="-12" width="112" height="20" rx="10" fill="#021a36" stroke="#10b981" strokeWidth="1.5" />
          <text
            x="0"
            y="2"
            fill="#10b981"
            fontSize="10"
            fontWeight="800"
            textAnchor="middle"
            style={{ letterSpacing: '0.04em' }}
          >
            📍 YOU ARE HERE
          </text>
        </g>
      </g>

      {/* DESTINATION TARGET - 3D DEST BEACON */}
      <g transform={`translate(${targetX}, ${targetY})`}>
        <ellipse cx="0" cy="14" rx="16" ry="7" fill="rgba(0,0,0,0.5)" />
        <circle cx="0" cy="-14" r="24" fill="rgba(249, 115, 22, 0.3)" className="dest-pulse-beacon" />
        <circle cx="0" cy="-14" r="14" fill="#f97316" stroke="#ffffff" strokeWidth="2.5" />
        <path
          d="M -5,-19 L 5,-9 M 5,-19 L -5,-9"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g transform="translate(0, -44)">
          <rect x="-60" y="-12" width="120" height="20" rx="10" fill="#021a36" stroke="#f97316" strokeWidth="1.5" />
          <text
            x="0"
            y="2"
            fill="#f97316"
            fontSize="10"
            fontWeight="800"
            textAnchor="middle"
            style={{ letterSpacing: '0.04em' }}
          >
            🎯 DESTINATION
          </text>
        </g>
      </g>
    </g>
  );
};

export default NavigationRoute;

