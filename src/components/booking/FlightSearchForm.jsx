import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRightLeft, Search, Sparkles } from 'lucide-react';
import { INDIAN_AIRPORTS } from '../../data/booking/airportsData';

export const FlightSearchForm = ({ searchParams, onSearchSubmit, isLoading }) => {
  const [tripType, setTripType] = useState(searchParams.tripType || 'oneWay');
  const [fromCode, setFromCode] = useState(searchParams.fromCode || 'MAA');
  const [toCode, setToCode] = useState(searchParams.toCode || 'BLR');
  const [departureDate, setDepartureDate] = useState(searchParams.departureDate || new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || '');
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || 'Economy');
  const [adults, setAdults] = useState(searchParams.passengers?.adults || 1);
  const [children, setChildren] = useState(searchParams.passengers?.children || 0);
  const [infants, setInfants] = useState(searchParams.passengers?.infants || 0);

  const handleSwapAirports = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit({
      tripType,
      fromCode,
      toCode,
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : null,
      cabinClass,
      passengers: { adults, children, infants }
    });
  };

  return (
    <div className="flight-search-container">
      {/* Search Header Tabs & Cabin */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        {/* Trip Type Radio Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(5, 11, 24, 0.6)', padding: '4px', borderRadius: '9999px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <button
            type="button"
            onClick={() => setTripType('oneWay')}
            style={{
              padding: '6px 18px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 700,
              background: tripType === 'oneWay' ? 'var(--gradient-sky)' : 'transparent',
              color: tripType === 'oneWay' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            One Way
          </button>
          <button
            type="button"
            onClick={() => setTripType('roundTrip')}
            style={{
              padding: '6px 18px',
              borderRadius: '9999px',
              fontSize: '0.84rem',
              fontWeight: 700,
              background: tripType === 'roundTrip' ? 'var(--gradient-sky)' : 'transparent',
              color: tripType === 'roundTrip' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            Round Trip
          </button>
        </div>

        {/* Demo Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--accent-peach)', background: 'rgba(251, 146, 60, 0.15)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(251, 146, 60, 0.3)' }}>
          <Sparkles size={13} />
          <span>Demo Flight Engine • All Indian Domestic Routes</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'flex-start' }}>
          {/* FROM AIRPORT */}
          <div className="search-field-group">
            <label className="search-field-label">
              <Plane size={14} color="var(--sky-blue)" style={{ transform: 'rotate(-45deg)' }} />
              <span>From Airport</span>
            </label>
            <select
              className="search-select-custom"
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
            >
              {INDIAN_AIRPORTS.map((ap) => (
                <option key={`from-${ap.code}`} value={ap.code} disabled={ap.code === toCode}>
                  {ap.city} ({ap.code}) - {ap.name}
                </option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="search-swap-btn"
              onClick={handleSwapAirports}
              title="Swap Departure & Destination"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* TO AIRPORT */}
          <div className="search-field-group">
            <label className="search-field-label">
              <Plane size={14} color="var(--accent-peach-bright)" style={{ transform: 'rotate(45deg)' }} />
              <span>To Airport</span>
            </label>
            <select
              className="search-select-custom"
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
            >
              {INDIAN_AIRPORTS.map((ap) => (
                <option key={`to-${ap.code}`} value={ap.code} disabled={ap.code === fromCode}>
                  {ap.city} ({ap.code}) - {ap.name}
                </option>
              ))}
            </select>
          </div>

          {/* DEPARTURE DATE */}
          <div className="search-field-group">
            <label className="search-field-label">
              <Calendar size={14} color="var(--sky-blue)" />
              <span>Departure Date</span>
            </label>
            <input
              type="date"
              className="search-input-custom"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* RETURN DATE (If Round Trip) */}
          {tripType === 'roundTrip' && (
            <div className="search-field-group">
              <label className="search-field-label">
                <Calendar size={14} color="var(--accent-peach-bright)" />
                <span>Return Date</span>
              </label>
              <input
                type="date"
                className="search-input-custom"
                value={returnDate || departureDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate}
              />
            </div>
          )}

          {/* CABIN CLASS & PASSENGERS */}
          <div className="search-field-group">
            <label className="search-field-label">
              <Users size={14} color="var(--sky-blue)" />
              <span>Cabin & Passengers</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <select
                className="search-select-custom"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
              </select>

              <select
                className="search-select-custom"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <Search size={18} />
            <span>{isLoading ? 'Searching Flights...' : 'Search Flights'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
