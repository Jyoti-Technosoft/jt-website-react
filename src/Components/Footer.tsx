import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Stack, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import ScrollToTopButton from './ScrollToTopButton.tsx';
import "../styles/footer.css";

const Footer: React.FC = () => {
    return (
      <Box className="footer">
        <Container>
          <Grid
            className="subFooter1"
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Link href="/">
                <img
                  className="company-logo"
                  src="/assets/company-logo.png"
                  alt="Company Logo"
                />
              </Link>
              <Box className="subFooter1-first-col">
                <Typography
                  className="followus"
                  variant="body2"
                  component="p"
                  sx={{ textAlign: "left", paddingLeft: "3rem" }}
                >
                  Follow Us
                </Typography>
                <IconButton
                  className="social-media"
                  aria-label="facebook"
                  href="https://www.facebook.com/info.jyotitechnosoft/?ref=py_c"
                  target="_blank"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  className="social-media"
                  aria-label="instagram"
                  href="https://www.instagram.com/jyoti_technosoft_llp/"
                  target="_blank"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  className="social-media"
                  aria-label="github"
                  href="https://github.com/Jyoti-Technosoft"
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  className="social-media"
                  aria-label="linkedin"
                  href="https://in.linkedin.com/company/jyoti-technosoft"
                  target="_blank"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  className="social-media"
                  aria-label="twitter"
                  href="https://twitter.com/JyotiTechnosoft"
                  target="_blank"
                >
                  <XIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid mt={1} size={{ xs: 6, sm: 6, md: 2 }}>
              <Typography
                className="footermenu-header"
                variant="h6"
                component="h6"
                gutterBottom
              >
                Our Services
              </Typography>
              <Stack spacing={1}>
                <Link
                  className="footermenu"
                  href="/services/product-development"
                  underline="none"
                >
                  Product Development
                </Link>
                <Link
                  className="footermenu"
                  href="/services/mobile-development"
                  underline="none"
                >
                  Mobile Development
                </Link>
                <Link
                  className="footermenu"
                  href="/services/web-development"
                  underline="none"
                >
                  Web Development
                </Link>
                <Link
                  className="footermenu"
                  href="/services/customization"
                  underline="none"
                >
                  App Customization
                </Link>
                <Link
                  className="footermenu"
                  href="/services/consulting"
                  underline="none"
                >
                  Consulting
                </Link>
                <Link
                  className="footermenu"
                  href="/services/ai-integration"
                  underline="none"
                >
                  AI Agent Integration
                </Link>
              </Stack>
            </Grid>

            <Grid mt={1} size={{ xs: 6, sm: 6, md: 2 }}>
              <Typography
                className="footermenu-header"
                variant="h6"
                component="h6"
                gutterBottom
              >
                 Hire Developers
              </Typography>
              <Stack spacing={1}>
                <Link
                  className="footermenu"
                  href="/hire-developers/angular"
                  underline="none"
                >
                  Angular
                </Link>
                <Link
                  className="footermenu"
                  href="/hire-developers/react"
                  underline="none"
                >
                  React
                </Link>
                <Link
                  className="footermenu"
                  href="/hire-developers/java"
                  underline="none"
                >
                  Java
                </Link>
              </Stack>
            </Grid>

            <Grid mt={1} size={{ xs: 6, sm: 6, md: 2 }}>
              <Typography
                className="footermenu-header"
                variant="h6"
                component="h6"
                gutterBottom
              >
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link className="footermenu" href="/about" underline="none">
                  About Us
                </Link>
                <Link className="footermenu" href="/career" underline="none">
                  Career
                </Link>
                <Link className="footermenu" href="/our-work" underline="none">
                  Our Work
                </Link>
                <Link className="footermenu" href="/contact" underline="none">
                  Contact Us
                </Link>
                <Link className="footermenu" href="/site-map" underline="none">
                  Site Map
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <Grid size={{ xs: 12, md: 12 }} sx={{ borderTop: "1px solid #FFFFFF" }}>
          <Container>
            <Box mt={1} className="subFooter2">
              <Typography
                className="subFooter2-title1"
                variant="body2"
                component="p"
                sx={{ mb: 1 }}
              >
                Copyright © 2025 Jyoti Technosoft LLP.  All Rights Reserved.
              </Typography>
              <Link
                href="/privacy-policy"
                className="subFooter2-title2"
                underline="none"
                sx={{ mb: 1 }}
              >
                Privacy Policy
              </Link>
            </Box>
          </Container>
        </Grid>

        <ScrollToTopButton />
      </Box>
    );
};

export default Footer;