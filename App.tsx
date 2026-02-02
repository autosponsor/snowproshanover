import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Snowflake, 
  Menu, 
  X, 
  WifiOff,
  Truck,
  Mail,
  ShieldCheck,
  Clock,
  Snowflake as SnowIcon,
  Scale,
  Gavel
} from 'lucide-react';
import { Hero } from './features/landing/Hero';
import { Gallery } from './features/gallery/Gallery';
import { ContactForm } from './features/contact/ContactForm';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cn } from './lib/utils';

const CookieConsent: React.FC = () => {
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

const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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

const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [scrolled, setScrolled] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Simple path-based routing for 404
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIs404(true);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const updateDynamicSEO = async () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) return;
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Hanover Ontario`
        );
        if (response.ok) {
          const data = await response.json();
          const condition = data.current.condition.text.toLowerCase();
          const isSnowing = condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard');
          
          if (isSnowing) {
            document.title = "⚠️ EMERGENCY Snow Removal Hanover | Dispatching NOW | Snow Pros";
          }
        }
      } catch (e) {
        console.warn("SEO weather update skipped or failed");
      }
    };

    updateDynamicSEO();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (is404) {
    return <NotFound />;
  }

  return (
    <ErrorBoundary>
      <div className="relative font-sans text-navy-900 bg-snow-50 selection:bg-brand selection:text-white">
        <CookieConsent />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

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

        <nav className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-dark py-3 translate-y-0 shadow-lg" : "bg-transparent py-6 md:py-8"
        )}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Snowflake className={cn("transition-all duration-500 group-hover:rotate-180", scrolled ? "text-brand" : "text-white")} size={28} />
              <span className="font-display text-xl md:text-2xl font-bold tracking-tighter text-white">
                SNOW<span className="text-brand">PROS</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-10">
              {['Services', 'Gallery', 'Process', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={cn("text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-brand", scrolled ? "text-snow-200" : "text-white/80")}>
                  {item}
                </a>
              ))}
              <a href="#contact" className="bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl">Request Quote</a>
            </div>
            <button className="md:hidden p-2 rounded-xl glass text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <main>
          <Hero />
          <section id="services" className="py-20 md:py-32 px-6 bg-snow-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                <div className="max-w-2xl">
                  <span className="text-brand font-black tracking-[0.3em] uppercase text-[10px]">Excellence in Service</span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-none">Complete Winter <br/><span className="text-brand">Protection.</span></h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Truck className="text-brand" />, title: 'Residential Plowing', desc: 'Prompt driveway clearing within 4 hours. We prioritize Hanover Heights.' },
                  { icon: <Clock className="text-brand" />, title: 'Emergency Response', desc: '24/7 Priority clearing for medical or essential access requests.' },
                  { icon: <ShieldCheck className="text-brand" />, title: 'Salting & Traction', desc: 'Premium ice management using concrete-safe agents.' }
                ].map((service, i) => (
                  <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} className="bg-white p-10 rounded-[2.5rem] border border-snow-100 shadow-sm hover:shadow-2xl transition-all">
                    <div className="w-16 h-16 bg-snow-50 rounded-2xl flex items-center justify-center mb-8">{service.icon}</div>
                    <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          <Gallery />
          <section id="contact" className="py-20 md:py-32 px-6 relative overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
              <img src="https://i.ytimg.com/vi/ERrg_QkATwg/maxresdefault.jpg" className="w-full h-full object-cover" alt="Background" loading="lazy" />
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
                    <a href="mailto:matthew.s.danielson@gmail.com" className="text-lg font-display font-bold text-white hover:text-brand break-all">matthew.s.danielson@gmail.com</a>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="bg-navy-950 py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center gap-2">
              <Snowflake className="text-brand" size={24} />
              <span className="font-display text-2xl font-bold text-white tracking-tighter">SNOW<span className="text-brand">PROS</span></span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setIsPrivacyOpen(true)} className="text-snow-100/40 text-[10px] uppercase font-bold tracking-widest hover:text-brand transition-colors">Privacy Policy</button>
              <button onClick={() => setIsTermsOpen(true)} className="text-snow-100/40 text-[10px] uppercase font-bold tracking-widest hover:text-brand transition-colors">Terms of Service</button>
            </div>
            <p className="text-snow-100/20 text-[10px] uppercase font-bold tracking-widest">© 2024 Snow Pros Hanover. Fully Insured & WSIB Compliant.</p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;