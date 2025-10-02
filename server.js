const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const cryptoRoutes = require('./routes/crypto');
const numberTheoryRoutes = require('./routes/numberTheory');
const visualizationRoutes = require('./routes/visualization');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection
mongoose.connect('mongodb+srv://valletipooja_db_user:N0mHGts0f0qmBaUI@cluster1.qmwgznn.mongodb.net/cryptography-lab', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Routes
app.use('/api/crypto', cryptoRoutes);
app.use('/api/number-theory', numberTheoryRoutes);
app.use('/api/visualization', visualizationRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
