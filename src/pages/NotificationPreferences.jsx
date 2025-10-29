import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Search,
  CheckCircle,
  AlertCircle,
  Volume2,
  Vibrate,
  Save
} from 'lucide-react';

const NotificationPreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    // Push Notifications
    pushEnabled: true,
    itemMatches: true,
    newMessages: true,
    itemClaimed: true,
    itemReturned: true,
    
    // Email Notifications
    emailEnabled: true,
    emailMatches: true,
    emailMessages: false,
    emailWeeklySummary: true,
    
    // App Settings
    soundEnabled: true,
    vibrationEnabled: true,
    
    // Quiet Hours
    quietHoursEnabled: false,
    quietStart: '22:00',
    quietEnd: '08:00',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        setLoading(true);
        const savedPreferences = localStorage.getItem('notificationPreferences');
        
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences));
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTimeChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Save to localStorage (In production, this would call an API)
      localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
      
      // In a real implementation, you would call:
      // await notificationsAPI.updatePreferences(preferences);
      
      alert('Notification preferences saved successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Error saving preferences:', err);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between z-40 shadow-md">
        <Link to="/profile" className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Notification Preferences</h1>
        <div className="w-6"></div>
      </header>

      {/* Scrollable Content */}
      <div className="pt-20 px-4 pb-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Push Notifications Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Enable Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications on your device</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference('pushEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  preferences.pushEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.pushEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {preferences.pushEnabled && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Item Matches</p>
                      <p className="text-xs text-gray-500">When a match is found for your item</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('itemMatches')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.itemMatches ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.itemMatches ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">New Messages</p>
                      <p className="text-xs text-gray-500">When someone sends you a message</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('newMessages')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.newMessages ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.newMessages ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Item Claimed</p>
                      <p className="text-xs text-gray-500">When your found item is claimed</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('itemClaimed')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.itemClaimed ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.itemClaimed ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Item Returned</p>
                      <p className="text-xs text-gray-500">When your lost item is returned</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('itemReturned')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.itemReturned ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.itemReturned ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Email Notifications Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Enable Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference('emailEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  preferences.emailEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.emailEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {preferences.emailEnabled && (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Item Match Alerts</p>
                      <p className="text-xs text-gray-500">Email when matches are found</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('emailMatches')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.emailMatches ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.emailMatches ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Message Notifications</p>
                      <p className="text-xs text-gray-500">Email for new messages</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('emailMessages')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.emailMessages ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.emailMessages ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Weekly Summary</p>
                      <p className="text-xs text-gray-500">Get a weekly activity summary</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePreference('emailWeeklySummary')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences.emailWeeklySummary ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.emailWeeklySummary ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* App Settings Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            App Settings
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Sound</p>
                  <p className="text-xs text-gray-500">Play sound for notifications</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference('soundEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  preferences.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.soundEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Vibrate className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Vibration</p>
                  <p className="text-xs text-gray-500">Vibrate for notifications</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference('vibrationEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  preferences.vibrationEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.vibrationEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Hours Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Quiet Hours
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Enable Quiet Hours</p>
                  <p className="text-xs text-gray-500">Mute notifications during set hours</p>
                </div>
              </div>
              <button
                onClick={() => togglePreference('quietHoursEnabled')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  preferences.quietHoursEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.quietHoursEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            {preferences.quietHoursEnabled && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={preferences.quietStart}
                      onChange={(e) => handleTimeChange('quietStart', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={preferences.quietEnd}
                      onChange={(e) => handleTimeChange('quietEnd', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Notifications will be muted from {preferences.quietStart} to {preferences.quietEnd}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;