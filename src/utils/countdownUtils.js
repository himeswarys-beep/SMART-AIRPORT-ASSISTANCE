/**
 * Utility to calculate exact remaining boarding countdown time
 * based on actual flight date and time.
 */

export function parseFlightDateTime(dateInput, timeInput) {
  if (!dateInput) return null;

  let year, month, day;

  if (dateInput instanceof Date) {
    year = dateInput.getFullYear();
    month = dateInput.getMonth();
    day = dateInput.getDate();
  } else if (typeof dateInput === "string") {
    const isoMatch = dateInput.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (isoMatch) {
      year = parseInt(isoMatch[1], 10);
      month = parseInt(isoMatch[2], 10) - 1;
      day = parseInt(isoMatch[3], 10);
    } else {
      const parsed = new Date(dateInput);
      if (!isNaN(parsed.getTime())) {
        year = parsed.getFullYear();
        month = parsed.getMonth();
        day = parsed.getDate();
      } else {
        return null;
      }
    }
  } else {
    return null;
  }

  let hours = 0;
  let minutes = 0;

  if (timeInput) {
    const cleanTime = String(timeInput).replace(/\s*IST\s*/i, "").trim();

    // Check 12-hour format e.g. "5:20 PM", "05:20 PM", "6:00 AM", "12:00 PM"
    const ampmMatch = cleanTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (ampmMatch) {
      hours = parseInt(ampmMatch[1], 10);
      minutes = parseInt(ampmMatch[2], 10);
      const ampm = ampmMatch[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
    } else {
      // Check 24-hour format e.g. "17:20", "18:00", "08:45"
      const h24Match = cleanTime.match(/^(\d{1,2}):(\d{2})/);
      if (h24Match) {
        hours = parseInt(h24Match[1], 10);
        minutes = parseInt(h24Match[2], 10);
      }
    }
  }

  const dt = new Date(year, month, day, hours, minutes, 0, 0);
  if (isNaN(dt.getTime())) return null;
  return dt;
}

export function calculateBoardingCountdown(flightData, now = new Date()) {
  if (!flightData) {
    return {
      status: "unavailable",
      displayText: "Boarding time unavailable",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0
    };
  }

  // Extract date string
  const dateStr =
    flightData.departureDate ||
    flightData.fromDate ||
    flightData.flightDate ||
    flightData.date;

  // Extract departure time string
  const depTimeStr =
    flightData.depTime ||
    flightData.departureTime ||
    flightData.fromTime;

  // Extract boarding time string (if present)
  const boardingTimeStr =
    flightData.boardingTime ||
    flightData.boarding_time;

  if (!dateStr || (!depTimeStr && !boardingTimeStr)) {
    return {
      status: "unavailable",
      displayText: "Boarding time unavailable",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0
    };
  }

  // Parse departure DateTime
  const depDateTime = parseFlightDateTime(dateStr, depTimeStr);

  // Parse explicit boarding DateTime if given
  let boardingStartDateTime = null;
  if (boardingTimeStr) {
    boardingStartDateTime = parseFlightDateTime(dateStr, boardingTimeStr);
  }

  // If no explicit boarding time, assume boarding starts 40 minutes before departure
  if (!boardingStartDateTime && depDateTime) {
    boardingStartDateTime = new Date(depDateTime.getTime() - 40 * 60 * 1000);
  }

  if (!boardingStartDateTime && !depDateTime) {
    return {
      status: "unavailable",
      displayText: "Boarding time unavailable",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0
    };
  }

  // Gate closes at departure time
  const gateCloseDateTime = depDateTime || new Date(boardingStartDateTime.getTime() + 40 * 60 * 1000);

  const nowMs = now.getTime();
  const boardingStartMs = boardingStartDateTime.getTime();
  const gateCloseMs = gateCloseDateTime.getTime();

  // If past departure/gate close
  if (nowMs >= gateCloseMs) {
    return {
      status: "closed",
      displayText: "Boarding Closed",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0
    };
  }

  // If currently boarding (between boarding start and departure time)
  if (nowMs >= boardingStartMs && nowMs < gateCloseMs) {
    return {
      status: "now",
      displayText: "Boarding Now",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: gateCloseMs - nowMs
    };
  }

  // Difference until boarding starts
  const diffMs = boardingStartMs - nowMs;
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const displayText = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  return {
    status: "countdown",
    displayText,
    days,
    hours,
    minutes,
    seconds,
    totalMs: diffMs
  };
}

