import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios';

const Events = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['All', 'Technology', 'Music', 'Business', 'Arts', 'Food', 'Sports'];
  const locations = ['All']; // Will be filled from events

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          page,
          limit: 9,
        };
        if (searchTerm) params.search = searchTerm;
        if (selectedCategory !== 'All') params.category = selectedCategory;
        // No location filter in backend yet
        const response = await api.get('/events', { params });
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError('Failed to load events.');
      }
      setLoading(false);
    };
    fetchEvents();
  }, [searchTerm, selectedCategory, page]);

  // Extract unique locations from events
  const allLocations = [
    'All',
    ...Array.from(new Set(events.map(event => event.location)))
  ];

  const filteredEvents = events.filter(event => {
    const matchesLocation = selectedLocation === 'All' || event.location === selectedLocation;
    return matchesLocation;
  });

  const handleBookNow = (eventId) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      const selectedEvent = events.find(event => event.id === eventId);
      navigate('/payment', {
        state: {
          eventDetails: {
            id: selectedEvent.id,
            title: selectedEvent.title,
            date: selectedEvent.startTime || selectedEvent.date,
            price: selectedEvent.price,
            image: selectedEvent.image || '',
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Events</h1>
          <p className="text-gray-600">Discover and book amazing events in your area</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Events</label>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {allLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLocation('All');
                  setPage(1);
                }}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <span className="text-lg text-gray-600">Loading events...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <span className="text-lg text-red-600">{error}</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={event.image || 'https://via.placeholder.com/400x250?text=Event'} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                      {event.category || 'Other'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">📅 {event.startTime ? new Date(event.startTime).toLocaleDateString() : event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">{event.price ? `$${event.price}` : 'Free'}</span>
                    <button
                      onClick={() => handleBookNow(event.id)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pb-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-medium">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6">
              You need to be logged in to book events. Please sign in or create an account to continue.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events; 