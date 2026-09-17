import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Check, Volume2, Sparkles } from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { translations } from '../utils/translations';
import { ASSETS } from '../assets/images';

export const LanguageSelection = () => {
  const { language, setLanguage, addToast } = useAirport();
  const navigate = useNavigate();
  const t = translations[language] || translations.en;

  const handleSelectLanguage = (langKey) => {
    setLanguage(langKey);
    const langName = langKey === 'ta' ? 'தமிழ் (Tamil)' : 'English';
    addToast('Language Selected', `Switched to ${langName}`, 'info');
  };

  const speakPreview = (text, langCode) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleProceed = () => {
    navigate('/passport-details');
  };

  return (
    <div className="auth-page-wrapper" style={{ padding: '24px' }}>
      <div className="auth-card-container" style={{ maxWidth: '640px' }}>
        <div className="auth-glass-box animate-fade-in" style={{ padding: '36px 28px' }}>
          {/* Header */}
          <div className="auth-header" style={{ marginBottom: '28px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(56,189,248,0.2))',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sky-blue)'
              }}
            >
              <Globe size={32} />
            </div>
            <h2 className="auth-title gradient-text-sky" style={{ fontSize: '1.85rem' }}>
              {t.selectLanguageTitle}
            </h2>
            <p className="auth-tagline" style={{ maxWidth: '480px', margin: '8px auto 0' }}>
              {t.selectLanguageSubtitle}
            </p>
          </div>

          {/* Language Options Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}
          >
            {/* English Card */}
            <div
              onClick={() => handleSelectLanguage('en')}
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: language === 'en' 
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(16, 185, 129, 0.15))' 
                  : 'rgba(16, 33, 71, 0.4)',
                border: language === 'en' 
                  ? '2px solid var(--sky-blue)' 
                  : '1px solid rgba(56, 189, 248, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: language === 'en' ? '0 0 24px rgba(56, 189, 248, 0.25)' : 'none'
              }}
            >
              {language === 'en' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--sky-blue)',
                    color: '#050b18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: 'var(--sky-blue)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  EN
                </span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>English</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-peach)', fontWeight: 600 }}>Default</span>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
                {translations.en.englishDesc}
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectLanguage('en');
                  speakPreview("Welcome to Smart Airport Assistant. English language selected.", "en-US");
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--sky-blue-light)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={14} />
                <span>Listen Audio Preview</span>
              </button>
            </div>

            {/* Tamil Card */}
            <div
              onClick={() => handleSelectLanguage('ta')}
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: language === 'ta' 
                  ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.25), rgba(37, 99, 235, 0.15))' 
                  : 'rgba(16, 33, 71, 0.4)',
                border: language === 'ta' 
                  ? '2px solid var(--accent-peach-bright)' 
                  : '1px solid rgba(56, 189, 248, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: language === 'ta' ? '0 0 24px rgba(251, 146, 60, 0.3)' : 'none'
              }}
            >
              {language === 'ta' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--accent-peach-bright)',
                    color: '#050b18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(251, 146, 60, 0.2)',
                    color: 'var(--accent-peach-bright)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  தமிழ்
                </span>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>தமிழ் (Tamil)</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--sky-blue)', fontWeight: 600 }}>தாய்மொழி</span>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
                {translations.ta.tamilDesc}
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectLanguage('ta');
                  speakPreview("ஸ்மார்ட் விமான நிலைய உதவியாளருக்கு நல்வரவு. தமிழ் மொழி தேர்வு செய்யப்பட்டுள்ளது.", "ta-IN");
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'var(--accent-peach-bright)',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={14} />
                <span>குரல் மாதிரியைக் கேட்க</span>
              </button>
            </div>
          </div>

          {/* Proceed Action Button */}
          <button
            type="button"
            className="btn-primary"
            onClick={handleProceed}
            style={{ width: '100%', padding: '14px', fontSize: '1.02rem' }}
          >
            <span>{t.continueBtn}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
