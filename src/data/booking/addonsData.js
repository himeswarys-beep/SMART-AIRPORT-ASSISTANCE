export const EXTRA_BAGGAGE_OPTIONS = [
  { id: 'bag-0', label: 'Standard 15 kg Included', price: 0, weight: '0 kg' },
  { id: 'bag-5', label: 'Additional +5 kg Check-in Baggage', price: 1200, weight: '+5 kg' },
  { id: 'bag-10', label: 'Additional +10 kg Check-in Baggage', price: 2200, weight: '+10 kg' },
  { id: 'bag-15', label: 'Additional +15 kg Check-in Baggage', price: 3000, weight: '+15 kg' }
];

export const INFLIGHT_MEAL_OPTIONS = [
  { id: 'meal-none', name: 'No Meal (Standard)', category: 'none', price: 0, desc: 'Water and complimentary snack box' },
  { id: 'meal-veg-thali', name: 'South Indian Royal Thali', category: 'veg', price: 380, desc: 'Steamed rice, Sambar, Medu Vada, Chutney & Payasam (100% Pure Veg)' },
  { id: 'meal-biryani', name: 'Chettinad Chicken Biryani', category: 'non-veg', price: 450, desc: 'Aromatic seeraga samba rice, chicken pieces & Raita' },
  { id: 'meal-jain', name: 'Satvik Jain Gourmet Meal', category: 'jain', price: 390, desc: 'No onion, garlic or root veg. Jain Dal Makhani & Phulkas' },
  { id: 'meal-kids', name: 'Junior Aviator Bento Box', category: 'kids', price: 320, desc: 'Mini slider burger, smiley fries, cookie & fruit juice' },
  { id: 'meal-snack', name: 'Gourmet Sandwich & Cold Coffee', category: 'snack', price: 280, desc: 'Multi-grain Paneer Tikka sandwich with cold brew' }
];

export const TRAVEL_ADDONS = [
  {
    id: 'priority-boarding',
    title: 'Priority Boarding & Express Check-in',
    desc: 'Skip queue lanes, express baggage drop & priority boarding call.',
    price: 400
  },
  {
    id: 'travel-insurance',
    title: 'Comprehensive Trip Protection Insurance',
    desc: 'Up to ₹5,00,000 cover for flight delay, trip cancellation & lost baggage.',
    price: 299
  },
  {
    id: 'lounge-access',
    title: 'Airport Executive Lounge Access',
    desc: 'Complimentary buffet, high-speed WiFi & recliner seating at airport lounge.',
    price: 999
  }
];
