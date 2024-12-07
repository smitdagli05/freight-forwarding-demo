// freight-forwarding-demo/src/components/StatusBoard.jsx

import React from 'react';
import { Clock, CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react';

const StatusBoard = ({ shipmentData, selectedQuote, notifications, messages }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Real-Time Status Board</h2>

      {/* Shipment Summary */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Shipment Summary</h3>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
          <div>
            <div className="text-sm text-gray-600">Origin</div>
            <div className="font-medium">{shipmentData.origin}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Destination</div>
            <div className="font-medium">{shipmentData.destination}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Weight</div>
            <div className="font-medium">{shipmentData.weight}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Dimensions</div>
            <div className="font-medium">{shipmentData.dimensions}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Carrier</div>
            <div className="font-medium">{selectedQuote.carrier}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Rate</div>
            <div className="font-medium">{selectedQuote.rate}</div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <div className="bg-gray-50 p-4 rounded">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              {notification.channel === 'Email' && <Mail size={16} />}
              {notification.channel === 'WeChat' && <MessageSquare size={16} />}
              <span>{notification.party}</span>
              <span className="text-sm text-gray-500">via {notification.channel}</span>
              <span className="ml-auto">
                {notification.status === 'Sent' ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <Clock className="text-yellow-600" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Updates and Alerts */}
      <div>
        <h3 className="font-semibold mb-2">Updates & Alerts</h3>
        <div className="bg-gray-50 p-4 rounded">
          {/* Sample Alert */}
          <div className="flex items-center gap-2 mb-2 text-red-600">
            <AlertCircle />
            <span>Customs clearance delay at Shenzhen port.</span>
          </div>
          {/* Sample Update */}
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle />
            <span>Shipment departed from Shenzhen.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBoard;