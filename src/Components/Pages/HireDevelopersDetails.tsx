import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import BuildVision from "./shared/BuildVision.tsx";
import dataArray from "../../jt-website.json";

const HireDevelopersDetails = () => {
  const { id } = useParams();
  const hireUsData = dataArray?.hireUs;
  const technologyData = hireUsData.technology.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!technologyData) {
    return <div>Technology not found.</div>;
  }

  return (
    <Box className="hire-detail-section">
      <Box className="hire-detail-first-section">
        <Box className="hire-detail-content">
          <div className="hire-detail-first-content">
            <span>Home</span>
            <ChevronRightIcon className="chevron-icon" />
            <span>{"Hire Developer"}</span>
            <ChevronRightIcon className="chevron-icon" />
            <span>{technologyData.label}</span>
          </div>
          <Typography mt={4} className="hire-detail-title">
            {technologyData.label}
          </Typography>
          <Typography mt={4}>{technologyData.decription}</Typography>
        </Box>
        <Box className="hire-detail-image">
          <div className="image-wrapper">
            <img
              className="main-image"
              src="/assets/hire-us-details-img.png"
              alt="hire-us-details"
            />
            <img
              className="tech-icon"
              src={`/${technologyData.image}`}
              alt={technologyData.label}
            />
          </div>
        </Box>
      </Box>

      <Box className="choose-us-section">
        <Typography mt={2} mb={10} className="choose-us-heading">
          {technologyData.chooseUs}
        </Typography>
        <Grid container spacing={3}>
          {technologyData.whyChooseUs.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box className="feature-card">
                <div className="corner-badge">{index + 1}</div>
                <Typography className="feature-title">
                  {feature.title}
                </Typography>
                <Typography mt={3} className="feature-description">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className="services-section">
        <Typography mb={4} className="choose-us-heading">
          {technologyData.developmentServiceTitle}
        </Typography>
        <Box className="services-grid">
          {technologyData.services.map((service, index) => (
            <Box className="service-card" key={index}>
              <Box className="background"></Box>{" "}
              <Box className="content">
                <h4>{service.header}</h4>
                <p>{service.decription}</p>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <BuildVision />
    </Box>
  );
};

export default HireDevelopersDetails;
