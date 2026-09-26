import React, { createContext, useContext, useState, useEffect } from 'react';
import { ASSETS } from '../assets/images';
import { getAirportData, airportsList } from '../data/airports';
import { 
  generateFlightsForAirport,
  generateQueueMetricsForAirport,
  generateDelayPredictionForAirport,
  generateAssistanceBookingsForAirport,
  generateBaggageStatusForAirport
} from '../utils/airportMockData';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { calculateBoardingCountdown } from '../utils/countdownUtils';

const AirportContext = createContext();

export const AirportProvider = ({ children }) => {
  // Language State ('en' | 'ta')
  const [language, setLanguage] = useState('en');

  // Theme State ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('smart_airport_theme');
      return savedTheme || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smart_airport_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  }, [theme]);

  // Passport Details State
  const [passportDetails, setPassportDetails] = useState({
    passportNumber: '',
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    passportExpiry: '',
    passportCountry: '',
    contactNumber: '+91 98401 23456'
  });

  // Active Booking State (persisted in localStorage)
  const [activeBooking, setActiveBooking] = useState(null);

  // Expire active booking if flight journey has passed
  useEffect(() => {
    if (!activeBooking) return;
    try {
      const today = new Date();
      if (!activeBooking.departureDate) return;
      
      const [hours, minutes] = (activeBooking.depTime || '00:00').split(':');
      const flightDate = new Date(activeBooking.departureDate);
      flightDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // If current time is 6 hours past departure time, consider it completed/expired
      const expiryTime = new Date(flightDate.getTime() + 6 * 60 * 60 * 1000);
      
      if (today > expiryTime) {
        setActiveBooking(null);
        localStorage.removeItem('smart_airport_active_booking');
        
        // Also update myTrips to mark it as completed
        setMyTrips(prev => prev.map(trip => 
          trip.id === activeBooking.id ? { ...trip, status: 'Completed' } : trip
        ));
      }
    } catch (e) {
      console.error('Error checking booking expiration', e);
    }
  }, [activeBooking]);

  const { user: authUser, logout } = useAuth();

  // 1. Current Passenger & Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    const baseUser = {
      name: 'Arun Kumar',
      email: 'arun.kumar@aerova.in',
      phone: '+91 98401 23456',
      passportNumber: 'Z9840123',
      dob: '1994-08-15',
      gender: 'Male',
      nationality: 'Indian',
      passportExpiry: '2032-11-20',
      passportCountry: 'India'
    };

    return baseUser;
  });

  // Sync with AuthUser
  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
      const metadata = authUser.user_metadata || {};
      const savedPassport = metadata.passportDetails || {};
      if (metadata.passportDetails) {
        setPassportDetails(metadata.passportDetails);
      }

      const baseUser = {
        name: metadata.full_name || authUser.email.split('@')[0],
        email: authUser.email,
        phone: metadata.phone || savedPassport.contactNumber || '+91 98401 23456',
        id: authUser.id,
        passportNumber: savedPassport.passportNumber || 'Z9840123',
        dob: savedPassport.dob || '1994-08-15',
        gender: savedPassport.gender || 'Male',
        nationality: savedPassport.nationality || 'Indian',
        passportExpiry: savedPassport.passportExpiry || '2032-11-20',
        passportCountry: savedPassport.passportCountry || 'India'
      };

      try {
        const saved = localStorage.getItem('smart_airport_active_booking');
        if (saved) {
          const bk = JSON.parse(saved);
          if (bk.userId === authUser.id) {
            setActiveBooking(bk);
            setUser({
              ...baseUser,
              pnr: bk.pnr,
              flightNumber: bk.flightNumber,
              airline: bk.airline,
              airlineCode: bk.airlineCode || '6E',
              from: bk.from,
              fromCity: bk.fromCity,
              fromTerminal: bk.fromTerminal,
              to: bk.to,
              toCity: bk.toCity,
              toTerminal: bk.toTerminal,
              departureTime: bk.depTime,
              boardingTime: bk.depTime,
              departureDate: bk.departureDate,
              gate: bk.gate || 'A12',
              seat: bk.seatsAssigned?.[0] || bk.seat || '12A',
              baggageTag: bk.baggageTag || `TAG-${bk.airlineCode || '6E'}-99214`,
              barcode: bk.barcode || `M1${baseUser.name.toUpperCase().replace(/\s+/g, '/')} E${bk.pnr} ${bk.from}${bk.to}${bk.airlineCode || '6E'} ${bk.flightNumber?.replace(/\s+/g, '') || ''}`
            });
            return;
          }
        }
      } catch (e) {}

      setActiveBooking(null);
      setUser(baseUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setActiveBooking(null);
    }
  }, [authUser]);

  // Active Terminal Filter
  const [activeAirport, setActiveAirport] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_airport_active');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return airportsList[0];
  });

  useEffect(() => {
    try {
      localStorage.setItem('smart_airport_active', JSON.stringify(activeAirport));
    } catch (e) {}
  }, [activeAirport]);

  // 2. Notification Center State
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Gate Changed to A12',
      desc: 'Flight 6E 204 gate updated from A04 to Gate A12. Please proceed to Concourse A.',
      time: '5 mins ago',
      type: 'gate',
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Boarding in 30 Minutes',
      desc: 'Boarding for your flight to Thoothukudi starts at 18:45 IST at Gate A12.',
      time: '18 mins ago',
      type: 'flight',
      unread: true
    },
    {
      id: 'notif-3',
      title: 'Baggage Loaded Successfully',
      desc: 'Tag TAG-6E-99214 loaded into Aircraft Cargo Hold B.',
      time: '35 mins ago',
      type: 'baggage',
      unread: false
    },
    {
      id: 'notif-4',
      title: 'Fast Track Security Open',
      desc: 'DigiYatra Lane 2 has minimal waiting time (approx 2 mins).',
      time: '1 hour ago',
      type: 'queue',
      unread: false
    }
  ]);

  // 3. Toasts state
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now().toString();
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast('Notifications Cleared', 'All notifications marked as read', 'success');
  };

  // 4. Flight Schedule Dataset
  const [flights, setFlights] = useState(() => {
    const ap = activeAirport || airportsList[0];
    return generateFlightsForAirport(ap.code, ap.city);
  });

  // Helper to normalize airport locations to standard navigation POIs
  const normalizeMapLocations = (locations) => {
    if (!locations || !Array.isArray(locations)) return [];
    return locations.map((loc) => ({
      ...loc,
      x: loc.x ?? loc.position?.x ?? 500,
      y: loc.y ?? loc.position?.y ?? 200,
      terminal: loc.terminal || loc.details || (loc.level === 'L0' ? 'Arrivals Level 0' : 'Departures Concourse Level 1'),
      walkTime: loc.walkTime || `${Math.floor(Math.random() * 4) + 2} mins`,
      distance: loc.distance || `${(Math.floor(Math.random() * 15) + 10) * 15}m`,
      directions: loc.directions || [
        `Proceed from your current location towards ${loc.name}`,
        `Follow illuminated overhead signage for ${loc.category ? loc.category.toUpperCase() : 'WAYPOINT'}`,
        `Arrive at destination: ${loc.name}`
      ]
    }));
  };

  // 5. Indoor Navigation Blueprint Dataset
  const [navigationPOIs, setNavigationPOIs] = useState(() => {
    const ap = activeAirport || airportsList[0];
    const mapData = getAirportData(ap.id);
    return normalizeMapLocations(mapData?.locations);
  });

  const [activeDestination, setActiveDestination] = useState(() => {
    const ap = activeAirport || airportsList[0];
    const mapData = getAirportData(ap.id);
    const normalized = normalizeMapLocations(mapData?.locations);
    return normalized[0] || {
      id: 'gate-a12',
      name: 'Gate A12',
      terminal: 'Concourse A',
      x: 735,
      y: 132,
      level: 'L1',
      category: 'gates',
      walkTime: '4 mins',
      distance: '280m',
      directions: [
        'Exit Security Checkpoint A into Central Concourse Rotunda',
        'Turn right into Concourse A corridor (towards Gates A1 - A12)',
        'Walk past DFS Duty Free & Saravanaa Bhavan Food Court (150m)',
        'Gate A12 is located at the end of the east concourse pier on the left'
      ]
    };
  });
  const [accessibleRoute, setAccessibleRoute] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('L1');

  // 6. Baggage Tracking State
  const [baggageQuery, setBaggageQuery] = useState('TAG-6E-99214');
  const [baggageStatus, setBaggageStatus] = useState(() => {
    const ap = activeAirport || airportsList[0];
    return generateBaggageStatusForAirport(ap.code);
  });

  const [lostBaggageReports, setLostBaggageReports] = useState([
    {
      id: 'REP-MAA-44812',
      baggageTag: 'TAG-AI-88319',
      flight: 'AI 542',
      passenger: 'Arun Kumar',
      date: '2026-09-01',
      description: 'Black Delsey hard-case suitcase with orange ribbon',
      status: 'Investigation in Progress',
      assignedOfficer: 'Officer Priya R. (MAA Baggage Ops)',
      contact: '+91 44 2256 1234'
    }
  ]);

  const reportLostBaggage = (reportData) => {
    const newReport = {
      id: `REP-MAA-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Registered & Tracking Initiated',
      assignedOfficer: 'Officer Ramesh K. (Airport Baggage Services)',
      contact: '+91 44 2256 7890',
      ...reportData
    };
    setLostBaggageReports([newReport, ...lostBaggageReports]);
    addToast('Complaint Registered', `Reference ID: ${newReport.id} generated`, 'success');
  };

  // 7. In-Flight Meal Pre-Order Menu & Cart
  const mealMenu = [
    {
      id: 'meal-1',
      name: 'South Indian Royal Thali',
      category: 'veg',
      dietTag: '100% Pure Veg',
      calories: '540 kcal',
      price: 380,
      image: ASSETS.meals.southIndian,
      desc: 'Steamed aromatic rice, Sambar, Medu Vada, Tomato & Coconut chutney, Curd rice and Semiya Payasam.'
    },
    {
      id: 'meal-2',
      name: 'Chettinad Chicken Dum Biryani',
      category: 'non-veg',
      dietTag: 'Chef Special Non-Veg',
      calories: '680 kcal',
      price: 450,
      image: ASSETS.meals.biryani,
      desc: 'Spiced aromatic seeraga samba rice cooked with tender chicken pieces, served with onion raita & boiled egg.'
    },
    {
      id: 'meal-3',
      name: 'Satvik Jain Gourmet Meal',
      category: 'jain',
      dietTag: 'Jain Special (No Root Veg)',
      calories: '490 kcal',
      price: 390,
      image: ASSETS.meals.jain,
      desc: 'Prepared without onion, garlic, or root vegetables. Includes Jain Dal Makhani, Paneer, Phulkas, & Gulab Jamun.'
    },
    {
      id: 'meal-4',
      name: 'Avocado & Quinoa Power Bowl',
      category: 'diabetic',
      dietTag: 'Diabetic Friendly • Low GI',
      calories: '340 kcal',
      price: 420,
      image: ASSETS.meals.salad,
      desc: 'Organic Peruvian quinoa, fresh Hass avocado slices, cherry tomatoes, pumpkin seeds, and cold-pressed olive dressing.'
    },
    {
      id: 'meal-5',
      name: 'Junior Aviator Bento Box',
      category: 'kids',
      dietTag: 'Kids Special',
      calories: '410 kcal',
      price: 320,
      image: ASSETS.meals.kids,
      desc: 'Mini slider burger, smiley baked fries, fresh apple fruit wedges, chocolate cookie, and organic mango juice.'
    },
    {
      id: 'meal-6',
      name: 'Tandoori Paneer Tikka Platter',
      category: 'veg',
      dietTag: 'Gourmet Veg Snack',
      calories: '480 kcal',
      price: 360,
      image: ASSETS.meals.paneer,
      desc: 'Smoked paneer cubes marinated in yogurt & spices, charred peppers, mint cilantro dip, and spiced butter naan.'
    }
  ];

  const [mealCart, setMealCart] = useState([]);
  const [confirmedMealOrder, setConfirmedMealOrder] = useState(null);

  const addMealToCart = (meal) => {
    setMealCart((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...meal, qty: 1 }];
    });
    addToast('Meal Added', `${meal.name} added to in-flight order`, 'success');
  };

  const removeMealFromCart = (mealId) => {
    setMealCart((prev) => prev.filter((item) => item.id !== mealId));
  };

  const updateMealQty = (mealId, delta) => {
    setMealCart((prev) =>
      prev
        .map((item) => {
          if (item.id === mealId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const placeMealOrder = () => {
    if (mealCart.length === 0) return;
    const orderData = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...mealCart],
      flight: user?.flightNumber || '6E 204',
      seat: user?.seat || '12A',
      passenger: user?.name || 'Passenger',
      totalAmount: mealCart.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
      status: 'Confirmed & Sent to Galley',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setConfirmedMealOrder(orderData);
    setMealCart([]);
    addToast('Order Placed Successfully!', `Will be served to Seat ${user?.seat || '12A'} during flight`, 'success');
  };

  // 8. Flight Delay Prediction Analytics Model State
  const [delayPrediction, setDelayPrediction] = useState(() => {
    const ap = activeAirport || airportsList[0];
    const mockFlights = generateFlightsForAirport(ap.code, ap.city);
    return generateDelayPredictionForAirport(ap.code, mockFlights);
  });

  // 9. Queue Management State
  const [queueMetrics, setQueueMetrics] = useState(() => {
    const ap = activeAirport || airportsList[0];
    return generateQueueMetricsForAirport(ap.code);
  });

  // 10. Special Assistance Booking State
  const [assistanceBookings, setAssistanceBookings] = useState(() => {
    const ap = activeAirport || airportsList[0];
    return generateAssistanceBookingsForAirport(ap.code);
  });

  // Effect to fetch live data from Supabase or fallback to mock data when activeAirport changes
  useEffect(() => {
    if (!activeAirport) return;
    const { code, city, id } = activeAirport;

    const fetchAirportData = async () => {
      const mockFlights = generateFlightsForAirport(code, city);
      setFlights(mockFlights);
      
      try {
        // 1. Fetch Delay Prediction from Supabase
        const { data: delayData, error: delayError } = await supabase
          .from('delay_predictions')
          .select('*')
          .eq('airport_code', code)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (delayData && !delayError) {
          setDelayPrediction(delayData.prediction_data);
        } else {
          setDelayPrediction(generateDelayPredictionForAirport(code, mockFlights));
        }

        // 2. Fetch Queue and Crowd Metrics from Supabase
        const { data: queueData, error: queueError } = await supabase
          .from('queue_metrics')
          .select('*')
          .eq('airport_code', code)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (queueData && !queueError) {
          setQueueMetrics(queueData.metrics_data);
        } else {
          setQueueMetrics(generateQueueMetricsForAirport(code));
        }
      } catch (err) {
        console.error('Supabase fetch error:', err);
        setDelayPrediction(generateDelayPredictionForAirport(code, mockFlights));
        setQueueMetrics(generateQueueMetricsForAirport(code));
      }

      setAssistanceBookings(generateAssistanceBookingsForAirport(code));
      setBaggageStatus(generateBaggageStatusForAirport(code));

      const mapData = getAirportData(id);
      if (mapData && mapData.locations) {
        const standardPOIs = normalizeMapLocations(mapData.locations);
        setNavigationPOIs(standardPOIs);
        if (standardPOIs.length > 0) {
          setActiveDestination(standardPOIs[0]);
        }
      }
    };

    fetchAirportData();
  }, [activeAirport]);

  const bookSpecialAssistance = (bookingData) => {
    const newBooking = {
      id: `AST-MAA-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed & Officer Assigned',
      officerName: 'Executive Selvam K. (Special Assistance Team)',
      officerPhone: '+91 94440 12389',
      ...bookingData
    };
    setAssistanceBookings([newBooking, ...assistanceBookings]);
    addToast('Assistance Requested', `Booking ID ${newBooking.id} confirmed`, 'success');
  };

  // Dynamic Live Countdown for Boarding calculated from actual flight date & time
  const [boardingCountdown, setBoardingCountdown] = useState(() =>
    calculateBoardingCountdown(activeBooking || user)
  );

  useEffect(() => {
    const updateCountdown = () => {
      setBoardingCountdown(calculateBoardingCountdown(activeBooking || user));
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeBooking, user]);

  // 11. My Trips & Flight Booking State with localStorage persistence
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    if (!authUser) {
      setMyTrips([]);
      return;
    }
    try {
      const saved = localStorage.getItem('smart_airport_my_trips');
      if (saved) {
        const trips = JSON.parse(saved);
        setMyTrips(trips.filter(t => t.userId === authUser.id));
      }
    } catch (e) {
      console.error('Error loading saved trips', e);
    }
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;
    try {
      // Load existing trips first so we don't overwrite other users' trips, just update them all
      const saved = localStorage.getItem('smart_airport_my_trips');
      let allTrips = saved ? JSON.parse(saved) : [];
      // Remove current user's old trips and append new ones
      allTrips = allTrips.filter(t => t.userId !== authUser.id).concat(myTrips);
      localStorage.setItem('smart_airport_my_trips', JSON.stringify(allTrips));
    } catch (e) {
      console.error('Error saving trips to localStorage', e);
    }
  }, [myTrips, authUser]);

  const addBooking = (bookingData) => {
    const newBooking = { ...bookingData, userId: authUser?.id };
    setMyTrips((prev) => [newBooking, ...prev]);

    // Persist as the active booking in localStorage
    try {
      localStorage.setItem('smart_airport_active_booking', JSON.stringify(newBooking));
    } catch (e) {}
    setActiveBooking(newBooking);

    // Update active user context with latest booked flight details
    setUser((prev) => ({
      ...prev,
      pnr: newBooking.pnr,
      flightNumber: newBooking.flightNumber,
      airline: newBooking.airline,
      from: newBooking.from,
      fromCity: newBooking.fromCity,
      fromTerminal: newBooking.fromTerminal,
      to: newBooking.to,
      toCity: newBooking.toCity,
      toTerminal: newBooking.toTerminal,
      departureTime: newBooking.depTime,
      gate: newBooking.gate || 'A12',
      seat: newBooking.seatsAssigned?.[0] || newBooking.seat || '12A',
      baggageTag: `TAG-${newBooking.airlineCode}-${Math.floor(10000 + Math.random() * 90000)}`
    }));

    // Seamlessly integrate newly booked flight into Flight Status dataset!
    const newFlightSchedule = {
      id: `fl-booked-${Date.now()}`,
      flightNumber: newBooking.flightNumber,
      airline: newBooking.airline,
      airlineCode: newBooking.airlineCode || '6E',
      type: 'departure',
      from: newBooking.from,
      fromCity: newBooking.fromCity,
      to: newBooking.to,
      toCity: newBooking.toCity,
      scheduledTime: newBooking.depTime,
      estimatedTime: newBooking.depTime,
      gate: newBooking.gate || 'A12',
      terminal: newBooking.fromTerminal || 'T2',
      status: 'On Time',
      aircraft: newBooking.aircraft || 'Airbus A320neo',
      baggageBelt: 'Belt 04'
    };

    setFlights((prev) => [newFlightSchedule, ...prev]);
    addToast('Booking Saved to My Trips', `PNR: ${newBooking.pnr} added to itinerary`, 'success');
  };

  const clearActiveBooking = () => {
    setActiveBooking(null);
    try {
      localStorage.removeItem('smart_airport_active_booking');
    } catch (e) {}
    setUser((prev) => ({
      name: prev.name || 'Arun Kumar',
      email: prev.email || 'arun.kumar@aerova.in',
      phone: prev.phone || '+91 98401 23456',
      passportNumber: prev.passportNumber || 'Z9840123',
      dob: prev.dob || '1994-08-15',
      gender: prev.gender || 'Male',
      nationality: prev.nationality || 'Indian',
      passportExpiry: prev.passportExpiry || '2032-11-20',
      passportCountry: prev.passportCountry || 'India'
    }));
    addToast('Booking Reset', 'Active booking cleared', 'info');
  };

  const cancelBooking = (tripId) => {
    setMyTrips((prev) =>
      prev.map((t) => (t.id === tripId || t.pnr === tripId ? { ...t, tripStatus: 'Cancelled', flightStatus: 'Cancelled' } : t))
    );
    if (!tripId || (activeBooking && (activeBooking.id === tripId || activeBooking.pnr === tripId))) {
      clearActiveBooking();
    }
  };

  return (
    <AirportContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        passportDetails,
        setPassportDetails,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        activeBooking,
        setActiveBooking,
        clearActiveBooking,
        activeAirport,
        setActiveAirport,
        notifications,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast,
        flights,
        setFlights,
        navigationPOIs,
        setNavigationPOIs,
        activeDestination,
        setActiveDestination,
        accessibleRoute,
        setAccessibleRoute,
        selectedFloor,
        setSelectedFloor,
        baggageQuery,
        setBaggageQuery,
        baggageStatus,
        setBaggageStatus,
        lostBaggageReports,
        reportLostBaggage,
        mealMenu,
        mealCart,
        addMealToCart,
        removeMealFromCart,
        updateMealQty,
        placeMealOrder,
        confirmedMealOrder,
        delayPrediction,
        setDelayPrediction,
        queueMetrics,
        assistanceBookings,
        bookSpecialAssistance,
        boardingCountdown,
        myTrips,
        addBooking,
        cancelBooking
      }}
    >
      {children}
    </AirportContext.Provider>
  );
};

export const useAirport = () => {
  const context = useContext(AirportContext);
  if (!context) {
    throw new Error('useAirport must be used within an AirportProvider');
  }
  return context;
};

export default AirportContext;
