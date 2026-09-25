import { supabase } from '../lib/supabase';

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('saa_users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};

export const getNotifications = async (userId) => {
  const { data, error } = await supabase
    .from('saa_notifications')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};
