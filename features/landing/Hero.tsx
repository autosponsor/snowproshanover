import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Phone, CloudSnow } from 'lucide-react';

interface OWMCurrentData {
  main: { temp: number };
  weather: { main: string; icon: string }[];
}

interface OWMForecastItem {
  dt: number;
  main: { temp: number };
  weather: { icon: string }[];
}

const WeatherWidget: React.FC = () => {
  const [current, setCurrent] = useState<OWMCurrentData | null>(null);
  const [forecast, setForecast] = useState<OWMForecastItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch('/.netlify/functions/weather?city=Hanover,CA'),
          fetch('/.netlify/functions/weather?city=Hanover,CA&forecast=true')
        ]);

        if (currentRes.ok) {
          const currentData = await currentRes.json();
          setCurrent(currentData);
        } else {
          setCurrent(null);
        }

        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          if (forecastData.list && forecastData.list.length > 0) {
            setForecast([
              forecastData.list[7] || forecastData.list[forecastData.list.length - 1],
              forecastData.list[15] || forecastData.list[forecastData.list.length - 1],
              forecastData.list[23] || forecastData.list[forecastData.list.length - 1]
            ]);
          } else {
            setForecast(null);
          }
        } else {
          setForecast(null);
        }
      } catch (err) {
        console.error("Weather widget failed to load", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="glass-dark p-6 rounded-[2.5rem] w-80 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 animate-pulse">
          <div className="w-24 h-3 bg-brand/50 rounded-full mb-3" />
          <div className="flex items-center gap-4 mb-5">
            <div className="w-20 h-8 bg-white/20 rounded-full" />
            <div className="w-10 h-10 bg-white/10 rounded-full" />
          </div>
          <div className="h-px bg-white/5 mb-4" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-2 bg-white/20 rounded-full mx-auto mb-3" />
                <div className="bg-white/5 rounded-2xl p-2 border border-white/5 h-[68px] flex flex-col items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-white/10 rounded-full" />
                  <div className="w-6 h-2 bg-white/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (!current || !forecast) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-[2.5rem] w-80 border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 text-center">
          <CloudSnow size={32} className="mx-auto text-white/40 mb-3" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand block mb-2">Weather Widget</span>
          <p className="text-white/60 text-xs">Awaiting API Activation...</p>
        </div>
      </motion.div>
    );
  }

  const currentIcon = current.weather[0]?.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-[2.5rem] w-80 border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand block mb-1">Live Hanover</span>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-display font-bold text-white">{Math.round(current.main.temp)}°C</span>
          {currentIcon && <img src={`https://openweathermap.org/img/wn/${currentIcon}@2x.png`} alt="Current conditions" className="w-10 h-10" />}
        </div>
        <div className="h-px bg-white/5 mb-4" />
        <div className="grid grid-cols-3 gap-3">
          {forecast.map((day: OWMForecastItem, i: number) => {
            const icon = day.weather[0]?.icon;
            return (
              <div key={i} className="text-center">
                <span className="text-[9px] font-bold text-white/40 block mb-2">{i === 0 ? 'Tmrw' : `Day ${i + 2}`}</span>
                <div className="bg-white/5 rounded-2xl p-2 border border-white/5">
                  {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} className="w-8 h-8 mx-auto" alt="Forecast conditions" />}
                  <span className="text-[10px] font-bold text-white block">{Math.round(day.main.temp)}°</span>
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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 250]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy-950/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80" 
          className="w-full h-[120%] object-cover" 
          alt="Heavy duty snow removal truck in Hanover" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950 z-10" />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <span className="text-brand font-black uppercase tracking-[0.5em] text-xs mb-8 block">Hanover Exclusively</span>
            <h1 className="text-5xl md:text-[8.5rem] font-display font-bold text-white leading-[0.85] tracking-tighter mb-12">Unyielding Against <span className="text-ice">Snow.</span></h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-10 py-5 bg-brand text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl">Secure Your Spot <ChevronRight size={16} /></a>
              <a href="tel:6474500225" className="px-10 py-5 glass text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 border border-white/20"><Phone size={16} /> Call Now</a>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <WeatherWidget />
          </div>
        </div>
      </div>
    </section>
  );
};