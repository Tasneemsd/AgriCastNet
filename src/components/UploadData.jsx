import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const UploadData = ({ onFileUpload, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndUploadFile(files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    setError('');
    const files = e.target.files;
    if (files && files[0]) {
      validateAndUploadFile(files[0]);
    }
  };

  const validateAndUploadFile = (file) => {
    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file only');
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size should be less than 10MB');
      return;
    }
    onFileUpload(file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Microclimate Data</h2>
        <p className="text-gray-600 mb-6">
          Upload your CSV file containing time-series data for temperature, humidity, CO2, and light intensity.
        </p>

        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : uploadedFile
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {uploadedFile ? (
            <div className="space-y-3">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-green-700">File Uploaded Successfully</p>
                <p className="text-sm text-green-600">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className={`h-12 w-12 mx-auto ${
                dragActive ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your CSV file here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports CSV files up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Data Format Requirements
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Required Columns:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• timestamp (YYYY-MM-DD HH:MM:SS)</li>
              <li>• temperature (°C)</li>
              <li>• humidity (%)</li>
              <li>• co2 (ppm)</li>
              <li>• light_intensity (lux)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Data Quality:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Regular time intervals preferred</li>
              <li>• Minimum 100 data points</li>
              <li>• Handle missing values appropriately</li>
              <li>• Ensure realistic value ranges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;