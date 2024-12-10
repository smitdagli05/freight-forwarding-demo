// freight-forwarding-demo/src/components/AdminDashboard.jsx

import React, { useState } from 'react';
import CarrierConfig from './config/CarrierConfig';
import WorkflowConfig from './config/WorkflowConfig';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('carriers');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Internal Configuration Platform</h1>

      {/* Sub-navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('carriers')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'carriers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Carrier Configuration
          </button>
          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'workflows'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Workflow Configuration
          </button>
        </nav>
      </div>

      {/* Active Tab Content */}
      <div>
        {activeTab === 'carriers' && <CarrierConfig />}
        {activeTab === 'workflows' && <WorkflowConfig />}
      </div>
    </div>
  );
};

export default AdminDashboard;
