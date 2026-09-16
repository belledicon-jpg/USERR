const express = require('express');
const router = express.Router();

// Define quick fallback tests for frontend proxy confirmation
router.get('/health', (req, res) => {
    res.json({ status: "Backend api system up and fully operational" });
});

// Future endpoint mapping slots:
// router.use('/auth', require('./authRoutes'));
// router.use('/permits', require('./permitRoutes'));
// router.use('/services', require('./serviceRoutes'));

module.exports = router;
