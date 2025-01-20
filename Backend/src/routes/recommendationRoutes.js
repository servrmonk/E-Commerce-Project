// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();

// Placeholder route for recommendations
router.get('/', (req, res) => {
  res.json({ message: 'Recommendation engine coming soon!' });
});

module.exports = router;