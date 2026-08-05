import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Helmet } from "react-helmet-async";

import HomeWhyUs from "../Pages/HomeWhyUs.tsx";
import OurTechnology from "./shared/OurTechnology.tsx";
import WeOffer from "./shared/WeOffer.tsx";
import WeveBuilt from "./shared/WeveBuilt.tsx";
import OurNewsletter from "./shared/OurNewsletter.tsx";
import IndustryExpertise from "./shared/IndustryExpertise.tsx";
import HowWeWork from "./shared/HowWeWork.tsx";
import ClientTestimonials from "./shared/ClientTestimonials.tsx";
import ClientLogoCarousel from "./shared/ClientLogoCarousel.tsx";
import CTAButton from "../shared/CTAButton.tsx";
import { homeContent } from "../../content/homeContent";
import { performanceMonitor } from "../../utils/performanceMonitor";
import { performanceBudgetChecker } from "../../utils/performanceBudget";
import "../../styles/home.css";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        console.log("🏠 Home Page Performance:");
        performanceMonitor.logFullReport();
        
        console.log("💰 Performance Budget:");
        performanceBudgetChecker.checkBudget();
      }, 5000);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Web Development & AI Solutions | Jyoti Technosoft LLP</title>
        <meta
          name="description"
          content="Expert web development, mobile apps, and AI integration services. Transform your business with custom software solutions, API development, and digital transformation by Jyoti Technosoft LLP."
        />
        <meta
          name="keywords"
          content="web development, mobile app development, AI integration, software solutions, API development, digital transformation, custom software, IT consulting"
        />
        <meta
          property="og:title"
          content="Web Development & AI Solutions | Jyoti Technosoft LLP"
        />
        <meta
          property="og:description"
          content="Expert web development, mobile apps, and AI integration services by Jyoti Technosoft LLP"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jyotitechnosoft.com/" />
        <meta
          property="og:image"
          content="https://jyotitechnosoft.com/assets/logo192.png"
        />
        <link rel="canonical" href="https://jyotitechnosoft.com/" />
      </Helmet>
      <Box>
        <div className="first-section-home">
          <Box className="first-section-home-content" role="main">
            <Box className="hero-layout">
              <Box className="hero-copy">
                <Box className="hero-comparison-bar">
                  <Chip label={homeContent.hero.badge} className="hero-badge" />
                </Box>

                <Typography className="first-section-title" variant="h1" component="h1">
                  {homeContent.hero.title}
                </Typography>
                <Typography className="first-section-description">
                  {homeContent.hero.description}
                </Typography>

                <Box className="hero-cta-group">
                  <CTAButton cta={homeContent.hero.secondaryCta} variant="secondary" />
                  {/* <Button
                    component={RouterLink}
                    to={homeContent.hero.primaryCta.href}
                    variant="contained"
                    className="build-together"
                    aria-label="Book a discovery call with Jyoti Technosoft"
                  >
                    {homeContent.hero.primaryCta.label}
                  </Button> */}
                </Box>

                <Box className="hero-trust-strip">
                  {homeContent.hero.trustIndicators.map((item, index) => (
                    <Typography key={index} className="hero-trust-item">
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box className="hero-aside">
                <Box className="hero-media-stage">
                  <Box className="hero-video-stage">
                    <Box className="hero-video-container">
                      <Box
                        component="video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="hero-video"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.24)",
                          display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
                        }}
                        onLoadStart={() => {
                          setTimeout(() => {
                            const video = document.querySelector('.hero-video') as HTMLVideoElement;
                            if (video) {
                              video.load();
                            }
                          }, 1000);
                        }}
                      >
                        <source src={homeContent.hero.videoPreview.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </Box>

                      <Box className="hero-video-thumbnails">
                        {homeContent.hero.videoPreview.thumbnails.map((item, index) => (
                          <Box 
                            key={item.title} 
                            className="hero-video-thumb"
                            onClick={() => {
                              // Handle thumbnail click to potentially change main video
                              console.log(`Clicked thumbnail: ${item.title}`);
                            }}
                            sx={{
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 12px 40px rgba(31, 87, 149, 0.2)",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={item.imageSrc}
                              alt={item.title}
                              className="hero-video-thumb-image"
                              sx={{
                                transition: "all 0.3s ease",
                              }}
                            />
                            <Box className="hero-video-thumb-meta">
                              <Typography className="hero-video-thumb-title">
                                {item.title}
                              </Typography>
                              <Typography className="hero-video-thumb-label">
                                {item.label}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>

        <ClientLogoCarousel />
        <ClientTestimonials data={homeContent.clientTestimonials} />
        <WeOffer />
        <OurTechnology />
        <HomeWhyUs />
        <IndustryExpertise />
        <HowWeWork />
        <OurNewsletter />
        <WeveBuilt />
      </Box>
    </>
  );
};

export default React.memo(Home);
