import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Occasio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`text-sm font-medium transition-colors ${
                isActive('/events') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Events
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 