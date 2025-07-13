const weatherConditions = ['Clear', 'Cloudy', 'Rain', 'Fog', 'Windy', 'Snow'];

// Track all requests globally
let requestTimestamps = [];

/**
 * 
 * @param {string} city 
 * @returns mocked weather data for the specified city
 */
function mockWeatherService(city) {
  const now = Date.now();

  // Remove requests older than 1 hour
  requestTimestamps = requestTimestamps.filter(ts => now - ts < 3600_000);

  if (requestTimestamps.length >= 100) {
    return {
      error: 'Rate limit exceeded. Max 100 requests per hour.'
    };
  }

  // Register the request
  requestTimestamps.push(now);

  // Generate mock weather data
  const result = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    temperature: `${Math.floor(14 + Math.random() * 10)}°C`,
    condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
  }));

  return { result };
}

module.exports = mockWeatherService;
