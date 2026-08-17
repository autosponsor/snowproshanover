/**
 * Schema.org Structured Data Generation
 * Generates JSON-LD schemas for SEO
 */

export interface SchemaConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
}

/**
 * Generate LocalBusiness schema for SnowPros
 */
export function generateLocalBusinessSchema(config: SchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Snow Pros Hanover",
    description: "Professional snow removal and winter property maintenance in Hanover, Ontario",
    url: config.url,
    telephone: "(647) 450-0225",
    email: "snowpros@contractor.net",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hanover",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    priceRange: "$$",
    areaServed: "Hanover, Ontario",
    serviceType: ["Residential Snow Removal", "Commercial Snow Removal", "Emergency Snow Removal"],
    image: config.image || "https://snowproshanover.com/logo.png",
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(config: SchemaConfig & { serviceName: string; price?: string }) {
  return {
    "@context": "https://schema.org/",
    "@type": "Service",
    name: config.serviceName,
    description: config.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Snow Pros Hanover",
      url: config.url,
      telephone: "(647) 450-0225",
    },
    image: config.image,
    ...(config.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "CAD",
        price: config.price,
      },
    }),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(config: SchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snow Pros Hanover",
    url: config.url,
    logo: config.image || "https://snowproshanover.com/logo.png",
    description: config.description,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61588002715600",
      "https://share.google/XBEgqWAVAXJnjHdy8",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(647) 450-0225",
      contactType: "Customer Service",
      email: "snowpros@contractor.net",
    },
  };
}

/**
 * Generate AggregateRating schema
 */
export function generateAggregateRatingSchema(
  config: SchemaConfig & {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  }
) {
  return {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    name: "Snow Pros Hanover",
    image: config.image,
    description: config.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.ratingValue.toString(),
      reviewCount: config.reviewCount.toString(),
      bestRating: (config.bestRating || 5).toString(),
      worstRating: (config.worstRating || 1).toString(),
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbListSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: (index + 1).toString(),
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Inject schema into document head
 */
export function injectSchema(schema: Record<string, unknown>): void {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Inject multiple schemas
 */
export function injectSchemas(schemas: Record<string, unknown>[]): void {
  schemas.forEach((schema) => injectSchema(schema));
}
