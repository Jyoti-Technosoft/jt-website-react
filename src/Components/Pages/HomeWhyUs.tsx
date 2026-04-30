import React, { useEffect, useRef, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import MetricCard from "./shared/MetricCard.tsx";
import { homeContent } from "../../content/homeContent";
import "../../styles/home.css";

const HomeWhyUs: React.FC = () => {
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
      threshold: 0.3,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (!startAnimation) {
      return undefined;
    }

    const intervals = homeContent.metrics.map((item, index) => {
      const numericMatch = item.value.match(/\d+/);
      const targetValue = numericMatch ? parseInt(numericMatch[0], 10) : 0;
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
  }, [startAnimation]);

  useEffect(() => {
    setAnimatedNumbers(homeContent.metrics.map(() => 0));
  }, []);

  return (
    <Box 
      className="why-us-section" 
      ref={sectionRef}
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: { xs: 6, md: 8 },
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%231f5795\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.5,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: { xs: 4, md: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h2" 
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              position: "relative",
              color: "var(--text-blue)",
            }}
          >
            Why Teams Choose Us
          </Typography>
          <Typography className="section-description">
            Proven delivery, thoughtful collaboration, and products built to
            perform.
          </Typography>
        </Box>
        <Box
          className="main-container"
          sx={{
            display: "grid",
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: "center",
            alignItems: "stretch",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            position: "relative",
            zIndex: 1,
          }}
        >
          {homeContent.metrics.map((value, index) => {
            const displayNumber = animatedNumbers[index] ?? 0;
            const suffix = value.value.includes("+") ? "+" : "";

            return (
              <Box 
                className="whyus-card" 
                key={`${value.label}-${index}`}
                sx={{
                  transform: startAnimation ? "translateY(0)" : "translateY(20px)",
                  opacity: startAnimation ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
              >
                <MetricCard
                  value={`${displayNumber}${suffix}`}
                  label={value.label}
                  supportingText={value.supportingText}
                />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(HomeWhyUs);
