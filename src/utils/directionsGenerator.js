/**
 * Generates turn-by-turn navigation steps based on path nodes & target location
 */

export const generateStepByStepDirections = (startLocation, destinationLocation, pathWaypoints = []) => {
  if (!startLocation || !destinationLocation) {
    return [];
  }

  const steps = [];

  // Step 1: Initial starting instruction
  steps.push({
    stepNumber: 1,
    type: "start",
    icon: "Compass",
    instruction: `Start at ${startLocation.name || 'your current location'}`,
    detail: "Locate digital illuminated floor direction signages",
    distanceMeters: 10
  });

  if (pathWaypoints.length > 2) {
    for (let i = 1; i < pathWaypoints.length - 1; i++) {
      const prev = pathWaypoints[i - 1];
      const curr = pathWaypoints[i];
      const next = pathWaypoints[i + 1];

      // Calculate vector angles to determine turn direction (left, right, straight)
      const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x) * (180 / Math.PI);
      const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x) * (180 / Math.PI);
      let diff = angle2 - angle1;

      // Normalize angle diff to [-180, 180]
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;

      const distSegment = Math.round(Math.hypot(next.x - curr.x, next.y - curr.y) * 0.4);

      let turnType = "straight";
      let turnIcon = "ArrowUp";
      let turnText = `Walk straight for ${distSegment} meters`;

      if (diff > 45 && diff < 135) {
        turnType = "turn-right";
        turnIcon = "CornerDownRight";
        turnText = `Turn right towards ${curr.name || 'the hallway'}`;
      } else if (diff >= 135) {
        turnType = "uturn";
        turnIcon = "RotateCcw";
        turnText = `Make a sharp turn towards ${curr.name || 'the corridor'}`;
      } else if (diff < -45 && diff > -135) {
        turnType = "turn-left";
        turnIcon = "CornerDownLeft";
        turnText = `Turn left towards ${curr.name || 'the main aisle'}`;
      } else if (diff <= -135) {
        turnType = "uturn";
        turnIcon = "RotateCcw";
        turnText = `Make a sharp left turn towards ${curr.name || 'the aisle'}`;
      }

      steps.push({
        stepNumber: steps.length + 1,
        type: turnType,
        icon: turnIcon,
        instruction: turnText,
        detail: `Continue past ${curr.name || 'landmark node'}`,
        distanceMeters: Math.max(15, distSegment)
      });
    }
  } else {
    // Direct path default steps
    steps.push({
      stepNumber: 2,
      type: "straight",
      icon: "ArrowUp",
      instruction: `Walk straight along the main terminal walkway`,
      detail: "Follow blue illuminated floor path LED indicators",
      distanceMeters: 30
    });

    if (destinationLocation.category === 'gates') {
      steps.push({
        stepNumber: 3,
        type: "turn-right",
        icon: "CornerDownRight",
        instruction: `Proceed through Security & DigiYatra screening zone`,
        detail: "Keep boarding pass barcode ready for gate reader",
        distanceMeters: 25
      });
    }
  }

  // Final destination step
  steps.push({
    stepNumber: steps.length + 1,
    type: "destination",
    icon: "MapPin",
    instruction: `You have reached ${destinationLocation.name}`,
    detail: destinationLocation.details || "Your target destination is directly ahead",
    distanceMeters: 0
  });

  return steps;
};
