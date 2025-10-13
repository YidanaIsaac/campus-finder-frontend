import { useState } from 'react';
import { CheckCircle, AlertCircle, Info, Trash2, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'match',
      title: 'Match Found!',
      message: 'A found item matches your lost report for "iPhone 14 Pro"',
      itemId: '1',
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '2',
      type: 'claimed',
      title: 'Item Claimed',
      message: 'Your found item "Blue Backpack" has been claimed by its owner',
      itemId: '2',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'possible_match',
      title: 'Possible Match',
      message: 'A found item might match your lost report for "Car Keys"',
      itemId: '3',
      read: false,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      type: 'returned',
      title: 'Item Returned',
      message: 'Your lost item "Physics Textbook" has been returned to you',
      itemId: '4',
      read: true,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '5',
      type: 'info',
      title: 'System Update',
      message: 'Campus Finder has been updated with new features',
      read: true,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match':
      case 'returned':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'possible_match':
        return <AlertCircle className="w-6 h-6 text-primary" />;
      case 'claimed':
        return <CheckCircle className="w-6 h-6 text-primary" />;
      case 'info':
        return <Info className="w-6 h-6 text-gray-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white p-6 z-40 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {notifications.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-sm font-medium hover:underline hover:opacity-80 transition-opacity"
            >
              Clear All
            </button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="text-blue-100 text-sm mt-2">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </header>

      {/* Scrollable Content with top padding for fixed header */}
      <div className="pt-32 p-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Notifications</h3>
            <p className="text-gray-500 text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.read ? 'border-l-4 border-primary' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-semibold text-gray-800 ${!notification.read ? 'font-bold' : ''}`}>
                        {notification.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-danger transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                    {!notification.read && (
                      <div className="mt-2">
                        <span className="text-xs text-primary font-medium">New</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;