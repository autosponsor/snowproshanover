import React from 'react';
import { Phone, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileCallButton: React.FC = () => {
  return (
    <a 
      href="tel:6474500225" 
      onClick={() => console.log('Event Tracked: Call Now Button Clicked')}
      className="md:hidden fixed bottom-6 right-6 z-[90] bg-brand hover:bg-brand-hover text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      aria-label="Call Now"
    >
      <Phone size={24} />
    </a>
  );
};

export const BackToTopButton: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[90]"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass-dark hover:bg-white/10 text-white p-3 rounded-full shadow-2xl border border-white/10 transition-transform hover:scale-105 active:scale-95"
            aria-label="Back to Top"
          >
            <ChevronUp size={24} className="text-brand" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
