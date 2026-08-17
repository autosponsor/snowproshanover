const ALLOWED_CITIES = new Set(['Hanover,CA']);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'Weather service is not configured.' });
  }

  const parameters = event.queryStringParameters ?? {};
  const city = parameters.city ?? 'Hanover,CA';
  const isForecastRequest = parameters.forecast === 'true';

  if (!ALLOWED_CITIES.has(city)) {
    return json(400, { error: 'Unsupported weather location.' });
  }

  const endpoint = isForecastRequest ? 'forecast' : 'weather';
  const searchParameters = new URLSearchParams({
    q: city,
    units: 'metric',
    appid: apiKey,
  });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/${endpoint}?${searchParameters.toString()}`,
    );

    if (!response.ok) {
      return json(502, { error: 'Weather provider request failed.' });
    }

    return json(200, await response.json());
  } catch (error) {
    console.error('Weather function failed', error);
    return json(502, { error: 'Weather service is temporarily unavailable.' });
  }
}
