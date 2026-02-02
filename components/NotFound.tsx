import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Home, MapPinOff } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 opacity-10 pointer-events-none"
      >
        <Snowflake size={300} className="text-white" />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-brand/20 p-8 rounded-[2rem] inline-block mb-8 border border-brand/30"
        >
          <MapPinOff className="text-brand" size={64} />
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
          Lost in the <span className="text-brand italic">Storm?</span>
        </h1>
        <p className="text-snow-100/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12">
          The path you're looking for has been buried under a drift. Let's get you back to the main road.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="px-10 py-5 bg-brand text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl"
          >
            <Home size={16} /> Return Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:6474500225"
            className="px-10 py-5 glass text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 border border-white/20"
          >
            Contact Dispatch
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="text-snow-100/20 text-[10px] font-black uppercase tracking-[0.4em]">Error 404: Path Not Found</span>
      </div>
    </div>
  );
};