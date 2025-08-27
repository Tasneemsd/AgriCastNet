import { processCSV } from '../utils/csvProcessor.js';
import { generateForecast } from '../utils/forecastEngine.js';
import { exportToCSV } from '../utils/csvExporter.js';
import { v4 as uuidv4 } from 'uuid';

// Store results in memory (in production, use a database)
const forecastResults = new Map();

export const runForecast = async (req, res) => {
  try {
    const { model } = req.body;
    const csvFile = req.file;

    if (!csvFile) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    if (!model) {
      return res.status(400).json({ error: 'No model selected' });
    }

    console.log(`🔄 Processing forecast with model: ${model}`);
    console.log(`📁 File: ${csvFile.originalname} (${csvFile.size} bytes)`);

    // Process the uploaded CSV file
    const csvData = await processCSV(csvFile.path);
    console.log(`📊 Processed ${csvData.length} rows of data`);

    // Generate forecast using the selected model
    const forecastResult = await generateForecast(model, csvData);

    // Store result with unique ID
    const resultId = uuidv4();
    forecastResults.set(resultId, {
      ...forecastResult,
      model,
      timestamp: new Date().toISOString(),
      originalFile: csvFile.originalname
    });

    console.log(`✅ Forecast completed with ID: ${resultId}`);

    res.json({
      success: true,
      resultId,
      ...forecastResult
    });

  } catch (error) {
    console.error('❌ Forecast error:', error);
    res.status(500).json({ 
      error: 'Failed to process forecast',
      message: error.message 
    });
  }
};

export const downloadResults = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = forecastResults.get(id);
    if (!result) {
      return res.status(404).json({ error: 'Forecast result not found' });
    }

    const csvContent = exportToCSV(result);
    const filename = `forecast_${result.model}_${Date.now()}.csv`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);

    console.log(`📥 Downloaded results for ID: ${id}`);

  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({ 
      error: 'Failed to download results',
      message: error.message 
    });
  }
};