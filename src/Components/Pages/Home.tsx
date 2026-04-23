import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Helmet } from 'react-helmet-async';
import HomeWhyUs from "../Pages/HomeWhyUs.tsx";
import OurTechnology from "./shared/OurTechnology.tsx";
import WeOffer from "./shared/WeOffer.tsx";
import WeveBuilt from "./shared/WeveBuilt.tsx";
import OurNewsletter from "./shared/OurNewsletter.tsx";
import IndustryExpertise from "./shared/IndustryExpertise.tsx";
import HowWeWork from "./shared/HowWeWork.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { meetSection } = dataArray?.home;

  // Memoize navigation handler
  const handleContactNavigation = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Web Development & AI Solutions | Jyoti Technosoft LLP</title>
        <meta name="description" content="Expert web development, mobile apps, and AI integration services. Transform your business with custom software solutions, API development, and digital transformation by Jyoti Technosoft LLP." />
        <meta name="keywords" content="web development, mobile app development, AI integration, software solutions, API development, digital transformation, custom software, IT consulting" />
        <meta property="og:title" content="Web Development & AI Solutions | Jyoti Technosoft LLP" />
        <meta property="og:description" content="Expert web development, mobile apps, and AI integration services by Jyoti Technosoft LLP" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotitechnosoft.com/" />
        <meta property="og:image" content="https://jyotitechnosoft.com/assets/logo192.png" />
        <link rel="canonical" href="https://jyotitechnosoft.com/" />
        <script type="application/ld+json">{`
          {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Jyoti Technosoft LLP",
            "url": "https://jyotitechnosoft.com/",
            "logo": "https://jyotitechnosoft.com/assets/logo192.png",
            "description": "Professional web development, mobile app development, and AI integration services",
            "services": [
              {
                "@type": "Service",
                "name": "Web Development",
                "description": "Custom web application development services using modern frameworks"
              },
              {
                "@type": "Service", 
                "name": "Mobile App Development",
                "description": "Native and cross-platform mobile app development"
              },
              {
                "@type": "Service",
                "name": "AI Integration",
                "description": "AI-powered solutions and automation services"
              },
              {
                "@type": "Service",
                "name": "API Development",
                "description": "Custom API development and integration services"
              }
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service"
            }
          }
        `}</script>
      </Helmet>
      <Box>
        <div className="first-section-home">
          {/* Optimized video background with poster for faster LCP */}
          <Box
            component="video"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/assets/video-ai-asset-background.png"
            aria-label="Background video showing Jyoti Technosoft web development and digital solutions"
            className="bg-video"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
              pointerEvents: 'none'
            }}
            onLoadStart={() => {
              setTimeout(() => {
                const video = document.querySelector('.bg-video') as HTMLVideoElement;
                if (video) {
                  video.load();
                }
              }, 1000);
            }}
          >
            <source src="/assets/jyoti-technosoft-web-development.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/assets/captions.vtt"
              srcLang="en"
              label="English captions"
              default
            />
            Your browser does not support the video tag.
          </Box>
          <div id="video-description" className="sr-only">
            Background video showcasing Jyoti Technosoft's expertise in web development, mobile apps, and AI integration services for businesses
          </div>
          <Box className="first-section-home-content" role="main">
            <Typography
              className="first-section-title"
              variant="h1"
              component="h1"
              sx={{
                minHeight: '4rem',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {meetSection?.title || 'Loading...'}
            </Typography>
            <Typography
              className="first-section-description"
              sx={{
                minHeight: '3rem',
                width: '100%',
                maxWidth: '631px',
                margin: '0.6rem auto 2rem'
              }}
            >
              {meetSection?.description || 'Loading...'}
            </Typography>

            <Box sx={{
              display: 'flex',
              gap: 2,
              mt: 4,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button
                variant="contained"
                className="build-together"
                onClick={handleContactNavigation}
                aria-label="Contact us to build your project together"
                sx={{
                  minWidth: { xs: 140, md: 231 },
                  fontSize: { xs: '0.8rem', md: '0.875rem' }
                }}
              >
                LET'S BUILD TOGETHER
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: { xs: "80%", md: "26%" },
              bottom: { xs: "1.5%", md: 30 },
              right: { xs: "auto", md: 40 },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
              zIndex: 1,
              display: "block",
              backgroundImage: 'url("/assets/video-ai-asset-background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              padding: { xs: "10px", md: "20px" },
              color: "#fff",
              border: "1px solid #ffffff",
              textAlign: "left",
            }}
          >
            <Box>
              <Box
                component="img"
                src="/assets/star-img.png"
                alt="Star"
                loading="lazy"
                decoding="async"
                width="30"
                height="30"
                sx={{
                  position: "absolute",
                  top: "-21px",
                  right: "-28px",
                  width: "30px",
                  height: "30px",
                  display: { xs: "none", md: "block" },
                  objectFit: "contain"
                }}
              />
            </Box>
            <Box sx={{ position: "relative", paddingBottom: "30px" }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Transform Your Business with AI
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Now offering powerful AI Integration for smarter automation &
                customer experience.
              </Typography>
              <Typography
                component="a"
                href="/services/ai-integration"
                variant="body2"
                mt={4}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#ffffff",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#F99286",
                    // boxShadow: "0px 0px 0px 1px #A9A9A9 inset"
                  },
                }}
              >
                Explore AI Integration
              </Typography>
            </Box>
          </Box>
        </div>
        {/* What We Offer */}
        <WeOffer />

        {/* Our Technology */}
        <OurTechnology />

        {/* WhyUs section  */}
        <HomeWhyUs />

        <IndustryExpertise />

        {/* How We Work section  */}
        <HowWeWork />

        {/* Join Our Newsletter */}
        <OurNewsletter />

        {/* What We've Built section */}
        <WeveBuilt />
      </Box>
    </>
  );
};

export default React.memo(Home);
