export const generateForecast = async (model, data) => {
  console.log(`🤖 Running ${model} model on ${data.length} data points`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

  // Generate mock forecast data
  const forecastLength = 24; // 24 hours of predictions
  const predictions = {
    temperature: [],
    humidity: [],
    co2: [],
    light: []
  };

  // Generate realistic mock data based on model type
  const baseTemp = 22 + Math.random() * 6; // 22-28°C
  const baseHumidity = 60 + Math.random() * 20; // 60-80%
  const baseCO2 = 400 + Math.random() * 200; // 400-600 ppm
  const baseLight = 200 + Math.random() * 300; // 200-500 lux

  for (let i = 0; i < forecastLength; i++) {
    // Add some realistic variation and trends
    const timeVariation = Math.sin(i * Math.PI / 12) * 2; // Daily cycle
    const randomNoise = (Math.random() - 0.5) * 2;

    predictions.temperature.push(
      Math.round((baseTemp + timeVariation + randomNoise) * 100) / 100
    );
    predictions.humidity.push(
      Math.round((baseHumidity - timeVariation * 0.5 + randomNoise) * 100) / 100
    );
    predictions.co2.push(
      Math.round((baseCO2 + randomNoise * 10) * 100) / 100
    );
    predictions.light.push(
      Math.round((baseLight + timeVariation * 50 + randomNoise * 20) * 100) / 100
    );
  }

  // Generate mock performance metrics
  const metrics = {
    mae: Math.random() * 0.5 + 0.1, // 0.1-0.6
    rmse: Math.random() * 0.8 + 0.2, // 0.2-1.0
    r2: 0.85 + Math.random() * 0.14, // 0.85-0.99
    mape: Math.random() * 5 + 1 // 1-6%
  };

  const metadata = {
    model,
    dataPoints: data.length,
    forecastHorizon: forecastLength,
    processingTime: Math.round((2 + Math.random() * 3) * 100) / 100,
    timestamp: new Date().toISOString()
  };

  console.log(`✅ ${model} forecast completed`);
  console.log(`📊 Metrics - MAE: ${metrics.mae.toFixed(3)}, RMSE: ${metrics.rmse.toFixed(3)}, R²: ${metrics.r2.toFixed(3)}`);

  return {
    predictions,
    metrics,
    metadata
  };
};

// Model-specific configurations
export const MODEL_CONFIGS = {
  'Dense ANN': {
    description: 'Deep Artificial Neural Network with dense layers',
    complexity: 'Medium',
    trainingTime: 'Fast'
  },
  'PLSTM': {
    description: 'Phased Long Short-Term Memory network',
    complexity: 'High',
    trainingTime: 'Medium'
  },
  'Transformer': {
    description: 'Attention-based transformer architecture',
    complexity: 'Very High',
    trainingTime: 'Slow'
  },
  'CNN-BiLSTM': {
    description: 'Convolutional Neural Network with Bidirectional LSTM',
    complexity: 'High',
    trainingTime: 'Medium'
  },
  'WaveNet': {
    description: 'Dilated convolutional neural network',
    complexity: 'Very High',
    trainingTime: 'Slow'
  },
  'XGBoost': {
    description: 'Extreme Gradient Boosting ensemble method',
    complexity: 'Medium',
    trainingTime: 'Fast'
  },
  'TFT': {
    description: 'Temporal Fusion Transformer',
    complexity: 'Very High',
    trainingTime: 'Very Slow'
  }
};