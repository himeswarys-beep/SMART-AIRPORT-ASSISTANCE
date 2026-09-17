import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, ArrowRight, Shield, Radio, Sparkles } from 'lucide-react';
import { ASSETS } from '../assets/images';

export const Splash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fast 800ms timer for progress bar and navigation
    const startTime = Date.now();
    const duration = 800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration - 150) {
        setIsFadingOut(true);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        navigate('/auth');
      }
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate('/auth');
    }, 200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050b18',
        backgroundImage: `url(${ASSETS.airportBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: '24px',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.4s ease-out'
      }}
    >
      {/* Dark & Frosted Blur Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(5, 11, 24, 0.75) 0%, rgba(5, 11, 24, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      />

      {/* Decorative Radar Sweep Aura */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          animation: 'pulseGlow 3s infinite',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          border: '1px dashed rgba(251, 146, 60, 0.2)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Splash Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '520px',
          width: '100%',
          animation: 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Animated Aviation Logo */}
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            marginBottom: '28px'
          }}
        >
          {/* Glowing pulse ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)',
              filter: 'blur(8px)',
              animation: 'pulseGlow 2s infinite'
            }}
          />

          <img
            src={ASSETS.logo}
            alt="Smart Airport Assistant Logo"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.6))',
              animation: 'floatAirplane 3.5s ease-in-out infinite'
            }}
          />
        </div>

        {/* Brand Title */}
        <h1
          style={{
            fontSize: '2.6rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            lineHeight: 1.15
          }}
          className="gradient-text-sky"
        >
          Smart Airport Assistant
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--accent-peach)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            marginBottom: '36px'
          }}
        >
          "We Assist You Every Step"
        </p>

        {/* Flight Radar Loading Track */}
        <div
          style={{
            width: '100%',
            maxWidth: '380px',
            position: 'relative',
            marginBottom: '20px'
          }}
        >
          {/* Runway track base line */}
          <div
            style={{
              height: '4px',
              width: '100%',
              background: 'rgba(56, 189, 248, 0.15)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            {/* Glowing progress line */}
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563eb, #38bdf8, #fb923c)',
                borderRadius: '4px',
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.8)',
                transition: 'width 0.1s linear'
              }}
            />

            {/* Flying Airplane Head indicator */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: `calc(${progress}% - 14px)`,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--royal-blue), var(--sky-blue))',
                border: '2px solid #ffffff',
                boxShadow: '0 0 15px rgba(251, 146, 60, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'left 0.1s linear'
              }}
            >
              <Plane size={14} style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>
        </div>

        {/* Status Text & Progress percentage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '380px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio size={12} color="var(--sky-blue)" className="animate-pulse-glow" />
            Initializing Navigation & Live Flights...
          </span>
          <span style={{ color: 'var(--accent-peach)', fontWeight: 700 }}>
            {progress}%
          </span>
        </div>

        {/* Instant Skip Action */}
        <button
          type="button"
          onClick={handleSkip}
          style={{
            marginTop: '36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: 'rgba(16, 33, 71, 0.5)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '9999px',
            color: 'var(--sky-blue-light)',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(37, 99, 235, 0.35)';
            e.currentTarget.style.borderColor = 'var(--sky-blue)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(16, 33, 71, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
          }}
        >
          <span>Continue to Login</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Bottom Subtitle / Version */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <Shield size={13} color="var(--sky-blue)" />
        <span>Next-Gen Smart Airport Passenger Assistance System</span>
      </div>
    </div>
  );
};

export default Splash;
