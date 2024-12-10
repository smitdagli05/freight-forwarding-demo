// freight-forwarding-demo/src/components/config/CarrierConfig.jsx

import React, { useState, useEffect } from 'react';

// Mock data: In a real system, you'd fetch this from a backend API
const initialCarriers = [
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

const CarrierConfig = () => {
  const [carriers, setCarriers] = useState(initialCarriers);
  const [editingCarrier, setEditingCarrier] = useState(null);

  const handleSave = (updatedCarrier) => {
    const updatedCarriers = carriers.map(c => c.id === updatedCarrier.id ? updatedCarrier : c);
    setCarriers(updatedCarriers);
    setEditingCarrier(null);
  };

  const handleAddCarrier = () => {
    const newCarrier = {
      id: `carrier-${Date.now()}`,
      name: 'New Carrier',
      format: 'Email',
      fields: [],
      template: 'Hello {{carrier}}, your shipment details...'
    };
    setCarriers([...carriers, newCarrier]);
    setEditingCarrier(newCarrier);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Carrier Configuration</h2>
      {!editingCarrier && (
        <>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Format</th>
                <th className="text-left p-2">Fields</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {carriers.map(carrier => (
                <tr key={carrier.id} className="border-b">
                  <td className="p-2">{carrier.name}</td>
                  <td className="p-2">{carrier.format}</td>
                  <td className="p-2">{carrier.fields.join(', ')}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditingCarrier(carrier)}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            onClick={handleAddCarrier}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Carrier
          </button>
        </>
      )}

      {editingCarrier && (
        <CarrierEditor 
          carrier={editingCarrier} 
          onSave={handleSave} 
          onCancel={() => setEditingCarrier(null)} 
        />
      )}
    </div>
  );
};

const CarrierEditor = ({ carrier, onSave, onCancel }) => {
  const [localCarrier, setLocalCarrier] = useState({ ...carrier });

  const handleChange = (field, value) => {
    setLocalCarrier({ ...localCarrier, [field]: value });
  };

  const handleFieldChange = (e) => {
    const fields = e.target.value.split(',').map(f => f.trim()).filter(Boolean);
    setLocalCarrier({ ...localCarrier, fields });
  };

  const handleSaveClick = () => {
    onSave(localCarrier);
  };

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Carrier Name</label>
        <input
          className="border p-2 w-full"
          value={localCarrier.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Format</label>
        <select
          className="border p-2 w-full"
          value={localCarrier.format}
          onChange={(e) => handleChange('format', e.target.value)}
        >
          <option value="CSV">CSV</option>
          <option value="Excel">Excel</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Required Fields (comma separated)</label>
        <input
          className="border p-2 w-full"
          defaultValue={localCarrier.fields.join(', ')}
          onChange={handleFieldChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Template</label>
        <textarea
          className="border p-2 w-full h-32"
          value={localCarrier.template}
          onChange={(e) => handleChange('template', e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleSaveClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
        <button 
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CarrierConfig;
