import React from 'react';
import { Phone, Mail, Briefcase, ArrowRight } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-6 relative overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Snowy road background" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20 w-full">
        <div>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-10 leading-[0.9]">Let Us Clear <br/><span className="text-ice">The Path.</span></h2>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center"><Phone size={20} className="text-brand" /></div>
              <a href="tel:6474500225" className="text-2xl font-display font-bold text-white hover:text-brand transition-colors">(647) 450-0225</a>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center"><Mail size={20} className="text-brand" /></div>
              <a href="mailto:snowpros@contractor.net" className="text-lg font-display font-bold text-white hover:text-brand break-all">snowpros@contractor.net</a>
            </div>
          </div>

          <div className="mt-12 relative overflow-hidden p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80" alt="Snowing background" className="w-full h-full object-cover opacity-20" loading="lazy" />
              <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-md" />
            </div>
            <div className="relative z-10">
              <h3 className="text-white font-display font-bold text-xl mb-3 flex items-center gap-3">
                <Briefcase size={24} className="text-brand" /> Join Our Team
              </h3>
              <p className="text-snow-100/70 text-sm mb-6 leading-relaxed max-w-sm">
                We're expanding our local crew. If you're reliable, hard-working, and want to help keep Hanover safe this winter, we want to hear from you.
              </p>
              <a href="mailto:snowpros@contractor.net?subject=Job Application - SnowPros" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand hover:text-white transition-colors">
                Email Resume <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};
