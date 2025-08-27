import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import forecastRoutes from './routes/forecast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', forecastRoutes);

// Health check endpoint
app.get('/forecast', (req, res) => {
  res.json({ status: 'OK', message: 'AgriCastNet Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 AgriCastNet Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/forecast`);
});