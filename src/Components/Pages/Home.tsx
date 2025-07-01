import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box>
      <Box className="first-section-home" sx={{ position: "relative" }}>
        <Box className="first-section-home-content">
          <Typography variant="h2" className="first-section-title">
            {meetSection?.title}
          </Typography>
          <Typography variant="body1" className="first-section-description">
            {meetSection?.description}
          </Typography>
          <Button
            variant="contained"
            className="build-together"
            onClick={() => navigate("/contact")}
          >
            LET’S BUILD TOGETHER
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: { xs: "80%", md: "22%" },
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
              SEE MORE
            </Typography>
          </Box>
        </Box>
      </Box>
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

      {/* What We’ve Built section */}
      <WeveBuilt />
    </Box>
  );
};

export default Home;
