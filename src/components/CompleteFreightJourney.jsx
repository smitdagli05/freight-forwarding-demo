// freight-forwarding-demo/src/components/CompleteFreightJourney.jsx

import React, { useState, useContext, Suspense } from 'react';
import { ConfigurationContext } from '../contexts/ConfigurationContext';
import stepComponents from './stepComponents'; // Import the mapping

const CompleteFreightJourney = () => {
  const { workflow } = useContext(ConfigurationContext);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
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

  // Define carrierResponses as state
  const [carrierResponses, setCarrierResponses] = useState([
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
  ]);

  // Function to handle extracted shipment data
  const handleShipmentData = (data, carrierMessages) => {
    console.log('handleShipmentData called with data:', data); // Debugging
    setShipmentData(data);
    setCarrierMessages(carrierMessages);
    proceedToNextStep();
  };

  // Function to proceed to the next step
  const proceedToNextStep = () => {
    setCurrentStepIndex(prev => prev + 1);
    console.log('Proceeding to step index:', currentStepIndex + 1); // Debugging
  };

  // Function to reset the workflow
  const resetWorkflow = () => {
    setCurrentStepIndex(0);
    setSelectedQuote(null);
    setResponses([]);
    setShipmentData(null);
    setMessages([]);
    setNotifications([
      { party: "Client (TechCorp)", channel: "Email", status: "Pending" },
      { party: "Selected Carrier", channel: "System", status: "Pending" },
      { party: "Shenzhen Handler", channel: "WeChat", status: "Pending" }
    ]);
    setCarrierResponses([
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
    ]);
  };

  // Determine the current step
  const currentStep = workflow[currentStepIndex];

  // Dynamically get the component for the current step
  const StepComponent = currentStep ? stepComponents[currentStep.component] : null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Progress */}
        <div className="flex justify-between mb-6">
          {workflow.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStepIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < workflow.length - 1 && (
                <div className="w-24 h-1 bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <Suspense fallback={<div>Loading step...</div>}>
          {currentStep && StepComponent ? (
            <StepComponent
              key={`${currentStep.step}-${currentStepIndex}`} // Ensure unique key
              onProceed={proceedToNextStep}
              onImport={handleShipmentData}
              carrierMessages={carrierMessages}
              responses={responses}
              setResponses={setResponses}
              selectedQuote={selectedQuote}
              setSelectedQuote={setSelectedQuote}
              onSelectQuote={(quote) => {
                console.log('Quote selected:', quote); // Debugging
                setSelectedQuote(quote);
                proceedToNextStep();
              }}
              messages={messages}
              setMessages={setMessages}
              onComplete={() => proceedToNextStep()}
              onStartNew={resetWorkflow}
              notifications={notifications}
              setNotifications={setNotifications}
              onProceedToStatusBoard={() => proceedToNextStep()}
              shipmentData={shipmentData} // Pass shipmentData as a prop
              carrierResponses={carrierResponses} // Pass carrierResponses as a prop
              onConfirm={proceedToNextStep} // Pass onConfirm explicitly
            />
          ) : (
            <div>Loading...</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CompleteFreightJourney;


