import React, { useState } from 'react';
import OutlookView from './OutlookView';
import ProcessingView from './ProcessingView';
import QuoteManagementView from './QuoteManagementView';
import DocumentGenerationView from './DocumentGenerationView';
import NotificationView from './NotificationView';
import CompletionView from './CompletionView';
import RealTimeCollaborationView from './RealTimeCollaborationView';
import StatusBoard from './StatusBoard';
import CarrierRequestView from './CarrierRequestView';

// Add these logs right after the imports
console.log('Imported RealTimeCollaborationView:', RealTimeCollaborationView);

const CompleteFreightJourney = () => {
  const [currentStage, setCurrentStage] = useState('outlook');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [responses, setResponses] = useState([]);
  const [shipmentData, setShipmentData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([
    { party: "Client (TechCorp)", channel: "Email", status: "Pending" },
    { party: "Selected Carrier", channel: "System", status: "Pending" },
    { party: "Shenzhen Handler", channel: "WeChat", status: "Pending" }
  ]);
  const [carrierMessages, setCarrierMessages] = useState([]);

  // Mock data for carrier responses
  const carrierResponses = [
    {
      carrier: "Cathay Pacific",
      rate: "$4.50/kg",
      routing: "Direct via HKG",
      transit: "3 days",
      timestamp: "11:30 AM",
      channel: "Email",
    },
    {
      carrier: "Korean Air",
      rate: "$4.20/kg",
      routing: "Transit via ICN",
      transit: "4 days",
      timestamp: "11:45 AM",
      channel: "WeChat",
    }
  ];

  // Function to handle extracted shipment data
  const handleShipmentData = (data, carrierMessages) => {
    setShipmentData(data);
    setCarrierMessages(carrierMessages);
    setCurrentStage('processing');
  };

  // Function to proceed to status board after completion
  const proceedToStatusBoard = () => {
    setCurrentStage('statusBoard');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Progress */}
        <div className="flex justify-between mb-6">
          {['outlook', 'processing', 'carrierRequests', 'quotes', 'collaboration', 'documents', 'notifications', 'complete', 'statusBoard'].map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStage === stage ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < 7 && (
                <div className="w-24 h-1 bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        {currentStage === 'outlook' && (
          <OutlookView onImport={handleShipmentData} />
        )}
        {currentStage === 'processing' && (
          <ProcessingView
            shipmentData={shipmentData}
            onConfirm={() => setCurrentStage('carrierRequests')}
          />
        )}
        {currentStage === 'carrierRequests' && (
          <CarrierRequestView
            carrierMessages={carrierMessages}
            onProceed={() => setCurrentStage('quotes')}
          />
        )}
        {currentStage === 'quotes' && (
          <QuoteManagementView
            carrierResponses={carrierResponses}
            responses={responses}
            setResponses={setResponses}
            onSelectQuote={(quote) => {
              console.log('Quote selected:', quote);
              console.log('Current stage before transition:', currentStage);
              setSelectedQuote(quote);
              console.log('Selected quote set:', quote);
              setCurrentStage('collaboration');
              console.log('Stage changed to:', 'collaboration');
            }}
            messages={messages}
            setMessages={setMessages}
          />
        )}
        {currentStage === 'collaboration' && (
          console.log('Rendering collaboration view with:', {
            messages,
            RealTimeCollaborationView
          }),
          <RealTimeCollaborationView
            messages={messages}
            setMessages={setMessages}
            onProceed={() => setCurrentStage('documents')}
          />
        )}
        {currentStage === 'documents' && (
          <DocumentGenerationView
            onProceed={() => setCurrentStage('notifications')}
            discrepancies={true} // Simulate discrepancies
          />
        )}
        {currentStage === 'notifications' && (
          <NotificationView
            onComplete={() => setCurrentStage('complete')}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        {currentStage === 'complete' && (
          <CompletionView
            onProceedToStatusBoard={proceedToStatusBoard}
            onStartNew={() => {
              setCurrentStage('outlook');
              setSelectedQuote(null);
              setResponses([]);
              setShipmentData(null);
              setMessages([]);
              setNotifications([
                { party: "Client (TechCorp)", channel: "Email", status: "Pending" },
                { party: "Selected Carrier", channel: "System", status: "Pending" },
                { party: "Shenzhen Handler", channel: "WeChat", status: "Pending" }
              ]);
            }}
          />
        )}
        {currentStage === 'statusBoard' && (
          <StatusBoard
            shipmentData={shipmentData}
            selectedQuote={selectedQuote}
            notifications={notifications}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default CompleteFreightJourney;