import React, { useState } from 'react';
import { useAirport } from '../context/AirportContext';
import { TripCard } from '../components/booking/TripCard';
import { Link } from 'react-router-dom';
import { Luggage, Plane, Plus, X, Download, Printer, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import BoardingPassCard from '../components/booking/BoardingPassCard';

export const MyTrips = () => {
  const { myTrips, cancelBooking, addToast } = useAirport();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  const upcomingTrips = myTrips.filter((t) => t.tripStatus === 'Upcoming' || !t.tripStatus);
  const completedTrips = myTrips.filter((t) => t.tripStatus === 'Completed');
  const cancelledTrips = myTrips.filter((t) => t.tripStatus === 'Cancelled');

  const displayedTrips =
    activeTab === 'upcoming'
      ? upcomingTrips
      : activeTab === 'completed'
      ? completedTrips
      : cancelledTrips;

  const handleCancelTrip = (tripId) => {
    if (window.confirm('Are you sure you want to cancel this booking? Simulated refund will be processed.')) {
      cancelBooking(tripId);
      addToast('Trip Cancelled', 'Booking status updated to Cancelled. Refund initiated.', 'info');
    }
  };

  const handleViewTicket = (trip) => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSelectedTicketModal(trip);
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="hero-tag" style={{ marginBottom: '6px' }}>Passenger Itinerary</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Trips & Bookings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage upcoming domestic flights, download electronic tickets, swap seats, or track live flight status.
          </p>
        </div>

        <Link to="/flight-booking" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <Plus size={16} />
          <span>Book New Flight</span>
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        {[
          { id: 'upcoming', label: `Upcoming Trips (${upcomingTrips.length})` },
          { id: 'completed', label: `Completed (${completedTrips.length})` },
          { id: 'cancelled', label: `Cancelled (${cancelledTrips.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === tab.id ? 'var(--gradient-sky)' : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
              border: activeTab === tab.id ? '1px solid var(--sky-blue)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trips list */}
      {displayedTrips.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <Luggage size={48} color="var(--sky-blue)" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>No {activeTab} trips found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px', maxWidth: '400px', margin: '6px auto 20px' }}>
            {activeTab === 'upcoming'
              ? 'You have no active upcoming domestic flight bookings. Book a flight to get started!'
              : `You have no ${activeTab} flights in your travel record.`}
          </p>
          <Link to="/flight-booking" className="btn-peach" style={{ display: 'inline-flex', padding: '10px 24px', fontSize: '0.9rem' }}>
            <span>Search & Book Domestic Flights</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        displayedTrips.map((trip) => (
          <TripCard
            key={trip.id || trip.pnr}
            trip={trip}
            onCancelTrip={handleCancelTrip}
            onViewTicket={handleViewTicket}
          />
        ))
      )}

      {/* Printable Ticket Modal */}
      {selectedTicketModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(5, 11, 24, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              maxWidth: '920px',
              width: '100%',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedTicketModal(null)}
              style={{
                position: 'absolute',
                top: '6px',
                right: '12px',
                background: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <X size={18} color="#ffffff" />
            </button>

            <BoardingPassCard flightData={selectedTicketModal} theme="reference" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
