const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Permits route operational" });
});

module.exports = router; // <-- CRITICAL: Must export router