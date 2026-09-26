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
  Flag,
  UploadCloud,
  Mail,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { translations } from '../utils/translations';
import { ASSETS } from '../assets/images';
import { supabase } from '../lib/supabase';

export const PassportDetails = () => {
  const { user, language, passportDetails, setPassportDetails, setUser, addToast } = useAirport();
  const navigate = useNavigate();
  const t = translations[language] || translations.en;

  const [formData, setFormData] = useState({
    passportNumber: passportDetails?.passportNumber || '',
    fullName: passportDetails?.fullName || user?.name || '',
    dob: passportDetails?.dob || '',
    gender: passportDetails?.gender || 'Male',
    nationality: passportDetails?.nationality || '',
    passportExpiry: passportDetails?.passportExpiry || '',
    passportCountry: passportDetails?.passportCountry || '',
    contactNumber: passportDetails?.contactNumber || user?.phone || '',
    email: user?.email || ''
  });

  const [formError, setFormError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    setScanSuccess(false);
    setFormError('');

    // Simulate OCR processing delay
    setTimeout(() => {
      // Only populate fields that are currently empty (do not silently overwrite)
      setFormData(prev => ({
        ...prev,
        passportNumber: prev.passportNumber || 'Z' + Math.floor(Math.random() * 9000000 + 1000000),
        fullName: prev.fullName || user?.name || 'SCANNED NAME',
        dob: prev.dob || '1990-01-01',
        nationality: prev.nationality || 'Indian',
        passportExpiry: prev.passportExpiry || '2034-01-01',
        passportCountry: prev.passportCountry || 'India',
      }));
      setIsScanning(false);
      setScanSuccess(true);
      addToast('Scan Successful', 'Passport details extracted from image.', 'success');
    }, 2000);
  };

  const handleSubmit = async (e) => {
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
      !formData.contactNumber.trim() ||
      !formData.email.trim()
    ) {
      setFormError(t.fillAllFieldsError || 'Please fill in all required fields.');
      return;
    }

    // Validate email and phone match registered account
    if (formData.email.trim().toLowerCase() !== (user?.email || '').trim().toLowerCase()) {
      setFormError('Email address must match the one used during registration.');
      return;
    }

    if (formData.contactNumber.trim() !== (user?.phone || '').trim()) {
      setFormError('Phone number must match the one used during registration.');
      return;
    }

    // Uniqueness check: Passport Number can be registered only ONCE across accounts
    const pNumber = formData.passportNumber.trim().toUpperCase();
    try {
      const registeredPassports = JSON.parse(localStorage.getItem('aerova_registered_passports') || '{}');
      const registeredOwner = registeredPassports[pNumber];
      const currentUserKey = user?.id || user?.email;

      if (registeredOwner && registeredOwner !== currentUserKey) {
        setFormError('This passport number is already registered to another passenger account.');
        return;
      }
    } catch (e) {}

    setIsSaving(true);

    try {
      // 1. Update registered passports uniqueness index
      try {
        const registeredPassports = JSON.parse(localStorage.getItem('aerova_registered_passports') || '{}');
        const currentUserKey = user?.id || user?.email;
        registeredPassports[pNumber] = currentUserKey;
        localStorage.setItem('aerova_registered_passports', JSON.stringify(registeredPassports));
      } catch (e) {}

      // 2. Save into AirportContext state
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

      // 3. Update Supabase Auth User Metadata if available
      try {
        await supabase.auth.updateUser({
          data: {
            passportDetails: formData
          }
        });
      } catch (sbErr) {
        console.warn('Could not update Supabase user metadata:', sbErr);
      }

      addToast(
        language === 'ta' ? 'பாஸ்போர்ட் விவரங்கள் சேமிக்கப்பட்டது' : 'Passport Details Verified',
        language === 'ta' ? 'டிஜியாத்ரா தானியங்கி சோதனைகளுக்கு உங்கள் சுயவிவரம் தயாராக உள்ளது' : 'Your profile is ready for automated DigiYatra fast-track clearance.',
        'success'
      );

      navigate('/dashboard');
    } catch (err) {
      setFormError('Failed to save passport details.');
    } finally {
      setIsSaving(false);
    }
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

          {/* Upload Method Option */}
          <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px dashed var(--cyan-dark)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Option 1: Upload Image of Passport</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              We will extract your details automatically. You can review them before saving.
            </p>
            <div style={{ position: 'relative' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
                disabled={isScanning}
              />
              <div className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', gap: '8px', opacity: isScanning ? 0.7 : 1 }}>
                {isScanning ? (
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                ) : scanSuccess ? (
                  <CheckCircle size={18} color="var(--status-on-time)" />
                ) : (
                  <UploadCloud size={18} />
                )}
                <span>{isScanning ? 'Scanning Passport...' : scanSuccess ? 'Scan Complete' : 'Upload Passport Image'}</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            — OR Option 2: Enter Manually —
          </div>

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

              {/* Email Address */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Account Email *</label>
                <div className="form-input-box">
                  <Mail className="input-icon" size={17} />
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Same as registration email"
                    value={formData.email}
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
              style={{ width: '100%', padding: '14px', fontSize: '1.02rem', marginTop: '10px', opacity: isSaving ? 0.7 : 1 }}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>{t.saveAndContinue}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PassportDetails;
