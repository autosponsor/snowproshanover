/**
 * Weather API Service
 * Centralized API calls for weather data with proper error handling
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

interface OWMCurrentResponse {
  main: { temp: number };
  weather: Array<{ main: string; icon: string; description: string }>;
}

interface OWMForecastResponse {
  list: Array<{
    dt: number;
    main: { temp: number };
    weather: Array<{ icon: string; description: string }>;
  }>;
}

/**
 * Get API key from environment variables
 */
function getWeatherApiKey(): string | null {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();
  return apiKey ? apiKey : null;
}

/**
 * Validate API key is available
 */
function validateApiKey(): void {
  if (!getWeatherApiKey()) {
    throw new Error('Weather API key not configured. Set VITE_WEATHER_API_KEY environment variable.');
  }
}

/**
 * Parse OpenWeatherMap current weather response
 */
function parseCurrentWeather(data: OWMCurrentResponse): WeatherData {
  const weather = data.weather[0];
  if (!weather) {
    throw new APIError('Invalid weather data format');
  }

  return {
    temperature: Math.round(data.main.temp),
    condition: weather.main,
    icon: weather.icon,
    description: weather.description,
  };
}

/**
 * Parse OpenWeatherMap forecast response
 */
function parseForecast(data: OWMForecastResponse): ForecastItem[] {
  if (!data.list || data.list.length === 0) {
    throw new APIError('Invalid forecast data format');
  }

  // Return forecast for 24h, 48h, and 72h from now
  return [
    data.list[7] || data.list[data.list.length - 1],
    data.list[15] || data.list[data.list.length - 1],
    data.list[23] || data.list[data.list.length - 1],
  ].map((item) => ({
    timestamp: item.dt,
    temperature: Math.round(item.main.temp),
    icon: item.weather[0]?.icon || '',
    description: item.weather[0]?.description || '',
  }));
}

/**
 * Check if the weather condition indicates snow/hazardous conditions
 */
export function isSnowCondition(condition: string): boolean {
  const snowConditions = ['snow', 'ice', 'blizzard', 'sleet', 'freezing rain'];
  return snowConditions.some((c) => condition.toLowerCase().includes(c));
}

/**
 * Get current weather for a city
 */
export async function getCurrentWeather(city: string): Promise<WeatherData> {
  validateApiKey();

  const apiKey = getWeatherApiKey();
  if (!apiKey) throw new Error('API key missing');

  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new APIError(
          `Weather API error: ${response.statusText}`,
          response.status
        );
      }

      const data = (await response.json()) as OWMCurrentResponse;
      return parseCurrentWeather(data);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new NetworkError(
        'Failed to fetch weather data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  });
}

/**
 * Get weather forecast for a city
 */
export async function getForecast(city: string): Promise<ForecastItem[]> {
  validateApiKey();

  const apiKey = getWeatherApiKey();
  if (!apiKey) throw new Error('API key missing');

  return retryWithBackoff(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new APIError(
          `Weather API error: ${response.statusText}`,
          response.status
        );
      }

      const data = (await response.json()) as OWMForecastResponse;
      return parseForecast(data);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new NetworkError(
        'Failed to fetch forecast data',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  });
}

/**
 * Get both current weather and forecast in parallel
 */
export async function getWeatherData(
  city: string
): Promise<{ current: WeatherData; forecast: ForecastItem[] }> {
  const [current, forecast] = await Promise.all([
    getCurrentWeather(city),
    getForecast(city),
  ]);

  return { current, forecast };
}
