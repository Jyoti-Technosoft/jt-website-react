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
          <video
            className="bg-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Jyoti Technosoft web development and digital solutions showcase"
            title="Professional software development services"
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
          </video>
          <Box className="first-section-home-content">
            <Typography 
              className="first-section-title"
              variant="h1"
              component="h1"
            >
              {meetSection?.title}
            </Typography>
            <Typography className="first-section-description">
              {meetSection?.description}
            </Typography>
            
            {/* Trust Indicators */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: { md: 4 }, 
              mt: 4, 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Box textAlign="center">
                <Typography variant="h4" sx={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: '2rem'
                }}>
                  22+
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#E8E8E8', 
                  fontSize: '0.9rem'
                }}>
                  Happy Clients
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" sx={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: '2rem'
                }}>
                  40+
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#E8E8E8', 
                  fontSize: '0.9rem'
                }}>
                  Projects Delivered
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" sx={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: '2rem'
                }}>
                  4+
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#E8E8E8', 
                  fontSize: '0.9rem'
                }}>
                  Years Experience
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" sx={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: '2rem'
                }}>
                  99%
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#E8E8E8', 
                  fontSize: '0.9rem'
                }}>
                  Client Satisfaction
                </Typography>
              </Box>
            </Box>

            {/* Enhanced CTA Buttons */}
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
                sx={{ 
                  minWidth: { xs: 140, md: 231 },
                  fontSize: { xs: '0.8rem', md: '0.875rem' }
                }}
              >
                LET'S BUILD TOGETHER
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/our-work')}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  minWidth: 200,
                  height: 47,
                  borderRadius: '10px',
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#F76336',
                    border: '2px solid #FFFFFF'
                  }
                }}
              >
                VIEW OUR WORK
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
                sx={{
                  position: "absolute",
                  top: "-21px",
                  right: "-28px",
                  width: "30px",
                  height: "30px",
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
            <Box sx={{ position: "relative", paddingBottom: "30px" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
