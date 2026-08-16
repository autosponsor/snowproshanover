import { useEffect, useState } from 'react';

export const useDynamicSEO = () => {
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const updateDynamicSEO = async () => {
      const envKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();
      const apiKey = envKey || '904c1c69a07b07044e3156ced85b6a15';
      if (!apiKey) return;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hanover,CA&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          const condition = data.weather[0]?.main?.toLowerCase() || '';
          setIsSnowing(condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard'));
        }
      } catch (e) {
        console.warn("SEO weather update skipped or failed", e);
      }
    };

    updateDynamicSEO();
  }, []);

  return { isSnowing };
};
