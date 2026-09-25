import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Calendar, 
  Globe, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  CreditCard,
  Flag
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { translations } from '../utils/translations';
import { ASSETS } from '../assets/images';

export const PassportDetails = () => {
  const { language, passportDetails, setPassportDetails, setUser, addToast } = useAirport();
  const navigate = useNavigate();
  const t = translations[language] || translations.en;

  const [formData, setFormData] = useState({
    passportNumber: passportDetails.passportNumber || '',
    fullName: passportDetails.fullName || '',
    dob: passportDetails.dob || '',
    gender: passportDetails.gender || 'Male',
    nationality: passportDetails.nationality || '',
    passportExpiry: passportDetails.passportExpiry || '',
    passportCountry: passportDetails.passportCountry || '',
    contactNumber: passportDetails.contactNumber || ''
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Validate required fields
    if (
      !formData.passportNumber.trim() ||
      !formData.fullName.trim() ||
      !formData.dob ||
      !formData.gender ||
      !formData.nationality.trim() ||
      !formData.passportExpiry ||
      !formData.passportCountry.trim() ||
      !formData.contactNumber.trim()
    ) {
      setFormError(t.fillAllFieldsError);
      return;
    }

    // Save into AirportContext
    setPassportDetails(formData);
    setUser((prev) => ({
      ...prev,
      name: formData.fullName,
      phone: formData.contactNumber,
      passportNumber: formData.passportNumber,
      dob: formData.dob,
      gender: formData.gender,
      nationality: formData.nationality,
      passportExpiry: formData.passportExpiry,
      passportCountry: formData.passportCountry
    }));

    addToast(
      language === 'ta' ? 'பாஸ்போர்ட் விவரங்கள் சேமிக்கப்பட்டது' : 'Passport Details Verified',
      language === 'ta' ? 'டிஜியாத்ரா தானியங்கி சோதனைகளுக்கு உங்கள் சுயவிவரம் தயாராக உள்ளது' : 'Your profile is ready for automated DigiYatra fast-track clearance.',
      'success'
    );

    navigate('/dashboard');
  };

  return (
    <div className="auth-page-wrapper" style={{ padding: '24px 16px', minHeight: '100vh' }}>
      <div className="auth-card-container" style={{ maxWidth: '780px' }}>
        <div className="auth-glass-box animate-fade-in" style={{ padding: '36px 32px' }}>
          
          {/* Brand & Page Header */}
          <div className="auth-header" style={{ marginBottom: '28px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 14px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(37,99,235,0.25))',
                border: '1px solid rgba(251, 146, 60, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-peach-bright)'
              }}
            >
              <FileText size={30} />
            </div>
            <h2 className="auth-title gradient-text-sky" style={{ fontSize: '1.8rem' }}>
              {t.passportDetailsTitle}
            </h2>
            <p className="auth-tagline" style={{ maxWidth: '540px', margin: '8px auto 0' }}>
              {t.passportDetailsSubtitle}
            </p>
          </div>

          {/* DigiYatra Security Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              color: 'var(--status-on-time)',
              marginBottom: '28px',
              fontSize: '0.84rem'
            }}
          >
            <ShieldCheck size={22} style={{ flexShrink: 0 }} />
            <div>
              <strong>DigiYatra Biometric Security Encrypted</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Your passport information is stored locally and used exclusively for your flight journey check-in.
              </div>
            </div>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '10px',
                color: '#fca5a5',
                fontSize: '0.85rem',
                marginBottom: '24px'
              }}
            >
              <AlertCircle size={18} />
              <span>{formError}</span>
            </div>
          )}

          {/* Passport Required Details Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '28px'
              }}
            >
              {/* 1. Passport Number */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.passportNumber} *</label>
                <div className="form-input-box">
                  <CreditCard className="input-icon" size={17} />
                  <input
                    type="text"
                    name="passportNumber"
                    className="form-input"
                    placeholder={t.passportNumberPlaceholder}
                    value={formData.passportNumber}
                    onChange={handleChange}
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                </div>
              </div>

              {/* 2. Full Name */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.fullName} *</label>
                <div className="form-input-box">
                  <User className="input-icon" size={17} />
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder={t.fullNamePlaceholder}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* 3. Date of Birth */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.dateOfBirth} *</label>
                <div className="form-input-box">
                  <Calendar className="input-icon" size={17} />
                  <input
                    type="date"
                    name="dob"
                    className="form-input"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* 4. Gender */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.gender} *</label>
                <div className="form-input-box">
                  <User className="input-icon" size={17} />
                  <select
                    name="gender"
                    className="form-input"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{ background: '#f8fbfe', color: '#0f172a' }}
                    required
                  >
                    <option value="Male" style={{ background: '#0a1228' }}>{t.male}</option>
                    <option value="Female" style={{ background: '#0a1228' }}>{t.female}</option>
                    <option value="Other" style={{ background: '#0a1228' }}>{t.other}</option>
                  </select>
                </div>
              </div>

              {/* 5. Nationality */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.nationality} *</label>
                <div className="form-input-box">
                  <Flag className="input-icon" size={17} />
                  <input
                    type="text"
                    name="nationality"
                    className="form-input"
                    placeholder={t.nationalityPlaceholder}
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* 6. Passport Expiry Date */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.passportExpiryDate} *</label>
                <div className="form-input-box">
                  <Calendar className="input-icon" size={17} />
                  <input
                    type="date"
                    name="passportExpiry"
                    className="form-input"
                    value={formData.passportExpiry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* 7. Passport Issued Country */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.passportIssuedCountry} *</label>
                <div className="form-input-box">
                  <Globe className="input-icon" size={17} />
                  <input
                    type="text"
                    name="passportCountry"
                    className="form-input"
                    placeholder={t.passportCountryPlaceholder}
                    value={formData.passportCountry}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* 8. Contact Number */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{t.contactNumber} *</label>
                <div className="form-input-box">
                  <Phone className="input-icon" size={17} />
                  <input
                    type="tel"
                    name="contactNumber"
                    className="form-input"
                    placeholder={t.contactPlaceholder}
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-peach"
              style={{ width: '100%', padding: '14px', fontSize: '1.02rem', marginTop: '10px' }}
            >
              <span>{t.saveAndContinue}</span>
              <ArrowRight size={18} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PassportDetails;
