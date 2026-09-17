import React from 'react';
import { EXTRA_BAGGAGE_OPTIONS, INFLIGHT_MEAL_OPTIONS, TRAVEL_ADDONS } from '../../data/booking/addonsData';
import { Luggage, Utensils, ShieldCheck, Zap, Plus, Check } from 'lucide-react';

export const AddonSelector = ({ selectedAddons, onChangeAddons, onProceed }) => {
  const toggleTravelAddon = (addonId) => {
    const isSelected = selectedAddons.travelAddons?.includes(addonId);
    let updated;
    if (isSelected) {
      updated = selectedAddons.travelAddons.filter((id) => id !== addonId);
    } else {
      updated = [...(selectedAddons.travelAddons || []), addonId];
    }
    onChangeAddons({ ...selectedAddons, travelAddons: updated });
  };

  // Compute total add-ons charge
  const baggageObj = EXTRA_BAGGAGE_OPTIONS.find((b) => b.id === selectedAddons.baggageId) || EXTRA_BAGGAGE_OPTIONS[0];
  const mealObj = INFLIGHT_MEAL_OPTIONS.find((m) => m.id === selectedAddons.mealId) || INFLIGHT_MEAL_OPTIONS[0];

  const travelAddonsPrice = (selectedAddons.travelAddons || []).reduce((sum, id) => {
    const found = TRAVEL_ADDONS.find((a) => a.id === id);
    return sum + (found?.price || 0);
  }, 0);

  const totalAddonsPrice = baggageObj.price + mealObj.price + travelAddonsPrice;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Flight Add-ons & Amenities</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Enhance your journey with extra baggage, hot meals, priority boarding and insurance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(260px, 320px)', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. EXTRA BAGGAGE */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Luggage size={20} color="var(--sky-blue)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Extra Check-in Baggage</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {EXTRA_BAGGAGE_OPTIONS.map((bag) => {
                const isSelected = selectedAddons.baggageId === bag.id;
                return (
                  <div
                    key={bag.id}
                    onClick={() => onChangeAddons({ ...selectedAddons, baggageId: bag.id })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(5, 11, 24, 0.6)',
                      border: isSelected ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{bag.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-peach)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                      {bag.price === 0 ? 'FREE' : `+₹${bag.price}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. IN-FLIGHT MEALS */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Utensils size={20} color="var(--accent-peach-bright)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Select Gourmet In-Flight Meal</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {INFLIGHT_MEAL_OPTIONS.map((meal) => {
                const isSelected = selectedAddons.mealId === meal.id;
                return (
                  <div
                    key={meal.id}
                    onClick={() => onChangeAddons({ ...selectedAddons, mealId: meal.id })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(251, 146, 60, 0.15)' : 'rgba(5, 11, 24, 0.6)',
                      border: isSelected ? '1px solid var(--accent-peach)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{meal.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0' }}>{meal.desc}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
                      {meal.price === 0 ? 'Standard' : `+₹${meal.price}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. PRIORITY & TRAVEL ASSISTANCE */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldCheck size={20} color="var(--status-on-time)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Priority & Protection Services</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TRAVEL_ADDONS.map((addon) => {
                const isChecked = (selectedAddons.travelAddons || []).includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleTravelAddon(addon.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: isChecked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 11, 24, 0.6)',
                      border: isChecked ? '1px solid var(--status-on-time)' : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{addon.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{addon.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: 'var(--accent-peach)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>
                        +₹{addon.price}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: isChecked ? 'var(--status-on-time)' : 'var(--text-muted)' }}>
                        {isChecked ? '✓ Added' : '+ Add'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Addons Summary Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Add-ons Summary</h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Baggage:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{baggageObj.label} (+₹{baggageObj.price})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Meal:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{mealObj.name} (+₹{mealObj.price})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Services:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>+₹{travelAddonsPrice}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>Total Add-ons:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
                +₹{totalAddonsPrice}
              </span>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={onProceed}
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <span>Proceed to Payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
