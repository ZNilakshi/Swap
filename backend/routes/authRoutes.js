const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const auth = require('../middleware/auth');
const TransferRequest = require('../models/TransferRequest'); // You'll need to cre
router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
});

router.post('/transfer-requests', auth, async (req, res) => {
  try {
    const { 
      currentSchool, 
      currentDistrict,
      preferredDistrict,
      // ... other fields
    } = req.body;

    const newRequest = await TransferRequest.create({
      user: req.user, // From auth middleware
      currentSchool,
      currentDistrict,
      preferredDistrict,
      // ... other fields
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's transfer requests
router.get('/transfer-requests', auth, async (req, res) => {
  try {
    const requests = await TransferRequest.find({ user: req.user });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;