const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TransferRequest = require('../models/TransferRequest');

// Create transfer request
router.post('/', auth, async (req, res) => {
  try {
    const transferRequest = await TransferRequest.create({
      ...req.body,
      user: req.user
    });
    res.status(201).json({
      status: 'success',
      data: {
        transferRequest
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});

// Get all transfer requests
router.get('/', auth, async (req, res) => {
  try {
    const transferRequests = await TransferRequest.find();
    res.status(200).json({
      status: 'success',
      results: transferRequests.length,
      data: {
        transferRequests
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;