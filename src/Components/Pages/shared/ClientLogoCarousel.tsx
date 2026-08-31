import React from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";

import OptimizedImage from "../../OptimizedImageV2.tsx";
import dataArray from "../../../jt-website.json";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ClientLogoCarousel: React.FC = () => {
  const logos = dataArray?.clientlogos || [];

  if (!logos.length) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 3.5, md: 4.25 }, overflow: "hidden", bgcolor: "#f7fbff" }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            alignItems: "center",
            animation: `${scroll} ${logos.length * 3}s linear infinite`,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 160, sm: 190, md: 215 },
                minWidth: { xs: 160, sm: 190, md: 215 },
                flexShrink: 0,
                mx: { xs: 2, md: 3 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 58, md: 70 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& > div": {
                    width: "100% !important",
                    height: "100% !important",
                  },
                  "& img": {
                    objectFit: "contain !important",
                  },
                }}
              >
                <OptimizedImage
                  src={logo.imagePath}
                  alt={`Client Logo ${index + 1}`}
                  loading="lazy"
                  sizes="(max-width: 600px) 160px, (max-width: 900px) 190px, 215px"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ClientLogoCarousel);
