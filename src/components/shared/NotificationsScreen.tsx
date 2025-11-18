import React, { useState, useEffect } from 'react';
import { notificationService, Notification } from '../../services';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: number) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return '📦';
      case 'favorite': return '❤️';
      case 'payment': return '💳';
      case 'delivery': return '🚚';
      case 'refund': return '💰';
      case 'general': return '🔔';
      default: return '🔔';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-white rounded-xl shadow-md p-4 cursor-pointer ${
              !notification.is_read ? 'border-l-4 border-indigo-500' : ''
            }`}
            onClick={() => !notification.is_read && markAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getIcon(notification.notification_type)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                <p className="text-gray-400 text-xs mt-2">{formatTime(notification.created_at)}</p>
              </div>
              {!notification.is_read && (
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))
      </div>
    </div>
  );
};

export default NotificationsScreen;