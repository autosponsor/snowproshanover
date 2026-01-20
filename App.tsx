import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Snowflake, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Menu, 
  X, 
  WifiOff,
  Truck,
  Mail,
  Camera,
  CircleDollarSign,
  ReceiptText,
  Wallet,
  ClipboardList,
  UserCheck,
  Snowflake as SnowIcon
} from 'lucide-react';
import { Hero } from './features/landing/Hero';
import { Gallery } from './features/gallery/Gallery';
import { ContactForm } from './features/contact/ContactForm';
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
          className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto p-10 rounded-[3rem] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">Privacy <span className="text-brand">Policy</span></h2>
              <button onClick={onClose} className="p-2 glass rounded-full text-white hover:text-brand">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6 text-snow-100/70 text-sm leading-relaxed">
              <p>At Snow Pros Hanover, we respect your privacy. This policy outlines how we handle the information you provide when requesting a quote.</p>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">1. Data Collection</h4>
              <p>We collect your name, phone number, and Hanover address solely for the purpose of providing snow removal services. We do not sell or share this data with third parties.</p>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">2. Photo Documentation</h4>
              <p>As part of our Precision Guarantee, we take photos of work completed. These are stored securely and used only for quality verification and billing disputes.</p>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs">3. Your Rights</h4>
              <p>You can request to have your contact information removed from our dispatch records at any time after service completion by emailing our office.</p>
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

  // Dynamic SEO Effect
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const updateDynamicSEO = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=432e73bbfd1d41b7b1841248261901&q=Hanover Ontario`
        );
        if (response.ok) {
          const data = await response.json();
          const condition = data.current.condition.text.toLowerCase();
          const isSnowing = condition.includes('snow') || condition.includes('ice') || condition.includes('blizzard');
          
          const metaDesc = document.querySelector('meta[name="description"]');
          if (isSnowing) {
            document.title = "⚠️ EMERGENCY Snow Removal Hanover | Crews Dispatching | Snow Pros";
            if (metaDesc) metaDesc.setAttribute('content', 'SNOW ALERT HANOVER: Emergency plowing crews are active now. Priority residential driveway clearing within 4 hours. Call (647) 450-0225 for immediate service.');
          } else {
            document.title = "Top-Rated Snow Removal Hanover ON | Professional Plowing & Salting";
            if (metaDesc) metaDesc.setAttribute('content', 'Hanover Ontario\'s #1 reliable snow removal service. Residential and commercial plowing, salting, and 24/7 winter maintenance. Request your seasonal quote today.');
          }
        }
      } catch (e) {
        console.error("SEO weather update failed", e);
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

  return (
    <ErrorBoundary>
      <div className="relative font-sans text-navy-900 bg-snow-50 selection:bg-brand selection:text-white">
        <CookieConsent />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

        {/* Offline Banner */}
        <AnimatePresence>
          {isOffline && (
            <motion.div 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-0 left-0 right-0 z-[100] bg-brand text-white p-4 flex items-center justify-center gap-3 shadow-2xl"
            >
              <WifiOff size={20} className="animate-pulse" />
              <span className="text-sm font-bold tracking-wide text-center">YOU ARE OFFLINE. CALL FOR URGENT SERVICE: <a href="tel:6474500225" className="underline font-black">(647) 450-0225</a></span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-dark py-3 translate-y-0 shadow-lg" : "bg-transparent py-6 md:py-8"
        )}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Snowflake className={cn(
                "transition-all duration-500 group-hover:rotate-180",
                scrolled ? "text-brand" : "text-white"
              )} size={28} />
              <span className="font-display text-xl md:text-2xl font-bold tracking-tighter text-white">
                SNOW<span className="text-brand">PROS</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {['Services', 'Gallery', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-brand",
                    scrolled ? "text-snow-200" : "text-white/80"
                  )}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact"
                className="bg-brand hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl hover:shadow-brand/20 active:scale-95"
              >
                Request Quote
              </a>
            </div>

            <button 
              className="md:hidden p-2 rounded-xl glass text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="fixed inset-0 z-40 bg-navy-950/90 md:hidden"
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-full md:w-4/5 bg-navy-900 p-10 flex flex-col justify-center"
              >
                <div className="flex flex-col gap-8 md:gap-10">
                  {['Services', 'Gallery', 'About', 'Contact'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl md:text-4xl font-display font-bold text-white hover:text-brand transition-colors tracking-tight"
                    >
                      {item}
                    </a>
                  ))}
                  <div className="h-px bg-white/10 w-full my-4" />
                  <a href="tel:6474500225" className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Emergency Line</span>
                    <span className="text-xl md:text-2xl font-bold text-brand flex items-center gap-3">
                      <Phone size={20} /> (647) 450-0225
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <Hero />
          
          <section id="services" className="py-20 md:py-32 px-6 bg-snow-50 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-8">
                <div className="max-w-2xl">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-brand font-black tracking-[0.3em] uppercase text-[10px]"
                  >
                    Excellence in Service
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-display font-bold mt-4 leading-none"
                  >
                    Complete Winter <br/><span className="text-brand">Protection.</span>
                  </motion.h2>
                  <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-[10px] md:text-xs">Exclusively serving Hanover, ON with industrial-grade reliability.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { icon: <Truck className="text-brand" />, title: 'Residential Plowing', desc: 'Prompt driveway clearing within 4 hours of snow completion. We prioritize Hanover Heights and local neighborhoods.' },
                  { icon: <Clock className="text-brand" />, title: 'Emergency Response', desc: '24/7 Service. Our Crew is ready 24/7 to prioritize your driveway in case of emergencies with timely service.' },
                  { icon: <ShieldCheck className="text-brand" />, title: 'Salting & Traction', desc: 'Premium ice management using concrete-safe and pet-friendly melting agents for walkways and stairs.' }
                ].map((service, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-snow-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-snow-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8 relative z-10">
                      {service.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Gallery />

          {/* New "How it Works" Process Section */}
          <section id="process" className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-12 md:mb-20">
                <span className="text-brand font-black tracking-[0.4em] uppercase text-[10px]">Simple & Transparent</span>
                <h2 className="text-3xl md:text-6xl font-display font-bold mt-4">The Snow Pros <span className="text-brand">Process.</span></h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
                {[
                  { icon: <ClipboardList size={20} />, step: "01", title: "Request Quote", desc: "Use our form or call us to get a estimate for your Hanover property." },
                  { icon: <SnowIcon size={20} />, step: "02", title: "Snow Event", desc: "Our team monitors Hanover weather 24/7. When snow hits, we dispatch." },
                  { icon: <Camera size={20} />, step: "03", title: "Precision Clear", desc: "Driveway is cleared professionally. We take before and after photos." },
                  { icon: <UserCheck size={20} />, step: "04", title: "Verify & Pay", desc: "Review the work. Payment is processed after your absolute satisfaction." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-snow-50 border border-snow-100 flex flex-col items-center text-center group hover:bg-navy-900 transition-all duration-500"
                  >
                    <div className="text-brand mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-2xl shadow-sm group-hover:bg-brand group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black text-brand tracking-widest mb-2">{item.step}</span>
                    <h3 className="text-lg md:text-xl font-display font-bold mb-3 md:mb-4 group-hover:text-white">{item.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed group-hover:text-snow-100/60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 md:py-32 px-6 relative overflow-hidden min-h-[800px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhr4B7bqtVPOISaADTYGY2uBQ49_74EoXTA_biLE0EKZvx8SETuqNpHk15EGik8EuLGGBz6OFIqptKOrqFWIg8xEhczItE1Fv_fCrnCaC_ETaQybyMZS471-yAUDeaSjBUJcnxhOJcf5oee2tT3j7zghrytRUCoQydmd1PM3_GF1ejKYPnERBO9by5ZkHCt/s1320/614255840_888667230334505_5132184906097328970_n.png" 
                alt="Snow removal truck background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center relative z-20 w-full">
              <div>
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
                  <span className="text-brand font-black tracking-[0.4em] uppercase text-[10px] mb-4 md:mb-6 block">Ready for the storm</span>
                  <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 md:mb-10 leading-[0.9]">
                    Let Us Clear <br/><span className="text-ice">The Path.</span>
                  </h2>
                </motion.div>
                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-5 md:gap-6 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-2xl flex items-center justify-center border border-white/10">
                      <Phone size={20} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Direct Line</p>
                      <a href="tel:6474500225" className="text-xl md:text-2xl font-display font-bold text-white hover:text-brand transition-colors tracking-tight">(647) 450-0225</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 md:gap-6 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-2xl flex items-center justify-center border border-white/10">
                      <Mail size={20} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Email Dispatch</p>
                      <a href="mailto:matthew.s.danielson@gmail.com" className="text-base md:text-lg font-display font-bold text-white hover:text-brand transition-colors break-all tracking-tight">matthew.s.danielson@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="bg-navy-950 py-16 md:py-20 px-6 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Snowflake className="text-brand" size={24} />
                  <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tighter">
                    SNOW<span className="text-brand">PROS</span>
                  </span>
                </div>
                <p className="text-snow-100/40 text-sm max-w-sm leading-relaxed">
                  Exclusively serving Hanover, ON with industrial-grade reliability. Your premier local solution for all winter maintenance needs.
                </p>
              </div>
              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col gap-4">
                  <span className="text-white text-xs font-black uppercase tracking-widest">Explore</span>
                  <a href="#services" className="text-snow-100/40 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Services</a>
                  <a href="#gallery" className="text-snow-100/40 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Our Work</a>
                  <button onClick={() => setIsPrivacyOpen(true)} className="text-snow-100/40 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest text-left">Privacy Policy</button>
                </div>
              </div>
            </div>
            <div className="h-px bg-white/5 w-full mb-8" />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-snow-100/20 text-[10px] uppercase font-bold tracking-[0.2em] text-center">
              <p>© 2024 Snow Pros Hanover. Fully Insured & WSIB Compliant.</p>
              <p>Designed for the Hanover Winter.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;