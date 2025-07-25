const express = require('express');

const app = express();
const port = 3000;

const { weatherRouter } = require('./controllers');

app.use('/weather', weatherRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app; // Export the app for testing purposes