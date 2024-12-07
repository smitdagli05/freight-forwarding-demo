import React from 'react';
import ConversationThread from './ConversationThread';

const QuoteManagementView = ({
  carrierResponses,
  responses,
  setResponses,
  onSelectQuote,
  messages,
  setMessages,
}) => {
  const handleSimulateResponse = () => {
    if (responses.length < carrierResponses.length) {
      const newResponse = carrierResponses[responses.length];
      setResponses([...responses, newResponse]);

      // Simulate receiving a message from the carrier
      const newMessage = {
        sender: newResponse.carrier,
        channel: newResponse.channel || 'Email',
        content: `We are pleased to offer a rate of ${newResponse.rate} with routing ${newResponse.routing}.`,
        timestamp: newResponse.timestamp,
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Quote Management</h2>

      {/* Conversation Thread */}
      <ConversationThread messages={messages} />

      {/* List of Carrier Responses */}
      <div className="grid gap-4 mb-6">
        {responses.map((response, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{response.carrier}</div>
                <div className="text-sm text-gray-600">
                  Rate: {response.rate} | Route: {response.routing}
                </div>
              </div>
              <button
                onClick={() => onSelectQuote(response)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Select
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleSimulateResponse}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={responses.length >= carrierResponses.length}
        >
          Simulate New Carrier Response
        </button>
      </div>
    </div>
  );
};

export default QuoteManagementView;