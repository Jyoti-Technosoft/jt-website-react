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
        <title>Jyoti Technosoft LLP | Home</title>
        <meta name="description" content="Jyoti Technosoft LLP - IT solutions, web development, mobile apps, and digital transformation services." />
        <meta property="og:title" content="Jyoti Technosoft LLP | Home" />
        <meta property="og:description" content="Jyoti Technosoft LLP - IT solutions, web development, mobile apps, and digital transformation services." />
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
            "logo": "https://jyotitechnosoft.com/assets/logo192.png"
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
            preload="none"
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
            <Typography className="first-section-title">
              {meetSection?.title}
            </Typography>
            <Typography className="first-section-description">
              {meetSection?.description}
            </Typography>
            <Button
              variant="contained"
              className="build-together"
              onClick={handleContactNavigation}
            >
              LET'S BUILD TOGETHER
            </Button>
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
