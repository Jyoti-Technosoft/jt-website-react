import React, { useEffect, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SEO from "../SEO.tsx";
import CTAButton from "../shared/CTAButton.tsx";
import OptimizedImage from "../OptimizedImageV2.tsx";
import { homeContent } from "../../content/homeContent";
import { performanceMonitor } from "../../utils/performanceMonitor";
import { performanceBudgetChecker } from "../../utils/performanceBudget";
import "../../styles/home.css";

// Lazy load below-the-fold components to minimize initial execution time
const ClientLogoCarousel = React.lazy(() => import("./shared/ClientLogoCarousel.tsx"));
const ClientTestimonials = React.lazy(() => import("./shared/ClientTestimonials.tsx"));
const WeOffer = React.lazy(() => import("./shared/WeOffer.tsx"));
const OurTechnology = React.lazy(() => import("./shared/OurTechnology.tsx"));
const HomeWhyUs = React.lazy(() => import("../Pages/HomeWhyUs.tsx"));
const IndustryExpertise = React.lazy(() => import("./shared/IndustryExpertise.tsx"));
const HowWeWork = React.lazy(() => import("./shared/HowWeWork.tsx"));
const OurNewsletter = React.lazy(() => import("./shared/OurNewsletter.tsx"));
const WeveBuilt = React.lazy(() => import("./shared/WeveBuilt.tsx"));

const Home: React.FC = () => {
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

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

  useEffect(() => {
    // Only load video source on desktop to save bandwidth on mobile
    const isDesktop = window.matchMedia("(min-width: 900px)").matches;
    const isSaveData = (navigator as any).connection?.saveData === true;
    
    if (isDesktop && !isSaveData) {
      setShouldLoadHeroVideo(true);
    }
  }, []);

  return (
    <>
      <SEO
        title="Jyoti Technosoft LLP | Web Development & AI Solutions"
        description="Top-rated global software development company based in Surat, India. We deliver custom web applications, mobile apps, AI solutions, and digital transformation for clients worldwide."
        keywords="jyoti technosoft, global software development company, top rated IT company in surat, web development, mobile app development, AI solutions, custom software engineering"
        url="https://jyotitechnosoft.com/"
      />
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
                        autoPlay={shouldLoadHeroVideo}
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster={homeContent.hero.videoPreview.poster}
                        className="hero-video"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.24)",
                          display: { xs: "none", md: "block" }, // Hide on mobile, show on desktop
                        }}
                      >
                        {shouldLoadHeroVideo && (
                          <source src={homeContent.hero.videoPreview.src} type="video/mp4" />
                        )}
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
                            <OptimizedImage
                              src={item.imageSrc}
                              alt={item.title}
                              className="hero-video-thumb-image"
                              loading="lazy"
                              sizes="(max-width: 900px) 0px, 160px"
                              style={{
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

        <Suspense fallback={null}>
          <Box sx={{ minHeight: "120px" }}><ClientLogoCarousel /></Box>
          <Box sx={{ minHeight: "380px" }}><ClientTestimonials data={homeContent.clientTestimonials} /></Box>
          <Box sx={{ minHeight: "450px" }}><WeOffer /></Box>
          <Box sx={{ minHeight: "450px" }}><OurTechnology /></Box>
          <Box sx={{ minHeight: "380px" }}><HomeWhyUs /></Box>
          <Box sx={{ minHeight: "400px" }}><IndustryExpertise /></Box>
          <Box sx={{ minHeight: "520px" }}><HowWeWork /></Box>
          <Box sx={{ minHeight: "280px" }}><OurNewsletter /></Box>
          <Box sx={{ minHeight: "500px" }}><WeveBuilt /></Box>
        </Suspense>
      </Box>
    </>
  );
};

export default React.memo(Home);
