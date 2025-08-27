import express from 'express';
import { runForecast, downloadResults } from '../controllers/forecastController.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = express.Router();

// POST /api/forecast - Run forecasting with uploaded CSV and selected model
router.post('/forecast', uploadMiddleware.single('csvFile'), runForecast);

// GET /api/forecast/download/:id - Download forecast results as CSV
router.get('/forecast/download/:id', downloadResults);

export default router;