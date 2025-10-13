import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Clock } from 'lucide-react';
import { mockItems, currentUser } from '../utils/data';
import { formatDistanceToNow } from 'date-fns';

const Home = () => {
  const recentReports = mockItems.slice(0, 4);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at the top
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
  className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white rounded-b-xl transition-transform duration-300 z-40 ${
    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
  }`}
  style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}
>
  <div className="flex items-center justify-between mb-4">
    <div>
      <h1 className="text-2xl font-bold">Campus Finder</h1>
    </div>
    <Link to="/profile">
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="w-12 h-12 rounded-full border-2 border-white cursor-pointer hover:opacity-80 transition-opacity"
      />
    </Link>
  </div>
</header>

     {/* Spacer for fixed header */}
<div style={{ height: 'calc(8rem + env(safe-area-inset-top))' }}></div>

      {/* Welcome Section */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            What would you like to do today?
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/report?type=lost"
              className="flex flex-col items-center justify-center bg-danger text-white rounded-xl p-6 hover:bg-danger-dark transition-colors shadow-md"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-semibold">Report Lost Item</span>
            </Link>

            <Link
              to="/report?type=found"
              className="flex flex-col items-center justify-center bg-success text-white rounded-xl p-6 hover:bg-success-dark transition-colors shadow-md"
            >
              <Search className="w-8 h-8 mb-2" />
              <span className="font-semibold">Report Found Item</span>
            </Link>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Reports</h3>
            <Link
              to="/browse"
              className="text-primary text-sm font-medium hover:text-primary-dark"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentReports.map((item) => (
              <Link to={`/item/${item.id}`} key={item.id}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {item.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            item.status === 'lost'
                              ? 'bg-danger-light text-danger-dark'
                              : 'bg-success-light text-success-dark'
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
                        {formatDistanceToNow(item.postedAt, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;