import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { IndustryExpertiseItem } from "../../../types/content";
import { homeContent } from "../../../content/homeContent";

import "../../../styles/home.css";

/* Industry content lives in src/jt-website.json and is normalized by homeContent. */
const industries: IndustryExpertiseItem[] = homeContent.industryExpertise;

const IndustryExpertise: React.FC = () => {
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const featuredIndustries = industries.filter((industry) => industry.featured);
  const additionalIndustries = industries.filter(
    (industry) => !industry.featured && industry.category === "industry"
  );
  const visibleIndustries = showAllIndustries
    ? [...featuredIndustries, ...additionalIndustries]
    : featuredIndustries;
  const capabilities = industries.filter((industry) => industry.category === "capability");

  const renderCard = (industry: IndustryExpertiseItem) => (
    <Box
      key={industry.title}
      className="industry-expertise-card"
      sx={{
        p: { xs: 2, md: 2.5 },
        height: "100%",
        minHeight: { md: 360 },
        display: "flex",
        flexDirection: "column",
        border: "1px solid #D9D9D9",
        borderRadius: "10px",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor: "#254682",
          boxShadow: "0 8px 22px rgba(37, 70, 130, 0.1)",
          transform: "translateY(-2px)",
          "& .industry-expertise-card-icon": { transform: "translateY(-2px)" },
        },
      }}
    >
      <Box
        className="industry-expertise-card-icon"
        sx={{
          mb: 2,
          width: 50,
          height: 50,
          transition: "transform 0.25s ease",
        }}
      >
        <img
          src={industry.image}
          alt={`${industry.title} expertise`}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Typography className="industry-expertise-card-title" variant="h6">
        {industry.title}
      </Typography>
      <Typography className="industry-expertise-card-description" variant="body2" sx={{ mt: 1.25 }}>
        {industry.description}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2 }}>
        {industry.expertise.map((item) => (
          <Chip key={item} label={item} variant="outlined" size="small" />
        ))}
      </Box>
      {industry.projects.length > 0 && (
        <Typography
          className="industry-expertise-card-projects"
          variant="body2"
          sx={{ mt: "auto", pt: 2 }}
        >
          {industry.projects.join(" · ")}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box mb={2} mt={2}>
      <Container>
        <Box sx={{ px: 2 }} className="industry-expertise">
          <Typography variant="h2" className="industry-expertise-title">
            Our Industry Expertise
          </Typography>
          <Typography className="section-description" variant="body2" sx={{ mt: 1 }}>
            Industry-focused experience. Product-focused thinking. We combine strategy, UX, and custom software development to build web, mobile, and AI products for businesses across diverse sectors.
          </Typography>
          <Typography className="industry-expertise-proof" variant="body2" sx={{ mt: 1.5 }}>
            Custom software development · Web apps · Mobile apps · AI products
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
              mt: 4,
            }}
          >
            {visibleIndustries.map(renderCard)}
          </Box>

          {additionalIndustries.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                onClick={() => setShowAllIndustries((current) => !current)}
                endIcon={showAllIndustries ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                aria-expanded={showAllIndustries}
                sx={{ color: "var(--text-blue)", fontWeight: 700, textTransform: "none" }}
              >
                {showAllIndustries ? "Show fewer" : "View all industries"}
              </Button>
            </Box>
          )}

          <Box className="industry-capabilities" sx={{ mt: 6 }}>
            <Typography variant="h3" className="industry-capabilities-title">
              Technology &amp; Product Expertise
            </Typography>
            <Typography className="industry-capabilities-description" sx={{ mt: 1 }}>
              The capabilities we bring across every sector and product engagement.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
                gap: 2,
                mt: 2.5,
              }}
            >
              {capabilities.map((industry) => (
                <Box key={industry.title} className="industry-capability-item">
                  <Typography variant="subtitle1">{industry.title}</Typography>
                  <Typography variant="body2">{industry.expertise.join(" · ")}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(IndustryExpertise);
