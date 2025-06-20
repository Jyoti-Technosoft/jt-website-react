import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Container, useMediaQuery } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import OurTechnology from "./shared/OurTechnology.tsx";
import dataArray from "../../jt-website.json"
import "../../styles/services.css"
import "../../styles/home.css";
import HeaderMainPage from './shared/HeaderMainPage.tsx';

const Services: React.FC = () => {
    const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
    const { featuredServicesTitle, featuredServicesSection } = dataArray?.servicesPage;
    const moreServicesData = dataArray?.serviceDetails || [];

    const backgroundColors = [
        "#F7E4EA",
        "#D9DFFF",
        "#C5EDFF",
        "#FFDABF",
        "#FFEEC2",
        "#E9D0D7",
        "#D1F1E0"
    ];

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
      <Box>
        {/* <HeaderCommon smallTitle="Services" page="Tailored Solutions for Every Digital Need" /> */}
        <HeaderMainPage
          smallTitle="Services"
          page="Tailored Solutions for Every Digital Need"
          imageSrc="/assets/services-img.png"
          showGif={true}
        />

        <Box className="featured-services-section">
          <Container maxWidth="lg">
            <Typography className="featured-services-title">
              {featuredServicesTitle}
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: "0.5px",
                color: "#333333",
              }}
              mt={1}
            >
              Tailored digital solutions designed to meet your business goals.
            </Typography>
            <Grid mt={5} container spacing={2} justifyContent="center">
              {featuredServicesSection?.map((service) => (
                <Grid
                  className="main-service-card"
                  size={{ xs: 12, sm: 6, md: 3 }}
                  key={service?.id}
                >
                  <Box className="service-card">
                    <img
                      src={service?.imgSrc}
                      alt={service?.title}
                      className="service-image"
                    />
                    <Typography className="service-title">
                      {service?.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box className="more-services-section">
          <Container maxWidth="lg">
            <Typography className="more-services-title">
              More Services
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "22px",
                letterSpacing: "0.5px",
                color: "#333333",
              }}
              mt={1}
            >
              Comprehensive tech solutions to support every stage of your digital journey.
            </Typography>
            <Grid
              mt={isNotSmallScreen ? 8 : 2}
              mx={"auto"}
              maxWidth="900px"
              container
              spacing={2}
              justifyContent="flex-start"
            >
              {moreServicesData.map((service, index) => {
                const bgColor =
                  backgroundColors[index % backgroundColors.length];
                return (
                  <Grid
                    px={"0px"}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    key={service?.id}
                  >
                    <Link
                      to={`/services/${service.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        style={{ backgroundColor: bgColor }}
                        className="more-service-card"
                      >
                        <div
                          className="card-img"
                          style={{ backgroundColor: bgColor }}
                        >
                          <span className="up-right">
                            <TrendingFlatIcon style={{ color: "black" }} />
                          </span>
                          <img
                            src={service?.imgSrc}
                            alt={service?.id}
                            className="more-service-image"
                          />
                        </div>
                        <div className="hover-title">{service?.technology}</div>
                        <div className="more-card-content">
                          <Typography className="more-service-title">
                            {service?.technology}
                          </Typography>
                          <Typography className="more-service-description">
                            {service?.sortdescription}
                          </Typography>
                        </div>
                      </Box>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box mb={8}>
          <OurTechnology />
        </Box>

        <FooterCommonPage
          title="Let’s Build Dynamic Solutions for Your Business"
          buttonText="Let’s Get Started"
          buttonLink="/contact"
        />
      </Box>
    );
}

export default Services;
