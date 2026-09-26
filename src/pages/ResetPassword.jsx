import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAirport } from '../context/AirportContext';
import { ASSETS } from '../assets/images';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const navigate = useNavigate();
  const { addToast } = useAirport();

  // Check if we arrived via a valid recovery link
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
        setCheckingSession(false);
      }
    });

    // Also check current session in case event already fired
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      }
      setCheckingSession(false);
    };

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    return null;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!newPassword || !confirmPassword) {
      setFormError('Please fill in both password fields.');
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setFormError(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setFormError(error.message);
      } else {
        setIsSuccess(true);
        addToast('Password Updated!', 'Your password has been reset successfully.', 'success');
        navigate('/language');
      }
    } catch (err) {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking session validity
  if (checkingSession) {
    return (
      <div className="auth-page-wrapper">
        <div className="auth-card-container">
          <div className="auth-glass-box" style={{ textAlign: 'center', padding: '60px 32px' }}>
            <div className="auth-loading-spinner" style={{ margin: '0 auto 20px' }}>
              <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--sky-blue)' }} />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Verifying your reset link...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid or expired link
  if (!isValidSession) {
    return (
      <div className="auth-page-wrapper">
        <div className="auth-card-container">
          <div className="auth-glass-box" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '2px solid rgba(239, 68, 68, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#ef4444'
              }}
            >
              <AlertCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Invalid or Expired Link
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              This password reset link is invalid or has expired. Please request a new reset link from the login page.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate('/auth')}
              style={{ width: '100%', padding: '12px' }}
            >
              <span>Return to Login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="auth-page-wrapper">
        <div className="auth-card-container">
          <div className="auth-glass-box" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid var(--status-on-time)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--status-on-time)'
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Password Reset Complete!
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              Your password has been updated successfully. Redirecting you to the dashboard...
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
              style={{ width: '100%', padding: '12px' }}
            >
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main reset form
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        <div className="auth-glass-box">
          {/* Brand Header */}
          <div className="auth-header">
            <img src={ASSETS.logo} alt="Smart Airport Logo" className="auth-brand-logo" />
            <h2 className="auth-title gradient-text-sky">
              Set New Password
            </h2>
            <p className="auth-tagline">
              Create a strong new password for your AEROVA account
            </p>
          </div>

          {/* Security Icon */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.25)',
                border: '1px solid var(--sky-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                color: 'var(--sky-blue)'
              }}
            >
              <ShieldCheck size={24} />
            </div>
          </div>

          {/* Error Banner */}
          {formError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.82rem',
                marginBottom: '18px'
              }}
            >
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="animate-fade-in">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="form-input-box">
                <Lock className="input-icon" size={17} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {/* Password strength hints */}
              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
                  <span style={{ color: newPassword.length >= 8 ? 'var(--status-on-time)' : 'var(--text-muted)' }}>
                    {newPassword.length >= 8 ? '✓' : '○'} 8+ characters
                  </span>
                  <span style={{ color: /[A-Z]/.test(newPassword) ? 'var(--status-on-time)' : 'var(--text-muted)' }}>
                    {/[A-Z]/.test(newPassword) ? '✓' : '○'} Uppercase
                  </span>
                  <span style={{ color: /[a-z]/.test(newPassword) ? 'var(--status-on-time)' : 'var(--text-muted)' }}>
                    {/[a-z]/.test(newPassword) ? '✓' : '○'} Lowercase
                  </span>
                  <span style={{ color: /[0-9]/.test(newPassword) ? 'var(--status-on-time)' : 'var(--text-muted)' }}>
                    {/[0-9]/.test(newPassword) ? '✓' : '○'} Number
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="form-input-box">
                <Lock className="input-icon" size={17} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={13} /> Passwords do not match
                </div>
              )}
              {confirmPassword && newPassword === confirmPassword && confirmPassword.length > 0 && (
                <div style={{ marginTop: '6px', fontSize: '0.78rem', color: 'var(--status-on-time)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={13} /> Passwords match
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '13px', marginTop: '10px', opacity: isLoading ? 0.7 : 1 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={17} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
