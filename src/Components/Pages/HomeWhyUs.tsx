import React, { useEffect, useRef, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import dataArray from "../../jt-website.json";
import "../../styles/home.css";

const HomeWhyUs: React.FC = () => {
  const { WhyUs } = dataArray?.home;
  const [animatedNumbers, setAnimatedNumbers] = useState<number[]>([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setStartAnimation(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.3 // 30% visible before animating
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (!startAnimation) return;

    const currentYear = new Date().getFullYear();

    const intervals = WhyUs?.data?.map((item, index) => {
      let targetValue = parseInt(item.title, 10);
      if (item?.type === "Experience" && item?.year) {
        targetValue = currentYear - item.year;
      }

      const duration = 2; // seconds
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
  }, [startAnimation, WhyUs?.data]);

  useEffect(() => {
    setAnimatedNumbers(WhyUs?.data?.map(() => 0));
  }, [WhyUs?.data]);

  return (
    <Box className="why-us-section" ref={sectionRef}>
      <Container className="container">
        <Box>
          <Typography variant="h2" className="whyUs-title">
            {WhyUs?.title}
          </Typography>
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
          {WhyUs?.data?.map((value, index) => {
            const displayNumber = animatedNumbers[index] ?? 0;

            return (
              <Box className="whyus-card" key={index}>
                <Box className="main-numbercard">
                  <Typography className="number">
                    {`${displayNumber}+`}
                  </Typography>
                  <Typography className="number-text">
                    {value?.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(HomeWhyUs);
