import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Passionate about connecting people through amazing events"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Building the technology that powers seamless event experiences"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Creating strategies to bring events to life"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from user experience to event quality."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building connections and fostering community through shared experiences."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Continuously innovating to provide the best event booking experience."
    },
    {
      icon: "🔒",
      title: "Trust",
      description: "Earning and maintaining the trust of our users and partners."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Occasio</h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Connecting people through amazing events since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Occasio, we believe that events have the power to transform lives, create connections, 
                and build communities. Our mission is to make event discovery and booking seamless, 
                accessible, and enjoyable for everyone.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We're passionate about connecting people with experiences that matter. Whether it's a 
                tech conference, music festival, or local meetup, we're here to help you find and 
                book the events that inspire you.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/events"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Browse Events
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Occasio?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Curated Events</h4>
                    <p className="text-gray-600">Handpicked events that meet our quality standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Booking</h4>
                    <p className="text-gray-600">Safe and secure payment processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-gray-600">Round-the-clock customer support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">The passionate people behind Occasio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-indigo-100">Making a difference in the event industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-100">Events Hosted</div>
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
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-indigo-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-indigo-600 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Occasio Community</h2>
          <p className="text-xl mb-8 text-pink-100">Be part of something amazing</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 