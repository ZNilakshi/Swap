const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const Review = require('./models/Review');
const TransferRequest = require('./models/TransferRequest');

// ✅ Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://swap-ayoh.vercel.app',
  'https://www.swap-ayoh.vercel.app',
];

// ✅ Log incoming origin for debugging
app.use((req, res, next) => {
  console.log('🔍 Request from origin:', req.headers.origin);
  next();
});

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

// ✅ Parse incoming JSON
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Test route for connectivity
app.get('/test', (req, res) => {
  res.json({ message: '✅ Backend is live & CORS is working!' });
});

// ✅ Routes
app.post('/api/transfer-requests', async (req, res) => {
  try {
    const newRequest = new TransferRequest(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

app.get('/api/transfer-requests', async (req, res) => {
  try {
    const requests = await TransferRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const review = new Review({
    name: req.body.name,
    rating: req.body.rating,
    comment: req.body.comment,
    avatar: req.body.avatar
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
