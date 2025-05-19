import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
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
    <Box sx={{ mt: 4 }} className="service-details">
      <HeaderCommon
        smallTitle="Services"
        subTitle={selectedService.technology}
        page={selectedService.technology}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 5,
          padding: "2rem 8rem 3rem",
          mt: 4,
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
      </Box>

      <Box
        mt={4}
        className="service-details-second"
        sx={{ backgroundColor: "#F5F8FB", padding: "2rem 6rem 3rem" }}
      >
        <Typography mt={2} className="service-details-second-title">
          Why Choose Us
        </Typography>
        <Grid container spacing={8} mt={4} mb={4}>
          {selectedService.whyUs.map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ borderRadius: "8px" }} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  borderRadius: "12px",
                  border: `12px solid ${
                    backgroundColors[idx % backgroundColors.length]
                  }`,
                  backgroundColor: "#fff",
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    backgroundColor:
                      backgroundColors[idx % backgroundColors.length],
                    cursor: "pointer",
                  },
                }}
              >
                <CardContent>
                  <Typography className="card-header" gutterBottom>
                    {item.header}
                  </Typography>
                  <Typography variant="body2">{item.decription}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ServiceDetails;
