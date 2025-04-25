const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Review = require('./models/Review');
const TransferRequest = require('./models/TransferRequest'); 

require('dotenv').config();

const allowedOrigins = [
  'http://localhost:3000',
  'https://swap-ayoh.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => {
      return origin === allowed || 
             origin.includes(allowed.replace('https://', '').replace('http://', ''));
    })) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// API Routes
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

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Trying a different port...`);
      
      
      const newServer = app.listen(0, () => {
        console.log(`New server running on port ${newServer.address().port}`);
      });
    } else {
      console.error(err);
    }
  });