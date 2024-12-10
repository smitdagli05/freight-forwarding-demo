// freight-forwarding-demo/src/components/ProcessingView.jsx

import React from 'react';
import { Package } from 'lucide-react';
import PropTypes from 'prop-types';

const ProcessingView = ({ shipmentData, onConfirm }) => {
  console.log('ProcessingView received shipmentData:', shipmentData); // Debugging

  if (!shipmentData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <Package size={48} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-4">No Shipment Data Available</h3>
          <p className="text-gray-600 mb-6">Please import shipment data to proceed.</p>
          {/* Optionally, add a button to go back or retry */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center">
        <Package size={48} className="text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Confirm Shipment Details</h3>
        <div className="w-full max-w-md">
          <ul className="list-disc pl-5 text-gray-700 mb-4">
            <li>Dimensions: {shipmentData.dimensions || 'N/A'}</li>
            <li>Weight: {shipmentData.weight || 'N/A'}</li>
            <li>Quantity: {shipmentData.quantity || 'N/A'}</li>
            <li>Special Requirements: {shipmentData.specialRequirements || 'N/A'}</li>
            <li>Origin: {shipmentData.origin || 'N/A'}</li>
            <li>Destination: {shipmentData.destination || 'N/A'}</li>
          </ul>
          <button
            onClick={onConfirm} // Ensure this is correctly wired
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

ProcessingView.propTypes = {
  shipmentData: PropTypes.shape({
    dimensions: PropTypes.string,
    weight: PropTypes.string,
    quantity: PropTypes.string,
    specialRequirements: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
  }),
  onConfirm: PropTypes.func.isRequired,
};

ProcessingView.defaultProps = {
  shipmentData: null,
};

export default ProcessingView;
