const express = require('express');
const app = express.Router();

// GET endpoint at '/'
app.get('/', (req, res) => {
    const city = req.query.city || 'London';
  res.send('Hello from Express!');
});


module.exports = app;