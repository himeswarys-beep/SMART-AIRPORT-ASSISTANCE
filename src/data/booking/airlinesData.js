export const AIRLINES = [
  {
    id: 'indigo',
    name: 'IndiGo',
    code: '6E',
    logo: '6E',
    color: '#003366',
    accentColor: '#38bdf8',
    baggageCheckin: '15 kg',
    baggageCabin: '7 kg',
    cancellationFee: '₹3,000',
    changeFee: '₹2,500',
    mealPolicy: 'Buy-on-board / Free on Select Fares'
  },
  {
    id: 'airindia',
    name: 'Air India',
    code: 'AI',
    logo: 'AI',
    color: '#d91b24',
    accentColor: '#f59e0b',
    baggageCheckin: '25 kg',
    baggageCabin: '8 kg',
    cancellationFee: '₹2,500',
    changeFee: '₹2,000',
    mealPolicy: 'Complimentary Hot Gourmet Meal Included'
  },
  {
    id: 'airindiaexpress',
    name: 'Air India Express',
    code: 'IX',
    logo: 'IX',
    color: '#f36f21',
    accentColor: '#fb923c',
    baggageCheckin: '15 kg',
    baggageCabin: '7 kg',
    cancellationFee: '₹2,800',
    changeFee: '₹2,200',
    mealPolicy: 'Pre-bookable Snacks & Meals'
  },
  {
    id: 'akasa',
    name: 'Akasa Air',
    code: 'QP',
    logo: 'QP',
    color: '#ff6600',
    accentColor: '#fb923c',
    baggageCheckin: '15 kg',
    baggageCabin: '7 kg',
    cancellationFee: '₹2,900',
    changeFee: '₹2,400',
    mealPolicy: 'Café Akasa Gourmet Snacks'
  },
  {
    id: 'spicejet',
    name: 'SpiceJet',
    code: 'SG',
    logo: 'SG',
    color: '#ed1c24',
    accentColor: '#ef4444',
    baggageCheckin: '15 kg',
    baggageCabin: '7 kg',
    cancellationFee: '₹3,200',
    changeFee: '₹2,700',
    mealPolicy: 'Hot Meal Pre-order available'
  },
  {
    id: 'alliance',
    name: 'Alliance Air',
    code: '9I',
    logo: '9I',
    color: '#00529b',
    accentColor: '#60a5fa',
    baggageCheckin: '15 kg',
    baggageCabin: '5 kg',
    cancellationFee: '₹2,000',
    changeFee: '₹1,500',
    mealPolicy: 'Complimentary Water & Snack Box'
  }
];

export const getAirlineByCode = (code) => {
  return AIRLINES.find((al) => al.code === code || al.id === code) || AIRLINES[0];
};
