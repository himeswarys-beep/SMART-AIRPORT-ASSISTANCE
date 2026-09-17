/**
 * Utility functions for calculating indoor walking distances, step count, and estimated duration.
 */

// Average human walking speed indoors: ~1.2 meters/second (approx 72 meters/minute)
const INDOOR_WALKING_SPEED_MPS = 1.2;

/**
 * Calculates Euclidean distance between two 2D points in map coordinates
 */
export const calculateEuclideanDistance = (p1, p2) => {
  if (!p1 || !p2) return 0;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.round(Math.hypot(dx, dy));
};

/**
 * Converts distance meters into estimated walking time formatted string
 * e.g., 85 meters -> "1 min 10 sec" or "2 mins"
 */
export const calculateWalkingTime = (distanceMeters) => {
  if (!distanceMeters || distanceMeters <= 0) return "1 min";

  const totalSeconds = Math.round(distanceMeters / INDOOR_WALKING_SPEED_MPS);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${Math.max(15, remainingSeconds)} sec walk`;
  } else if (remainingSeconds < 15) {
    return `${minutes} min walk`;
  }
  return `${minutes}m ${remainingSeconds}s walk`;
};

/**
 * Calculates estimated step count (~1.31 steps per meter)
 */
export const calculateStepCount = (distanceMeters) => {
  if (!distanceMeters || distanceMeters <= 0) return 0;
  return Math.round(distanceMeters * 1.31);
};
