import fs from 'fs';
import csv from 'csv-parser';

export const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert string values to numbers where possible
        const processedRow = {};
        for (const [key, value] of Object.entries(data)) {
          const numValue = parseFloat(value);
          processedRow[key] = isNaN(numValue) ? value : numValue;
        }
        results.push(processedRow);
      })
      .on('end', () => {
        console.log(`✅ CSV processing complete: ${results.length} rows`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error('❌ CSV processing error:', error);
        reject(error);
      });
  });
};

export const validateCSVData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('CSV data is empty or invalid');
  }

  // Check for required columns (basic validation)
  const firstRow = data[0];
  const requiredColumns = ['timestamp', 'temperature', 'humidity'];
  
  for (const column of requiredColumns) {
    if (!(column in firstRow)) {
      console.warn(`⚠️ Warning: Column '${column}' not found in CSV`);
    }
  }

  return true;
};