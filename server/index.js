const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON payloads safely
app.use(express.json());

// Pass all API queries through our modular router mapping
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Backend server engine listening safely on port ${PORT}`);
});
