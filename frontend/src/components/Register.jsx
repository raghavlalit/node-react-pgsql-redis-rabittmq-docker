import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const eventImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'; // Different event image for variety

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    const result = await register(formData.name, formData.email, formData.password);
    if (!result.success) {
      setError(result.error);
    } else {
      // Show success message for test registration
      if (formData.email === 'test@yopmail.com') {
        console.log('✅ Test registration successful!');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      {/* Left: Event Image & Tagline */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-pink-500 to-indigo-600">
        <div className="flex flex-col items-center px-8">
          <img src={eventImage} alt="Event" className="rounded-3xl shadow-2xl w-96 h-96 object-cover mb-8 border-4 border-white" />
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Join Occasio!</h1>
          <p className="text-lg text-pink-100 font-medium text-center max-w-xs drop-shadow">
            Create your account and start discovering amazing events. Your journey begins here!
          </p>
        </div>
      </div>
      {/* Right: Register Form */}
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-600 shadow-lg mb-2">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0a4 4 0 01-8 0m8 0v2a4 4 0 01-8 0V7" /></svg>
            </span>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
              Create your <span className="text-pink-600">Occasio</span> account
            </h2>
            <p className="mt-2 text-gray-500 text-sm text-center">Join our community of event enthusiasts</p>
          </div>
          <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-900 placeholder-gray-400 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-900 placeholder-gray-400 sm:text-sm"
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
                  autoComplete="new-password"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-900 placeholder-gray-400 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-900 placeholder-gray-400 sm:text-sm"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
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
                className="w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-pink-600 to-indigo-500 hover:from-pink-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 shadow"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
                  Sign in
                </Link>
              </p>
              
              {/* Test Helper */}
              <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <p className="text-xs text-pink-800 font-medium mb-1">🧪 Quick Test</p>
                <button
                  type="button"
                  onClick={() => setFormData({
                    name: 'Test User',
                    email: 'test@yopmail.com',
                    password: 'test123',
                    confirmPassword: 'test123'
                  })}
                  className="w-full text-xs bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition-colors"
                >
                  Fill Test Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 