import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { HomeHeroCta } from "../../types/content";

interface CTAButtonProps {
  cta: HomeHeroCta;
  variant?: "primary" | "secondary";
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ cta, variant = "primary", className = "" }) => {
  const isPrimary = variant === "primary";

  return (
    <Box>
      <Button
        component={RouterLink}
        to={cta.href}
        variant={isPrimary ? "contained" : "outlined"}
        className={`${className} ${isPrimary ? "button-primary" : "button-secondary"}`}
        aria-label={cta.label}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {cta.label}
        </Box>
        {!isPrimary && (
          <ArrowOutwardIcon className="hero-secondary-cta-icon" sx={{ fontSize: 18 }} />
        )}
      </Button>
      {cta.helperText && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: "0.9rem",
            // color: "rgba(248, 251, 255, 0.78)",
            textAlign: "center",
          }}
        >
          {cta.helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CTAButton;
