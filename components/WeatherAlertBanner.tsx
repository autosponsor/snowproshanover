import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface CurrentWeatherResponse {
  main?: { temp?: number };
}

export const WeatherAlertBanner: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const checkWeather = async (): Promise<void> => {
      try {
        const response = await fetch('/.netlify/functions/weather?city=Hanover%2CCA', {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as CurrentWeatherResponse;
        if (typeof data.main?.temp === 'number') {
          setTemp(data.main.temp);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.warn('Weather alert check failed', error);
        }
      }
    };

    void checkWeather();
    return () => controller.abort();
  }, []);

  return (
    <AnimatePresence>
      {temp !== null && temp <= 0 && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-brand text-white w-full z-50 relative overflow-hidden shadow-md border-b border-black/10"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-center">
            <AlertTriangle size={18} className="animate-pulse flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase">
              Freezing Alert ({Math.round(temp)}°C) - Hanover Priority Dispatch is Active. 
              <a href="#contact" className="underline ml-2 hover:text-navy-900 transition-colors">Request Service Now</a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
