import React from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";

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
    <Box sx={{ py: 6, overflow: "hidden", bgcolor: "#f7fbff" }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: `${scroll} ${logos.length * 3}s linear infinite`,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "120px",
                flexShrink: 0,
                mx: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={logo.imagePath}
                alt={`Client Logo ${index + 1}`}
                sx={{
                  width: "180px",
                  height: "60px",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ClientLogoCarousel);
