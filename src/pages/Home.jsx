import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Clock } from 'lucide-react';
import { itemsAPI } from '../utils/api';

const Home = () => {
  const [recentReports, setRecentReports] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
  }, []);

  // Fetch recent items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const lostData = await itemsAPI.getLostItems();
        const foundData = await itemsAPI.getFoundItems();
        
        // Combine and map to expected format
        const lostItems = (lostData.data || []).map(item => ({
          ...item,
          id: item._id,
          title: item.itemName,
          status: 'lost',
          image: item.images?.[0] || '/images/placeholder.jpg',
          postedAt: item.createdAt
        }));
        
        const foundItems = (foundData.data || []).map(item => ({
          ...item,
          id: item._id,
          title: item.itemName,
          status: 'found',
          image: item.images?.[0] || '/images/placeholder.jpg',
          postedAt: item.createdAt
        }));
        
        const allItems = [...lostItems, ...foundItems];
        
        // Sort by date and take first 4
        const sorted = allItems.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        setRecentReports(sorted.slice(0, 4));
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load recent reports');
        setRecentReports([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-xl transition-transform duration-300 z-40 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Campus Finder</h1>
          </div>
          <Link to="/profile">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-white cursor-pointer hover:opacity-80 transition-opacity">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </Link>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(8rem + env(safe-area-inset-top))' }}></div>

      {/* Welcome Section */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            What would you like to do today?
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/report?type=lost"
              className="flex flex-col items-center justify-center bg-red-600 text-white rounded-xl p-6 hover:bg-red-700 transition-colors shadow-md"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-semibold text-center">Report Lost Item</span>
            </Link>

            <Link
              to="/report?type=found"
              className="flex flex-col items-center justify-center bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition-colors shadow-md"
            >
              <Search className="w-8 h-8 mb-2" />
              <span className="font-semibold text-center">Report Found Item</span>
            </Link>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mb-6 pb-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Reports</h3>
            <Link
              to="/browse"
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              View All
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-2">Loading recent reports...</p>
            </div>
          ) : recentReports.length > 0 ? (
            <div className="space-y-4">
              {recentReports.map((item) => (
                <Link to={`/item/${item.id}`} key={item.id}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {item.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                              item.status === 'lost'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {item.status === 'lost' ? 'Lost' : 'Found'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {item.location}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(item.postedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl">
              <p className="text-gray-500 mb-2">No recent reports yet</p>
              <p className="text-sm text-gray-400">Be the first to report an item!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;