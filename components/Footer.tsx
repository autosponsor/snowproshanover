import React from 'react';
import { Snowflake } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-navy-950 py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="flex items-center gap-2">
          <Snowflake className="text-brand" size={24} />
          <span className="font-display text-2xl font-bold text-white tracking-tighter">SNOW<span className="text-brand">PROS</span></span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs">Quick Links</h4>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {['Services', 'Gallery', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-snow-100/60 text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
                {item}
              </a>
            ))}
            <a href="https://www.facebook.com/profile.php?id=61588002715600&sk=mentions" target="_blank" rel="noopener noreferrer" className="text-snow-100/60 text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
              Facebook
            </a>
            <a href="https://share.google/XBEgqWAVAXJnjHdy8" target="_blank" rel="noopener noreferrer" className="text-snow-100/60 text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
              Google
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10 w-full max-w-lg">
          <button onClick={onOpenPrivacy} className="text-snow-100/40 text-[10px] uppercase font-bold tracking-widest hover:text-brand transition-colors">Privacy Policy</button>
          <button onClick={onOpenTerms} className="text-snow-100/40 text-[10px] uppercase font-bold tracking-widest hover:text-brand transition-colors">Terms of Service</button>
        </div>
        <p className="text-snow-100/20 text-[10px] uppercase font-bold tracking-widest text-center">© {new Date().getFullYear()} Snow Pros Hanover. Fully Insured & WSIB Compliant.</p>
      </div>
    </footer>
  );
};
