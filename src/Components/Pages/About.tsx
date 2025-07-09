import React, { useEffect } from "react";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { Helmet } from 'react-helmet';

import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import FooterCommonPage from "./shared/FooterCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/about.css";
import HeaderMainPage from "./shared/HeaderMainPage.tsx";

const About: React.FC = () => {

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const { aboutUs } = dataArray;
    return (
      <>
        <Helmet>
          <title>About Us | Jyoti Technosoft LLP</title>
          <meta name="description" content="Learn more about Jyoti Technosoft LLP, our mission, vision, and team of IT experts." />
          <meta property="og:title" content="About Us | Jyoti Technosoft LLP" />
          <meta property="og:description" content="Learn more about Jyoti Technosoft LLP, our mission, vision, and team of IT experts." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jyotitechnosoft.com/about" />
          <meta property="og:image" content="https://jyotitechnosoft.com/assets/logo192.png" />
          <link rel="canonical" href="https://jyotitechnosoft.com/about" />
        </Helmet>
        {/* <HeaderCommon smallTitle="About" page="About Us" /> */}
        <HeaderMainPage
          smallTitle="About"
          page="Innovate, Implement & Inspire"
          imageSrc="/assets/about-img.png"
          showGif={true}
        />
        <Container className="main-container" maxWidth="lg">
          <Grid mt={10} container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <img
                src="/assets/about-first-section.png"
                alt="Teamwork"
                style={{ width: "100%" }}
                loading="lazy"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                className="gettoKnowUsTitle"
                align="left"
                gutterBottom
              >
                {aboutUs.gettoKnowUsTitle}
              </Typography>
              {aboutUs.gettoKnowUs.map((item) => (
                <Typography className="gettoKnowUsDesc" key={item.id} paragraph>
                  {item.description}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Container>

        {/* Our Goal Section */}
        <div className="ourGoal-section">
          <Container className="main-container" maxWidth="lg">
            <Typography align="left" gutterBottom className="ourGoal-title">
              Our Goal
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              {aboutUs?.ourGoal?.map((goal) => (
                <Grid size={{ xs: 12, sm: 4 }} key={goal?.id}>
                  <Card className="ourGoal-card">
                    <CardMedia
                      component="img"
                      image={goal?.imageSrc}
                      alt={goal?.cardHeader}
                      className="cardMedia"
                      loading="lazy"
                    />
                    <CardContent className="cardContent">
                      <Typography className="cardHeader">
                        {goal?.cardHeader}
                      </Typography>
                      <Typography className="cardData">
                        {goal?.cardData}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>

        {/* Values Section */}
        <Container className="main-container">
          <Grid
            container
            className="values-section"
            spacing={4}
            alignItems="center"
            sx={{ padding: 5 }}
          >
            <Grid className="values-second-img" size={{ xs: 12, md: 6 }}>
              <img
                src="/assets/about-second-section.png"
                alt="Teamwork"
                style={{ width: "100%" }}
                loading="lazy"
              />
            </Grid>
            <Grid className="values-data-main-section" size={{ xs: 12, md: 6 }}>
              <Typography className="values-title">Values</Typography>
              <Grid container spacing={2}>
                {aboutUs?.valuesAboutSection?.map((value) => (
                  <Grid size={{ xs: 12 }} key={value?.id}>
                    <Box className="values-data-section">
                      <Typography className="values-data-title">
                        {value?.title}
                      </Typography>
                      <Typography className="values-data-description">
                        {value?.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <FooterCommonPage
          title="Partner with Us for Your Next Big Idea"
          buttonText="Contact Now"
          buttonLink="/contact"
        />
      </>
    );
};

export default About;
