import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionView = ({ onProceedToStatusBoard, onStartNew }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <CheckCircle size={48} className="text-green-500 mb-4 mx-auto" />
      <h2 className="text-xl font-semibold mb-2">Shipment Setup Complete</h2>
      <p className="text-gray-600 mb-6">All stakeholders have been notified, and documents are ready.</p>

      <div className="space-y-3">
        <button
          onClick={onProceedToStatusBoard}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View Real-Time Status Board
        </button>
        <button
          onClick={onStartNew}
          className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Start New Request
        </button>
      </div>
    </div>
  );
};

export default CompletionView;