// freight-forwarding-demo/src/contexts/ConfigurationContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ConfigurationContext = createContext();

// Create a provider component
export const ConfigurationProvider = ({ children }) => {
  const [carriers, setCarriers] = useState([]);
  const [workflow, setWorkflow] = useState([]);

  // Initialize with default carriers and workflow
  useEffect(() => {
    const defaultCarriers = [
      {
        id: 'cathayPacific',
        name: 'Cathay Pacific',
        format: 'CSV',
        fields: ['quantity', 'dimensions', 'weight', 'origin', 'destination'],
        template: `Dear Cathay Pacific team,

Request for quote:
- Quantity: {{quantity}}
- Dimensions: {{dimensions}}
- Weight: {{weight}}
- Origin: {{origin}}
- Destination: {{destination}}`
      },
      {
        id: 'koreanAir',
        name: 'Korean Air',
        format: 'Excel',
        fields: ['shipmentRef', 'quantity', 'weight', 'specialRequirements'],
        template: `Korean Air Rate Request
Ref: {{shipmentRef}}
Qty: {{quantity}}
Weight: {{weight}}
Special Requirements: {{specialRequirements}}`
      }
    ];

    const defaultWorkflow = [
      { step: 'outlook', component: 'OutlookView' },
      { step: 'processing', component: 'ProcessingView' },
      { step: 'carrierRequests', component: 'CarrierRequestView' },
      { step: 'quotes', component: 'QuoteManagementView' },
      { step: 'collaboration', component: 'RealTimeCollaborationView' },
      { step: 'documents', component: 'DocumentGenerationView' },
      { step: 'notifications', component: 'NotificationView' },
      { step: 'complete', component: 'CompletionView' },
      { step: 'statusBoard', component: 'StatusBoard' },
    ];

    setCarriers(defaultCarriers);
    setWorkflow(defaultWorkflow);
  }, []);

  return (
    <ConfigurationContext.Provider value={{ carriers, setCarriers, workflow, setWorkflow }}>
      {children}
    </ConfigurationContext.Provider>
  );
};
