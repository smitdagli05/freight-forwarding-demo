import React from 'react';
import { Users } from 'lucide-react';

const NotificationView = ({ onComplete, notifications, setNotifications }) => {
  // Simulate setting notification preferences
  const handleChannelChange = (index, channel) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].channel = channel;
    setNotifications(updatedNotifications);
  };

  const handleSendNotifications = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      status: 'Sent',
    }));
    setNotifications(updatedNotifications);
    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users size={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold">Stakeholder Notifications</h2>
      </div>
      <div className="space-y-4 mb-6">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{notification.party}</div>
                <div className="text-sm text-gray-600">
                  via {notification.channel}
                </div>
              </div>
              <select
                value={notification.channel}
                onChange={(e) => handleChannelChange(index, e.target.value)}
                className="border border-gray-300 rounded p-1 text-sm"
              >
                <option>Email</option>
                <option>WeChat</option>
                <option>SMS</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSendNotifications}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send Notifications and Complete Process
      </button>
    </div>
  );
};

export default NotificationView;