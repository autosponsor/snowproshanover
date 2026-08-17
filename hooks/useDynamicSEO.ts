import { useEffect, useState } from 'react';

export const useDynamicSEO = () => {
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    const updateDynamicSEO = async () => {
      try {
        const response = await fetch('/.netlify/functions/weather?city=Hanover,CA');
        if (response.ok) {
          const data = await response.json();
          const condition = data.weather?.[0]?.main?.toLowerCase() || '';
          setIsSnowing(condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard'));
        }
      } catch (e) {
        console.warn("Weather update skipped or failed", e);
      }
    };

    updateDynamicSEO();
  }, []);

  return { isSnowing };
};
