import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  // true = user has completed Language + Passport onboarding steps
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Derive onboarding status from user_metadata
  const deriveOnboarding = (supabaseUser) => {
    if (!supabaseUser) return false;
    const meta = supabaseUser.user_metadata || {};
    return meta.onboarding_complete === true;
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        setSession(session);
        const u = session?.user || null;
        setUser(u);
        setOnboardingComplete(deriveOnboarding(u));
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      setSession(session);
      setUser(u);
      setOnboardingComplete(deriveOnboarding(u));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const register = async (email, password, name, phone) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone,
          // New users have NOT completed onboarding yet
          onboarding_complete: false,
        }
      }
    });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      // Uses origin so it works on both localhost and Vercel deployments
      redirectTo: `${window.location.origin}/reset-password`,
    });
  };

  const updatePassword = async (newPassword) => {
    return await supabase.auth.updateUser({ password: newPassword });
  };

  /**
   * Google OAuth login.
   * @param {string} mode - 'signin' for existing users (→ dashboard),
   *                        'signup' for new users (→ onboarding).
   */
  const loginWithProvider = async (provider, mode = 'signin') => {
    // Pass the mode in the state param so the callback can read it
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // After OAuth, land on /auth/callback which will decide the route
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
        // Encode the intended mode so callback can route correctly
        // (Supabase passes this through the `state` query param)
        data: { mode },
      }
    });
  };

  /**
   * Mark onboarding as complete in Supabase user_metadata.
   * Called from PassportDetails after successful save.
   */
  const completeOnboarding = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { onboarding_complete: true }
    });
    if (!error && data?.user) {
      setOnboardingComplete(true);
      setUser(data.user);
    }
    return { data, error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      onboardingComplete,
      login,
      register,
      logout,
      resetPassword,
      updatePassword,
      loginWithProvider,
      completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
