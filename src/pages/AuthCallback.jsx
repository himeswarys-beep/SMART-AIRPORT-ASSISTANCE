import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * AuthCallback
 *
 * Supabase redirects the user here after Google OAuth.
 * We check user_metadata.onboarding_complete to decide:
 *   - Existing user (onboarding_complete === true)  → /dashboard
 *   - New user (onboarding_complete !== true)        → /language
 *
 * The "mode" hint passed via loginWithProvider is supplementary —
 * we ALWAYS trust onboarding_complete in Supabase as the source of truth.
 */
export const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Completing sign-in...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Exchange the code/token in the URL for a session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('[AEROVA AuthCallback] Session error:', error);
          setStatus('Authentication error. Redirecting to sign in...');
          setTimeout(() => navigate('/auth'), 2000);
          return;
        }

        const user = data?.session?.user;

        if (!user) {
          // No session — go back to auth
          navigate('/auth');
          return;
        }

        const meta = user.user_metadata || {};
        const isOnboarded = meta.onboarding_complete === true;

        if (isOnboarded) {
          // Existing registered user — go straight to Dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // New user — must complete Language + Passport onboarding first
          navigate('/language', { replace: true });
        }
      } catch (err) {
        console.error('[AEROVA AuthCallback] Unexpected error:', err);
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary, #050b18)',
        color: 'var(--text-primary, #e2e8f0)',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
        gap: '16px',
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '3px solid rgba(56,189,248,0.2)',
          borderTop: '3px solid #38bdf8',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <p style={{ fontSize: '1rem', opacity: 0.8 }}>{status}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AuthCallback;
