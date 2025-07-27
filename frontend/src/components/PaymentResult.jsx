import { useLocation, useNavigate, Link } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { success, eventDetails, paymentMethod, transactionId } = location.state || {
    success: true,
    eventDetails: {
      title: "Tech Conference 2024",
      date: "Dec 15, 2024",
      price: 299
    },
    paymentMethod: "card",
    transactionId: "TXN123456789"
  };

  const handleTryAgain = () => {
    navigate('/payment', { state: { eventDetails } });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <div className="text-3xl">✅</div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your booking has been confirmed. You'll receive a confirmation email shortly.
            </p>

            {/* Event Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-medium">{eventDetails.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{eventDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">${eventDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-sm">{transactionId}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>📧 Check your email for the e-ticket</li>
                <li>📱 Save the ticket to your phone</li>
                <li>📅 Add the event to your calendar</li>
                <li>📞 Contact support if you need help</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                View My Bookings
              </Link>
              <Link
                to="/events"
                className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Browse More Events
              </Link>
              <button
                onClick={handleGoHome}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failure state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Failure Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <div className="text-3xl">❌</div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-600 mb-8">
            We couldn't process your payment. Please try again or use a different payment method.
          </p>

          {/* Event Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="font-medium">{eventDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{eventDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${eventDetails.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Issues</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>💳 Insufficient funds in your account</li>
              <li>🔒 Card blocked by your bank</li>
              <li>📱 UPI app not responding</li>
              <li>🌐 Network connectivity issues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTryAgain}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/events"
              className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Browse Events
            </Link>
            <button
              onClick={handleGoHome}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Go to Home
            </button>
          </div>

          {/* Support Contact */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Need help? Contact our support team</p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="text-indigo-600">📧 support@occasio.com</span>
              <span className="text-indigo-600">📞 +1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult; 