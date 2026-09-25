import { createClient } from '@supabase/supabase-js';

// Support both Vercel (VITE_SUPABASE_ANON_KEY) and local (.env VITE_SUPABASE_PUBLISHABLE_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Guard: if env vars are missing (e.g. misconfigured deployment), create a
// safe dummy client that won't crash the app with "Invalid supabaseUrl".
const FALLBACK_URL = 'https://placeholder.supabase.co';
const FALLBACK_KEY = 'placeholder-anon-key';

const isValid =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.startsWith('http') &&
  typeof supabaseKey === 'string' &&
  supabaseKey.length > 10;

if (!isValid) {
  console.warn(
    '[AEROVA] Supabase env vars missing or invalid.\n' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel project settings.'
  );
}

export const supabase = createClient(
  isValid ? supabaseUrl : FALLBACK_URL,
  isValid ? supabaseKey : FALLBACK_KEY
);