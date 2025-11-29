import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "Jyoti Technosoft LLP - IT Solutions & Software Development",
  description = "Leading IT company providing software development, web development, mobile app development, and digital solutions. Expert team delivering quality solutions.",
  keywords = "IT company, software development, web development, mobile app development, digital solutions, technology services",
  image = "https://jyotitechnosoft.com/assets/logo192.png",
  url = "https://jyotitechnosoft.com",
  type = "website",
  structuredData,
}) => {
  const fullTitle = title.includes("Jyoti Technosoft") ? title : `${title} | Jyoti Technosoft LLP`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jyoti Technosoft LLP" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Jyoti Technosoft LLP" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Structured Data for Organization */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Jyoti Technosoft LLP",
            "url": "https://jyotitechnosoft.com",
            "logo": "https://jyotitechnosoft.com/assets/logo192.png",
            "description": "Leading IT company providing software development, web development, mobile app development, and digital solutions.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://jyotitechnosoft.com/contact"
            },
            "sameAs": [
              "https://www.linkedin.com/company/jyoti-technosoft",
              "https://twitter.com/jyotitechnosoft"
            ],
            "offers": {
              "@type": "Offer",
              "description": "IT Services and Software Development",
              "category": "Technology Services"
            },
            "serviceArea": {
              "@type": "Country",
              "name": "India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "IT Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Software Development"
                  }
                }
              ]
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
