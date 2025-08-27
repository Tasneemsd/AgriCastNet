import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import UploadData from './components/UploadData.jsx';
import ModelSelection from './components/ModelSelection.jsx';
import Results from './components/Results.jsx';
import { forecastApi } from './utils/api.js';

function App() {
  const [activeSection, setActiveSection] = useState('upload');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState('dense_ann');
  const [forecastResult, setForecastResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setForecastResult(null);
  };

  const handleRunForecast = async () => {
    if (!uploadedFile || !selectedModel) return;
    
    setIsRunning(true);
    try {
      const result = await forecastApi.runForecast(uploadedFile, selectedModel);
      setForecastResult(result);
      setActiveSection('results');
    } catch (error) {
      console.error('Forecast failed:', error);
      alert('Forecast failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleDownloadResults = async () => {
    if (!forecastResult) return;
    
    try {
      const blob = await forecastApi.downloadResults(forecastResult.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `forecast_results_${forecastResult.id}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <UploadData
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
          />
        );
      case 'forecast':
        return (
          <ModelSelection
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
            onRunForecast={handleRunForecast}
            isRunning={isRunning}
            canRun={!!uploadedFile}
          />
        );
      case 'results':
        return (
          <Results
            result={forecastResult}
            isLoading={isRunning}
            onDownload={handleDownloadResults}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative">
              <Sidebar
                activeSection={activeSection}
                onSectionChange={(section) => {
                  setActiveSection(section);
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;