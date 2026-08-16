import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export const OfflineBanner: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-brand text-white p-4 flex items-center justify-center gap-3 shadow-2xl"
        >
          <WifiOff size={20} className="animate-pulse" />
          <span className="text-sm font-bold tracking-wide">OFFLINE MODE: CALL <a href="tel:6474500225" className="underline font-black">(647) 450-0225</a></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
