// freight-forwarding-demo/src/components/DocumentGenerationView.jsx

import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';

const DocumentGenerationView = ({ onProceed, discrepancies }) => {
  const [hasDiscrepancies, setHasDiscrepancies] = useState(discrepancies);
  const [showDocument, setShowDocument] = useState(null);
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false);

  const handleResolveDiscrepancies = () => {
    // Simulate discrepancy resolution
    setHasDiscrepancies(false);
    setShowDiscrepancyModal(false);
  };

  const documents = [
    'Booking Confirmation.pdf',
    'Air Waybill.pdf',
    'Customs Declaration.pdf',
  ];

  const handleDocumentClick = docName => {
    setShowDocument(docName);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <h2 className="text-xl font-semibold mb-4">Document Generation</h2>
      {hasDiscrepancies ? (
        <div className="bg-yellow-50 p-4 rounded mb-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertCircle />
            <span>Discrepancies Found in Documents</span>
          </div>
          <p className="text-yellow-700 mt-2">
            There is a mismatch between the declared weight and the carrier's allowed maximum. Please review and adjust accordingly.
          </p>
          <button
            onClick={() => setShowDiscrepancyModal(true)}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Resolve Discrepancies
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-2 mb-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => handleDocumentClick(doc)}
              >
                <FileText className="text-green-600" />
                <span className="underline text-blue-600">{doc}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onProceed}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Notifications
          </button>
        </div>
      )}

      {/* Document Preview Modal */}
      {showDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="font-semibold text-lg mb-4">{showDocument}</h3>
            {/* Mock content of the document */}
            <div className="bg-gray-50 p-4 rounded h-64 overflow-y-auto">
              {/* For Booking Confirmation.pdf, add specific mock content */}
              {showDocument === 'Booking Confirmation.pdf' && (
                <div>
                  <h4 className="font-semibold mb-2">Booking Confirmation Details</h4>
                  <p className="text-sm text-gray-700">
                    Booking Reference: <strong>BK-2024-001</strong><br/>
                    Carrier: Cathay Pacific<br/>
                    Origin: Shenzhen<br/>
                    Destination: Los Angeles<br/>
                    Departure Date: 2024-03-15<br/>
                    Arrival Date: 2024-03-18<br/>
                    Rate: $4.50/kg<br/>
                    Total Weight: 10,000 kg<br/>
                    Special Requirements: Temperature controlled
                  </p>
                </div>
              )}
              {showDocument === 'Air Waybill.pdf' && (
                <div>
                  <h4 className="font-semibold mb-2">Air Waybill Details</h4>
                  <p className="text-sm text-gray-700">
                    AWB Number: <strong>160-12345675</strong><br/>
                    Shipper: TechCorp Electronics<br/>
                    Consignee: TechCorp USA<br/>
                    Description: 2000 Tablets<br/>
                    Gross Weight: 10,000 kg<br/>
                    Dimensions: 40x30x20 cm per carton
                  </p>
                </div>
              )}
              {showDocument === 'Customs Declaration.pdf' && (
                <div>
                  <h4 className="font-semibold mb-2">Customs Declaration</h4>
                  <p className="text-sm text-gray-700">
                    Declaration Number: <strong>CD-2024-789</strong><br/>
                    Exporter: TechCorp Electronics<br/>
                    Importer: TechCorp USA<br/>
                    HS Code: 847130<br/>
                    Value: $2,000,000<br/>
                    Origin: China<br/>
                    Destination: USA
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowDocument(null)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Discrepancy Resolution Modal */}
      {showDiscrepancyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="font-semibold text-lg mb-4">Resolve Discrepancy</h3>
            <p className="text-gray-700 mb-4">
              The declared weight exceeds the carrier's maximum allowed weight. Please adjust the weight or split the shipment.
            </p>
            {/* Mock adjustment options */}
            <div className="space-y-2">
              <button
                onClick={handleResolveDiscrepancies}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Split Shipment into Two Batches
              </button>
              <button
                onClick={handleResolveDiscrepancies}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Request Carrier Exception
              </button>
            </div>
            <button
              onClick={() => setShowDiscrepancyModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerationView;