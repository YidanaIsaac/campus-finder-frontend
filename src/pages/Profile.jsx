import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { itemsAPI } from '../utils/api';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [currentUser, setCurrentUser] = useState(null);
  const [userItems, setUserItems] = useState({ lostItems: [], foundItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
  }, []);

  // Fetch user's items
  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await itemsAPI.getUserItems();
        setUserItems(data.data || { lostItems: [], foundItems: [] });
      } catch (err) {
        console.error('Error fetching user items:', err);
        setError('Failed to load your reports');
        setUserItems({ lostItems: [], foundItems: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, []);

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const allItems = [...userItems.lostItems, ...userItems.foundItems];
  const activeItems = allItems.filter(item => 
    item.status === 'active' || item.status === 'available'
  );
  const resolvedItems = allItems.filter(item => 
    item.status === 'resolved' || item.status === 'claimed'
  );

  // Calculate stats
  const stats = [
    { label: 'Lost Reports', value: userItems.lostItems?.length || 0 },
    { label: 'Found Reports', value: userItems.foundItems?.length || 0 },
    { label: 'Resolved', value: resolvedItems.length || 0 },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  const displayItems = activeTab === 'active' ? activeItems : resolvedItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-xl z-40 shadow-md"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '1.5rem' }}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
          <Link to="/edit-profile" className="text-white text-sm font-medium hover:opacity-80 transition-opacity">
            Edit
          </Link>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(5rem + env(safe-area-inset-top))' }}></div>

      {/* Scrollable Content */}
      <div className="pb-20">
        {/* Profile Info */}
        <div className="bg-white pt-6 pb-6 text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-blue-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
            {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{currentUser?.name || 'User'}</h2>
          <p className="text-gray-600 text-sm mt-1">{currentUser?.userType?.charAt(0).toUpperCase() + currentUser?.userType?.slice(1) || 'Student'}</p>
          <p className="text-gray-600 text-sm">{currentUser?.email || ''}</p>
        </div>

        {/* Stats */}
        <div className="bg-white border-t border-b border-gray-200 py-4 px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* My Reports Section */}
        <div className="px-4 mt-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Reports</h2>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-2 font-semibold transition-colors relative ${
                activeTab === 'active'
                  ? 'text-gray-800'
                  : 'text-gray-500'
              }`}
            >
              Active ({activeItems.length})
              {activeTab === 'active' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`pb-2 font-semibold transition-colors relative ${
                activeTab === 'resolved'
                  ? 'text-gray-800'
                  : 'text-gray-500'
              }`}
            >
              Resolved ({resolvedItems.length})
              {activeTab === 'resolved' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-2">Loading your reports...</p>
            </div>
          ) : displayItems.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">
                {activeTab === 'active' ? 'No active reports' : 'No resolved reports yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayItems.map((item) => (
                <Link to={`/item/${item._id}`} key={item._id} className="block">
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                      <img 
                        src={item.images?.[0] || '/images/placeholder.jpg'} 
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.itemName}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.dateLost ? 'Lost' : 'Found'} • {item.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(item.createdAt)} • {formatTimeAgo(item.createdAt)}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded font-medium ${
                      item.dateLost || item.status === 'active'
                        ? 'bg-red-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}>
                      {item.dateLost ? 'Lost' : 'Found'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div className="px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Link to="/edit-profile" className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Edit Profile</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/notification-preferences" className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Notification Preferences</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/privacy-settings" className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Privacy Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link to="/help-support" className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">Logout</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;