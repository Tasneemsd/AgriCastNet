import React from 'react';
import { Cloud, Cpu, Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AgriCastNet</h1>
              <p className="text-xs text-gray-500">Unified Deep Forecasting Framework</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
            <Cpu className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Smart Greenhouse</span>
          </div>
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;