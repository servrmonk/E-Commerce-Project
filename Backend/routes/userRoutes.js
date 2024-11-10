// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;