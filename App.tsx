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
  CreditCard,
  Wallet
} from 'lucide-react';
import { Hero } from './features/landing/Hero';
import { Gallery } from './features/gallery/Gallery';
import { ContactForm } from './features/contact/ContactForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);

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
              <span className="text-sm font-bold tracking-wide">YOU ARE OFFLINE. CALL FOR URGENT SERVICE: <a href="tel:6474500225" className="underline font-black">(647) 450-0225</a></span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass-dark py-3 translate-y-0 shadow-lg" : "bg-transparent py-8"
        )}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Snowflake className={cn(
                "transition-all duration-500 group-hover:rotate-180",
                scrolled ? "text-brand" : "text-white"
              )} size={32} />
              <span className="font-display text-2xl font-bold tracking-tighter text-white">
                SNOW<span className="text-brand">PROS</span>
              </span>
            </div>

            {/* Desktop Nav */}
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

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-3 rounded-xl glass text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                className="absolute right-0 top-0 bottom-0 w-4/5 bg-navy-900 p-10 flex flex-col justify-center"
              >
                <div className="flex flex-col gap-10">
                  {['Services', 'Gallery', 'About', 'Contact'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl font-display font-bold text-white hover:text-brand transition-colors tracking-tight"
                    >
                      {item}
                    </a>
                  ))}
                  <div className="h-px bg-white/10 w-full my-4" />
                  <a 
                    href="tel:6474500225"
                    className="flex flex-col gap-2"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">Emergency Line</span>
                    <span className="text-2xl font-bold text-brand flex items-center gap-3">
                      <Phone size={24} /> (647) 450-0225
                    </span>
                  </a>
                  <a 
                    href="mailto:matthew.s.danielson@gmail.com"
                    className="flex flex-col gap-2"
                  >
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">Inquiries</span>
                    <span className="text-sm font-bold text-snow-200 flex items-center gap-3">
                      <Mail size={18} /> matthew.s.danielson@gmail.com
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <Hero />
          
          {/* Features Section */}
          <section id="services" className="py-32 px-6 bg-snow-50 relative overflow-hidden">
            {/* Subtle Gradient decoration */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
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
                </div>
                <div className="hidden lg:block w-32 h-1 bg-snow-200 mb-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: <Truck className="text-brand" />, 
                    title: 'Residential Plowing', 
                    desc: 'Prompt driveway clearing within 4 hours of snow completion. We prioritize Hanover Heights and local neighborhoods.' 
                  },
                  { 
                    icon: <Clock className="text-brand" />, 
                    title: 'Emergency Response', 
                    desc: '24/7 Service. Our Crew is ready 24/7 to prioritize your driveway in case of emergencies with timely service.' 
                  },
                  { 
                    icon: <ShieldCheck className="text-brand" />, 
                    title: 'Salting & Traction', 
                    desc: 'Premium ice management using concrete-safe and pet-friendly melting agents for walkways and stairs.' 
                  }
                ].map((service, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-[2.5rem] border border-snow-100 shadow-sm hover:shadow-2xl hover:shadow-navy-900/5 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-bl-[4rem] group-hover:bg-brand/10 transition-colors" />
                    <div className="w-16 h-16 bg-snow-50 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Gallery />

          {/* Service Guarantee & Payment Section */}
          <section className="py-24 px-6 bg-snow-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Documentation Guarantee */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] p-10 border border-snow-200 flex flex-col md:flex-row items-center gap-8 shadow-sm"
                >
                  <div className="w-20 h-20 bg-brand/5 rounded-3xl flex items-center justify-center shrink-0">
                    <Camera className="text-brand" size={36} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">Our Precision Guarantee</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We take before and after photos of every job and only ask for payment once the job is complete. Your satisfaction is documented and guaranteed.
                    </p>
                  </div>
                </motion.div>

                {/* Payment Options */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-navy-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center shrink-0">
                    <CircleDollarSign className="text-brand" size={36} />
                  </div>
                  <div className="w-full">
                    <h3 className="text-2xl font-display font-bold mb-4 tracking-tight text-white">Flexible Payments</h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: <Wallet size={14} />, label: "Cash" },
                        { icon: <ShieldCheck size={14} />, label: "E-Transfer" },
                        { icon: <ReceiptText size={14} />, label: "Invoice for Credit/Debit" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                          <span className="text-brand">{item.icon}</span>
                          <span className="text-xs font-bold text-snow-100 uppercase tracking-widest">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 px-6 relative overflow-hidden min-h-[800px] flex items-center">
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhr4B7bqtVPOISaADTYGY2uBQ49_74EoXTA_biLE0EKZvx8SETuqNpHk15EGik8EuLGGBz6OFIqptKOrqFWIg8xEhczItE1Fv_fCrnCaC_ETaQybyMZS471-yAUDeaSjBUJcnxhOJcf5oee2tT3j7zghrytRUCoQydmd1PM3_GF1ejKYPnERBO9by5ZkHCt/s1320/614255840_888667230334505_5132184906097328970_n.png" 
                alt="Snow removal truck background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
            </div>

            {/* Drifting Snow Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-10">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: -20,
                    opacity: Math.random() * 0.5 + 0.3
                  }}
                  animate={{ 
                    y: "110%",
                    x: `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`
                  }}
                  transition={{ 
                    duration: 15 + Math.random() * 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 15
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20 w-full">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <span className="text-brand font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Ready for the storm</span>
                  <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-10 leading-[0.9]">
                    Let Us Clear <br/><span className="text-ice">The Path.</span>
                  </h2>
                </motion.div>
                <p className="text-snow-100/70 text-lg mb-12 max-w-md leading-relaxed">
                  Don't let the Hanover winter interrupt your schedule. Get a guaranteed clearing spot today.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-brand/20 transition-all border border-white/10">
                      <Phone size={24} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Direct Line</p>
                      <a href="tel:6474500225" className="text-2xl font-display font-bold text-white hover:text-brand transition-colors">(647) 450-0225</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-brand/20 transition-all border border-white/10">
                      <Mail size={24} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Email Dispatch</p>
                      <a href="mailto:matthew.s.danielson@gmail.com" className="text-lg font-display font-bold text-white hover:text-brand transition-colors break-all">matthew.s.danielson@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-brand/20 transition-all border border-white/10">
                      <MapPin size={24} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">HQ Location</p>
                      <p className="text-2xl font-display font-bold text-white">Hanover, Ontario</p>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="bg-navy-950 py-20 px-6 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Snowflake className="text-brand" size={28} />
                  <span className="font-display text-2xl font-bold text-white tracking-tighter">
                    SNOW<span className="text-brand">PROS</span>
                  </span>
                </div>
                <p className="text-snow-100/40 text-sm max-w-xs leading-relaxed">
                  Hanover's premium snow removal solution. Serving Hanover exclusively with industrial-grade reliability.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div className="flex flex-col gap-4">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Navigation</span>
                  <a href="#services" className="text-snow-100/40 hover:text-white transition-colors text-sm">Services</a>
                  <a href="#gallery" className="text-snow-100/40 hover:text-white transition-colors text-sm">Gallery</a>
                  <a href="#contact" className="text-snow-100/40 hover:text-white transition-colors text-sm">Quote</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Contact</span>
                  <a href="tel:6474500225" className="text-snow-100/40 hover:text-white transition-colors text-sm">(647) 450-0225</a>
                  <a href="mailto:matthew.s.danielson@gmail.com" className="text-snow-100/40 hover:text-white transition-colors text-sm">Email Us</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Legal</span>
                  <a href="#" className="text-snow-100/40 hover:text-white transition-colors text-sm">Privacy Policy</a>
                  <a href="#" className="text-snow-100/40 hover:text-white transition-colors text-sm">Terms</a>
                </div>
              </div>
            </div>
            
            <div className="h-px bg-white/5 w-full mb-8" />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-snow-100/20 text-[10px] uppercase font-bold tracking-[0.2em]">
              <p>© 2024 Snow Pros Hanover. Fully Insured & WSIB Compliant.</p>
              <p>Designed for the Hanover Winter.</p>
            </div>
          </div>
        </footer>

        {/* Sticky Mobile CTA - Optimized for Thumb Access */}
        <div className="md:hidden fixed bottom-8 left-6 right-6 z-50">
          <motion.a 
            whileTap={{ scale: 0.95 }}
            href="tel:6474500225"
            className="flex items-center justify-center gap-4 w-full bg-brand py-5 rounded-[1.5rem] text-white font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(249,115,22,0.3)] border border-brand-hover/50"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Phone size={16} />
            </div>
            Emergency Dispatch
          </motion.a>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;