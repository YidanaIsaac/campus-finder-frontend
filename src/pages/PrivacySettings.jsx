import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Moon,
  Sun,
  Eye,
  MapPin,
  Bell,
  Lock,
  Users,
  MessageSquare,
  Shield
} from 'lucide-react';

const PrivacySettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    showProfile: true,
    showLocation: true,
    showEmail: false,
    showPhone: false,
    receiveNotifications: true,
    allowMessages: true,
    publicProfile: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-40 shadow-md transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-primary to-primary-dark text-white'
      }`}>
        <Link to="/profile" className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Privacy Settings</h1>
        <div className="w-6"></div>
      </header>

      {/* Scrollable Content */}
      <div className="pt-20 px-4 pb-6">
        {/* Appearance Section */}
        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Sun className="w-5 h-5" />
            Appearance
          </h2>
          <div className={`rounded-xl shadow-sm overflow-hidden transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600" />
                )}
                <div>
                  <p className={`font-medium transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode</p>
                  <p className={`text-xs transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle dark/light theme</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Visibility Section */}
        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Eye className="w-5 h-5" />
            Profile Visibility
          </h2>
          <div className={`rounded-xl shadow-sm overflow-hidden transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`flex items-center justify-between p-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Public Profile</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Allow others to view your profile</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('publicProfile')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.publicProfile ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.publicProfile ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className={`flex items-center justify-between p-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Show Location</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Display your location on reports</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('showLocation')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.showLocation ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.showLocation ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className={`flex items-center justify-between p-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <Shield className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Show Email</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Make your email visible to others</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('showEmail')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.showEmail ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.showEmail ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Lock className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Show Phone Number</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Make your phone visible to others</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('showPhone')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.showPhone ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.showPhone ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Communication Section */}
        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <MessageSquare className="w-5 h-5" />
            Communication
          </h2>
          <div className={`rounded-xl shadow-sm overflow-hidden transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`flex items-center justify-between p-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Push Notifications</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications about your items</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('receiveNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.receiveNotifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.receiveNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Allow Messages</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Let others send you messages</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('allowMessages')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.allowMessages ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.allowMessages ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy Information */}
        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Shield className="w-5 h-5" />
            Data & Privacy Information
          </h2>
          <div className={`rounded-xl shadow-sm p-4 transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>How We Use Your Data</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Campus Finder collects and uses your information to help you find lost items and reunite found items with their owners. We store your name, student ID, email, and reports you create.
                </p>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Data Sharing</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your contact information is only shared with other users when you choose to report an item. We never sell your data to third parties.
                </p>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Rights</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  You have the right to access, update, or delete your personal information at any time. Contact support to exercise these rights.
                </p>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Data Security</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We use industry-standard encryption to protect your data. All communications are secured with SSL/TLS protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className={`w-full py-3 rounded-xl font-semibold border transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-primary border-primary hover:bg-primary hover:text-white' 
              : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
          }`}>
            View Privacy Policy
          </button>
          
          <button className={`w-full py-3 rounded-xl font-semibold border transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 text-danger border-danger hover:bg-danger hover:text-white' 
              : 'bg-white text-danger border-danger hover:bg-danger hover:text-white'
          }`}>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;