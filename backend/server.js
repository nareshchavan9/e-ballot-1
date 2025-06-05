const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Ensure critical env variables exist
if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error("❌ Missing critical environment variables. Make sure JWT_SECRET and MONGODB_URI are set.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Base route (for health check or Render home page test)
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));

// Health route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

