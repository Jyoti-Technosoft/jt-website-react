import React from "react";
import { Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import OptimizedImage from "../../OptimizedImageV2.tsx";
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
            <Link component={RouterLink} to="/" className="breadcrumb-link">
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
            component="h1"
            variant="h1"
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
            <OptimizedImage
              src={imageSrc}
              alt={smallTitle || "Header"}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 0px, 45vw"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "278px",
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default React.memo(HeaderMainPage);

