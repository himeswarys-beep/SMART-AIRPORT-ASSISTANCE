import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Wallet, ShieldCheck, Lock, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { EXTRA_BAGGAGE_OPTIONS, INFLIGHT_MEAL_OPTIONS, TRAVEL_ADDONS } from '../../data/booking/addonsData';

export const PaymentForm = ({
  flight,
  passengers = [],
  selectedSeatsMap = {},
  selectedAddons = {},
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('arunkumar@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8910 2234 5678');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [cardName, setCardName] = useState('ARUN KUMAR');
  const [isProcessing, setIsProcessing] = useState(false);

  const paxCount = passengers.length || 1;

  // Pricing calculations
  const baseFareTotal = (flight.baseFare || 2450) * paxCount;
  const taxesTotal = (flight.taxes || 440) * paxCount;

  const seatFeeTotal = Object.values(selectedSeatsMap).reduce(
    (sum, seat) => sum + (seat?.extraCharge || 0),
    0
  );

  const baggageObj = EXTRA_BAGGAGE_OPTIONS.find((b) => b.id === selectedAddons.baggageId) || EXTRA_BAGGAGE_OPTIONS[0];
  const mealObj = INFLIGHT_MEAL_OPTIONS.find((m) => m.id === selectedAddons.mealId) || INFLIGHT_MEAL_OPTIONS[0];
  const travelAddonsPrice = (selectedAddons.travelAddons || []).reduce((sum, id) => {
    const found = TRAVEL_ADDONS.find((a) => a.id === id);
    return sum + (found?.price || 0);
  }, 0);

  const addonsTotal = baggageObj.price + mealObj.price + travelAddonsPrice;

  const grandTotal = baseFareTotal + taxesTotal + seatFeeTotal + addonsTotal;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // TODO: Connect real payment gateway API (e.g., Razorpay / Stripe) in production
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        paymentMethod,
        transactionId: `TXN-MAA-${Math.floor(10000000 + Math.random() * 90000000)}`,
        amount: grandTotal,
        paymentStatus: 'SUCCESSFUL',
        paidAt: new Date().toISOString()
      });
    }, 2500);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--status-on-time)', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '8px' }}>
          <ShieldCheck size={14} />
          <span>256-Bit SSL Encrypted Simulated Checkout</span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Payment & Booking Checkout</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Review fare breakdown and select payment method to instantly confirm flight tickets.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(280px, 360px)', gap: '24px' }}>
        {/* Payment Methods */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Select Payment Option</h3>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {[
              { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: Smartphone },
              { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
              { id: 'netbanking', label: 'Net Banking', icon: Building2 },
              { id: 'wallet', label: 'Wallets', icon: Wallet }
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    background: isSelected ? 'var(--gradient-sky)' : 'rgba(5, 11, 24, 0.6)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--sky-blue)' : '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <Icon size={16} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handlePayNow}>
            {/* UPI Form */}
            {paymentMethod === 'upi' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="search-field-group">
                  <label className="search-field-label">Enter Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    className="search-input-custom"
                    placeholder="username@okaxis or mobile@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                  />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'rgba(5, 11, 24, 0.5)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  A payment request collect notification will be sent to your GPay, PhonePe, or Paytm app.
                </div>
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="search-field-group">
                  <label className="search-field-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="search-input-custom"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </div>
                <div className="search-field-group">
                  <label className="search-field-label">Card Number</label>
                  <input
                    type="text"
                    className="search-input-custom"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="search-field-group">
                    <label className="search-field-label">Expiry Date</label>
                    <input
                      type="text"
                      className="search-input-custom"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="search-field-group">
                    <label className="search-field-label">CVV Code</label>
                    <input
                      type="password"
                      maxLength={4}
                      className="search-input-custom"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="search-field-group">
                <label className="search-field-label">Select Bank</label>
                <select className="search-select-custom">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Wallets */}
            {paymentMethod === 'wallet' && (
              <div className="search-field-group">
                <label className="search-field-label">Select Wallet</label>
                <select className="search-select-custom">
                  <option>Paytm Wallet</option>
                  <option>Amazon Pay</option>
                  <option>Mobikwik</option>
                </select>
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <button
                type="submit"
                className="btn-peach"
                disabled={isProcessing}
                style={{ width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Confirm Flight</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Fare Breakdown Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>Fare Breakdown Summary</h3>

            {/* Flight info banner */}
            <div style={{ background: 'rgba(5, 11, 24, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.95rem' }}>{flight.airline} • {flight.flightNumber}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--sky-blue)' }}>{flight.from} ➔ {flight.to} ({flight.departureDate})</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{paxCount} Passenger(s) • {flight.cabinClass}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Base Fare ({paxCount}x):</span>
                <span style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>₹{baseFareTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Taxes & GST (18%):</span>
                <span style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>₹{taxesTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Seat Selection Fees:</span>
                <span style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>₹{seatFeeTotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Add-ons & Services:</span>
                <span style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>₹{addonsTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '2px dashed rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Total Paid Amount:</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--sky-blue-light)', fontFamily: 'var(--font-mono)' }}>
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Payment Overlay Animation */}
      {isProcessing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(5, 11, 24, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '380px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '3px solid var(--sky-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)'
              }}
            >
              <Loader2 size={40} color="var(--sky-blue)" className="animate-spin" />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Processing Payment...
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Communicating securely with bank gateway. Please do not close or refresh this page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
