// freight-forwarding-demo/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CompleteFreightJourney from './components/CompleteFreightJourney';
import AdminDashboard from './components/AdminDashboard';
import { ConfigurationProvider } from './contexts/ConfigurationContext';

function App() {
  return (
    <ConfigurationProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navigation Bar */}
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="text-xl font-bold text-blue-600">
                      Freight Forwarding
                    </Link>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Home
                    </Link>
                    <Link
                      to="/admin"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<CompleteFreightJourney />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Add more routes here as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ConfigurationProvider>
  );
}

export default App;
