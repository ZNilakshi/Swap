const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Review = require('./models/Review');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const mongoURI = 'mongodb+srv://olysamarasekara:rUBykBv8QTjImf3L@cluster0.ird1whj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Transfer Request Model
const TransferRequest = mongoose.model('TransferRequest', new mongoose.Schema({
  name: String,
  currentSchool: String,
  currentDistrict: String,
  currentCity: String,
  subjects: [String],
  position: String,
  qualifications: [String],
  grades: [String],
  preferredDistrict: String,
  preferredCity: String,
  preferredReason: String,
  phone: String,
  additionalContact: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

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
// In your server.js or routes file
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));