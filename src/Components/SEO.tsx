import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  title = "Jyoti Technosoft LLP | Web Development & AI Solutions",
  description = "Top-rated global software development company based in Surat, India. We deliver custom web applications, mobile apps, AI solutions, and digital transformation for clients worldwide.",
  keywords = "jyoti technosoft, global software development company, top rated IT company in surat, web development, mobile app development, AI solutions, custom software engineering",
  image = "https://jyotitechnosoft.com/assets/logo192.png",
  url = "https://jyotitechnosoft.com/",
  type = "website",
  structuredData,
}) => {
  const fullTitle = title.includes("Jyoti Technosoft") ? title : `${title} | Jyoti Technosoft LLP`;
  
  const defaultLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SoftwareCompany", "ProfessionalService"],
        "@id": "https://jyotitechnosoft.com/#organization",
        "name": "Jyoti Technosoft LLP",
        "url": "https://jyotitechnosoft.com/",
        "logo": "https://jyotitechnosoft.com/assets/logo192.png",
        "image": "https://jyotitechnosoft.com/assets/logo192.png",
        "description": "Top-rated global software development company based in Surat, India providing custom web development, mobile app development, AI solutions, and digital transformation for clients worldwide.",
        "telephone": "+919054551083",
        "email": "business@jyotitechnosoft.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rajhans Multiplex, 417, Sumerru Business Corner, Nr. Somchintamani Appt, B/H, Pal Gam",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "postalCode": "395009",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 21.18708,
          "longitude": 72.783051
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "20:00"
          }
        ],
        "hasMap": "https://maps.google.com/?cid=3694582650742197942",
        "sameAs": [
          "https://www.facebook.com/info.jyotitechnosoft/?ref=py_c",
          "https://www.instagram.com/jyoti_technosoft_llp/",
          "https://in.linkedin.com/company/jyoti-technosoft",
          "https://twitter.com/JyotiTechnosoft",
          "https://github.com/Jyoti-Technosoft"
        ],
        "areaServed": [
          {
            "@type": "City",
            "name": "Surat"
          },
          {
            "@type": "State",
            "name": "Gujarat"
          },
          {
            "@type": "Country",
            "name": "India"
          },
          {
            "@type": "Country",
            "name": "United States"
          }
        ],
        "knowsAbout": [
          "Software Development",
          "Web Development",
          "Mobile App Development",
          "Artificial Intelligence",
          "API Integration",
          "Cloud Solutions"
        ]
      }
    ]
  };

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
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultLocalBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
