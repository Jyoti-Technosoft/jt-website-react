import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const WeveBuilt: React.FC = () => {
    const { WeveBuilt } = dataArray?.home;
    return (
      <Box className="weveBuilt-section">
        <Container className="weveBuilt-container">
          <Box>
            <Typography className="weveBuilt-title">
              {WeveBuilt?.title}
            </Typography>
            <Box
              className="weveBuilt-description-container"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
              }}
            >
              <Typography className="weveBuilt-description">
                {WeveBuilt?.description1}
              </Typography>
              <Button
                component={Link}
                to="/our-work"
                variant="contained"
                sx={{
                  backgroundColor: "#347CCC",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  borderRadius: "8px",
                  padding: "8px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#2F70D4",
                  },
                }}
              >
                {WeveBuilt?.description2}
                <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
              </Button>
            </Box>
          </Box>
          <Grid container spacing={3} className="weveBuilt-main-container">
            {WeveBuilt?.data?.map((item) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={item?.id}
                className="weveBuilt-grid-item"
              >
                <Box className="weveBuilt-card">
                  <img
                    src={item?.imageSrc}
                    alt={item?.title}
                    className="weveBuilt-image"
                  />
                  <Typography className="weveBuilt-text">
                    {item?.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
}

export default WeveBuilt;
