import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

export default function NotificationDropdown({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  // Fetch unread notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/admin/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.readStatus).length);
    } catch (error) {
      console.error(error);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
      // Refresh notifications after marking as read
      await fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optionally poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-dropdown">
      <button className="notification-icon" onClick={() => setOpen(!open)} aria-label="Notifications">
        <Bell size={20} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>
      {open && (
        <div className="notification-menu">
          <div className="notification-header">
            <span>Notifications</span>
            <button onClick={() => setOpen(false)} aria-label="Close notifications"><X size={16} /></button>
          </div>
          <ul className="notification-list">
            {notifications.length === 0 && <li>No notifications</li>}
            {notifications.map(n => (
              <li key={n.id} className={n.readStatus ? 'read' : 'unread'}>
                <div className="notification-message">{n.message}</div>
                <button
                  className="mark-read-btn"
                  onClick={() => markAsRead(n.id)}
                  disabled={n.readStatus}
                  aria-label="Mark as read"
                >
                  Mark as read
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
