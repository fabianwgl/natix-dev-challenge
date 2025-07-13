const mockWeatherService = require('../services/weatherService');

describe('mockWeatherService', () => {
  beforeEach(() => {
    // Reset any internal state if necessary
    // We can reset the cache and requestTimestamps if exposed or by re-importing
    jest.resetModules(); // This clears module cache, so our module is fresh
  });

  test('returns 24 hourly temperatures and conditions for a city', () => {
    const response = mockWeatherService('Paris');
    expect(response).toHaveProperty('result');
    expect(Array.isArray(response.result)).toBe(true);
    expect(response.result.length).toBe(24);

    response.result.forEach(hourData => {
      expect(hourData).toHaveProperty('hour');
      expect(hourData).toHaveProperty('temperature');
      expect(hourData).toHaveProperty('condition');
    });
  });

  test('caches the result for the same city', () => {
    const firstResponse = mockWeatherService('Berlin');
    const secondResponse = mockWeatherService('Berlin');
    // Should be strictly equal because it’s cached and returned directly
    expect(JSON.stringify(secondResponse)).toBe(JSON.stringify(firstResponse));
  });

  test('respects rate limiting of 100 requests per hour', () => {
    // 3 requests where already made in the beforeEach, so we can make 97 more
    for (let i = 0; i <= 97; i++) {
      const res = mockWeatherService(`city${i}`);
      expect(res).not.toHaveProperty('error');
    }
    // 101st request in an hour should be blocked
    const blocked = mockWeatherService('someCity');
    expect(blocked).toHaveProperty('error');
    expect(blocked.error).toMatch(/Rate limit exceeded/);
  });
});
