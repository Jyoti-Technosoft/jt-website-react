import React, { useState } from "react";
import { Box, Container, Tab, Tabs, Grid, Typography, useMediaQuery, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const OurTechnology: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { technologyStack } = dataArray;
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handlePrev = () => {
        if (selectedTab > 0) {
            setSelectedTab(selectedTab - 1);
        }
    };

    const handleNext = () => {
        if (selectedTab < technologyStack?.children?.length - 1) {
            setSelectedTab(selectedTab + 1);
        }
    };

    return (
        <Box className="our-technology-section">
            <Container className="container">
                <Box>
                    <Typography className="ourTechnology-title">Our Technology</Typography>
                    <Typography className="ourTechnology-description">
                        Our core technologies for scalable success.
                    </Typography>
                </Box>
                <Box margin={isMobile ? "auto" : "0"} className="ourTechnology-main-container">
                    {isMobile ? (
                        <Box className="mobile-tab-navigation" display="flex" alignItems="center" justifyContent="center">
                            <IconButton onClick={handlePrev} disabled={selectedTab === 0}>
                                <ChevronLeft />
                            </IconButton>
                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                aria-label="technology stack tabs"
                                centered
                                className="technology-tabs"
                            >
                                <Tab
                                    className="technology-tab"
                                    key={technologyStack?.children?.[selectedTab]?.id}
                                    label={technologyStack?.children?.[selectedTab]?.id}
                                />
                            </Tabs>
                            <IconButton onClick={handleNext} disabled={selectedTab === technologyStack?.children?.length - 1}>
                                <ChevronRight />
                            </IconButton>
                        </Box>
                    ) : (
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            aria-label="technology stack tabs"
                            centered
                            className="technology-tabs"
                        >
                            {technologyStack?.children?.map((item, index) => (
                                <Tab className="technology-tab" key={item?.id} label={item?.id} />
                            ))}
                        </Tabs>
                    )}

                    <Box>
                        {technologyStack?.children?.map((item, index) => (
                            selectedTab === index && (
                                <Box key={item?.id} className="technology-content">
                                    <Grid justifyContent={isMobile && item?.children?.length > 1 ? "flex-start" : "center"} container spacing={3}>
                                        {item?.children?.map((tech, techIndex) => (
                                            <Grid item xs={4} sm={4} md={3} lg={2} key={techIndex}>
                                                <Box className="tech-item" textAlign="center">
                                                    <img className="tech-img" src={tech?.imgSrc} alt={tech?.label} />
                                                    <Typography className="tech-label" variant="body2">{tech?.label}</Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default OurTechnology;
