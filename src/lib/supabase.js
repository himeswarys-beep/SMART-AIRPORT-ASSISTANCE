import { createClient } from '@supabase/supabase-js';

// Support standard Vite env variable conventions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const isValidUrl =
  typeof supabaseUrl === 'string' && supabaseUrl.startsWith('https://');
const isValidKey =
  typeof supabaseKey === 'string' && supabaseKey.length > 10;
const isValid = isValidUrl && isValidKey;

if (!isValidUrl) {
  console.error(
    '[AEROVA Supabase Error]: VITE_SUPABASE_URL is missing or invalid.\n' +
    'Please set VITE_SUPABASE_URL in your Vercel/Netlify Project Environment Variables.\n' +
    `Received: ${supabaseUrl}`
  );
}
if (!isValidKey) {
  console.error(
    '[AEROVA Supabase Error]: VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) is missing.\n' +
    'Please set VITE_SUPABASE_ANON_KEY in your Vercel/Netlify Project Environment Variables.'
  );
}

// Create client with fallback dummy values if missing, ensuring non-crashing initialization
export const supabase = createClient(
  isValidUrl ? supabaseUrl : 'https://placeholder.supabase.co',
  isValidKey ? supabaseKey : 'placeholder-anon-key'
);
