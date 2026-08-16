import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Hero } from './features/landing/Hero';
import { Gallery } from './features/gallery/Gallery';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CookieConsent } from './components/CookieConsent';
import { PrivacyModal, TermsModal } from './components/Modals';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { TrustBanner } from './components/TrustBanner';
import { ServicesSection } from './features/landing/ServicesSection';
import { ContactSection } from './features/contact/ContactSection';
import { OfflineBanner } from './components/OfflineBanner';
import { MobileCallButton, BackToTopButton } from './components/FloatingButtons';
import { useDynamicSEO } from './hooks/useDynamicSEO';
import { TestimonialSlider } from './components/TestimonialSlider';
import { SEOMetadata } from './components/SEOMetadata';

import { WeatherAlertBanner } from './components/WeatherAlertBanner';

const App: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [scrolled, setScrolled] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [is404, setIs404] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { isSnowing } = useDynamicSEO();

  useEffect(() => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIs404(true);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('scroll', handleScroll, { passive: true });

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
    <HelmetProvider>
      <SEOMetadata isSnowing={isSnowing} />
      <ErrorBoundary>
        <div className="relative font-sans text-navy-900 bg-snow-50 selection:bg-brand selection:text-white">
          <WeatherAlertBanner />
          <CookieConsent />
          <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
          <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
          <OfflineBanner isOffline={isOffline} />

          <Navigation scrolled={scrolled} />

          <main>
            <Hero />
            <TrustBanner />
            <ServicesSection />
            <Gallery />
            <TestimonialSlider />
            <ContactSection />
          </main>

          <Footer 
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
          />

          <MobileCallButton />
          <BackToTopButton show={showBackToTop} />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;