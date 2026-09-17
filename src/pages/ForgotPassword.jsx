import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, X } from 'lucide-react';
import { useAirport } from '../context/AirportContext';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { addToast } = useAirport();

  if (!isOpen) return null;

  const handleSendReset = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSent(true);
    addToast('Reset Link Dispatched', `Check instructions sent to ${email}`, 'success');
  };

  const handleClose = () => {
    setIsSent(false);
    setEmail('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 110,
        padding: '20px'
      }}
      onClick={handleClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px',
          background: 'rgba(11, 23, 50, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: 'none',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {!isSent ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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
                  margin: '0 auto 14px',
                  color: 'var(--sky-blue)'
                }}
              >
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Reset Password</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Enter your registered passenger email and we'll send a secure one-time password reset link.
              </p>
            </div>

            <form onSubmit={handleSendReset}>
              <div className="form-group">
                <label className="form-label">Passenger Email Address</label>
                <div className="form-input-box">
                  <Mail className="input-icon" size={17} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="arun.kumar@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', marginTop: '14px' }}
              >
                <Send size={16} />
                <span>Send Reset Link</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px'
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to Login</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
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
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
              Check Your Inbox
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '10px 0 24px', lineHeight: 1.5 }}>
              We've dispatched password reset instructions to <strong style={{ color: 'var(--accent-peach)' }}>{email}</strong>. The link is valid for 15 minutes.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleClose}
              style={{ width: '100%', padding: '12px' }}
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
