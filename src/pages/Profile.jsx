import { useState } from 'react';
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
import { currentUser, mockItems } from '../utils/data';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  // Get user's reports - filter to show only user's items
  const userReports = mockItems.filter(item => item.reportedBy.id === currentUser.id);
  const activeReports = userReports;
  const resolvedReports = []; // Empty for now

  // Fixed stats as per your request
  const stats = [
    { label: 'Lost Reports', value: 7 },
    { label: 'Found Reports', value: 3 },
    { label: 'Resolved', value: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between z-40 shadow-md">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Profile</h1>
        <Link to="/edit-profile" className="text-white font-medium hover:opacity-80 transition-opacity">
          Edit
        </Link>
      </header>

      {/* Scrollable Content with top padding for fixed header */}
      <div className="pt-16">
        {/* Profile Info */}
        <div className="bg-white pt-6 pb-6 text-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
          <p className="text-gray-600 text-sm mt-1">Student ID: {currentUser.studentId}</p>
          <p className="text-gray-600 text-sm">{currentUser.email}</p>
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
              Active (4)
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
              Resolved (6)
              {activeTab === 'resolved' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
              )}
            </button>
          </div>

          {/* Reports List */}
          <div className="space-y-3">
            {activeTab === 'active' && (
              <>
                {/* iPhone 14 Pro */}
                <Link to="/item/1" className="block">
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                      <img 
                        src="/images/iphone-14-pro.jpeg" 
                        alt="iPhone 14 Pro"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">iPhone 14 Pro</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Lost • Library Building
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Jan 15, 2025
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded font-medium bg-danger text-white">
                      Lost
                    </span>
                  </div>
                </Link>

                {/* Car Keys */}
                <Link to="/item/2" className="block">
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                      <img 
                        src="/images/mercedes-key.jpeg" 
                        alt="Car Keys"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Car Keys</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Found • Parking Lot A
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Jan 12, 2025
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded font-medium bg-success text-white">
                      Found
                    </span>
                  </div>
                </Link>

                {/* Chemistry Textbook - changed to Physics */}
                <Link to="/item/3" className="block">
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                      <img 
                        src="/images/physics-textbook.jpeg" 
                        alt="Physics Textbook"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Physics Textbook</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Lost • Science Building
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Jan 10, 2025
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded font-medium bg-danger text-white">
                      Lost
                    </span>
                  </div>
                </Link>

                {/* Blue Backpack */}
                <Link to="/item/4" className="block">
                  <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0">
                      <img 
                        src="/images/blue-backpack.jpeg" 
                        alt="Blue Backpack"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Blue Backpack</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Found • Student Center
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Jan 8, 2025
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded font-medium bg-success text-white">
                      Found
                    </span>
                  </div>
                </Link>
              </>
            )}

            {activeTab === 'resolved' && (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-500">No resolved reports yet</p>
              </div>
            )}
          </div>
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
  onClick={() => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      navigate('/login', { replace: true });
    }
  }}
  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
>
  <div className="flex items-center gap-3">
    <LogOut className="w-5 h-5 text-danger" />
    <span className="font-medium text-danger">Logout</span>
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