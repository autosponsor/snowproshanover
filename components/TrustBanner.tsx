import React from 'react';
import { ShieldCheck, FileCheck, MapPin } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  return (
    <div className="border-y border-white/5 py-8 relative z-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" alt="Snowflake Background" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
      </div>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 relative z-10">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-brand" size={24} />
          <span className="text-white font-bold uppercase tracking-widest text-xs">Fully Insured</span>
        </div>
        <div className="flex items-center gap-3">
          <FileCheck className="text-brand" size={24} />
          <span className="text-white font-bold uppercase tracking-widest text-xs">WSIB Compliant</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-brand" size={24} />
          <span className="text-white font-bold uppercase tracking-widest text-xs">Locally Owned</span>
        </div>
      </div>
    </div>
  );
};
