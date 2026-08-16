import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake as SnowIcon } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('snow-pros-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('snow-pros-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[60] glass-dark p-6 rounded-[2rem] shadow-2xl border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="bg-brand/20 p-2 rounded-xl">
              <SnowIcon size={20} className="text-brand" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-2">Cookie Policy</h4>
              <p className="text-snow-100/60 text-xs leading-relaxed mb-4">
                We use cookies to ensure you get the best experience on our site and to analyze our traffic in Hanover.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={accept}
                  className="flex-1 bg-brand hover:bg-brand-hover text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all"
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 text-snow-100/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
