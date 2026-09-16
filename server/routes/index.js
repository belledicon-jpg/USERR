const express = require('express');
const router = express.Router();

// Import routes directly from the current folder (./)
const authRoutes = require('./authRoutes');
const permitRoutes = require('./permitRoutes');
const serviceRoutes = require('./serviceRoutes');

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: "Backend api system up and fully operational" });
});

// Route Mounting
router.use('/auth', authRoutes);
router.use('/permits', permitRoutes);
router.use('/services', serviceRoutes);

module.exports = router;