import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import Events from './components/Events.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import Payment from './components/Payment.jsx';
import PaymentResult from './components/PaymentResult.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-result" element={<PaymentResult />} />

            {/* Auth routes - redirect to dashboard if already authenticated */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
