import { supabase } from '../lib/supabase';

export const getDelayPrediction = async (flightNumber) => {
  const { data, error } = await supabase
    .from('saa_delay_predictions')
    .select('*')
    .eq('flight_number', flightNumber)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};

export const getQueuePrediction = async (airportCode) => {
  const { data, error } = await supabase
    .from('saa_queue_predictions')
    .select('*')
    .eq('airport_code', airportCode)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
};
