import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Phone, CloudSnow, Wind, Thermometer, Calendar } from 'lucide-react';

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    daily_chance_of_snow: number;
    total_snow_cm: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=432e73bbfd1d41b7b1841248261901&q=Hanover Ontario&days=3&aqi=no&alerts=no`
        );
        if (!response.ok) throw new Error('Weather fetch failed');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return (
    <div className="glass-dark p-6 rounded-3xl w-72 animate-pulse h-48 border border-white/10" />
  );

  if (error || !data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-dark p-6 rounded-3xl w-full max-w-[320px] border border-white/10 shadow-2xl relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-colors" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand block mb-1">Current Skies</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-display font-bold text-white tracking-tighter">{Math.round(data.current.temp_c)}°C</span>
              <img src={data.current.condition.icon} alt="condition" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-xs text-snow-100/60 font-medium uppercase tracking-wider">{data.current.condition.text}</p>
          </div>
          <div className="text-right">
            <CloudSnow className="text-brand ml-auto" size={24} />
          </div>
        </div>

        <div className="h-px bg-white/5 w-full mb-6" />

        <div className="grid grid-cols-3 gap-2">
          {data.forecast.forecastday.map((day, i) => {
            const date = new Date(day.date + 'T00:00:00');
            const dayLabel = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            
            return (
              <div key={day.date} className="text-center">
                <span className="text-[9px] font-bold text-white/40 uppercase block mb-2">{dayLabel}</span>
                <div className="bg-white/5 rounded-xl p-2 border border-white/5 hover:bg-white/10 transition-colors">
                  <img src={day.day.condition.icon} alt="icon" className="w-8 h-8 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-white block">{Math.round(day.day.avgtemp_c)}°</span>
                  {day.day.daily_chance_of_snow > 0 && (
                    <div className="mt-1 flex flex-col items-center">
                      <span className="text-[8px] font-black text-brand leading-none">{day.day.daily_chance_of_snow}%</span>
                      <span className="text-[7px] text-white/30 uppercase font-bold tracking-tighter">Snow</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Immersive Background */}
      <motion.div 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-navy-950/40 z-10" />
        <img 
          src="https://i.ytimg.com/vi/ERrg_QkATwg/maxresdefault.jpg" 
          alt="Heavy duty snow removal truck clearing a path" 
          className="w-full h-full object-cover"
        />
        {/* Deep navy vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950/90 z-10" />
      </motion.div>

      {/* Hero Content - Editorial Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-brand" />
              <span className="text-brand font-black uppercase tracking-[0.4em] text-[10px]">
                Hanover exclusively
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-[7rem] lg:text-[8.5rem] font-display font-bold text-white leading-[0.85] tracking-tighter mb-12"
            >
              Unyielding <br/>Against <span className="text-ice italic">Snow.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-10"
            >
              <p className="text-lg md:text-xl text-snow-100/70 max-w-md leading-relaxed font-medium">
                Hanover's most reliable residential and commercial snow clearing partner. Awake and working before the world stirs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="px-10 py-5 bg-brand hover:bg-brand-hover text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
                >
                  Secure Your Spot <ChevronRight size={18} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:6474500225" 
                  className="px-10 py-5 glass hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all border border-white/20"
                >
                  <Phone size={18} /> Call Now
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
             <WeatherWidget />
          </div>
        </div>
      </div>

      {/* Floating Gradient Blob */}
      <div className="absolute top-1/4 -right-24 w-[40rem] h-[40rem] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};