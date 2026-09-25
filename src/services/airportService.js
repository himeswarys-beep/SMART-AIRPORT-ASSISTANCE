import { supabase } from '../lib/supabase';

export const getAirport = async (airportCode) => {
  const { data, error } = await supabase
    .from('saa_airports')
    .select('*')
    .eq('airport_code', airportCode)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

export const getAirline = async (airlineCode) => {
  const { data, error } = await supabase
    .from('saa_airlines')
    .select('*')
    .eq('airline_code', airlineCode)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};
