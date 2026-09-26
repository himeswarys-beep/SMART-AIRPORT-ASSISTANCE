import { createClient } from '@supabase/supabase-js';

// Support multiple env var naming conventions:
// - VITE_SUPABASE_ANON_KEY  (standard / Vercel recommended)
// - VITE_SUPABASE_PUBLISHABLE_KEY (legacy local .env name)
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
    '[AEROVA] VITE_SUPABASE_URL is missing or invalid.\n' +
    'Add it in Vercel → Project → Settings → Environment Variables.\n' +
    `Current value: ${supabaseUrl}`
  );
}
if (!isValidKey) {
  console.error(
    '[AEROVA] Supabase key env var is missing.\n' +
    'Add VITE_SUPABASE_ANON_KEY in Vercel → Project → Settings → Environment Variables.'
  );
}

// Use a dummy URL/key so the app renders without crashing;
// any auth call will return a proper error instead of a blank white screen.
export const supabase = createClient(
  isValid ? supabaseUrl : 'https://placeholder.supabase.co',
  isValid ? supabaseKey : 'placeholder-anon-key'
);