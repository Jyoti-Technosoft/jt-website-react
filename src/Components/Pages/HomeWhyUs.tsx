import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import dataArray from "../../jt-website.json";
import "../../styles/home.css";

const HomeWhyUs: React.FC = () => {
  const { WhyUs } = dataArray?.home;
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);

  useEffect(() => {
    const intervals = WhyUs?.data?.map((item, index) => {
      const targetValue = parseInt(item.title, 10);
      const duration = 2;
      const step = targetValue / ((duration * 1000) / 30);
      let currentValue = 0;

      const interval = setInterval(() => {
        currentValue = Math.min(currentValue + step, targetValue);
        setAnimatedNumbers((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(currentValue);
          return updated;
        });

        if (currentValue >= targetValue) {
          clearInterval(interval);
        }
      }, 30);
      return interval;
    });
    return () => intervals.forEach(clearInterval);
  }, [WhyUs?.data]);

  useEffect(() => {
    setAnimatedNumbers(WhyUs?.data?.map(() => 0));
  }, [WhyUs?.data]);

  return (
    <Box className="why-us-section">
      <Container className="container">
        <Box>
          <Typography className="whyUs-title">{WhyUs?.title}</Typography>
          <Typography className="whyUs-description" mt={1}>
            {WhyUs?.description}
          </Typography>
        </Box>
        <Box
          className="main-container"
          sx={{
            display: "grid",
            gap: { xs: 2, sm: 4 },
            justifyContent: "center",
            alignItems: "stretch",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {WhyUs?.data?.map((value, index) => (
          <Box className="whyus-card" key={index}>
              <Box className="main-numbercard">
                <Typography className="number">
                  {value?.type === "Clients" ||
                  value?.type === "Projects" ||
                  value?.type === "Experience"
                    ? `${animatedNumbers[index]}+`
                    : animatedNumbers[index]}
                </Typography>
                <Typography className="number-text">
                  {value?.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomeWhyUs;
