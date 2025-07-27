import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const eventImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'; // Example event image

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'admin@yopmail.com',
    password: 'admin123',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setError(result.error);
    } else {
      // Show success message for test credentials
      if (formData.email === 'admin@yopmail.com' || formData.email === 'user@yopmail.com') {
        console.log('✅ Test login successful!');
      }
    }
    setLoading(false);
  };



  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      {/* Left: Event Image & Tagline */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500">
        <div className="flex flex-col items-center px-8">
          <img src={eventImage} alt="Event" className="rounded-3xl shadow-2xl w-96 h-96 object-cover mb-8 border-4 border-white" />
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Welcome Back!</h1>
          <p className="text-lg text-indigo-100 font-medium text-center max-w-xs drop-shadow">
            Book, manage, and discover amazing events. Join the community and never miss out!
          </p>
        </div>
      </div>
      {/* Right: Login Form */}
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 shadow-lg mb-2">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0a4 4 0 01-8 0m8 0v2a4 4 0 01-8 0V7" /></svg>
            </span>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
              Sign in to <span className="text-indigo-600">Occasio</span>
            </h2>
            <p className="mt-2 text-gray-500 text-sm text-center">Access your events and bookings</p>
          </div>
          <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center font-medium bg-red-50 border border-red-200 rounded-md py-2 mt-2">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 shadow"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
              
              {/* Test Credentials Helper */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 font-medium mb-1">🧪 Test Credentials</p>
                <div className="text-xs text-yellow-700 mb-2 space-y-1">
                  <div>
                    <strong>Admin:</strong> <span className="font-mono">admin@yopmail.com</span> / <span className="font-mono">admin123</span>
                  </div>
                  <div>
                    <strong>User:</strong> <span className="font-mono">user@yopmail.com</span> / <span className="font-mono">user123</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ email: 'admin@yopmail.com', password: 'admin123' })}
                    className="flex-1 text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ email: 'user@yopmail.com', password: 'user123' })}
                    className="flex-1 text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                  >
                    User
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 