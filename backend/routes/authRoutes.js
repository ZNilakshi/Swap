const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  // Send JWT token to frontend or redirect with query
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
});

module.exports = router;
