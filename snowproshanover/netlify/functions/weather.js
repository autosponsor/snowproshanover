const ALLOWED_CITIES = new Set(['Hanover,CA']);
const CACHE_CONTROL = 'public, max-age=60, s-maxage=300, stale-while-revalidate=300';

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': CACHE_CONTROL, Vary: 'Accept-Encoding' },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) return json(500, { error: 'Weather service is not configured.' });

  const parameters = event.queryStringParameters ?? {};
  const city = parameters.city ?? 'Hanover,CA';
  const endpoint = parameters.forecast === 'true' ? 'forecast' : 'weather';
  if (!ALLOWED_CITIES.has(city)) return json(400, { error: 'Unsupported weather location.' });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const searchParameters = new URLSearchParams({ q: city, units: 'metric', appid: apiKey });
    const response = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?${searchParameters}`, { signal: controller.signal });
    if (!response.ok) return json(502, { error: 'Weather provider request failed.' });
    return json(200, await response.json());
  } catch (error) {
    console.error('Weather function failed', { message: error instanceof Error ? error.message : 'unknown' });
    return json(502, { error: 'Weather service is temporarily unavailable.' });
  } finally {
    clearTimeout(timeout);
  }
}
