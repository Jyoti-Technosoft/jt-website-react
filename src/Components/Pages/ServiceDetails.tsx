import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Container } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import dataArray from "../../jt-website.json";
import "../../styles/service-details.css";

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const serviceDetails = dataArray?.serviceDetails || [];
  const selectedService = serviceDetails.find((service) => service.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!selectedService) {
    return <Typography>Service not found.</Typography>;
  }

  const backgroundColors = [
    "#F7E4EA",
    "#D9DFFF",
    "#C5EDFF",
    "#FFDABF",
    "#FFEEC2",
    "#E9D0D7",
    "#D1F1E0",
  ];

  return (
    <Box className="service-details">
      <Box className="service-details-first-section" sx={{ backgroundColor: "#1F5795" }}>
        <Container sx={{ display: "flex" }}>
          <Box className="service-details-content">
            <Box
              className="service-details-first-content"
              sx={{
                mt: {
                  xs: 2,
                  sm: 0,
                  md: 3,
                },
              }}
            >
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>
              <ChevronRightIcon className="chevron-icon" />
              <Link to="/services" className="breadcrumb-link">
                Services
              </Link>
              <ChevronRightIcon className="chevron-icon" />
              <span>{selectedService.technology}</span>
            </Box>
            <Typography
              className="service-details-title"
              sx={{
                mt: {
                  xs: 3,
                  sm: 4,
                },
              }}
            >
              {selectedService.technology}
            </Typography>
          </Box>
          <Box className="service-details-image" sx={{ py: 3 }}>
            <img
              src={selectedService.headerImage}
              alt="services"
              style={{
                borderRadius: "10px",
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: { xs: "100%", md: "549px" },
              maxWidth: "100%",
              aspectRatio: "549 / 519",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={selectedService.image}
              alt={selectedService.technology}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <Box mt={2} sx={{ flex: 1 }}>
            <Typography
              className="service-details-second-title"
              gutterBottom
              sx={{ whiteSpace: "pre-line" }}
            >
              {selectedService.tagline
                .replace(/<br\s*\/?>/g, "\n")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Typography>

            <Box
              mt={4}
              sx={{
                "& p": {
                  fontSize: "14px",
                  lineHeight: 1.6,
                },
              }}
              dangerouslySetInnerHTML={{ __html: selectedService.description }}
            />
          </Box>
        </Container>
      </Box>

      <Box
        mt={4}
        className="service-details-second"
        sx={{ backgroundColor: "#F5F8FB", py: 6 }}
      >
        <Container>
          <Typography className="mt-4 sm:mt-6 service-details-second-title">
            What Sets Us Apart
          </Typography>
          <Grid container spacing={8} mt={6} mb={4}>
            {selectedService.whyUs.map((item, idx) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={idx}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    backgroundColor:
                      backgroundColors[idx % backgroundColors.length],
                    padding: "12px",
                    boxShadow: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.5s ease-in-out",
                    "&:hover": {
                      backgroundColor:
                        backgroundColors[idx % backgroundColors.length],
                      cursor: "pointer",
                      "& .inner-box": {
                        backgroundColor:
                          backgroundColors[idx % backgroundColors.length],
                      },
                    },
                  }}
                >
                  <Box
                    className="inner-box"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      padding: 2,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <Typography
                      className="card-header"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#2F70D4",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.header}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="card-text"
                      sx={{
                        textAlign: "justify",
                        color: "#333",
                        transition: "color 0.3s",
                        fontSize: "14px",
                      }}
                    >
                      {item.decription}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ServiceDetails;
