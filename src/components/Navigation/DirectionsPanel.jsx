import React from 'react';
import {
  Compass,
  ArrowUp,
  CornerDownRight,
  CornerDownLeft,
  RotateCcw,
  MapPin,
  Clock,
  Footprints,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const STEP_ICONS = {
  Compass,
  ArrowUp,
  CornerDownRight,
  CornerDownLeft,
  RotateCcw,
  MapPin
};

export const DirectionsPanel = ({
  steps = [],
  startLocation,
  destinationLocation,
  totalDistance,
  estimatedTime,
  stepCount,
  onClose
}) => {
  return (
    <div className="directions-drawer-panel glass-card animate-slide-in-right">
      {/* Drawer Header */}
      <div className="drawer-header">
        <div>
          <div className="drawer-subtitle">Step-by-Step Directions</div>
          <h3 className="drawer-title">{destinationLocation?.name}</h3>
        </div>
        <button type="button" className="close-drawer-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Metrics Summary Badge */}
      <div className="directions-summary-banner">
        <div className="summary-col">
          <span className="col-label">Walking Distance</span>
          <span className="col-val">{totalDistance} meters</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-col">
          <span className="col-label">Est. Time</span>
          <span className="col-val accent">{estimatedTime}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-col">
          <span className="col-label">Pedometer</span>
          <span className="col-val">~{stepCount} steps</span>
        </div>
      </div>

      {/* Turn-by-Turn Instruction List */}
      <div className="directions-step-list">
        {steps.map((step, idx) => {
          const IconComp = STEP_ICONS[step.icon] || ArrowUp;
          const isLast = idx === steps.length - 1;

          return (
            <div key={idx} className={`direction-step-card ${isLast ? 'destination-step' : ''}`}>
              <div className="step-left-column">
                <div className="step-badge-number">{step.stepNumber}</div>
                {!isLast && <div className="step-timeline-connector" />}
              </div>

              <div className="step-body">
                <div className="step-icon-wrap">
                  <IconComp size={16} />
                </div>
                <div className="step-text-content">
                  <div className="step-main-instruction">{step.instruction}</div>
                  <div className="step-sub-detail">{step.detail}</div>
                  {step.distanceMeters > 0 && (
                    <div className="step-dist-pill">
                      <span>{step.distanceMeters} meters</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectionsPanel;
