// freight-forwarding-demo/src/components/CarrierRequestView.jsx

import React, { useState } from 'react';

const CarrierRequestView = ({ carrierMessages, onProceed }) => {
  const [editedMessages, setEditedMessages] = useState(
    carrierMessages.reduce((acc, curr) => {
      acc[curr.carrier] = curr.message;
      return acc;
    }, {})
  );

  const handleMessageChange = (carrier, newMessage) => {
    setEditedMessages({
      ...editedMessages,
      [carrier]: newMessage,
    });
  };

  const handleSendRequests = () => {
    // Simulate sending messages to carriers
    const messagesToSend = carrierMessages.map(carrierMessage => ({
      carrier: carrierMessage.carrier,
      message: editedMessages[carrierMessage.carrier],
      format: carrierMessage.format,
    }));
    console.log('Sending requests to carriers:', messagesToSend);
    // Proceed to the next stage
    onProceed();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Send Requests to Carriers</h2>
      <div className="space-y-4 mb-6">
        {carrierMessages.map((carrierMessage, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium capitalize">{carrierMessage.carrier}</span>
              <span className="text-sm text-gray-500">
                Format: {carrierMessage.format}
              </span>
            </div>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={6}
              value={editedMessages[carrierMessage.carrier]}
              onChange={e =>
                handleMessageChange(carrierMessage.carrier, e.target.value)
              }
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSendRequests}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Requests
      </button>
    </div>
  );
};

export default CarrierRequestView;