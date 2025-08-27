import React, { useState } from 'react';
import { Play, Clock, Zap, AlertTriangle } from 'lucide-react';
import { FORECAST_MODELS } from '../utils/constants.js';

const ModelSelection = ({
  selectedModel,
  onModelSelect,
  onRunForecast,
  isRunning,
  canRun,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const selectedModelInfo = FORECAST_MODELS.find(m => m.id === selectedModel);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Forecasting Model</h2>
        <p className="text-gray-600 mb-6">
          Choose from advanced deep learning models optimized for microclimate forecasting.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {FORECAST_MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => onModelSelect(model.id)}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                selectedModel === model.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{model.icon}</div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    selectedModel === model.id ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedModelInfo && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <span className="text-lg mr-2">{selectedModelInfo.icon}</span>
              {selectedModelInfo.name} Selected
            </h4>
            <p className="text-blue-700 text-sm">{selectedModelInfo.description}</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-500" />
          Forecast Configuration
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Forecast Horizon
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="24">24 Hours</option>
              <option value="48">48 Hours</option>
              <option value="72">72 Hours</option>
              <option value="168">1 Week</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prediction Interval
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </button>

        {showAdvanced && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Rate
                </label>
                <input
                  type="number"
                  defaultValue="0.001"
                  step="0.001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value="128">128</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {!canRun && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium">Please upload data first</span>
          </div>
        )}

        <div className="ml-auto">
          <button
            onClick={onRunForecast}
            disabled={!canRun || isRunning}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              canRun && !isRunning
                ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isRunning ? (
              <>
                <Clock className="h-5 w-5 animate-spin" />
                <span>Running Forecast...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Run Forecast</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelection;