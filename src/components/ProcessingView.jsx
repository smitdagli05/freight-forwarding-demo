import React from 'react';
import { Package, CheckCircle } from 'lucide-react';

const ProcessingView = ({ shipmentData, onConfirm }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center">
        <Package size={48} className="text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Confirm Shipment Details</h3>
        <div className="w-full max-w-md">
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Dimensions: {shipmentData.dimensions}</li>
            <li>Weight: {shipmentData.weight}</li>
            <li>Quantity: {shipmentData.quantity}</li>
            <li>Special Requirements: {shipmentData.specialRequirements}</li>
            <li>Origin: {shipmentData.origin}</li>
            <li>Destination: {shipmentData.destination}</li>
          </ul>
          <button
            onClick={onConfirm}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;