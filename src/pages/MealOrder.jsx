import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  Plane
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAirport } from '../context/AirportContext';

export const MealOrder = () => {
  const {
    mealMenu,
    mealCart,
    addMealToCart,
    removeMealFromCart,
    updateMealQty,
    placeMealOrder,
    confirmedMealOrder,
    user
  } = useAirport();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Specials' },
    { id: 'veg', label: 'Pure Veg' },
    { id: 'non-veg', label: 'Non-Veg' },
    { id: 'jain', label: 'Jain Gourmet' },
    { id: 'diabetic', label: 'Diabetic Friendly' },
    { id: 'kids', label: 'Kids Aviator' }
  ];

  const filteredMeals = mealMenu.filter((meal) => {
    if (selectedCategory === 'all') return true;
    return meal.category === selectedCategory;
  });

  const cartSubtotal = mealCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstTax = Math.round(cartSubtotal * 0.05);
  const cartTotal = cartSubtotal + gstTax;

  const handleCheckout = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
    placeMealOrder();
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="hero-tag">Galley Kitchen Pre-Order</span>
          <span style={{ fontSize: '0.84rem', color: '#043d61ff' }}>
            Seat {user?.seat || 'Assigned'} • Flight {user?.flightNumber || 'Selected'}
          </span>
        </div>
        <h1 style={{ fontSize: '2rem',color:'#043d61ff', fontWeight: 800 }}>In-Flight  Meal Pre-Order</h1>
        <p style={{ color: '#043d61ff', fontSize: '0.9rem' }}>
          Pre-book freshly curated hot meals and dietary-specific platters served directly to your assigned seat during flight.
        </p>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '24px'
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`slider-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 18px',
              whiteSpace: 'nowrap',
              borderRadius: '9999px',
              border: `1px solid ${selectedCategory === cat.id ? 'var(--sky-blue)' : 'rgba(56, 189, 248, 0.2)'}`,
              background: selectedCategory === cat.id ? 'var(--sky-blue)' : '#043d61ff',
              color: selectedCategory === cat.id ? '#041e54ff' : '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 600
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Meal Cards (Left) + Cart Summary (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(300px, 1fr)', gap: '24px' }}>
        {/* ------------------------------------------------------------------
            MEALS MENU GRID
            ------------------------------------------------------------------ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredMeals.map((meal) => {
            const inCart = mealCart.find((i) => i.id === meal.id);

            return (
              <div
                key={meal.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  padding: 0
                }}
              >
                {/* Meal Image Header */}
                <div style={{ height: '170px', width: '100%', position: 'relative', overflow: 'hidden', background: '#091224' }}>
                  <img
                    src={meal.image}
                    alt={meal.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(5, 11, 24, 0.85)',
                      backdropFilter: 'blur(4px)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-peach)',
                      fontWeight: 700
                    }}
                  >
                    {meal.calories}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--sky-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {meal.dietTag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                      {meal.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
                      {meal.desc}
                    </p>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '12px'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PRICE</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-peach-bright)', fontFamily: 'var(--font-mono)' }}>
                        ₹{meal.price}
                      </div>
                    </div>

                    {inCart ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: 'rgba(37, 99, 235, 0.3)',
                          border: '1px solid var(--sky-blue)',
                          borderRadius: '8px',
                          padding: '4px 8px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateMealQty(meal.id, -1)}
                          style={{ background: 'transparent', color: '#ffffff' }}
                        >
                          <Minus size={15} />
                        </button>
                        <span style={{ fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', minWidth: '18px', textAlign: 'center' }}>
                          {inCart.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateMealQty(meal.id, 1)}
                          style={{ background: 'transparent', color: '#ffffff' }}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => addMealToCart(meal)}
                        style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                      >
                        <Plus size={15} />
                        <span>Add to Order</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------
            CART SUMMARY & CONFIRMATION SIDEBAR
            ------------------------------------------------------------------ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={20} color="var(--sky-blue)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>In-Flight Meal Tray</h3>
              </div>
              <span className="module-badge badge-peach">{mealCart.reduce((sum, i) => sum + i.qty, 0)} Items</span>
            </div>

            {/* Delivery Destination Seat Tag */}
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(30, 58, 138, 0.3)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Plane size={16} color="var(--accent-peach)" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                Direct Galley Delivery to <strong style={{ color: '#ffffff' }}>Seat {user?.seat || 'Assigned'}</strong> (Flight {user?.flightNumber || 'Selected'})
              </div>
            </div>

            {/* Items List */}
            {mealCart.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {mealCart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      background: 'rgba(5, 11, 24, 0.5)',
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{item.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>
                        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMealFromCart(item.id)}
                      style={{ background: 'transparent', color: 'var(--text-muted)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Subtotal & Totals */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{cartSubtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <span>Airline GST (5%):</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{gstTax}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                    <span>Total Amount:</span>
                    <span style={{ color: 'var(--accent-peach-bright)', fontFamily: 'var(--font-mono)' }}>₹{cartTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-peach"
                  onClick={handleCheckout}
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <Sparkles size={16} />
                  <span>Confirm In-Flight Order</span>
                </button>
              </div>
            ) : (
              <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <UtensilsCrossed size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your meal tray is empty</div>
                <div style={{ fontSize: '0.78rem', marginTop: '4px' }}>
                  Select from our chef-prepared vegetarian, biryani, or diabetic menus.
                </div>
              </div>
            )}
          </div>

            {/* Confirmed Order Ticket if Available */}
            {confirmedMealOrder && (
              <div className="glass-panel-peach" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <CheckCircle2 size={20} color="var(--status-on-time)" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Latest Confirmed Order</h4>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Order ID: <strong style={{ color: 'var(--accent-peach)', fontFamily: 'var(--font-mono)' }}>{confirmedMealOrder.orderId}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '6px' }}>
                  {confirmedMealOrder.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--status-on-time)', marginTop: '8px' }}>
                  ✓ Galley crew notified • Serving after takeoff
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MealOrder;
