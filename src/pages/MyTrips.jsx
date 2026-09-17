import React, { useState } from 'react';
import { useAirport } from '../context/AirportContext';
import { TripCard } from '../components/booking/TripCard';
import { Link } from 'react-router-dom';
import { Luggage, Plane, Plus, X, Download, Printer, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

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
            background: 'rgba(5, 11, 24, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="glass-panel printable-ticket"
            style={{
              maxWidth: '640px',
              width: '100%',
              padding: '32px',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedTicketModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
            >
              <X size={18} color="#0f172a" />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#1e3a8a', fontWeight: 900 }}>{selectedTicketModal.airline} E-Ticket</h2>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Smart Airport Assistant Official Flight Pass</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PNR CODE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e3a8a', fontFamily: 'monospace' }}>{selectedTicketModal.pnr}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <div>
                <strong>Flight:</strong> {selectedTicketModal.flightNumber} ({selectedTicketModal.aircraft})<br />
                <strong>From:</strong> {selectedTicketModal.from} - {selectedTicketModal.fromCity}<br />
                <strong>Departure:</strong> {selectedTicketModal.depTime} IST ({selectedTicketModal.departureDate})<br />
                <strong>Terminal:</strong> {selectedTicketModal.fromTerminal || 'T2'}
              </div>
              <div>
                <strong>To:</strong> {selectedTicketModal.to} - {selectedTicketModal.toCity}<br />
                <strong>Arrival:</strong> {selectedTicketModal.arrTime} IST<br />
                <strong>Seat:</strong> {selectedTicketModal.seat || '12A'}<br />
                <strong>Gate:</strong> {selectedTicketModal.gate || 'A12'}
              </div>
            </div>

            <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <strong>Passenger:</strong> {selectedTicketModal.passengers?.[0]?.fullName || selectedTicketModal.passenger || 'Arun Kumar'}<br />
              <strong>Total Paid:</strong> ₹{selectedTicketModal.totalPaid?.toLocaleString('en-IN')}<br />
              <strong>Status:</strong> {selectedTicketModal.tripStatus || 'CONFIRMED'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ padding: '8px 20px', background: '#2563eb', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={16} />
                <span>Print Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
