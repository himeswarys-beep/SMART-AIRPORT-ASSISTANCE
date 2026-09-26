import React, { useState } from 'react';
import {
  HeartHandshake,
  Accessibility,
  UserCheck,
  Phone,
  Calendar,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAirport } from '../context/AirportContext';

export const SpecialAssistance = () => {
  const { assistanceBookings, bookSpecialAssistance, user } = useAirport();

  // Booking Form State
  const [serviceType, setServiceType] = useState('Wheelchair Assistance (Ramp & Cabin)');
  const [passengerName, setPassengerName] = useState(user?.name || '');
  const [flightNumber, setFlightNumber] = useState(user?.flightNumber || '');
  const [bookingDate, setBookingDate] = useState('2026-09-01');
  const [pickupPoint, setPickupPoint] = useState('Departure Gate 3 Drop-Off Zone');
  const [specialNotes, setSpecialNotes] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('+91 98401 23456');

  const services = [
    {
      id: 'wheelchair',
      title: 'Wheelchair Assistance',
      desc: 'Complete mobility support across terminal ramps, security, and aircraft cabin boarding.',
      icon: Accessibility,
      category: 'Wheelchair Assistance (Ramp & Cabin)'
    },
    {
      id: 'elderly',
      title: 'Elderly Passenger Escort',
      desc: 'Dedicated airport assistant guiding senior citizens from drop-off curb through baggage claim.',
      icon: UserCheck,
      category: 'Elderly Assistance (Dedicated Escort)'
    },
    {
      id: 'minor',
      title: 'Unaccompanied Minor',
      desc: 'Certified airline staff oversight ensuring safe handover of solo traveling children.',
      icon: Shield,
      category: 'Unaccompanied Minor Care'
    },
    {
      id: 'medical',
      title: 'Medical & Oxygen Support',
      desc: 'Stretcher provisions, medical oxygen clearance, and emergency paramedic escort.',
      icon: HeartHandshake,
      category: 'Medical & Oxygen Assistance'
    },
    {
      id: 'meet-assist',
      title: 'Meet & Assist (VIP Support)',
      desc: 'Personal concierge for fast-track immigration, lounge access, and baggage porterage.',
      icon: Sparkles,
      category: 'Meet & Assist Concierge'
    }
  ];

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    bookSpecialAssistance({
      serviceType,
      passengerName,
      flightNumber,
      date: bookingDate,
      pickupPoint,
      specialNotes,
      phone: passengerPhone
    });
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Inclusive Airport Services</span>
          <span style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
            24/7 Dedicated Care Team
          </span>
        </div>
        <h1 style={{ fontSize: '2rem',color:'#043d61ff', fontWeight: 800 }}>Special Assistance & Accessibility Booking</h1>
        <p style={{ color: '#043d61ff', fontSize: '0.9rem' }}>
          Book complimentary terminal wheelchair escorts, medical support, and senior citizen assistance for a smooth, accessible journey.
        </p>
      </div>

      {/* Main Grid: Booking Form (Left) + Service Cards & Active Bookings (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(300px, 1fr)', gap: '24px' }}>
        {/* ------------------------------------------------------------------
            ASSISTANCE BOOKING FORM
            ------------------------------------------------------------------ */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <HeartHandshake size={24} color="var(--sky-blue)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Request Assistance Service</h2>
          </div>

          <form onSubmit={handleSubmitBooking}>
            {/* Service Type Selection */}
            <div className="form-group">
              <label className="form-label">Required Assistance Service</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="form-input"
                style={{ padding: '12px 14px', background: 'rgba(5, 11, 24, 0.6)', color: '#ffffff' }}
                required
              >
                {services.map((s) => (
                  <option key={s.id} value={s.category}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Passenger Name & Phone */}
            <div style={{ display: 'grid',textcolor: 'black', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Passenger Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Passenger / Attendant Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Flight Number & Travel Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Flight Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Journey</label>
                <input
                  type="date"
                  className="form-input"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Pickup Location Point */}
            <div className="form-group">
              <label className="form-label">Terminal Pickup Location</label>
              <select
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                className="form-input"
                style={{ padding: '12px 14px', background: 'rgba(5, 11, 24, 0.6)', color: '#ffffff' }}
                required
              >
                <option value="Departure Gate 3 Drop-Off Zone">Departure Gate 3 Drop-Off Zone (Ramp)</option>
                <option value="Check-in Row 1 Special Assistance Desk">Check-in Row 1 Special Assistance Desk</option>
                <option value="Security Checkpoint Fast Track">Security Checkpoint Fast Track</option>
                <option value="Arrivals Baggage Carousel">Arrivals Baggage Carousel</option>
              </select>
            </div>

            {/* Special Instructions / Medical details */}
            <div className="form-group">
              <label className="form-label">Special Notes / Medical Requirements (Optional)</label>
              <textarea
                className="form-input"
                style={{ minHeight: '80px', resize: 'vertical', background: 'rgba(5,11,24,0.6)', color: '#ffffff', padding: '12px 14px' }}
                placeholder="Mention any specific mobility constraints, portable oxygen requirements, or attendant details..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '13px', marginTop: '10px' }}
            >
              <Send size={17} />
              <span>Confirm & Assign Assistance Officer</span>
            </button>
          </form>
        </div>

        {/* ------------------------------------------------------------------
            RIGHT: ACTIVE ASSISTANCE TICKETS & SERVICE GUIDELINES
            ------------------------------------------------------------------ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Bookings Registry */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={20} color="var(--status-on-time)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Your Active Bookings</h3>
              </div>
              <span className="module-badge">{assistanceBookings.length} Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {assistanceBookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '16px',
                    background: 'rgba(5, 11, 24, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-peach-bright)' }}>
                      {b.id}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--status-on-time)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {b.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#ffffff' }}>
                    {b.serviceType}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Pickup: <strong style={{ color: 'var(--sky-blue-light)' }}>{b.pickupPoint}</strong>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Flight {b.flightNumber} • Date: {b.date}
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.76rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>Assigned Officer:</span>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>{b.officerName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', marginTop: '3px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Officer Helpline:</span>
                    <span style={{ color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {b.officerPhone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ / Helpline info */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-peach)', marginBottom: '8px' }}>
              Airport Accessibility Promise
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              All terminals are equipped with tactile floor paths, braille signage, low-floor electric buggies, and ambulifts for remote aircraft bays. For urgent wheelchair dispatch upon arrival, dial airport terminal helpline <strong style={{ color: '#ffffff' }}>1800 425 2256</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialAssistance;
