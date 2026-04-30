import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
        className={`${className} ${isPrimary ? "build-together" : "hero-secondary-cta"}`}
        aria-label={cta.label}
        sx={{
          minWidth: { xs: 140, md: 231 },
          fontSize: { xs: "0.8rem", md: "0.875rem" },
          ...(isPrimary ? {} : {
            display: { xs: "inline-flex", md: "inline-flex" },
            minWidth: { xs: 180, md: 220 },
            height: { xs: 48, md: 52 },
            borderRadius: "14px",
            border: "2px solid #1f5795",
            color: "#1f5795",
            fontWeight: 600,
            fontSize: { xs: "0.85rem", md: "0.9rem" },
            backgroundColor: "#ffffff",
            backdropFilter: "blur(10px)",
            textTransform: "none",
            letterSpacing: "0.02em",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(31, 87, 149, 0.05) 0%, rgba(63, 135, 223, 0.02) 100%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 0,
              height: 0,
              borderRadius: "50%",
              background: "rgba(31, 87, 149, 0.1)",
              transform: "translate(-50%, -50%)",
              transition: "width 0.6s ease, height 0.6s ease",
            },
            "&:hover": {
              backgroundColor: "#f8fafc",
              border: "2px solid #3f87df",
              color: "#3f87df",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 32px rgba(31, 87, 149, 0.2)",
              "&::before": {
                opacity: 1,
              },
              "&::after": {
                width: "300px",
                height: "300px",
              },
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 4px 16px rgba(255, 255, 255, 0.1)",
            },
          }),
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {cta.label}
        </Box>
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
