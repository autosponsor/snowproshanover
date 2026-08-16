import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WeatherAlertBanner: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const checkWeather = async () => {
      const envKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();
      const apiKey = envKey || '904c1c69a07b07044e3156ced85b6a15';
      if (!apiKey) return;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hanover,CA&units=metric&appid=${apiKey}`
        );
        if (res.ok) {
          const data = await res.json();
          setTemp(data.main.temp);
        }
      } catch (e) {
        console.warn("Weather alert check failed", e);
      }
    };
    checkWeather();
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
