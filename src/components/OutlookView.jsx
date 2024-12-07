// freight-forwarding-demo/src/components/OutlookView.jsx

import React, { useState } from 'react';
import { Mail, FileText, Database, Info } from 'lucide-react';

const OutlookView = ({ onImport }) => {
  const [parsedData, setParsedData] = useState(null);
  const [showParsedData, setShowParsedData] = useState(false);
  const [dataSource, setDataSource] = useState('email'); // 'email' or 'erp'
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Sample email data
  const emailData = {
    from: "john.smith@techcorp.com",
    subject: "Shipping Request - 2000 Tablets",
    content: `Need to arrange shipping for our latest tablet order:
- 2,000 tablets (200 cartons, 10 each)
- Dimensions: 40x30x20 cm per carton
- Weight: 5kg per carton
- Origin: Shenzhen
- Destination: Los Angeles
- Timeline: Within 3 weeks
- Special: Temperature controlled`,
    attachment: "shipping_details.xlsx",
  };

  // Sample ERP data
  const erpData = {
    shipmentRef: "SHP2024001",
    dimensions: "40x30x20 cm per carton",
    weight: "5kg per carton",
    quantity: "2000 tablets",
    specialRequirements: "Temperature controlled",
    origin: "Shenzhen",
    destination: "Los Angeles",
    supplierDetails: {
      name: "TechCorp Electronics",
      contact: "John Chen",
      reference: "PO-2024-456",
    },
  };

  // Simulated attachment data from email
  const attachmentData = {
    dimensions: "40x30x20 cm per carton",
    weight: "5kg per carton",
    quantity: "2000 tablets",
    specialRequirements: "Temperature controlled",
    origin: "Shenzhen",
    destination: "Los Angeles",
  };

  // Carrier template mappings
  const templateMappings = {
    cathayPacific: {
      format: "CSV",
      fields: ["quantity", "dimensions", "weight", "origin", "destination"],
      template: `Dear Cathay Pacific team,

Request for quote for the following shipment:
- Quantity: {{quantity}}
- Dimensions: {{dimensions}}
- Weight: {{weight}}
- From: {{origin}}
- To: {{destination}}`,
    },
    koreanAir: {
      format: "Excel",
      fields: ["shipmentRef", "quantity", "weight", "specialRequirements"],
      template: `Korean Air Rate Request
Ref: {{shipmentRef}}
Qty: {{quantity}}
Weight: {{weight}}
Special Requirements: {{specialRequirements}}`,
    },
  };

  const handleParseData = () => {
    setParsedData(dataSource === 'email' ? attachmentData : erpData);
    setShowParsedData(true);
  };

  const handleImport = () => {
    // Generate carrier-specific formats
    const carrierMessages = Object.entries(templateMappings).map(
      ([carrier, config]) => {
        const message = config.template.replace(/\{\{(\w+)\}\}/g, (match, field) => {
          return parsedData[field] || match;
        });
        return {
          carrier,
          message,
          format: config.format,
        };
      }
    );

    console.log('Generated carrier messages:', carrierMessages);
    onImport(parsedData, carrierMessages);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with Info Icon */}
      <div className="border-b border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {dataSource === 'email' ? (
            <Mail className="text-blue-600" />
          ) : (
            <Database className="text-green-600" />
          )}
          <span className="font-semibold">
            {dataSource === 'email' ? 'Email Attachment Import' : 'ERP System Import'}
          </span>
        </div>
        {/* Switch Data Source and Info Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDataSource(dataSource === 'email' ? 'erp' : 'email')}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Switch to {dataSource === 'email' ? 'ERP View' : 'Email View'}
          </button>
          <button
            onClick={() => setShowInfoModal(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="font-semibold text-lg mb-4">Data Source Information</h3>
            <p className="text-gray-700 mb-4">
              Choose <strong>Email Attachment Import</strong> if you have received shipment details via email attachments, commonly used when clients are not integrated with the platform.
            </p>
            <p className="text-gray-700">
              Select <strong>ERP System Import</strong> to directly import shipment data from a client's integrated ERP system, ensuring structured data transfer without manual entry.
            </p>
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Content based on data source */}
      {dataSource === 'email' ? (
        // Email view
        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm text-gray-600">From: {emailData.from}</div>
            <div className="text-sm text-gray-600">Subject: {emailData.subject}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">{emailData.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <FileText size={16} />
              <span className="underline text-blue-600 cursor-pointer">
                {emailData.attachment}
              </span>
            </div>
          </div>
        </div>
      ) : (
        // ERP view
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-green-600" />
            <span className="font-medium">SAP Shipment Record #{erpData.shipmentRef}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Supplier</div>
                <div className="font-medium">{erpData.supplierDetails.name}</div>
                <div className="text-sm text-gray-500">
                  Contact: {erpData.supplierDetails.contact}
                </div>
                <div className="text-sm text-gray-500">
                  Reference: {erpData.supplierDetails.reference}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Shipment Details</div>
                <div className="text-sm">Quantity: {erpData.quantity}</div>
                <div className="text-sm">Weight: {erpData.weight}</div>
                <div className="text-sm">Dimensions: {erpData.dimensions}</div>
                <div className="text-sm">Special: {erpData.specialRequirements}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 border-t">
        {!showParsedData ? (
          <button
            onClick={handleParseData}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {dataSource === 'email' ? 'Parse Attachment' : 'Import ERP Data'}
          </button>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Extracted Shipment Details:</h3>
              <ul className="list-disc pl-5 text-gray-700 mb-4">
                <li>Dimensions: {parsedData.dimensions}</li>
                <li>Weight: {parsedData.weight}</li>
                <li>Quantity: {parsedData.quantity}</li>
                <li>Special Requirements: {parsedData.specialRequirements}</li>
                <li>Origin: {parsedData.origin}</li>
                <li>Destination: {parsedData.destination}</li>
              </ul>
            </div>

            {/* Template Preview */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Carrier Template Preview:</h3>
              <div className="space-y-4">
                {Object.entries(templateMappings).map(([carrier, config]) => {
                  const message = config.template.replace(
                    /\{\{(\w+)\}\}/g,
                    (match, field) => parsedData[field] || match
                  );
                  return (
                    <div key={carrier} className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{carrier}</span>
                        <span className="text-sm text-gray-500">
                          Format: {config.format}
                        </span>
                      </div>
                      <pre className="text-sm whitespace-pre-wrap">{message}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleImport}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm and Import to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutlookView;