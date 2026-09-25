import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateMockFlights, DEFAULT_MOCK_FLIGHTS } from '../data/booking/mockFlightsData';
import { FlightSearchForm } from '../components/booking/FlightSearchForm';
import { FlightCard } from '../components/booking/FlightCard';
import { FlightFilters } from '../components/booking/FlightFilters';
import { FlightComparison } from '../components/booking/FlightComparison';
import { SeatMap } from '../components/booking/SeatMap';
import { PassengerForm } from '../components/booking/PassengerForm';
import { AddonSelector } from '../components/booking/AddonSelector';
import { PaymentForm } from '../components/booking/PaymentForm';
import { BookingConfirmationView } from '../components/booking/BookingConfirmationView';
import { useAirport } from '../context/AirportContext';
import { Plane, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import '../styles/flight-booking.css';

export const FlightBooking = () => {
  const navigate = useNavigate();
  const { user, addBooking, addToast } = useAirport();

  // Wizard Step: 'search' | 'results' | 'compare' | 'seats' | 'passengers' | 'addons' | 'payment' | 'confirmation'
  const [currentStep, setCurrentStep] = useState('search');

  // Flight Search Parameters State
  const [searchParams, setSearchParams] = useState({
    tripType: 'oneWay',
    fromCode: 'MAA',
    toCode: 'BLR',
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    cabinClass: 'Economy',
    passengers: { adults: 1, children: 0, infants: 0 }
  });

  const [searchResults, setSearchResults] = useState(DEFAULT_MOCK_FLIGHTS);
  const [isSearching, setIsSearching] = useState(false);

  // Selected Flight for Booking
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Compared Flights (Array of flight objects)
  const [comparedFlights, setComparedFlights] = useState([]);

  // Seat Selection State: { [paxIndex]: seatObject }
  const [selectedSeatsMap, setSelectedSeatsMap] = useState({});

  // Passenger Details State: Array of passenger objects
  const [passengerDetails, setPassengerDetails] = useState([
    {
      fullName: user.name || 'Arun Kumar',
      dob: user.dob || '1992-05-14',
      gender: user.gender || 'Male',
      mobile: user.phone || '+91 98401 23456',
      email: user.email || 'arun.kumar@gmail.com',
      idType: 'Passport',
      idNumber: user.passportNumber || 'Z8941029'
    }
  ]);

  // Selected Addons State
  const [selectedAddons, setSelectedAddons] = useState({
    baggageId: 'bag-0',
    mealId: 'meal-none',
    travelAddons: ['travel-insurance']
  });

  // Final Confirmed Booking Object
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Filter & Sort States for Flight Results
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'fastest' | 'earliest' | 'latest'
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [stopsFilter, setStopsFilter] = useState('all'); // 'all' | 'nonstop' | '1stop'

  // Handle Search Submission
  const handleSearchSubmit = (params) => {
    setIsSearching(true);
    setSearchParams(params);

    // Initialize passenger details array based on passenger count
    const totalCount = params.passengers.adults + params.passengers.children + params.passengers.infants;
    const initialPassengers = Array.from({ length: totalCount }, (_, i) => {
      if (i === 0) {
        return {
          fullName: user.name || 'Arun Kumar',
          dob: user.dob || '1992-05-14',
          gender: user.gender || 'Male',
          mobile: user.phone || '+91 98401 23456',
          email: user.email || 'arun.kumar@gmail.com',
          idType: 'Passport',
          idNumber: user.passportNumber || 'Z8941029'
        };
      }
      return {
        fullName: '',
        dob: '',
        gender: 'Male',
        mobile: '',
        email: '',
        idType: 'Aadhaar',
        idNumber: ''
      };
    });
    setPassengerDetails(initialPassengers);

    setTimeout(() => {
      const generated = generateMockFlights({
        fromCode: params.fromCode,
        toCode: params.toCode,
        departureDate: params.departureDate,
        cabinClass: params.cabinClass
      });
      setSearchResults(generated);
      setIsSearching(false);
      setCurrentStep('results');
      addToast('Search Complete', `Found ${generated.length} flights from ${params.fromCode} to ${params.toCode}`, 'success');
    }, 600);
  };

  // Toggle Flight Comparison Checkbox
  const handleToggleCompare = (flight) => {
    const exists = comparedFlights.some((f) => f.id === flight.id);
    if (exists) {
      setComparedFlights(comparedFlights.filter((f) => f.id !== flight.id));
    } else {
      if (comparedFlights.length >= 4) {
        addToast('Comparison Limit', 'You can compare maximum 4 flights side-by-side', 'warning');
        return;
      }
      setComparedFlights([...comparedFlights, flight]);
    }
  };

  // Filter & Sort Logic
  const filteredFlights = searchResults
    .filter((fl) => {
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(fl.airlineCode)) return false;
      if (fl.totalFare > maxPrice) return false;
      if (stopsFilter === 'nonstop' && fl.stops !== 0) return false;
      if (stopsFilter === '1stop' && fl.stops !== 1) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'cheapest') return a.totalFare - b.totalFare;
      if (sortBy === 'fastest') return parseInt(a.duration) - parseInt(b.duration);
      if (sortBy === 'earliest') return a.depTime.localeCompare(b.depTime);
      if (sortBy === 'latest') return b.depTime.localeCompare(a.depTime);
      return 0;
    });

  // Select a Flight to proceed to Seats
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setCurrentStep('seats');
  };

  // Seat selection callback
  const handleSeatSelect = (paxIndex, seatObj) => {
    setSelectedSeatsMap((prev) => ({
      ...prev,
      [paxIndex]: seatObj
    }));
  };

  // Passenger Detail Update
  const handleChangePassenger = (idx, updatedObj) => {
    setPassengerDetails((prev) => {
      const copy = [...prev];
      copy[idx] = updatedObj;
      return copy;
    });
  };

  // Payment Success Handler
  const handlePaymentSuccess = (paymentDetails) => {
    const generatedPnr = `PNR-${selectedFlight.airlineCode}-${Math.floor(100000 + Math.random() * 900000)}`;

    const seatsAssignedList = Object.values(selectedSeatsMap)
      .map((s) => s?.seatNumber)
      .filter(Boolean);

    const newBooking = {
      id: `booking-${Date.now()}`,
      pnr: generatedPnr,
      airline: selectedFlight.airline,
      airlineCode: selectedFlight.airlineCode,
      airlineLogo: selectedFlight.airlineLogo,
      airlineColor: selectedFlight.airlineColor,
      flightNumber: selectedFlight.flightNumber,
      aircraft: selectedFlight.aircraft,
      from: selectedFlight.from,
      fromCity: selectedFlight.fromCity,
      fromTerminal: selectedFlight.fromTerminal,
      to: selectedFlight.to,
      toCity: selectedFlight.toCity,
      toTerminal: selectedFlight.toTerminal,
      depTime: selectedFlight.depTime,
      arrTime: selectedFlight.arrTime,
      departureDate: searchParams.departureDate,
      duration: selectedFlight.duration,
      gate: selectedFlight.gate || 'A12',
      passengers: passengerDetails,
      seatsAssigned: seatsAssignedList.length > 0 ? seatsAssignedList : ['12A'],
      seat: seatsAssignedList[0] || '12A',
      selectedAddons,
      paymentDetails,
      totalPaid: paymentDetails.amount,
      paymentStatus: 'SUCCESSFUL',
      flightStatus: 'On Time',
      tripStatus: 'Upcoming',
      bookedAt: new Date().toISOString()
    };

    setConfirmedBooking(newBooking);
    addBooking(newBooking);
    setCurrentStep('confirmation');
  };

  const steps = [
    { id: 'search', label: '1. Search' },
    { id: 'results', label: '2. Select Flight' },
    { id: 'seats', label: '3. Seat Selection' },
    { id: 'passengers', label: '4. Passenger Details' },
    { id: 'addons', label: '5. Add-ons' },
    { id: 'payment', label: '6. Payment' },
    { id: 'confirmation', label: '7. Confirmation' }
  ];

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="hero-tag" style={{ marginBottom: '4px' }}>Indian Domestic Flight Booking</span>
          <h1 style={{ fontSize: '2rem',color:'#043d61ff', fontWeight: 800 }}>Flight Booking System</h1>
        </div>

        {/* View Compare Flights button if results or compare active */}
        {(currentStep === 'results' || currentStep === 'compare') && comparedFlights.length > 0 && (
          <button
            type="button"
            className="btn-peach"
            onClick={() => setCurrentStep(currentStep === 'compare' ? 'results' : 'compare')}
          >
            <span>Compare {comparedFlights.length} Flights</span>
          </button>
        )}
      </div>

      {/* Wizard Stepper */}
      <div className="booking-wizard-stepper">
        {steps.map((st, idx) => {
          const isCurrent = currentStep === st.id;
          const isDone = steps.findIndex((s) => s.id === currentStep) > idx;

          return (
            <React.Fragment key={st.id}>
              <div
                className={`step-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                onClick={() => {
                  if (isDone) setCurrentStep(st.id);
                }}
              >
                <div className="step-number">{idx + 1}</div>
                <span>{st.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`step-divider ${isDone ? 'active' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* STEP 1: SEARCH & HERO FORM */}
      {currentStep === 'search' && (
        <FlightSearchForm
          searchParams={searchParams}
          onSearchSubmit={handleSearchSubmit}
          isLoading={isSearching}
        />
      )}

      {/* STEP 2: RESULTS */}
      {currentStep === 'results' && (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button type="button" className="btn-outline" onClick={() => setCurrentStep('search')} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <ArrowLeft size={14} />
              <span>Modify Search</span>
            </button>

            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Showing {filteredFlights.length} available flights for <strong>{searchParams.fromCode} ➔ {searchParams.toCode}</strong> ({searchParams.departureDate})
            </span>
          </div>

          <FlightFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            stopsFilter={stopsFilter}
            setStopsFilter={setStopsFilter}
            onResetFilters={() => {
              setSelectedAirlines([]);
              setMaxPrice(15000);
              setStopsFilter('all');
              setSortBy('cheapest');
            }}
          />

          {filteredFlights.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h3>No flights match your filters</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Try adjusting the price slider or clearing airline filters to see available domestic flights.
              </p>
            </div>
          ) : (
            filteredFlights.map((fl) => (
              <FlightCard
                key={fl.id}
                flight={fl}
                onSelectFlight={handleSelectFlight}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedFlights.some((c) => c.id === fl.id)}
                isSelected={selectedFlight?.id === fl.id}
              />
            ))
          )}
        </div>
      )}

      {/* STEP 3: SIDE-BY-SIDE COMPARISON VIEW */}
      {currentStep === 'compare' && (
        <FlightComparison
          comparedFlights={comparedFlights}
          onSelectFlight={handleSelectFlight}
          onRemoveCompare={(id) => setComparedFlights(comparedFlights.filter((f) => f.id !== id))}
          onClose={() => setCurrentStep('results')}
        />
      )}

      {/* STEP 4: SEAT SELECTION */}
      {currentStep === 'seats' && selectedFlight && (
        <div>
          <button type="button" className="btn-outline" onClick={() => setCurrentStep('results')} style={{ padding: '6px 14px', fontSize: '0.8rem', marginBottom: '16px' }}>
            <ArrowLeft size={14} />
            <span>Back to Flight Results</span>
          </button>
          <SeatMap
            flight={selectedFlight}
            passengers={passengerDetails}
            selectedSeatsMap={selectedSeatsMap}
            onSeatSelect={handleSeatSelect}
            onProceed={() => setCurrentStep('passengers')}
          />
        </div>
      )}

      {/* STEP 5: PASSENGER DETAILS */}
      {currentStep === 'passengers' && (
        <div>
          <button type="button" className="btn-outline" onClick={() => setCurrentStep('seats')} style={{ padding: '6px 14px', fontSize: '0.8rem', marginBottom: '16px' }}>
            <ArrowLeft size={14} />
            <span>Back to Seat Map</span>
          </button>
          <PassengerForm
            passengersCount={searchParams.passengers}
            passengerDetails={passengerDetails}
            onChangePassenger={handleChangePassenger}
            onProceed={() => setCurrentStep('addons')}
          />
        </div>
      )}

      {/* STEP 6: ADD-ONS */}
      {currentStep === 'addons' && (
        <div>
          <button type="button" className="btn-outline" onClick={() => setCurrentStep('passengers')} style={{ padding: '6px 14px', fontSize: '0.8rem', marginBottom: '16px' }}>
            <ArrowLeft size={14} />
            <span>Back to Passenger Details</span>
          </button>
          <AddonSelector
            selectedAddons={selectedAddons}
            onChangeAddons={setSelectedAddons}
            onProceed={() => setCurrentStep('payment')}
          />
        </div>
      )}

      {/* STEP 7: PAYMENT */}
      {currentStep === 'payment' && selectedFlight && (
        <div>
          <button type="button" className="btn-outline" onClick={() => setCurrentStep('addons')} style={{ padding: '6px 14px', fontSize: '0.8rem', marginBottom: '16px' }}>
            <ArrowLeft size={14} />
            <span>Back to Add-ons</span>
          </button>
          <PaymentForm
            flight={selectedFlight}
            passengers={passengerDetails}
            selectedSeatsMap={selectedSeatsMap}
            selectedAddons={selectedAddons}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      )}

      {/* STEP 8: BOOKING CONFIRMATION */}
      {currentStep === 'confirmation' && confirmedBooking && (
        <BookingConfirmationView
          booking={confirmedBooking}
          onNewBooking={() => {
            setSelectedFlight(null);
            setConfirmedBooking(null);
            setSelectedSeatsMap({});
            setCurrentStep('search');
          }}
        />
      )}
    </div>
  );
};

export default FlightBooking;
