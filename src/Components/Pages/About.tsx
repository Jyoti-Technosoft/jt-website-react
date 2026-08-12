import React, { useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import HeaderMainPage from "./shared/HeaderMainPage.tsx";
import SEO from "../SEO.tsx";
import OptimizedImage from "../OptimizedImageV2.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/about.css";

const About: React.FC = () => {
    // Memoize data access to prevent recalculation
    const aboutUs = useMemo(() => dataArray?.aboutUs, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
      <>
        <SEO
          title="About Us | Jyoti Technosoft LLP"
          description="Learn more about Jyoti Technosoft LLP, our mission, vision, and team of IT experts."
          url="https://jyotitechnosoft.com/about"
        />
        <HeaderMainPage
          smallTitle="About"
          page="Innovate, Implement & Inspire"
          imageSrc="/assets/about.png"
          showGif={true}
        />
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#ffffff" }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h2"
                sx={{ 
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  color: "#1f5795",
                  position: "relative"
                }}
              >
                {aboutUs?.gettoKnowUsTitle}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#64748b",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                Building innovative digital solutions with expertise, passion, and commitment to excellence
              </Typography>
            </Box>

            {/* Main Content Section */}
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <OptimizedImage
                  src="/assets/about-first-section.png"
                  alt="Team Collaboration"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  loading="lazy"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ pl: { md: 3 } }}>
                  {aboutUs?.gettoKnowUs?.map((item, index) => (
                    <Box 
                      key={item.id} 
                      sx={{ 
                        mb: 2,
                        p: 3,
                        backgroundColor: "#f8fafc",
                        borderRadius: "16px",
                        border: "1px solid rgba(31, 87, 149, 0.08)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        animation: `fadeInUp 0.6s ease ${index * 0.2 + 0.4}s forwards`,
                        opacity: 0,
                        "&:hover": {
                          backgroundColor: "white",
                          borderColor: "#1f5795",
                          boxShadow: "0 12px 32px rgba(31, 87, 149, 0.15)",
                          transform: "translateY(-4px)"
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "4px",
                          height: "100%",
                          background: "linear-gradient(180deg, #1f5795 0%, #3f87df 100%)",
                          borderRadius: "0",
                          opacity: 0,
                          transition: "opacity 0.3s ease"
                        },
                        "&:hover::before": {
                          opacity: 1
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{
                          fontSize: "1.05rem",
                          lineHeight: 1.8,
                          color: "#2d3748",
                          position: "relative",
                          zIndex: 1,
                          pl: 2
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Our Goal Section */}
        <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#f8fafc" }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography 
                component="h2" 
                variant="h3" 
                align="center" 
                gutterBottom 
                className="ourGoal-title"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  color: "#1f5795",
                  position: "relative"
                }}
              >
                Our Goal
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#64748b",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                The core principles that guide our mission and drive our commitment to excellence
              </Typography>
            </Box>
            <Grid container spacing={4} justifyContent="center">
              {aboutUs?.ourGoal?.map((goal, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={goal?.id}>
                  <Card 
                    className="ourGoal-card"
                    sx={{
                      height: "100%",
                      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid rgba(31, 87, 149, 0.08)",
                      borderRadius: "16px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translateY(0)",
                      opacity: 1,
                      animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(31, 87, 149, 0.15)",
                        border: "1px solid rgba(31, 87, 149, 0.15)"
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #1f5795 0%, #3f87df 50%, #52c41a 100%)",
                        borderRadius: "16px 16px 0 0"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: "center", position: "relative", zIndex: 1 }}>
                      <CardMedia
                        component="img"
                        image={goal?.imageSrc}
                        alt={goal?.cardHeader}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          margin: "0 auto 1.5rem",
                          p: 1,
                          backgroundColor: "rgba(31, 87, 149, 0.05)",
                          borderRadius: "12px"
                        }}
                        loading="lazy"
                      />
                      <Typography 
                        component="h3" 
                        variant="h6" 
                        className="cardHeader"
                        sx={{
                          fontWeight: 600,
                          color: "#1f5795",
                          fontSize: "1.1rem",
                          lineHeight: 1.3
                        }}
                      >
                        {goal?.cardHeader}
                      </Typography>
                      <Typography 
                        className="cardData"
                        sx={{
                          color: "#64748b",
                          lineHeight: 1.6,
                          fontSize: "0.95rem"
                        }}
                      >
                        {goal?.cardData}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#ffffff" }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography 
                component="h2" 
                variant="h3" 
                align="center" 
                gutterBottom 
                className="values-title"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  color: "#1f5795",
                  position: "relative"
                }}
              >
                Our Core Values
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#64748b",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                The principles that define our culture and guide our decisions every day
              </Typography>
            </Box>
            <Grid
              container
              spacing={4}
              alignItems="center"
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <OptimizedImage
                  src="/assets/about-second-section.png"
                  alt="Our Values"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  loading="lazy"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ pl: { md: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {aboutUs?.valuesAboutSection?.map((value, index) => (
                    <Box 
                      key={value?.id} 
                      sx={{ 
                        p: 3,
                        pl: 4,
                        position: 'relative',
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        border: "1px solid rgba(31, 87, 149, 0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "white",
                          borderColor: "#1f5795",
                          boxShadow: "0 8px 24px rgba(31, 87, 149, 0.15)",
                          transform: 'translateY(-4px)'
                        },
                        "&::before": {
                          content: '""',
                          position: 'absolute',
                          top: '5%',
                          bottom: '5%',
                          left: 0,
                          height: '90%',
                          width: 4,
                          background: 'linear-gradient(180deg, #1f5795 0%, #3f87df 100%)',
                          borderRadius: '0 4px 4px 0',
                          opacity: 0,
                          transition: 'opacity 0.25s ease'
                        },
                        "&:hover::before": {
                          opacity: 1
                        }
                      }}
                    >
                      <Typography 
                        component="h3" 
                        variant="h6" 
                        className="values-data-title"
                        sx={{
                          fontWeight: 700,
                          color: "#1f5795",
                          fontSize: "1.15rem",
                        }}
                      >
                        {value?.title}
                      </Typography>
                      <Typography 
                        className="values-data-description"
                        sx={{
                          color: "#475569",
                          lineHeight: 1.75,
                          fontSize: "0.975rem"
                        }}
                      >
                        {value?.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <FooterCommonPage
          title="Partner with Us for Your Next Big Idea"
          buttonText="Contact Now"
          buttonLink="/contact"
        />
      </>
    );
};

export default React.memo(About);
