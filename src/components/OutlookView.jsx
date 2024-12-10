// freight-forwarding-demo/src/components/OutlookView.jsx

import React, { useState } from 'react';
import { Mail, FileText, Info } from 'lucide-react';
import PropTypes from 'prop-types';

const OutlookView = ({ onImport }) => {
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

  const handleParseData = () => {
    // Simulate parsing data and generating carrier messages
    const parsedData = {
      dimensions: "40x30x20 cm per carton",
      weight: "5kg per carton",
      quantity: "2000 tablets",
      specialRequirements: "Temperature controlled",
      origin: "Shenzhen",
      destination: "Los Angeles",
    };

    const carrierMessages = [
      {
        carrier: "cathayPacific",
        message: `Dear Cathay Pacific team,

Request for quote:
- Quantity: 2000 tablets
- Dimensions: 40x30x20 cm per carton
- Weight: 5kg per carton
- Origin: Shenzhen
- Destination: Los Angeles`
      },
      {
        carrier: "koreanAir",
        message: `Korean Air Rate Request
Ref: SHP2024001
Qty: 2000 tablets
Weight: 5kg per carton
Special Requirements: Temperature controlled`
      }
    ];

    onImport(parsedData, carrierMessages);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with Info Icon */}
      <div className="border-b border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="text-blue-600" />
          <span className="font-semibold">Email Attachment Import</span>
        </div>
        {/* Info Button */}
        <div>
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
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Content */}
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

        {/* Action Button */}
        <button
          onClick={handleParseData}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Parse and Import Shipment Data
        </button>
      </div>
    </div>
  );
};

OutlookView.propTypes = {
  onImport: PropTypes.func.isRequired,
};

export default OutlookView;

