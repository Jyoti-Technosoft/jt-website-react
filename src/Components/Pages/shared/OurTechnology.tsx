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

import OptimizedImage from "../../OptimizedImageV2.tsx";
import dataArray from "../../../jt-website.json";
import "../../../styles/home.css";

const OurTechnology: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { technologyStack } = dataArray;
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    []
  );

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
        <Box className="ourTechnology-shell">
          <Box className="ourTechnology-intro">
            <Typography variant="h2" className="ourTechnology-title">
              Our Technology
            </Typography>
            <Typography className="section-description" mt={1}>
              Our core technologies for scalable success.
            </Typography>
          </Box>

          <Box className="ourTechnology-contentWrap">
            <Box className="ourTechnology-ai-banner">
              <Box className="ourTechnology-ai-copy">
                <Typography className="ourTechnology-ai-title">
                  Now integrating AI Agents for automation and intelligent workflows
                </Typography>
                <Typography className="ourTechnology-ai-description">
                  From copilots to internal tools, we blend AI into practical product workflows.
                </Typography>
              </Box>
              <OptimizedImage
                src="/assets/ai-technology.png"
                alt="AI Agent"
                loading="lazy"
                style={{
                  width: "132px",
                  height: "88px",
                  objectFit: "contain",
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
                    disabled={selectedTab === technologyStack?.children?.length - 1}
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
                  {technologyStack?.children?.map((item) => (
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
                                <OptimizedImage
                                  src={tech?.imgSrc}
                                  alt={tech?.label}
                                  loading="lazy"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    objectFit: "contain",
                                    margin: "0 auto",
                                  }}
                                />
                                <Typography className="tech-label" variant="body2">
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(OurTechnology);
