import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { ASSETS } from '../assets/images';
import { ForgotPasswordModal } from './ForgotPassword';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#1877F2"
      d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.09 24 18.1 24 12.07z"
    />
    <path
      fill="#fff"
      d="M16.67 15.56l.53-3.49h-3.34V9.81c0-.96.47-1.89 1.96-1.89h1.52V4.95s-1.37-.24-2.69-.24c-2.75 0-4.54 1.68-4.54 4.7v2.66H7.08v3.49h3.05V24c1.22.19 2.47.19 3.69 0v-8.44h2.85z"
    />
  </svg>
);

const SocialAuthOptions = ({ actionLabel, onGoogle, onFacebook }) => (
  <div className="social-auth-block">
    <div className="social-auth-divider">
      <span>or {actionLabel} with</span>
    </div>
    <div className="social-auth-buttons">
      <button type="button" className="social-auth-btn google" onClick={onGoogle}>
      <br></br><GoogleIcon />
        <span>Google</span>
      </button><br></br>
      <button type="button" className="social-auth-btn facebook" onClick={onFacebook}>
        <FacebookIcon />
        <span>Facebook</span>
      </button>
    </div>
  </div>
);

export const Auth = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [formError, setFormError] = useState('');

  const { setIsLoggedIn, setUser, addToast } = useAirport();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setFormError('');
    if (!loginEmail || !loginPassword) {
      setFormError('Please enter both your email and password.');
      return;
    }
    setIsLoggedIn(true);
    addToast('Welcome Back!', `Logged in as ${loginEmail.split('@')[0]}`, 'success');
    navigate('/language');
  };

  const handleQuickDemoLogin = () => {
    setIsLoggedIn(true);
    setUser({
      name: '',
      email: '',
      phone: '',
      pnr: '',
      flightNumber: ' ',
      airline: ' ',
      from: ' ',
      fromCity: ' ',
      fromTerminal: '',
      to: '',
      toCity: '',
      toTerminal: '',
      departureTime: '',
      boardingTime: '',
      gate: '',
      gateOriginal: '',
      seat: '',
      seatType: '',
      zone: '',
      status: '',
      barcode: '',
      baggageTag: ''
    });
    addToast('Demo Passenger Session Started', 'Flight: 6E 204 (MAA → BLR) • Seat: 14A', 'success');
    navigate('/language');
  };

  const handleSocialAuth = (provider) => {
    const socialUsers = {
      google: {
        name: '',
        email: '',
        phone: ''
      },
      facebook: {
        name: '',
        email: '',
        phone: ''
      }
    };

    const socialUser = socialUsers[provider];
    const action = isRegisterMode ? 'signed up' : 'signed in';

    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      ...socialUser
    }));
    addToast(
      `${provider === 'google' ? 'Google' : 'Facebook'} ${isRegisterMode ? 'Sign Up' : 'Login'} Successful`,
      `You ${action} as ${socialUser.name}`,
      'success'
    );
    navigate('/language');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setFormError('');
    if (!regName || !regEmail || !regPhone || !regPassword) {
      setFormError('Please fill in all registration fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      name: regName,
      email: regEmail,
      phone: regPhone
    }));
    addToast('Account Created Successfully!', `Welcome to AEROVA, ${regName}`, 'success');
    navigate('/language');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        <div className="auth-glass-box">
          {/* Brand Header */}
          <div className="auth-header">
            <img src={ASSETS.logo} alt="Smart Airport Logo" className="auth-brand-logo" />
            <h2 className="auth-title gradient-text-sky">
              AEROVA
            </h2>
            <p className="auth-tagline">
              {isRegisterMode
                ? 'Create your digital passenger account'
                : 'Welcome back! Sign in to access your flight journey'}
            </p>
          </div>

          {/* Slider Switcher Tabs */}
          <div className="auth-slider-tabs">
            <button
              type="button"
              className={`slider-tab-btn ${!isRegisterMode ? 'active' : ''}`}
              onClick={() => {
                setIsRegisterMode(false);
                setFormError('');
              }}
            >
              Passenger Login
            </button>
            <button
              type="button"
              className={`slider-tab-btn ${isRegisterMode ? 'active' : ''}`}
              onClick={() => {
                setIsRegisterMode(true);
                setFormError('');
              }}
            >
              Create Account
            </button>
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

          {/* LOGIN FORM */}
          {!isRegisterMode ? (
            <form onSubmit={handleLogin} className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Email Address or Frequent Flyer ID</label>
                <div className="form-input-box">
                  <Mail className="input-icon" size={17} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-box">
                  <Lock className="input-icon" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
              </div>

              <div className="form-extras">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--sky-blue)' }}
                  />
                  <span>Remember Me</span>
                </label>
                <button
                  type="button"
                  className="forgot-pass-link"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: 'transparent' }}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '13px' }}
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight size={17} />
              </button>

              <SocialAuthOptions
                actionLabel="continue"
                onGoogle={() => handleSocialAuth('google')}
                onFacebook={() => handleSocialAuth('facebook')}
              />

              
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="animate-fade-in">
              <div className="form-group">
                <label className="form-label">Full Name (As on Passport / Govt ID)</label>
                <div className="form-input-box">
                  <User className="input-icon" size={17} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Arun Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-box">
                  <Mail className="input-icon" size={17} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="arun.kumar@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="form-input-box">
                  <Phone className="input-icon" size={17} />
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 98401 23456"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Create Password</label>
                <div className="form-input-box">
                  <Lock className="input-icon" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="At least 8 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
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
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="form-input-box">
                  <Lock className="input-icon" size={17} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Confirm your password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
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
              </div>

              <button
                type="submit"
                className="btn-peach"
                style={{ width: '100%', padding: '13px', marginTop: '10px' }}
              >
                <span>Complete Digital Registration</span>
                <CheckCircle2 size={17} />
              </button>

              <SocialAuthOptions
                actionLabel="sign up"
                onGoogle={() => handleSocialAuth('google')} 
                onFacebook={() => handleSocialAuth('facebook')}
              />
            </form>
          )}

          {/* Toggle Switch helper */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '22px',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)'
            }}
          >
            {!isRegisterMode ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  style={{
                    background: 'transparent',
                    color: 'var(--sky-blue)',
                    fontWeight: 700,
                    textDecoration: 'underline'
                  }}
                >
                  Create Account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  style={{
                    background: 'transparent',
                    color: 'var(--sky-blue)',
                    fontWeight: 700,
                    textDecoration: 'underline'
                  }}
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </div>
  );
};

export default Auth;
