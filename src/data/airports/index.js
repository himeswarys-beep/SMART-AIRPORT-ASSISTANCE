import { chennaiAirport } from './chennaiAirport';
import { coimbatoreAirport } from './coimbatoreAirport';
import { trichyAirport } from './trichyAirport';
import { maduraiAirport } from './maduraiAirport';
import { salemAirport } from './salemAirport';
import { thoothukudiAirport } from './thoothukudiAirport';

export {
  chennaiAirport,
  coimbatoreAirport,
  trichyAirport,
  maduraiAirport,
  salemAirport,
  thoothukudiAirport
};

export const airportsList = [
  chennaiAirport,
  coimbatoreAirport,
  trichyAirport,
  maduraiAirport,
  salemAirport,
  thoothukudiAirport
];

export const airportsMap = {
  chennai: chennaiAirport,
  coimbatore: coimbatoreAirport,
  trichy: trichyAirport,
  madurai: maduraiAirport,
  salem: salemAirport,
  thoothukudi: thoothukudiAirport
};

// Helper function to load airport by ID (with localStorage persistence support for custom user edits)
export const getAirportData = (airportId) => {
  const defaultData = airportsMap[airportId] || chennaiAirport;
  try {
    const savedCustom = localStorage.getItem(`saa_map_edit_${airportId}`);
    if (savedCustom) {
      const parsed = JSON.parse(savedCustom);
      return {
        ...defaultData,
        ...parsed,
        locations: parsed.locations || defaultData.locations,
        nodes: parsed.nodes || defaultData.nodes,
        connections: parsed.connections || defaultData.connections
      };
    }
  } catch (err) {
    console.error("Error reading saved airport state:", err);
  }
  return defaultData;
};

// Save edited airport layout into localStorage
export const saveAirportData = (airportId, updatedLocations, updatedNodes, updatedConnections) => {
  try {
    const dataToSave = {
      locations: updatedLocations,
      nodes: updatedNodes || [],
      connections: updatedConnections || []
    };
    localStorage.setItem(`saa_map_edit_${airportId}`, JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Error saving custom airport state:", err);
  }
};

// Reset airport to factory defaults
export const resetAirportData = (airportId) => {
  try {
    localStorage.removeItem(`saa_map_edit_${airportId}`);
  } catch (err) {
    console.error("Error clearing custom airport state:", err);
  }
  return airportsMap[airportId] || chennaiAirport;
};
