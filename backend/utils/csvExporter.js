export const exportToCSV = (forecastResult) => {
  const { predictions, metrics, metadata } = forecastResult;
  
  // Create CSV header
  let csvContent = 'Time,Temperature,Humidity,CO2,Light\n';
  
  // Add prediction data
  const forecastLength = predictions.temperature.length;
  for (let i = 0; i < forecastLength; i++) {
    const timestamp = new Date(Date.now() + i * 30 * 60 * 1000); // 30-minute intervals
    const timeStr = timestamp.toISOString();
    
    csvContent += `${timeStr},${predictions.temperature[i]},${predictions.humidity[i]},${predictions.co2[i]},${predictions.light[i]}\n`;
  }
  
  // Add metadata as comments
  csvContent += '\n# Forecast Metadata\n';
  csvContent += `# Model: ${metadata.model}\n`;
  csvContent += `# Processing Time: ${metadata.processingTime}s\n`;
  csvContent += `# Data Points: ${metadata.dataPoints}\n`;
  csvContent += `# Forecast Horizon: ${metadata.forecastHorizon} hours\n`;
  csvContent += `# Generated: ${metadata.timestamp}\n`;
  
  // Add performance metrics
  csvContent += '\n# Performance Metrics\n';
  csvContent += `# MAE: ${metrics.mae.toFixed(4)}\n`;
  csvContent += `# RMSE: ${metrics.rmse.toFixed(4)}\n`;
  csvContent += `# R²: ${metrics.r2.toFixed(4)}\n`;
  csvContent += `# MAPE: ${metrics.mape.toFixed(2)}%\n`;
  
  return csvContent;
};

export const exportMetricsToCSV = (metrics) => {
  let csvContent = 'Metric,Value\n';
  csvContent += `MAE,${metrics.mae}\n`;
  csvContent += `RMSE,${metrics.rmse}\n`;
  csvContent += `R²,${metrics.r2}\n`;
  csvContent += `MAPE,${metrics.mape}\n`;
  
  return csvContent;
};