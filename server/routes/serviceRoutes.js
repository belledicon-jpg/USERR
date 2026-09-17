const express = require('express');
const router = express.Router();
const { getServices } = require('../controllers/serviceController');

router.get('/health-services', getServices);

module.exports = router;