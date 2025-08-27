// utils/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const forecastApi = {
  runForecast: async (file, model) => {
    const formData = new FormData();
    formData.append('csvFile', file); // MUST match multer.single('csvFile')
    formData.append('model', model);

    const response = await axios.post(`${API_BASE}/forecast`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000
    });

    return response.data;
  },

  downloadResults: async (id) => {
    const response = await axios.get(`${API_BASE}/forecast/download/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
