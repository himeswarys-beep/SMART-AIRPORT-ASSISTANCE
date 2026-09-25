import { supabase } from '../lib/supabase';

export const getBaggageTracking = async (flightNumber) => {
  const { data, error } = await supabase
    .from('saa_baggage_tracking')
    .select('*')
    .eq('flight_number', flightNumber)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};
