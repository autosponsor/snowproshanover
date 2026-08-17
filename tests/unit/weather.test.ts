import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handler } from '../../netlify/functions/weather.js';

const fetchMock = vi.fn();

beforeEach(() => {
  process.env.OPENWEATHERMAP_API_KEY = 'test-key';
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  delete process.env.OPENWEATHERMAP_API_KEY;
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

describe('weather serverless function', () => {
  it('proxies a current-weather request for the approved service area', async () => {
    const current = { main: { temp: -2 }, weather: [{ main: 'Snow', icon: '13d' }] };
    fetchMock.mockResolvedValue({ ok: true, json: async () => current });

    const response = await handler({ queryStringParameters: { city: 'Hanover,CA' } });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(current);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/data/2.5/weather?'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('q=Hanover%2CCA'));
  });

  it('uses the forecast endpoint only when forecast=true is requested', async () => {
    const forecast = { list: [{ dt: 1, main: { temp: -3 }, weather: [{ icon: '13n' }] }] };
    fetchMock.mockResolvedValue({ ok: true, json: async () => forecast });

    const response = await handler({
      queryStringParameters: { city: 'Hanover,CA', forecast: 'true' },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(forecast);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/data/2.5/forecast?'));
  });

  it('rejects locations outside the service-area allowlist before calling the provider', async () => {
    const response = await handler({ queryStringParameters: { city: 'Toronto,CA' } });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({ error: 'Unsupported weather location.' });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
