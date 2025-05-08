import React from 'react';
import { Box, Grid, Typography, Container, useMediaQuery } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import OurTechnology from "./shared/OurTechnology.tsx";
import dataArray from "../../jt-website.json"
import "../../styles/services.css"
import "../../styles/home.css";

const Services: React.FC = () => {
    const isNotSmallScreen = useMediaQuery("(min-width: 768px)");
    const { featuredServicesTitle, featuredServicesSection } = dataArray?.servicesPage;
    const moreServicesData = dataArray?.serviceDetails || [];

    const backgroundColors = [
        "#F7E4EA",
        "#D9DFFF",
        "#C5EDFF",
        "#FEC79F",
        "#FFEEC2",
        "#E9D0D7",
        "#D1F1E0"
    ];

    return (
        <>
            {/* Top Header */}
            <HeaderCommon smallTitle="Services" page="Our Services" />

            {/* Featured Services Section */}
            <Box className="featured-services-section">
                <Container maxWidth="lg">
                    <Typography className="featured-services-title">
                        {featuredServicesTitle}
                    </Typography>
                    <Grid mt={2} container spacing={2} justifyContent="center">
                        {featuredServicesSection?.map((service) => (
                            <Grid className='main-service-card' size={{ xs: 12, sm:6, md:3 }} key={service?.id}>
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

            {/* More Services Section */}
            <Box className="more-services-section">
                <Container maxWidth="lg">
                    <Typography className="more-services-title">
                        More Services
                    </Typography>
                    <Grid mt={isNotSmallScreen ? 4 : 2} mx={"auto"} maxWidth="900px" container spacing={2} justifyContent="flex-start">
                        {moreServicesData.map((service, index) => {
                            const bgColor = backgroundColors[index % backgroundColors.length];
                            return (
                                <Grid px={"0px"} size={{ xs: 12, sm:6, md:4 }} key={service?.id}>
                                    <Box style={{ backgroundColor: bgColor }} className="more-service-card">
                                        <div
                                            className="card-img"
                                            style={{ backgroundColor: bgColor }}
                                        >
                                            <span className='up-right'>
                                                <TrendingFlatIcon />
                                            </span>
                                            <img
                                                src={service?.imgSrc}
                                                alt={service?.id}
                                                className="more-service-image"
                                            />
                                        </div>
                                        <div className="more-card-content">
                                            <Typography className="more-service-title">
                                                {service?.technology}
                                            </Typography>
                                            <Typography className="more-service-description">
                                                {service?.sortdescription}
                                            </Typography>
                                        </div>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </Box>

            {/* Existing Technology Section */}
            <OurTechnology />

            {/* Footer */}
            <FooterCommonPage title="Let’s Build Dynamic Solutions for Your Business" buttonText="Let’s Get Started" />
        </>
    )
}

export default Services;
