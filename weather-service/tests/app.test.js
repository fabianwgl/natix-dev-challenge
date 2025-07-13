const request = require('supertest');
const app = require('../index');

describe('GET /weather?city=something', () => {
  beforeEach(() => {
    jest.resetModules(); // Reset internal state (rate limiting, cache)
  });

  test('responds with weather data for a valid city', async () => {
    const res = await request(app).get('/weather?city=London');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveLength(24);
  });

  test('returns cached result for same city within TTL', async () => {
    const res1 = await request(app).get('/weather?city=Madrid');
    const res2 = await request(app).get('/weather?city=Madrid');
    expect(res2.body).toEqual(res1.body);
  });
});
