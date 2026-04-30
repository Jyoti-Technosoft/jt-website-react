import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

type HeroCalloutProps = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

const HeroCallout: React.FC<HeroCalloutProps> = ({
  title,
  description,
  href,
  linkLabel,
}) => (
  <Box className="hero-callout">
    <Box
      component="img"
      src="/assets/star-img.png"
      alt=""
      loading="lazy"
      width="30"
      height="30"
      aria-hidden="true"
      className="hero-callout-star"
    />
    <Typography variant="h2" className="hero-callout-title">
      {title}
    </Typography>
    <Typography variant="body2" className="hero-callout-description">
      {description}
    </Typography>
    <Typography
      component={RouterLink}
      to={href}
      variant="body2"
      className="hero-callout-link"
    >
      {linkLabel}
      <ArrowOutwardIcon sx={{ fontSize: 18 }} />
    </Typography>
  </Box>
);

export default React.memo(HeroCallout);
