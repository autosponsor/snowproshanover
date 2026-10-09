import { afterEach, describe, expect, it, vi } from 'vitest';
import { handler } from '../../netlify/functions/weather.js';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  delete process.env.OPENWEATHERMAP_API_KEY;
  vi.restoreAllMocks();
});

describe('weather function', () => {
  it('rejects unsupported locations without calling the provider', async () => {
    process.env.OPENWEATHERMAP_API_KEY = 'test-key';
    global.fetch = vi.fn();
    const response = await handler({ queryStringParameters: { city: 'Elsewhere,CA' } });
    expect(response.statusCode).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns a configuration error when the provider key is absent', async () => {
    const response = await handler({ queryStringParameters: {} });
    expect(response.statusCode).toBe(500);
  });

  it('proxies the allowed forecast request with cached response headers', async () => {
    process.env.OPENWEATHERMAP_API_KEY = 'test-key';
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ list: [] }) });
    const response = await handler({ queryStringParameters: { city: 'Hanover,CA', forecast: 'true' } });
    expect(response.statusCode).toBe(200);
    expect(response.headers['Cache-Control']).toContain('s-maxage=300');
    expect(global.fetch.mock.calls[0][0]).toContain('/forecast?');
  });
});
