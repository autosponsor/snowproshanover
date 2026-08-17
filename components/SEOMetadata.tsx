import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  injectSchemas,
} from '../lib/schema';

interface SEOMetadataProps {
  isSnowing?: boolean;
  title?: string;
  description?: string;
  image?: string;
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  isSnowing = false,
  title = "Snow Pros Hanover - Professional Snow Removal & Winter Property Maintenance",
  description = "Expert snow removal services in Hanover, Ontario. Residential & commercial snow clearing, ice management, and emergency winter services. 24/7 dispatch available.",
  image = "https://images.unsplash.com/photo-1516301385458-eb5d252d6a54?auto=format&fit=crop&q=80&w=1200",
}) => {
  useEffect(() => {
    // Inject structured data schemas
    const url = window.location.origin;
    const schemas = [
      generateOrganizationSchema({ title, description, url, image }),
      generateLocalBusinessSchema({ title, description, url, image }),
    ];
    injectSchemas(schemas);
  }, [title, description, image]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="snow removal, snow clearing, winter maintenance, Hanover Ontario, emergency snow removal, commercial snow removal, residential snow removal" />
      <meta name="author" content="Snow Pros Hanover" />

      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />

      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:site_name" content="Snow Pros Hanover" />

      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Theme & Color */}
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />

      {/* Search Engine Optimization */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* Security Headers */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https: *.openweathermap.org;"
      />

      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://api.openweathermap.org" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://api.openweathermap.org" />

      {/* Dynamic Meta: Weather Alert */}
      {isSnowing && (
        <>
          <meta name="weather-alert" content="snow-condition" />
          <meta property="og:description" content={`${description} ⚠️ Active snow event detected - 24/7 emergency dispatch ready.`} />
        </>
      )}
    </Helmet>
  );
};
