// src/routes/dates.js
const express = require('express');
const DateModel = require('../models/Date');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all dates for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const dates = await DateModel.find({ userId: req.user.id });
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new date
router.post('/', authMiddleware, async (req, res) => {
  const { date } = req.body; // Get date from request body

  try {
    // Use userId from req.user set by authMiddleware
    const newDate = new DateModel({
      date,
      userId: req.user._id, // Get user ID from the middleware
      name: req.user.name,   // Get user name from the middleware
    });
    await newDate.save(); // Save the new date to the database
    res.status(201).json(newDate); // Respond with the saved date
  } catch (error) {
    console.error('Error saving date:', error); // Log the error
    res.status(400).json({ message: 'Error saving date' }); // Handle error
  }
});

module.exports = router;
