// freight-forwarding-demo/src/components/ConversationThread.jsx

import React from 'react';
import { MessageSquare, Mail, PhoneCall } from 'lucide-react';

const ConversationThread = ({ messages }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Conversation Thread</h3>
      <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {msg.channel === 'WeChat' && <MessageSquare size={16} />}
                {msg.channel === 'Email' && <Mail size={16} />}
                {msg.channel === 'Phone' && <PhoneCall size={16} />}
                <span>
                  {msg.sender} via {msg.channel}
                </span>
                <span className="ml-auto">{msg.timestamp}</span>
              </div>
              <div className="mt-1 text-gray-700">{msg.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationThread;