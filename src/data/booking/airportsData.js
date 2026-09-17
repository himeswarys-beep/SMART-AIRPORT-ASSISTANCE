export const INDIAN_AIRPORTS = [
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', state: 'Tamil Nadu', terminal: 'T2 - Domestic' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', state: 'Karnataka', terminal: 'T1' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', state: 'Delhi NCR', terminal: 'T3 - Domestic' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Int\'l Airport', city: 'Mumbai', state: 'Maharashtra', terminal: 'T2' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', state: 'Telangana', terminal: 'T1' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose Int\'l Airport', city: 'Kolkata', state: 'West Bengal', terminal: 'T1' },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', state: 'Kerala', terminal: 'T1' },
  { code: 'GOI', name: 'Goa Dabolim Airport', city: 'Goa', state: 'Goa', terminal: 'T1' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', state: 'Maharashtra', terminal: 'T1' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel Int\'l Airport', city: 'Ahmedabad', state: 'Gujarat', terminal: 'T1' },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', state: 'Rajasthan', terminal: 'T1' },
  { code: 'LKO', name: 'Chaudhary Charan Singh Int\'l Airport', city: 'Lucknow', state: 'Uttar Pradesh', terminal: 'T2' },
  { code: 'VTZ', name: 'Visakhapatnam International Airport', city: 'Visakhapatnam', state: 'Andhra Pradesh', terminal: 'T1' },
  { code: 'BBI', name: 'Biju Patnaik International Airport', city: 'Bhubaneswar', state: 'Odisha', terminal: 'T1' },
  { code: 'CJB', name: 'Coimbatore International Airport', city: 'Coimbatore', state: 'Tamil Nadu', terminal: 'T1' },
  { code: 'IXM', name: 'Madurai Airport', city: 'Madurai', state: 'Tamil Nadu', terminal: 'T1' },
  { code: 'TRZ', name: 'Tiruchirappalli International Airport', city: 'Trichy', state: 'Tamil Nadu', terminal: 'T1' },
  { code: 'IXC', name: 'Chandigarh International Airport', city: 'Chandigarh', state: 'Punjab/Haryana', terminal: 'T1' },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi Int\'l Airport', city: 'Guwahati', state: 'Assam', terminal: 'T1' },
  { code: 'ATQ', name: 'Sri Guru Ram Dass Jee Int\'l Airport', city: 'Amritsar', state: 'Punjab', terminal: 'T1' }
];

export const getAirportByCode = (code) => {
  return INDIAN_AIRPORTS.find((ap) => ap.code === code) || {
    code: code,
    name: `${code} Airport`,
    city: code,
    state: 'India',
    terminal: 'T1'
  };
};
