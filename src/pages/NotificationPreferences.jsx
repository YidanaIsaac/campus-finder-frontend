import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Bell,
  Mail,
  MessageSquare,
  Search,
  CheckCircle,
  AlertCircle,
  Volume2,
  Vibrate
} from 'lucide-react';

const NotificationPreferences = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between z-40 shadow-md">
        <Link to="/profile" className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Notification Preferences</h1>
        <div className="w-6"></div>
      </header>

      {/* Scrollable Content */}
      <div className="pt-20 px-4 pb-6">
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
                  preferences.pushEnabled ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.itemMatches ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.newMessages ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.itemClaimed ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.itemReturned ? 'bg-primary' : 'bg-gray-300'
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
                  preferences.emailEnabled ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.emailMatches ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.emailMessages ? 'bg-primary' : 'bg-gray-300'
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
                      preferences.emailWeeklySummary ? 'bg-primary' : 'bg-gray-300'
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
                  preferences.soundEnabled ? 'bg-primary' : 'bg-gray-300'
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
                  preferences.vibrationEnabled ? 'bg-primary' : 'bg-gray-300'
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
                  preferences.quietHoursEnabled ? 'bg-primary' : 'bg-gray-300'
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
        <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;