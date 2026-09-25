import { supabase } from '../lib/supabase';

export const getFlightByNumber = async (flightNumber) => {
  const { data, error } = await supabase
    .from('saa_flights')
    .select('*')
    .ilike('flight_number', `%${flightNumber}%`)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

export const getFlightsByAirline = async (airline) => {
  const { data, error } = await supabase
    .from('saa_flights')
    .select('*')
    .ilike('airline', `%${airline}%`);
  if (error) throw error;
  return data;
};

export const getGateAssignment = async (flightNumber) => {
  const { data, error } = await supabase
    .from('saa_gate_assignments')
    .select('*')
    .eq('flight_number', flightNumber)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

export const getFlightRegistration = async (flightNumber) => {
  const { data, error } = await supabase
    .from('saa_flight_registrations')
    .select('*')
    .eq('flight_number', flightNumber)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};
