import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Shield,
  Trash2
} from 'lucide-react';
import { authAPI } from '../utils/api';

const PrivacySettings = () => {
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load privacy settings from API
  useEffect(() => {
    const loadPrivacySettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await authAPI.getPrivacySettings();
        const data = response.data || response;
        
        if (data && Object.keys(data).length > 0) {
          setSettings(prevSettings => ({
            ...prevSettings,
            ...data
          }));
        }

        // Load dark mode preference from localStorage
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
          setIsDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (err) {
        console.error('Error loading privacy settings:', err);
        
        // Try to load from localStorage as fallback
        const savedSettings = localStorage.getItem('privacySettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
        
        // Only show error if it's not a 404
        if (err.message && !err.message.includes('404')) {
          setError('Failed to load privacy settings. Using defaults.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPrivacySettings();
  }, []);

  const toggleSetting = async (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    
    setSettings(newSettings);
    
    // Auto-save to backend
    try {
      await authAPI.updatePrivacySettings(newSettings);
      localStorage.setItem('privacySettings', JSON.stringify(newSettings));
    } catch (err) {
      console.error('Error saving setting:', err);
      // Still save to localStorage even if API fails
      localStorage.setItem('privacySettings', JSON.stringify(newSettings));
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?\n\n' +
      'This action is PERMANENT and cannot be undone. All your data will be deleted:\n' +
      '- Your profile information\n' +
      '- All reported items\n' +
      '- All messages and notifications\n\n' +
      'Type "DELETE" in the next prompt to confirm.'
    );

    if (confirmDelete) {
      const confirmText = prompt('Type "DELETE" to confirm account deletion:');
      
      if (confirmText === 'DELETE') {
        handleDeleteAccountConfirmed();
      } else {
        alert('Account deletion cancelled. The text did not match.');
      }
    }
  };

  const handleDeleteAccountConfirmed = async () => {
    try {
      await authAPI.deleteAccount();
      
      // Clear all local data
      localStorage.clear();
      sessionStorage.clear();
      
      alert('Your account has been deleted successfully.');
      navigate('/login');
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account: ' + (err.message || 'Please try again'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading privacy settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-40 shadow-md transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
      }`}>
        <Link to="/profile" className="hover:opacity-80 transition-opacity absolute left-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-center w-full">Privacy Settings</h1>
        <div className="w-6 absolute right-4"></div>
      </header>

      {/* Scrollable Content */}
      <div className="pt-20 px-4 pb-6">
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 flex items-center gap-2">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.publicProfile ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.showLocation ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.showEmail ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.showPhone ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.receiveNotifications ? 'bg-blue-600' : 'bg-gray-300'
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
                  settings.allowMessages ? 'bg-blue-600' : 'bg-gray-300'
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
          <Link
            to="/privacy-policy"
            className={`w-full py-3 rounded-xl font-semibold border transition-colors flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gray-800 text-blue-400 border-blue-400 hover:bg-blue-600 hover:text-white' 
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            View Privacy Policy
          </Link>
          
          <button
            onClick={handleDeleteAccount}
            className={`w-full py-3 rounded-xl font-semibold border transition-colors flex items-center justify-center gap-2 ${
              isDarkMode 
                ? 'bg-gray-800 text-red-400 border-red-400 hover:bg-red-600 hover:text-white' 
                : 'bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white'
            }`}
          >
            <Trash2 className="w-5 h-5" />
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;