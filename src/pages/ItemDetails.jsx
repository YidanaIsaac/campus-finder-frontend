import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Heart,
  Star,
  MessageSquare,
  Phone,
  Mail,
  Home as HomeIcon,
  Search,
  Bell,
  User,
  X,
  Send
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { mockItems } from '../utils/data';
import { formatDistanceToNow } from 'date-fns';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  
  const item = mockItems.find(i => i.id === id);
  
  // Get reporter's contact info
  const reporterPhone = item?.reportedBy?.phone;
  const reporterEmail = item?.reportedBy?.email;

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/browse', icon: Search, label: 'Browse' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
      setShowMessageModal(false);
    }
  };

  const handleCall = () => {
    console.log('Calling:', reporterPhone);
    window.location.href = `tel:${reporterPhone}`;
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Regarding: ${item.title}`);
    const body = encodeURIComponent(`Hi ${item.reportedBy.name},\n\nI'm contacting you about the ${item.status} item: ${item.title}\n\nLocation: ${item.location}\nDate: ${new Date(item.date).toLocaleDateString()}\n\n`);
    const mailtoLink = `mailto:${reporterEmail}?subject=${subject}&body=${body}`;
    console.log('Opening email:', mailtoLink);
    window.location.href = mailtoLink;
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Item Not Found</h2>
          <Link to="/browse" className="text-primary hover:underline">
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-primary text-white p-4 flex items-center justify-between z-50 shadow-md">
        <button onClick={() => navigate(-1)} className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Item Details</h1>
        <button onClick={() => setIsFavorited(!isFavorited)} className="hover:opacity-80 transition-opacity">
          <Heart 
            className={`w-6 h-6 ${isFavorited ? 'fill-white' : ''}`}
          />
        </button>
      </header>

      {/* Scrollable Content with top padding for fixed header */}
      <div className="pt-16 pb-20">
        {/* Item Image with Status Badge */}
        <div className="relative bg-white">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-96 object-cover"
          />
          <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold text-white ${
            item.status === 'lost' ? 'bg-danger' : 'bg-success'
          }`}>
            {item.status === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>

        {/* Content */}
        <div className="bg-white px-6 py-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>

          {/* Location and Date */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(item.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between py-3 border-t border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-danger rounded-full"></div>
              <span className="font-semibold text-gray-800">Unclaimed</span>
            </div>
            <span className="text-sm text-gray-500">
              Posted {formatDistanceToNow(item.postedAt, { addSuffix: true })}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Item Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Item Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold text-gray-800">{item.category}</span>
              </div>
              {item.brand && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-semibold text-gray-800">{item.brand}</span>
                </div>
              )}
              {item.color && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Color</span>
                  <span className="font-semibold text-gray-800">{item.color}</span>
                </div>
              )}
              {item.lastSeen && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Seen</span>
                  <span className="font-semibold text-gray-800">{item.lastSeen}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reported By */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Reported By</h3>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <img
                src={item.reportedBy.avatar}
                alt={item.reportedBy.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-lg">{item.reportedBy.name}</p>
                <p className="text-sm text-gray-600">Student • {item.reportedBy.department || 'Computer Science'}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => {
                    const rating = item.reportedBy.rating;
                    const fullStars = Math.floor(rating);
                    const hasHalfStar = rating % 1 !== 0;
                    
                    if (i < fullStars) {
                      return <Star key={i} className="w-3 h-3 fill-gray-800 text-gray-800" />;
                    } else if (i === fullStars && hasHalfStar) {
                      return (
                        <div key={i} className="relative w-3 h-3">
                          <Star className="w-3 h-3 text-gray-800 absolute" />
                          <div className="overflow-hidden absolute" style={{ width: '50%' }}>
                            <Star className="w-3 h-3 fill-gray-800 text-gray-800" />
                          </div>
                        </div>
                      );
                    } else {
                      return <Star key={i} className="w-3 h-3 text-gray-300" />;
                    }
                  })}
                  <span className="text-xs text-gray-600 ml-1">({item.reportedBy.rating})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setShowMessageModal(true)}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Send Message
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleCall}
                className="border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call
              </button>
              <button 
                onClick={handleEmail}
                className="border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Send Message</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4 bg-gray-50 p-3 rounded-xl">
                <img
                  src={item.reportedBy.avatar}
                  alt={item.reportedBy.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.reportedBy.name}</p>
                  <p className="text-sm text-gray-600">About: {item.title}</p>
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-6 h-6 ${isActive ? 'fill-primary' : ''}`}
                    />
                    <span className="text-xs mt-1 font-medium">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ItemDetails;