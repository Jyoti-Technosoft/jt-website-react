import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import BuildVision from "./shared/BuildVision.tsx";
import dataArray from "../../jt-website.json";

const HireDevelopersDetails = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const hireUsData = dataArray?.hireUs;
  const technologyData = hireUsData.technology.find((item) => item.id === id);

    useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!technologyData) {
    return <div>Technology not found.</div>;
  }

  return (
    <Box className="hire-detail-section">
      <Box sx={{ backgroundColor: "#1F5795" }}>
        <Container className="hire-detail-first-section">
          <Box className="hire-detail-content">
            <Box className="hire-detail-first-content">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>
              <ChevronRightIcon className="chevron-icon" />
              <Link to="/hire-developers" className="breadcrumb-link">
                Hire Developer
              </Link>
              <ChevronRightIcon className="chevron-icon" />
              <span>{technologyData.label}</span>
            </Box>
            <Typography mt={4} className="hire-detail-title">
              {technologyData.label}
            </Typography>
            <Typography
              mt={4}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                px: { xs: 2, sm: 0 },
                wordBreak: "break-word",
                textAlign: "justify",
              }}
            >
              {technologyData.decription}
            </Typography>
          </Box>
          <Box className="hire-detail-image">
            <div className="image-wrapper">
              <img
                className="main-image"
                src={technologyData.mainImage || "/assets/angular-main-img.png"}
                alt={technologyData.label}
              />
              <img
                className="tech-icon"
                src={`/${technologyData.image}`}
                alt={technologyData.label}
              />
            </div>
          </Box>
        </Container>
      </Box>

      <Box className="choose-us-section" mt={6} mb={8}>
        <Container>
          <Typography
            mt={2}
            className="choose-us-heading"
            sx={{ color: "#347CCC", fontWeight: 600, fontSize: "20px" }}
          >
            {technologyData.chooseUs}
          </Typography>
          <Typography
            mb={6}
            mt={1}
            sx={{
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "22px",
              letterSpacing: "0.5px",
              color: "#333333",
            }}
          >
            {`Expert ${
              technologyData.label.split(" ")[0]
            } developers. reliable results.`}
          </Typography>
          <Grid container>
            {technologyData.whyChooseUs.map((feature, index) => {
              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      boxSizing: "border-box",
                      padding: "35px",
                      minHeight: "200px",
                      backgroundColor: "#fff",
                      transition: "background-color 0.3s ease",
                      borderTop: index >= 3 ? "1px solid #e0e0e0" : "none",
                      [theme.breakpoints.up("md")]: {
                        borderLeft:
                          index % 3 === 0 ? "none" : "0.5px solid #e0e0e0",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        borderLeft:
                          index % 2 === 0 ? "none" : "0.5px solid #e0e0e0",
                      },
                      [theme.breakpoints.down("sm")]: {
                        borderLeft: "none",
                      },
                      borderBottom:
                        Math.floor(index / 3) <
                        Math.floor((technologyData.whyChooseUs.length - 1) / 3)
                          ? "0.5px solid #e0e0e0"
                          : "none",

                      "&:hover": {
                        backgroundColor: "#DDEDFF",
                        cursor: "pointer",
                      },
                      "&:hover .feature-title": {
                        color: "#347CCC",
                      },
                    })}
                  >
                    <Typography
                      className="feature-title"
                      sx={{
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "#333333",
                        transition: "color 0.3s ease",
                        lineHeight: "100%",
                        letterSpacing: "0.5%",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      mt={3}
                      sx={{
                        fontSize: "15px",
                        lineHeight: "22px",
                        color: "#333333",
                        textAlign: "justify",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Box className="services-section" sx={{ py: 4 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: { xs: "static", md: "sticky" },
              top: 100,
              alignSelf: "flex-start",
              height: "fit-content",
            }}
          >
            <Typography
              className="choose-us-heading"
              mt={2}
              variant="h4"
              gutterBottom
            >
              {technologyData.developmentServiceTitle}
            </Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mt: 5, mb: 1, color: "#333333" }}
            >
              {`Robust ${
                technologyData.label.split(" ")[0]
              } Development Solutions`}
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "22.09px",
                letterSpacing: "0.5px",
                color: "#333333",
              }}
            >
              {`Unlock the full potential of ${
                technologyData.label.split(" ")[0]
              } with our end-to-end development services. Whether you need custom-built applications, powerful plugins, seamless API integrations, or ongoing support, we deliver high-performing solutions that align with your business goals. Our  ${
                technologyData.label.split(" ")[0]
              } experts ensure every component is scalable, secure, and optimized for long-term performance.`}
            </Typography>
          </Box>
          <Box
            className="services-right-column"
            sx={{
              flex: 1,
              overflowY: "auto",
              pr: 2,
            }}
            ref={scrollRef}
          >
            {technologyData.services.map((service, index) => (
              <Box className="service-card" key={index}>
                <Box
                  className="service-header"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.header}
                    style={{ width: 30, height: 30, objectFit: "contain" }}
                  />
                  {service.header}
                </Box>
                <Box
                  className="service-decription"
                  sx={{
                    textAlign: "justify",
                  }}
                >
                  {service.decription}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      <BuildVision />
    </Box>
  );
};

export default HireDevelopersDetails;
