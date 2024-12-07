import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const RealTimeCollaborationView = ({ messages, setMessages, onProceed }) => {
  console.log('RealTimeCollaborationView rendering with messages:', messages);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const updatedMessages = [
      ...messages,
      {
        sender: 'You',
        channel: 'Internal',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Real-Time Collaboration</h2>
      <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="text-sm text-gray-500">
              {msg.sender} at {msg.timestamp}
            </div>
            <div className="text-gray-700">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded p-2"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
      <button
        onClick={onProceed}
        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Proceed to Document Generation
      </button>
    </div>
  );
};

export default RealTimeCollaborationView;