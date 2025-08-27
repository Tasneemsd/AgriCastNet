import React from 'react';
import { Download, TrendingUp, Target, Clock, BarChart3 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const Results = ({ result, isLoading, onDownload }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing forecast...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Results Yet</h3>
        <p className="text-gray-500">Run a forecast to see results and charts here.</p>
      </div>
    );
  }

  // Convert predictions to chart data
  const chartData = result.predictions.temperature.map((temp, index) => ({
    time: new Date(Date.now() + index * 30 * 60 * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: temp,
    humidity: result.predictions.humidity[index],
    co2: result.predictions.co2[index],
    light: result.predictions.light[index],
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">MAE</p>
              <p className="text-2xl font-bold text-blue-800">{result.metrics.mae.toFixed(3)}</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">RMSE</p>
              <p className="text-2xl font-bold text-green-800">{result.metrics.rmse.toFixed(3)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">R²</p>
              <p className="text-2xl font-bold text-purple-800">{result.metrics.r2.toFixed(3)}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Time</p>
              <p className="text-2xl font-bold text-orange-800">{result.metadata.processingTime}s</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Model Info & Download */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Forecast Results</h2>
            <p className="text-sm text-gray-600">Model: {result.model} | {result.metadata.dataPoints} data points</p>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Temperature & Humidity Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Temperature & Humidity Forecast</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="temp" orientation="left" />
              <YAxis yAxisId="humidity" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                name="Temperature (°C)"
              />
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CO2 & Light Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">CO2 & Light Intensity Forecast</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="co2" orientation="left" />
              <YAxis yAxisId="light" orientation="right" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="co2"
                type="monotone"
                dataKey="co2"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="CO2 (ppm)"
              />
              <Area
                yAxisId="light"
                type="monotone"
                dataKey="light"
                stackId="2"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Light (lux)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Prediction Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature (°C)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Humidity (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CO2 (ppm)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Light (lux)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.slice(0, 10).map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.temperature.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.humidity.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.co2.toFixed(0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.light.toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {chartData.length > 10 && (
            <div className="text-center py-4 text-sm text-gray-500">
              Showing first 10 results. Download CSV for complete data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;