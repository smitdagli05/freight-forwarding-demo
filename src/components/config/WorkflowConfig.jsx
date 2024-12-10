// freight-forwarding-demo/src/components/config/WorkflowConfig.jsx

import React, { useState, useContext } from 'react';
import { ConfigurationContext } from '../../contexts/ConfigurationContext';

const WorkflowConfig = () => {
  const { workflow, setWorkflow } = useContext(ConfigurationContext);
  const [localWorkflow, setLocalWorkflow] = useState(workflow);
  const [editingStepIndex, setEditingStepIndex] = useState(null);

  const moveStep = (index, direction) => {
    const newWorkflow = [...localWorkflow];
    const [removed] = newWorkflow.splice(index, 1);
    newWorkflow.splice(index + direction, 0, removed);
    setLocalWorkflow(newWorkflow);
  };

  const handleEdit = (index, field, value) => {
    const newWorkflow = [...localWorkflow];
    newWorkflow[index] = { ...newWorkflow[index], [field]: value };
    setLocalWorkflow(newWorkflow);
  };

  const handleAddStep = () => {
    setLocalWorkflow([...localWorkflow, { step: 'newStep', component: 'NewComponent' }]);
  };

  const handleRemoveStep = (index) => {
    const newWorkflow = [...localWorkflow];
    newWorkflow.splice(index, 1);
    setLocalWorkflow(newWorkflow);
  };

  const handleSaveWorkflow = () => {
    setWorkflow(localWorkflow);
  };

  const handleCancel = () => {
    setLocalWorkflow(workflow);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Workflow Configuration</h2>
      <p className="text-gray-700 mb-4">Define the sequence of operations for the freight forwarding process.</p>

      <div className="mb-4">
        {localWorkflow.map((w, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded mb-2 bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <input
                className="border p-1 text-sm flex-grow"
                value={w.step}
                onChange={(e) => handleEdit(index, 'step', e.target.value)}
                placeholder="Step Name"
              />
              <select
                className="border p-1 text-sm"
                value={w.component}
                onChange={(e) => handleEdit(index, 'component', e.target.value)}
              >
                {/* Define possible components */}
                <option value="OutlookView">Outlook View</option>
                <option value="ProcessingView">Processing View</option>
                <option value="CarrierRequestView">Carrier Request View</option>
                <option value="QuoteManagementView">Quote Management View</option>
                <option value="RealTimeCollaborationView">Real-Time Collaboration View</option>
                <option value="DocumentGenerationView">Document Generation View</option>
                <option value="NotificationView">Notification View</option>
                <option value="CompletionView">Completion View</option>
                <option value="StatusBoard">Status Board</option>
                {/* Add more components as needed */}
              </select>
              <button
                disabled={index === 0}
                onClick={() => moveStep(index, -1)}
                className={`px-2 py-1 text-sm rounded ${index === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
              >
                Up
              </button>
              <button
                disabled={index === localWorkflow.length - 1}
                onClick={() => moveStep(index, 1)}
                className={`px-2 py-1 text-sm rounded ${index === localWorkflow.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
              >
                Down
              </button>
              <button
                onClick={() => handleRemoveStep(index)}
                className="px-2 py-1 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
            <textarea
              className="border p-2 w-full text-sm"
              value={w.description || ''}
              onChange={(e) => handleEdit(index, 'description', e.target.value)}
              placeholder="Step Description (Optional)"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleAddStep}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New Step
      </button>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSaveWorkflow}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Workflow
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkflowConfig;
