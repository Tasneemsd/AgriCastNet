# AgriCastNet: Unified Deep Forecasting Framework

A comprehensive full-stack application for smart greenhouse microclimate forecasting using advanced deep learning models.

## 🌿 Features

### Frontend (React + Vite)
- **Professional Dashboard UI** with Tailwind CSS
- **Multi-Model Support**: Dense ANN, PLSTM, Transformer, CNN-BiLSTM, WaveNet, XGBoost, TFT
- **Interactive Data Visualization** with Recharts
- **CSV Upload & Processing** with drag-and-drop interface
- **Real-time Results Display** with performance metrics
- **Data Export Functionality** (CSV download)
- **Mobile Responsive Design** with collapsible sidebar

### Backend (Node.js + Express)
- **RESTful API** for forecast processing
- **File Upload Handling** with Multer
- **CSV Data Processing** with validation
- **Mock ML Engine** (ready for real model integration)
- **Result Management** with unique IDs
- **Export Functionality** for forecast results

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Start Frontend (React + Vite)**
   ```bash
   npm install
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

2. **Start Backend (Node.js + Express)**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend API runs on: http://localhost:3001

## 📊 Usage Workflow

1. **Upload Data**: Upload CSV file with microclimate data (temperature, humidity, CO2, light)
2. **Select Model**: Choose from 7 advanced forecasting models
3. **Configure Settings**: Set forecast horizon and prediction intervals
4. **Run Forecast**: Generate predictions using selected model
5. **View Results**: Analyze charts, metrics, and data tables
6. **Export Data**: Download results as CSV for further analysis

## 🔧 CSV Data Format

Required columns in your CSV file:
- `timestamp` (YYYY-MM-DD HH:MM:SS)
- `temperature` (°C)
- `humidity` (%)
- `co2` (ppm)
- `light_intensity` (lux)

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # React components
│   ├── Navbar.jsx      # Top navigation
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── UploadData.jsx  # File upload component
│   ├── ModelSelection.jsx # Model selection form
│   └── Results.jsx     # Results visualization
├── utils/              # Utility functions
│   ├── api.js         # API client
│   └── constants.js   # App constants
└── App.jsx            # Main application
```

### Backend Structure
```
backend/
├── controllers/        # Request handlers
├── routes/            # API route definitions
├── middleware/        # Custom middleware
├── utils/             # Utility functions
└── server.js          # Express server
```

## 🤖 Supported Models

1. **Dense ANN** - Artificial Neural Network with dense layers
2. **PLSTM** - Phased LSTM for irregular time series
3. **Transformer** - Attention-based model for long-range dependencies
4. **CNN-BiLSTM** - Hybrid CNN and bidirectional LSTM
5. **WaveNet** - Dilated convolutional neural network
6. **XGBoost** - Gradient boosting framework
7. **TFT** - Temporal Fusion Transformer

## 🔌 API Endpoints

- `POST /api/forecast` - Run forecast prediction
- `GET /api/forecast/:id` - Get forecast result by ID
- `GET /api/forecast/:id/download` - Download results as CSV
- `GET /api/health` - Health check endpoint

## 🎨 Design Features

- **Research-Grade UI** with professional styling
- **Interactive Charts** with hover effects and tooltips
- **Responsive Design** optimized for all devices
- **Loading States** and progress indicators
- **Error Handling** with user-friendly messages
- **Performance Metrics** visualization

## 🔮 Future Enhancements

- Integration with real deep learning models
- Database storage for results persistence
- User authentication and project management
- Real-time data streaming capabilities
- Advanced visualization options
- Model comparison tools

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.