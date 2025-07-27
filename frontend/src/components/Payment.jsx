import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get event details from navigation state or use default
  const eventDetails = location.state?.eventDetails || {
    id: 1,
    title: "Tech Conference 2024",
    date: "Dec 15, 2024",
    price: 299,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate success (90% success rate)
      const isSuccess = Math.random() > 0.1;
      navigate('/payment-result', { 
        state: { 
          success: isSuccess,
          eventDetails,
          paymentMethod,
          transactionId: `TXN${Date.now()}`
        }
      });
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <div className="flex items-center space-x-4">
            <img src={eventDetails.image} alt={eventDetails.title} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{eventDetails.title}</h2>
              <p className="text-gray-600">📅 {eventDetails.date}</p>
              <p className="text-2xl font-bold text-indigo-600">${eventDetails.price}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">💳</div>
                  <div className="font-semibold">Credit/Debit Card</div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold">UPI Payment</div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-semibold">Cash on Delivery</div>
                </button>
              </div>

              {/* Payment Forms */}
              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength="5"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          maxLength="4"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="username@upi"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        💡 You'll receive a payment request on your UPI app. Please complete the payment to confirm your booking.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Cash on Delivery is available for events happening within 7 days. You'll pay at the venue.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 mt-8"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay $${eventDetails.price}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event Ticket</span>
                  <span className="font-medium">${eventDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">$2.99</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-indigo-600">${(eventDetails.price + 5 + 2.99).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Event ticket</li>
                  <li>✓ E-ticket delivery</li>
                  <li>✓ Customer support</li>
                  <li>✓ Secure payment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 