import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Divider, Paper, Container } from "@mui/material";
import dataArray from "../../jt-website.json";

import BuildVision from "./shared/BuildVision.tsx";
import "../../styles/hire-us.css";
import HeaderMainPage from "./shared/HeaderMainPage.tsx";

const HireDevelopers: React.FC = () => {
  const hireDevCards = dataArray?.hireDevCard || [];

  const icons = [
    ["Angular", "/assets/hire-us-angular.png"],
    ["React", "/assets/hire-us-react.png"],
    ["Java", "/assets/hire-us-java.png"],
  ];

  const steps = [
    {
      id: 1,
      title: "Share Your Requirements",
      description:
        "Tell us what you need, from skills to project scope, and we’ll find the right match.",
    },
    {
      id: 2,
      title: "Choose Your Developer",
      description:
        "Select the best developer from our skilled team based on your project requirements.",
    },
    {
      id: 3,
      title: "Start Your Project",
      description:
        "Begin working with your developer and bring your vision to life.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <HeaderMainPage
        smallTitle="Hire Developer"
        page="Hire Our Dedicated Developers"
        imageSrc="/assets/hire-us.png"
        showGif={true}
      />
      <Box
        sx={{ bgcolor: "#f9fbfd", paddingTop: "60px" }}
        className="hire-middle-section"
      >
        <Container>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            gap="unset"
          >
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="h4" fontWeight={600} color="#1F5795">
                100+
              </Typography>
              <Typography color="#333333">Delivered Projects</Typography>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                height: "100px",
                alignSelf: "center",
              }}
            />
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="h4" fontWeight={600} color="#1F5795">
                40+
              </Typography>
              <Typography color="#333333">Expert Developers</Typography>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                height: "100px",
                alignSelf: "center",
              }}
            />
            <Grid size={{ xs: 6, md: 3 }} sx={{ mt: { xs: 3, md: 0 } }}>
              <Typography variant="h4" fontWeight={600} color="#1F5795">
                2M+
              </Typography>
              <Typography color="#333333">Users Of Code</Typography>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: "none", md: "block" },
                height: "100px",
                alignSelf: "center",
              }}
            />
            <Grid size={{ xs: 6, md: 3 }} sx={{ mt: { xs: 3, md: 0 } }}>
              <Typography variant="h4" fontWeight={600} color="#1F5795">
                2M+
              </Typography>
              <Typography color="#333333">Usages</Typography>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ backgroundColor: "#F5F8FB" }} mt={6} pb={6}>
          <Container>
            <Box className="why-our-dev" pt={6}>
              <Typography fontWeight={600} fontSize={"20px"} color="#347CCC">
                Why Our Developers Are the Right Choice
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
                Your success, powered by the right talent
              </Typography>
              <Grid container spacing={3} mt={4} alignItems="stretch">
                {hireDevCards.map((item, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Box
                      sx={{
                        minHeight: "240px",
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #1F5795",
                        borderRadius: "5px",
                        boxShadow: 1,
                        p: 3,
                        transition: "border 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          border: "1.5px solid #1F5795",
                          boxShadow: "0px 4px 12px rgba(35, 97, 168, 0.2)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Box mb={3}>
                        <i
                          className={item.icon}
                          style={{ fontSize: "2rem", color: "#1F5795" }}
                        ></i>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography className="card-header">
                          {item.cardHeader}
                        </Typography>
                        <Typography className="card-data" sx={{ mt: 3 }}>
                          {item.cardData}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box mt={6} mb={2} className="why-our-dev">
          <Container>
            <Typography
              fontWeight={600}
              fontSize={"20px"}
              color="#347CCC"
              mb={1}
            >
              Find the Right Developer for Your Needs
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={"15px"}
              color="#333333"
              mb={3}
            >
              Choose top developers to bring your vision to life with expert
              solutions.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {icons.map(([label, icon], index) => (
                <Grid key={index} sx={{ minHeight: "92px", minWidth: "310px" }}>
                  <Paper
                    component={Link}
                    to={`/hire-developers/${label.toLowerCase()}`}
                    elevation={2}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      p: 2,
                      px: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      cursor: "pointer",
                      borderRadius: "10px",
                      border: "2px solid transparent",
                      transition: "border 0.3s ease",
                      "&:hover": {
                        border: "1px solid #1976d2",
                         boxShadow: "0 0 12px rgba(25, 118, 210, 0.3)", 
                      },
                    }}
                  >
                    <img
                      src={icon}
                      alt={`${label} icon`}
                      width={25}
                      height={25}
                    />
                    <Typography fontWeight={500} color={"#333333"}>{label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Box sx={{ backgroundColor: "#F5F8FB" }}>
          <Container>
            <Box pt={6}>
              <Typography
                fontWeight={600}
                fontSize={"20px"}
                color="#347CCC"
                mb={1}
                className="why-our-dev"
              >
                Hire Developers in 3 Easy Steps
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
                Skip the hassle—hire top developers quickly and effortlessly
              </Typography>
              <Box className="timeline-container">
                <svg
                  className="timeline-path"
                  viewBox="0 0 1000 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,90 Q 260,0 450,50 T 1000,50"
                    stroke="#aaa"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6,6"
                  />

                  <circle cx="5" cy="90" r="5" fill="#aaa" />
                  <circle cx="995" cy="50" r="5" fill="#aaa" />
                </svg>
                <Box className="steps">
                  {steps.map((step) => (
                    <Box key={step.id} className="step">
                      <Box className="step-circle-wrapper">
                        <Box className="step-number">{step.id}</Box>
                        <Box className="white-circle" />
                      </Box>
                      <Box className="step-text">
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <BuildVision />
      </Box>
    </>
  );
};

export default HireDevelopers;
