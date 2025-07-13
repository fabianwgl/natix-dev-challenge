const weatherConditions = ['Clear', 'Cloudy', 'Rain', 'Fog', 'Windy', 'Snow'];

// Track all requests globally
let requestTimestamps = [];

// Cache to store weather data and avoid recalculating
const cache = {};
// Cache duration (10 minutes)
const CACHE_TTL_MS = 10 * 60 * 1000;

/**
 * Function that calculates and returns mocked weather data for a given city.
 * It simulates a weather service by generating random weather data.
 * It also implements a rate limit of 100 requests per hour and caches the results so that
 * repeated requests for the same city within 10 minutes return the cached data.
 * @param {string} city 
 * @returns mocked weather data for the specified city
 */
function mockWeatherService(city) { // parameter is not used in this mock
  const now = Date.now();

  // Remove requests older than 1 hour
  // Probably its better to use a simple counter that resets every hour
  requestTimestamps = requestTimestamps.filter(ts => now - ts < 3600_000);

  if (requestTimestamps.length >= 100) {
    return {
      error: 'Rate limit exceeded. Max 100 requests per hour.'
    };
  }

    // 2. Check cache for city
  if (cache[city]) {
    const cached = cache[city];
    // If cached data still fresh, return it
    if (now - cached.timestamp < CACHE_TTL_MS) {
      return { result: cached.data};
    }
  }

  // Register the request
  requestTimestamps.push(now);

  // Generate mock weather data
  const result = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    temperature: `${Math.floor(14 + Math.random() * 10)}°C`,
    condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
  }));

    // 5. Cache the new data
  cache[city] = {
    timestamp: now,
    data: result,
  };

  return { result };
}

module.exports = mockWeatherService;
