import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AirportProvider } from './context/AirportContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Styles
import './styles/index.css';
import './styles/components.css';
import './styles/navigation-map.css';
import './styles/flight-booking.css';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { NotificationPanel } from './components/NotificationPanel';
import { ToastContainer } from './components/ToastContainer';
import { AIChatbox } from './components/AIChatbox';

// Pages
import { Splash } from './pages/Splash';
import { Auth } from './pages/Auth';
import { LanguageSelection } from './pages/LanguageSelection';
import { PassportDetails } from './pages/PassportDetails';
import { Dashboard } from './pages/Dashboard';
import { FlightStatus } from './pages/FlightStatus';
import { BoardingAssistant } from './pages/BoardingAssistant';
import { AirportNavigation } from './pages/AirportNavigation';
import { BaggageTracker } from './pages/BaggageTracker';
import { MealOrder } from './pages/MealOrder';
import { DelayPrediction } from './pages/DelayPrediction';
import { QueueManagement } from './pages/QueueManagement';
import { SpecialAssistance } from './pages/SpecialAssistance';
import { AirportSelection } from './pages/AirportSelection/AirportSelection';
import { IndoorNavigation } from './pages/IndoorNavigation/IndoorNavigation';
import { FlightBooking } from './pages/FlightBooking';
import { MyTrips } from './pages/MyTrips';
import { SeatSwap } from './pages/SeatSwap';
import { ResetPassword } from './pages/ResetPassword';

// Main App Layout Wrapper that renders Navbar & Sidebar only for interior routes
const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Standalone pages that do not show the main dashboard layout shell
  const isStandalonePage = 
    location.pathname === '/' || 
    location.pathname === '/auth' || 
    location.pathname === '/reset-password' ||
    location.pathname === '/language' || 
    location.pathname === '/passport-details';

  if (isStandalonePage) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/passport-details" element={<PassportDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AIChatbox />
        <ToastContainer />
      </>
    );
  }

  return (
    <ProtectedRoute>
      <div className="app-container" style={{ flexDirection: 'column' }}>
        {/* Top Navbar */}
        <Navbar onOpenNotifications={() => setIsNotificationOpen(true)} />

        {/* Main Body Container with Sidebar and Scrollable Content */}
        <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 72px)' }}>
          <Sidebar />

          {/* Dynamic Route Content */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flight-booking" element={<FlightBooking />} />
            <Route path="/flight-results" element={<FlightBooking />} />
            <Route path="/flight-compare" element={<FlightBooking />} />
            <Route path="/seat-selection" element={<FlightBooking />} />
            <Route path="/passenger-details" element={<FlightBooking />} />
            <Route path="/add-ons" element={<FlightBooking />} />
            <Route path="/payment" element={<FlightBooking />} />
            <Route path="/booking-confirmation" element={<FlightBooking />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/seat-swap" element={<SeatSwap />} />
            <Route path="/flights" element={<FlightStatus />} />
            <Route path="/boarding" element={<BoardingAssistant />} />
            <Route path="/navigation" element={<AirportNavigation />} />
            <Route path="/indoor-navigation" element={<AirportSelection />} />
            <Route path="/indoor-navigation/:airportId" element={<IndoorNavigation />} />
            <Route path="/baggage" element={<BaggageTracker />} />
            <Route path="/meals" element={<MealOrder />} />
            <Route path="/delay-prediction" element={<DelayPrediction />} />
            <Route path="/queues" element={<QueueManagement />} />
            <Route path="/assistance" element={<SpecialAssistance />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>

        {/* Slide-over Notification Panel */}
        <NotificationPanel
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />

        {/* Floating AI Chatbox & Voice Assistant */}
        <AIChatbox />

        {/* Global Interactive Toast Notification System */}
        <ToastContainer />
      </div>
    </ProtectedRoute>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AirportProvider>
        <Router>
          <AppLayout />
        </Router>
      </AirportProvider>
    </AuthProvider>
  );
};

export default App;
