import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const OurTechnology: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { technologyStack } = dataArray;
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }, []);

    const handlePrev = useCallback(() => {
        if (selectedTab > 0) {
            setSelectedTab(selectedTab - 1);
        }
    }, [selectedTab]);

    const handleNext = useCallback(() => {
        if (selectedTab < technologyStack?.children?.length - 1) {
            setSelectedTab(selectedTab + 1);
        }
    }, [selectedTab, technologyStack?.children?.length]);

    return (
      <Box className="our-technology-section">
        <Container className="container">
          <Box>
            <Typography variant="h2" className="ourTechnology-title">
              Our Technology
            </Typography>
            <Typography className="ourTechnology-description" mt={1}>
              Our core technologies for scalable success.
            </Typography>
          </Box>
          <Box
            mt={4}
            sx={{
                width: "100%",
                minHeight: { xs: "auto", sm: "80px" },
                backgroundColor: "#9DC0DA",
                color: "#1F5795",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
                position: "relative",
                overflow: "hidden",
                py: { xs: 2, sm: 1.5 },
                px: { xs: 2, sm: 3 },
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  textAlign: 'center',
                }
            }}
          >
            <Box sx={{
              flex: 1,
              pr: 2,
              [theme.breakpoints.down('sm')]: {
                pr: 0,
                mb: 2,
                textAlign: 'center'
              }
            }}>
              <Typography
                  sx={{
                    fontSize: { xs: "18px", sm: "20px" },
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}
              >
                  Now integrating AI Agents for automation and intelligent workflows
              </Typography>
            </Box>
            <Box
                component="img"
                src="/assets/ai-technology.png"
                alt="AI Agent"
                loading="lazy"
                width={800}
                height={600}
                sx={{
                  height: { xs: 80, sm: 100 },
                  width: 'auto',
                  objectFit: 'contain',
                  flexShrink: 0,
                  [theme.breakpoints.down('sm')]: {
                    height: 70,
                    margin: '0 auto'
                  }
                }}
            />
          </Box>
          <Box
            margin={isMobile ? "auto" : "0"}
            className="ourTechnology-main-container"
          >
            {isMobile ? (
              <Box
                className="mobile-tab-navigation"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
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
                <IconButton
                  onClick={handleNext}
                  disabled={
                    selectedTab === technologyStack?.children?.length - 1
                  }
                >
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
                  <Tab
                    className="technology-tab"
                    key={item?.id}
                    label={item?.id}
                    disableRipple
                  />
                ))}
              </Tabs>
            )}

            <Box>
              {technologyStack?.children?.map(
                (item, index) =>
                  selectedTab === index && (
                    <Box key={item?.id} className="technology-content">
                      <Grid
                        justifyContent={
                          isMobile && item?.children?.length > 1
                            ? "flex-start"
                            : "center"
                        }
                        container
                        spacing={3}
                      >
                        {item?.children?.map((tech, techIndex) => (
                          <Grid
                            size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                            key={techIndex}
                          >
                            <Box className="tech-item" textAlign="center">
                              <img
                                className="tech-img"
                                src={tech?.imgSrc}
                                alt={tech?.label}
                                loading="lazy"
                              />
                              <Typography
                                className="tech-label"
                                variant="body2"
                              >
                                {tech?.label}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    );
};

export default React.memo(OurTechnology);
