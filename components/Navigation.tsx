import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      handleMenuClose();
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || isMenuOpen ? "glass-dark py-3 translate-y-0 shadow-lg" : "bg-transparent py-6 md:py-8"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 group cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand rounded-lg p-1"
          aria-label="SnowPros Hanover - Home"
          title="Go to homepage"
        >
          <Snowflake 
            className={cn(
              "transition-all duration-500 group-hover:rotate-180", 
              scrolled || isMenuOpen ? "text-brand" : "text-white"
            )} 
            size={28} 
            aria-hidden="true"
          />
          <span className="font-display text-xl md:text-2xl font-bold tracking-tighter text-white">
            SNOW<span className="text-brand">PROS</span>
          </span>
        </button>
        
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand rounded px-2 py-1",
                scrolled || isMenuOpen ? "text-snow-200" : "text-white/80"
              )}
              aria-current={false}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            aria-label="Request a quote"
          >
            Request Quote
          </a>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-xl glass text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand"
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-navy-950/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl md:hidden"
            role="navigation"
            id="mobile-menu"
            aria-label="Mobile navigation menu"
          >
            {['Services', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={handleMenuClose}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleMenuClose();
                }}
                className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand rounded px-2 py-1 transition-colors block text-center"
                role="menuitem"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={handleMenuClose}
              className="bg-brand hover:bg-brand-hover text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all text-center mt-2 mx-auto w-full max-w-xs block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              role="menuitem"
              aria-label="Request a quote from mobile menu"
            >
              Request Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
