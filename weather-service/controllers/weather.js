const express = require('express');
const mockWeatherService = require('../services/weatherService');

const app = express.Router();

app.get('/', (req, res) => {
    try {
        const city = req.query.city || 'London';
        const weatherData = mockWeatherService(city);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;