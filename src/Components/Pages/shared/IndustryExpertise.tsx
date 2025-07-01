import React from "react";
import { Box, Typography, Grid, Chip, Container } from "@mui/material";

import "../../../styles/home.css";

interface IndustryCardProps {
  image: string;
  title: string;
  description: string;
  chips: string[];
}

const industries: IndustryCardProps[] = [
  {
    image: "assets/ecommerce-img.png",
    title: "Ecommerce",
    description: "We build custom e-commerce platforms that drive sales and growth.",
    chips: ["Shopping"],
  },
  {
    image: "/assets/real-estate-img.png",
    title: "Real Estate",
    description: "Interactive real estate solutions for property listings, sales, and engagement.",
    chips: ["Property Listing"],
  },
  {
    image: "/assets/health-care-img.png",
    title: "Health Care",
    description: "Digital solutions improving patient care, efficiency, and healthcare access worldwide.",
    chips: ["Health records", "XRay"],
  },
  {
    image: "/assets/education-img.png",
    title: "Education",
    description: "Smart learning platforms enabling digital classrooms, assessments, and growth.",
    chips: ["Quiz"],
  },
];


const IndustryExpertise: React.FC = () => {
  return (
    <Box mb={2}>
      <Container>
        <Box sx={{ px: 2 }} className="industry-expertise">
          <Typography className="industry-expertise-title">
            Our Industry Expertise
          </Typography>
          <Typography className="industry-expertise-description" mt={1}>
            Trusted by clients across a range of industries worldwide.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
              mt: 4,
            }}
          >
            {industries.map((industry, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  border: "1px solid #D9D9D9",
                  borderRadius: "10px",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "#254682",
                    boxShadow: "0px 4px 4px 0px #00000040"
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 1,
                    mt: 2,
                    width: "50px",
                    height: "50px",
                    // mx: "auto",
                  }}
                >
                  <img
                    src={industry.image}
                    alt={industry.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  className="industry-expertise-card-title"
                  sx={{ mt: 2 }}
                >
                  {industry.title}
                </Typography>
                <Typography
                  className="industry-expertise-card-description"
                  sx={{ mt: 2 }}
                >
                  {industry.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 2,
                    mb: 2
                    // justifyContent: "center",
                  }}
                >
                  {industry.chips.map((chip, i) => (
                    <Chip key={i} label={chip} variant="outlined" />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IndustryExpertise;
