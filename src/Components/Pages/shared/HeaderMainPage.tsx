import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Container, Typography } from "@mui/material";

import "../../../styles/header-main.css";

interface HeaderMainPageProps {
  smallTitle?: string;
  page: string;
  imageSrc?: string;
  showGif?: boolean;
}

const HeaderMainPage: React.FC<HeaderMainPageProps> = ({
  smallTitle,
  page,
  imageSrc,
  showGif = false,
}) => {
  return (
    <Box className="header-main-first-section" sx={{ backgroundColor: "#1F5795" }}>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box className="header-main-content">
          <Box
            className="header-main-first-content"
            sx={{
              mt: {
                xs: 0,
                sm: 0,
                md: 3,
              },
            }}
          >
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            {smallTitle && (
              <>
                <ChevronRightIcon className="chevron-icon" />
                <span>{smallTitle}</span>
              </>
            )}
          </Box>

          <Typography
            className="header-main-title"
            sx={{
              mt: {
                xs: 1,
                sm: 3,
              },
            }}
          >
            {page}
          </Typography>

          {showGif && <Box className="header-main-gif"></Box>}
        </Box>

        {imageSrc && (
          <Box className="header-main-image" sx={{ py: 3 }}>
            <img
              src={imageSrc}
              alt={smallTitle || "Header"}
              style={{
                borderRadius: "10px",
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HeaderMainPage;

