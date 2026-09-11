import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
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

  const renderCard = (industry: IndustryExpertiseItem, index: number) => (
    <Box
      key={industry.title}
      className="industry-expertise-card"
      data-accent={index % 4}
      sx={{
      }}
    >
      <Box className="industry-expertise-card-icon">
        <img
          src={industry.image}
          alt={`${industry.title} expertise`}
          loading="lazy"
        />
      </Box>
      <Typography className="industry-expertise-card-title" variant="h6">
        {industry.title}
      </Typography>
      <Typography className="industry-expertise-card-description" variant="body2">
        {industry.description}
      </Typography>
      <Button
        component={RouterLink}
        to={`/our-work?industry=${encodeURIComponent(industry.title)}`}
        className="industry-expertise-card-cta"
        endIcon={<ArrowForwardIcon />}
      >
        Explore projects
      </Button>
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
                md: "repeat(4, 1fr)",
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
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(IndustryExpertise);
