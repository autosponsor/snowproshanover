/**
 * Weather data client.
 *
 * Provider credentials remain in the Netlify function; the browser only talks
 * to the same-origin weather endpoint.
 */
import { APIError, NetworkError } from './errors';
import { retryWithBackoff } from './retryPolicy';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  description: string;
}

export interface ForecastItem {
  timestamp: number;
  temperature: number;
  icon: string;
  description: string;
}

interface OWMWeather {
  main?: string;
  icon?: string;
  description?: string;
}

interface OWMCurrentResponse {
  main?: { temp?: number };
  weather?: OWMWeather[];
}

interface OWMForecastEntry {
  dt?: number;
  main?: { temp?: number };
  weather?: OWMWeather[];
}

interface OWMForecastResponse {
  list?: OWMForecastEntry[];
}

function weatherEndpoint(city: string, forecast = false): string {
  const params = new URLSearchParams({ city });
  if (forecast) params.set('forecast', 'true');
  return `/.netlify/functions/weather?${params.toString()}`;
}

async function requestWeather<T>(city: string, forecast = false): Promise<T> {
  const response = await fetch(weatherEndpoint(city, forecast));
  if (!response.ok) {
    throw new APIError(`Weather API error: ${response.statusText}`, response.status);
  }
  return (await response.json()) as T;
}

function parseCurrentWeather(data: OWMCurrentResponse): WeatherData {
  const weather = data.weather?.[0];
  const temperature = data.main?.temp;

  if (!weather || typeof temperature !== 'number' || !weather.main || !weather.icon || !weather.description) {
    throw new APIError('Invalid weather data format');
  }

  return {
    temperature: Math.round(temperature),
    condition: weather.main,
    icon: weather.icon,
    description: weather.description,
  };
}

function parseForecast(data: OWMForecastResponse): ForecastItem[] {
  const entries = data.list ?? [];
  const fallback = entries[entries.length - 1];
  if (!fallback) {
    throw new APIError('Invalid forecast data format');
  }

  return [7, 15, 23].map((index) => {
    const entry = entries[index] ?? fallback;
    const weather = entry.weather?.[0];
    const temperature = entry.main?.temp;

    if (typeof entry.dt !== 'number' || typeof temperature !== 'number' || !weather) {
      throw new APIError('Invalid forecast data format');
    }

    return {
      timestamp: entry.dt,
      temperature: Math.round(temperature),
      icon: weather.icon ?? '',
      description: weather.description ?? '',
    };
  });
}

function toNetworkError(message: string, error: unknown): NetworkError {
  return new NetworkError(message, error instanceof Error ? error : new Error(String(error)));
}

export function isSnowCondition(condition: string): boolean {
  const snowConditions = ['snow', 'ice', 'blizzard', 'sleet', 'freezing rain'];
  return snowConditions.some((value) => condition.toLowerCase().includes(value));
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  return retryWithBackoff(async () => {
    try {
      return parseCurrentWeather(await requestWeather<OWMCurrentResponse>(city));
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw toNetworkError('Failed to fetch weather data', error);
    }
  });
}

export async function getForecast(city: string): Promise<ForecastItem[]> {
  return retryWithBackoff(async () => {
    try {
      return parseForecast(await requestWeather<OWMForecastResponse>(city, true));
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw toNetworkError('Failed to fetch forecast data', error);
    }
  });
}

export async function getWeatherData(
  city: string,
): Promise<{ current: WeatherData; forecast: ForecastItem[] }> {
  const [current, forecast] = await Promise.all([getCurrentWeather(city), getForecast(city)]);
  return { current, forecast };
}
