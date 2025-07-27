import { Link } from 'react-router-dom';

const Home = () => {
  // Mock data for demonstration
  const latestEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "Dec 15, 2024",
      location: "San Francisco, CA",
      price: "$299",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "Dec 20, 2024",
      location: "Los Angeles, CA",
      price: "$150",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Startup Meetup",
      date: "Dec 25, 2024",
      location: "New York, NY",
      price: "$50",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop"
    }
  ];

  const featuredEvents = [
    {
      id: 4,
      title: "Art Exhibition",
      date: "Jan 10, 2025",
      location: "Miami, FL",
      price: "$75",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Food & Wine Festival",
      date: "Jan 15, 2025",
      location: "Napa Valley, CA",
      price: "$200",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Sports Championship",
      date: "Jan 20, 2025",
      location: "Chicago, IL",
      price: "$120",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
    }
  ];

  const categories = [
    { name: "Technology", icon: "💻", count: "150+ events" },
    { name: "Music", icon: "🎵", count: "200+ events" },
    { name: "Business", icon: "💼", count: "100+ events" },
    { name: "Sports", icon: "⚽", count: "80+ events" },
    { name: "Arts", icon: "🎨", count: "120+ events" },
    { name: "Food", icon: "🍕", count: "90+ events" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Book tickets for the best events in your city. From concerts to conferences, 
              we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Events</h2>
            <p className="text-gray-600">Don't miss out on these upcoming events</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            {latestEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-4">📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">{event.price}</span>
                    <Link
                      to="/events"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="w-full">
          <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-gray-600">Handpicked events you'll love</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
            {featuredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="mr-4">📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">{event.price}</span>
                    <Link
                      to="/events"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full">
          <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Categories</h2>
            <p className="text-gray-600">Find events that match your interests</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4 sm:px-6 lg:px-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="w-full">
          <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose Occasio?</h2>
            <p className="text-indigo-100">Join thousands of satisfied users</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-100">Events Booked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-indigo-100">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-indigo-100">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Event?</h2>
          <p className="text-xl mb-8 text-pink-100">Join thousands of users who trust Occasio for their event bookings</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/events"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 