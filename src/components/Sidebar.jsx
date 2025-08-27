import React from 'react';
import { Upload, Play, BarChart3, Database } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'forecast', label: 'Run Forecast', icon: Play },
    { id: 'results', label: 'Results & Charts', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Dashboard</span>
        </div>
        <div className="text-xs text-gray-500">
          Microclimate Forecasting System
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 shadow-sm border border-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${
                activeSection === item.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
          <div className="text-xs font-medium text-green-800 mb-1">Research Framework</div>
          <div className="text-xs text-green-600">
            Advanced ML models for precise microclimate prediction
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;