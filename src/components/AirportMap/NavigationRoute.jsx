import React from 'react';
import { Footprints, MapPin } from 'lucide-react';

export const NavigationRoute = ({
  pathCoordinates = [],
  startPoint,
  destinationPoint,
  totalDistance
}) => {
  if (!pathCoordinates || pathCoordinates.length < 2) {
    // If no complex graph path, draw direct path from start to destination
    if (startPoint && destinationPoint) {
      pathCoordinates = [
        { x: startPoint.position.x, y: startPoint.position.y },
        { x: destinationPoint.position.x, y: destinationPoint.position.y }
      ];
    } else {
      return null;
    }
  }

  // Build SVG path string `M x0,y0 L x1,y1 L x2,y2 ...`
  const pathD = pathCoordinates.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x},${point.y}`;
    return `${acc} L ${point.x},${point.y}`;
  }, '');

  const originX = startPoint?.position?.x ?? pathCoordinates[0].x;
  const originY = startPoint?.position?.y ?? pathCoordinates[0].y;
  const targetX = destinationPoint?.position?.x ?? pathCoordinates[pathCoordinates.length - 1].x;
  const targetY = destinationPoint?.position?.y ?? pathCoordinates[pathCoordinates.length - 1].y;

  return (
    <g className="navigation-route-layer">
      <defs>
        {/* Glow Filter */}
        <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      {/* Underlay Outer Glow */}
      <path
        d={pathD}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="10"
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#routeGlow)"
      />

      {/* Animated Walking Path Base Line */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#routeGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 6"
        className="animated-route-dash"
      />

      {/* Waypoint circles */}
      {pathCoordinates.map((pt, idx) => (
        <circle
          key={idx}
          cx={pt.x}
          cy={pt.y}
          r="4"
          fill="#ffffff"
          stroke="#0284c7"
          strokeWidth="2"
        />
      ))}

      {/* YOU ARE HERE Marker */}
      <g transform={`translate(${originX}, ${originY})`}>
        <circle cx="0" cy="0" r="18" fill="rgba(56, 189, 248, 0.3)" className="start-pulse-beacon" />
        <circle cx="0" cy="0" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
        <text
          x="0"
          y="-22"
          fill="#38bdf8"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          📍 YOU ARE HERE
        </text>
      </g>

      {/* DESTINATION TARGET PIN */}
      <g transform={`translate(${targetX}, ${targetY})`}>
        <circle cx="0" cy="0" r="22" fill="rgba(251, 146, 60, 0.35)" className="dest-pulse-beacon" />
        <circle cx="0" cy="0" r="12" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
        <path
          d="M -5,-5 L 5,5 M 5,-5 L -5,5"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g transform="translate(0, -26)">
          <rect x="-45" y="-12" width="90" height="18" rx="9" fill="#ea580c" />
          <text
            x="0"
            y="0"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            🎯 DESTINATION
          </text>
        </g>
      </g>
    </g>
  );
};

export default NavigationRoute;
