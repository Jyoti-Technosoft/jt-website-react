import React from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";

import OptimizedImage from "../../OptimizedImageV2.tsx";
import dataArray from "../../../jt-website.json";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const getLogoDimensions = (aspectRatio: number = 3.5, heightScale: number = 1) => {
  const baseHDesktop = aspectRatio < 2.2 ? 46 : aspectRatio > 4.4 ? 40 : 44;
  const targetHDesktop = Math.round(baseHDesktop * heightScale);
  const targetWDesktop = Math.min(220, Math.round(targetHDesktop * aspectRatio));

  const targetHTablet = Math.round(targetHDesktop * 0.85);
  const targetWTablet = Math.min(180, Math.round(targetHTablet * aspectRatio));

  const targetHMobile = Math.round(targetHDesktop * 0.72);
  const targetWMobile = Math.min(150, Math.round(targetHMobile * aspectRatio));

  return {
    width: { xs: targetWMobile, sm: targetWTablet, md: targetWDesktop },
    height: { xs: targetHMobile, sm: targetHTablet, md: targetHDesktop },
  };
};

const ClientLogoCarousel: React.FC = () => {
  const logos = (dataArray?.clientlogos || []).filter(
    (logo) => Boolean(logo && logo.imagePath)
  );

  if (!logos.length) {
    return null;
  }

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 3.5, md: 4 },
        overflow: "hidden",
        bgcolor: "#f7fbff",
        borderTop: "1px solid rgba(0, 0, 0, 0.04)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            alignItems: "center",
            animation: `${scroll} ${logos.length * 3.5}s linear infinite`,
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {[...logos, ...logos].map((logo, index) => {
            const dims = getLogoDimensions(logo.aspectRatio, (logo as any).heightScale ?? 1);
            return (
              <Box
                key={index}
                sx={{
                  width: dims.width,
                  height: dims.height,
                  minWidth: dims.width,
                  minHeight: dims.height,
                  flexShrink: 0,
                  mx: { xs: 2.5, sm: 3.5, md: 4 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "& > div": {
                    width: "100% !important",
                    height: "100% !important",
                    display: "flex !important",
                    alignItems: "center !important",
                    justifyContent: "center !important",
                  },
                  "& img": {
                    width: "100% !important",
                    height: "100% !important",
                    objectFit: "contain !important",
                    filter: "grayscale(10%) opacity(0.92)",
                    transition: "filter 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      filter: "grayscale(0%) opacity(1)",
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <OptimizedImage
                  src={logo.imagePath}
                  alt={logo.name || `Client Logo ${index + 1}`}
                  loading="lazy"
                  sizes="(max-width: 600px) 130px, (max-width: 900px) 160px, 190px"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ClientLogoCarousel);

