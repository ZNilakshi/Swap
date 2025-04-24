const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Review = require('./models/Review');
const TransferRequest = require('./models/TransferRequest'); 
require('dotenv').config();

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://swap-ayoh.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Ensure preflight (OPTIONS) requests are handled
app.options('*', cors());

app.use(bodyParser.json());

// ✅ MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// ✅ API Routes

// POST transfer request
app.post('/api/transfer-requests', async (req, res) => {
  try {
    const newRequest = new TransferRequest(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// GET all transfer requests
app.get('/api/transfer-requests', async (req, res) => {
  try {
    const requests = await TransferRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new review
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

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
