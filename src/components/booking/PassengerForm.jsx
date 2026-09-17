import React, { useState } from 'react';
import { User, CreditCard, Phone, Mail, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAirport } from '../../context/AirportContext';

export const PassengerForm = ({
  passengersCount = { adults: 1, children: 0, infants: 0 },
  passengerDetails,
  onChangePassenger,
  onProceed
}) => {
  const { user, passportDetails, addToast } = useAirport();
  const [errors, setErrors] = useState({});

  const totalPax = passengersCount.adults + passengersCount.children + passengersCount.infants;

  const handleAutoFill = (index) => {
    const filled = {
      fullName: user.name || passportDetails.fullName || 'Arun Kumar',
      dob: user.dob || passportDetails.dob || '1992-05-14',
      gender: user.gender || passportDetails.gender || 'Male',
      mobile: user.phone || passportDetails.contactNumber || '+91 98401 23456',
      email: user.email || 'arun.kumar@gmail.com',
      idType: 'Passport',
      idNumber: user.passportNumber || passportDetails.passportNumber || 'Z8941029'
    };
    onChangePassenger(index, filled);
    addToast('Auto-filled Saved Profile', 'Passenger details loaded from account', 'success');
  };

  const validate = () => {
    let errs = {};
    let isValid = true;

    passengerDetails.forEach((pax, idx) => {
      if (!pax.fullName || !pax.fullName.trim()) {
        errs[`${idx}-fullName`] = 'Full name is required';
        isValid = false;
      }
      if (!pax.dob) {
        errs[`${idx}-dob`] = 'Date of birth is required';
        isValid = false;
      }
      if (!pax.mobile || !pax.mobile.trim()) {
        errs[`${idx}-mobile`] = 'Mobile number is required';
        isValid = false;
      }
      if (!pax.idNumber || !pax.idNumber.trim()) {
        errs[`${idx}-idNumber`] = 'Government ID number is required';
        isValid = false;
      }
    });

    setErrors(errs);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onProceed();
    } else {
      addToast('Incomplete Passenger Form', 'Please fill out all required passenger fields', 'error');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Passenger Information</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Please enter traveler details matching government identification for {totalPax} passenger(s).
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {passengerDetails.map((pax, idx) => {
          let categoryLabel = 'Adult';
          if (idx >= passengersCount.adults && idx < passengersCount.adults + passengersCount.children) {
            categoryLabel = 'Child (2-12 yrs)';
          } else if (idx >= passengersCount.adults + passengersCount.children) {
            categoryLabel = 'Infant (<2 yrs)';
          }

          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid rgba(56, 189, 248, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="hero-tag" style={{ fontSize: '0.75rem' }}>{categoryLabel}</span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    Passenger {idx + 1}
                  </h3>
                </div>

                {idx === 0 && (
                  <button
                    type="button"
                    onClick={() => handleAutoFill(idx)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: 'var(--sky-blue-light)',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}
                  >
                    <Sparkles size={14} color="var(--sky-blue)" />
                    <span>Auto-fill My Profile</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {/* Full Name */}
                <div className="search-field-group">
                  <label className="search-field-label">Full Name (as per ID) *</label>
                  <input
                    type="text"
                    className="search-input-custom"
                    placeholder="e.g. Arun Kumar"
                    value={pax.fullName || ''}
                    onChange={(e) => onChangePassenger(idx, { ...pax, fullName: e.target.value })}
                  />
                  {errors[`${idx}-fullName`] && (
                    <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>{errors[`${idx}-fullName`]}</span>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="search-field-group">
                  <label className="search-field-label">Date of Birth *</label>
                  <input
                    type="date"
                    className="search-input-custom"
                    value={pax.dob || ''}
                    onChange={(e) => onChangePassenger(idx, { ...pax, dob: e.target.value })}
                  />
                  {errors[`${idx}-dob`] && (
                    <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>{errors[`${idx}-dob`]}</span>
                  )}
                </div>

                {/* Gender */}
                <div className="search-field-group">
                  <label className="search-field-label">Gender</label>
                  <select
                    className="search-select-custom"
                    value={pax.gender || 'Male'}
                    onChange={(e) => onChangePassenger(idx, { ...pax, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Mobile Number */}
                <div className="search-field-group">
                  <label className="search-field-label">Mobile Number *</label>
                  <input
                    type="tel"
                    className="search-input-custom"
                    placeholder="+91 98401 23456"
                    value={pax.mobile || ''}
                    onChange={(e) => onChangePassenger(idx, { ...pax, mobile: e.target.value })}
                  />
                  {errors[`${idx}-mobile`] && (
                    <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>{errors[`${idx}-mobile`]}</span>
                  )}
                </div>

                {/* Email */}
                <div className="search-field-group">
                  <label className="search-field-label">Email Address</label>
                  <input
                    type="email"
                    className="search-input-custom"
                    placeholder="passenger@gmail.com"
                    value={pax.email || ''}
                    onChange={(e) => onChangePassenger(idx, { ...pax, email: e.target.value })}
                  />
                </div>

                {/* ID Type */}
                <div className="search-field-group">
                  <label className="search-field-label">ID Type</label>
                  <select
                    className="search-select-custom"
                    value={pax.idType || 'Aadhaar'}
                    onChange={(e) => onChangePassenger(idx, { ...pax, idType: e.target.value })}
                  >
                    <option value="Aadhaar">Aadhaar Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID Card</option>
                  </select>
                </div>

                {/* ID Number */}
                <div className="search-field-group">
                  <label className="search-field-label">ID Number *</label>
                  <input
                    type="text"
                    className="search-input-custom"
                    placeholder="e.g. Z8941029 or 1234-5678-9012"
                    value={pax.idNumber || ''}
                    onChange={(e) => onChangePassenger(idx, { ...pax, idNumber: e.target.value })}
                  />
                  {errors[`${idx}-idNumber`] && (
                    <span style={{ fontSize: '0.72rem', color: '#ef4444' }}>{errors[`${idx}-idNumber`]}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '12px 36px', fontSize: '1rem' }}>
            <span>Save & Proceed to Add-ons</span>
          </button>
        </div>
      </form>
    </div>
  );
};
