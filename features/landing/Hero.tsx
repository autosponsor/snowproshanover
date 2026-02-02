import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Phone, CloudSnow } from 'lucide-react';

interface WeatherData {
  current: {
    temp_c: number;
    condition: { text: string; icon: string; };
  };
  forecast: { forecastday: any[]; };
}

const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Hanover Ontario&days=3`
        );
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Weather widget failed to load");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <div className="glass-dark p-6 rounded-[2.5rem] w-80 h-48 animate-pulse" />;
  if (!data) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-[2.5rem] w-80 border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand block mb-1">Live Hanover</span>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-display font-bold text-white">{Math.round(data.current.temp_c)}°C</span>
          <img src={data.current.condition.icon} alt="icon" className="w-10 h-10" />
        </div>
        <div className="h-px bg-white/5 mb-4" />
        <div className="grid grid-cols-3 gap-3">
          {data.forecast.forecastday.map((day: any, i: number) => (
            <div key={i} className="text-center">
              <span className="text-[9px] font-bold text-white/40 block mb-2">{i === 0 ? 'Now' : 'Next'}</span>
              <div className="bg-white/5 rounded-2xl p-2 border border-white/5">
                <img src={day.day.condition.icon} className="w-8 h-8 mx-auto" alt="icon" />
                <span className="text-[10px] font-bold text-white block">{Math.round(day.day.avgtemp_c)}°</span>
              </div>
            </div>
          ))}
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
          src="https://i.ytimg.com/vi/ERrg_QkATwg/maxresdefault.jpg" 
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