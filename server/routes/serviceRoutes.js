const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Services route operational" });
});

module.exports = router; // <-- CRITICAL: Must export router