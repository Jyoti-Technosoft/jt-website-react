import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import SectionIntro from "./SectionIntro.tsx";
import { homeContent } from "../../../content/homeContent";
import "../../../styles/home.css";

const WeveBuilt: React.FC = () => (
  <Box className="weveBuilt-section">
    <Container className="weveBuilt-container">
      <Box className="weveBuilt-header">
        <SectionIntro
          title={homeContent.weveBuilt.title}
          description={homeContent.weveBuilt.description}
        />
        <Box
          className="weveBuilt-description-container"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            component={Link}
            to="/our-work"
            variant="contained"
            className="seemore-button"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            {homeContent.weveBuilt.ctaLabel}
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3} className="weveBuilt-main-container">
        {homeContent.weveBuilt.data.map((item) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={item.id}
            className="weveBuilt-grid-item"
          >
            <Box className="weveBuilt-card">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="weveBuilt-image"
                loading="lazy"
                height={50}
                width={75}
              />
              <Typography className="weveBuilt-text">{item.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "flex-start",
        }}
        className="weveBuilt-description-container"
      >
        <Button
          component={Link}
          to="/our-work"
          variant="contained"
          className="seemore-button"
          sx={{
            display: { xs: "flex", sm: "none" },
          }}
        >
          {homeContent.weveBuilt.ctaLabel}
          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
        </Button>
      </Box>
    </Container>
  </Box>
);

export default React.memo(WeveBuilt);
