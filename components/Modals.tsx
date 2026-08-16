import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Gavel, X } from 'lucide-react';

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 custom-scrollbar shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Scale className="text-brand" size={24} />
                  <span className="text-brand font-black uppercase tracking-[0.3em] text-[10px]">Snow Pros Hanover</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Privacy <span className="text-brand">Policy.</span></h2>
              </div>
              <button onClick={onClose} className="p-3 glass rounded-full text-white hover:text-brand transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-8 text-snow-100/70 text-sm md:text-base leading-relaxed">
              <section>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3 border-l-2 border-brand pl-4">1. Commitment to Privacy</h4>
                <p>Snow Pros Hanover is dedicated to protecting the personal information of our clients in the Hanover, ON area. This policy outlines how we collect, store, and safeguard your data in accordance with Canadian privacy standards.</p>
              </section>
              <section>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3 border-l-2 border-brand pl-4">2. Payment Policies</h4>
                <p>Transparency is core to our operations in Hanover. We only request payment once the clearing job is confirmed complete via photo documentation.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 custom-scrollbar shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Gavel className="text-brand" size={24} />
                  <span className="text-brand font-black uppercase tracking-[0.3em] text-[10px]">Snow Pros Hanover</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Terms of <span className="text-brand">Service.</span></h2>
              </div>
              <button onClick={onClose} className="p-3 glass rounded-full text-white hover:text-brand transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-8 text-snow-100/70 text-sm md:text-base leading-relaxed">
              <section>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3 border-l-2 border-brand pl-4">Service Trigger</h4>
                <p>Standard service is triggered when snow accumulation reaches 2 inches (5 cm) as measured at our Hanover dispatch center.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
