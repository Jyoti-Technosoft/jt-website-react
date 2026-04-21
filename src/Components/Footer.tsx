import React from 'react';
import { Box, Typography, Link, IconButton, Stack, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CodeOutlined from '@mui/icons-material/CodeOutlined';

import ScrollToTopButton from './ScrollToTopButton.tsx';
import { servicesMenu, developersMenu, solutionsMenu } from "./config/menu.ts";
import "../styles/footer.css";

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Container maxWidth="xl">
        <Box className="subFooter1">
          {/* Company Info & Social Media */}
          <Box className="footer-company-section">
            <Link href="/" className="footer-logo-link">
              <img
                className="company-logo"
                src="/assets/company-logo.png"
                alt="Jyoti Technosoft LLP"
              />
            </Link>
            <Typography className="footer-description" variant="body2">
              Transform your business with cutting-edge web development, mobile apps, and AI solutions. 
              We deliver innovative technology solutions that drive growth and success.
            </Typography>
            <Box className="footer-social">
              <Typography className="followus" variant="body2">
                Connect With Us
              </Typography>
              <Box className="social-icons">
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
                <IconButton
                  className="social-media"
                  aria-label="github"
                  href="https://github.com/Jyoti-Technosoft"
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box className="footer-menus">
            {/* Services Column */}
            <Box className="footer-column">
              <Box className="footer-header">
                <BusinessIcon className="footer-header-icon" />
                <Typography className="footermenu-header" variant="h6">
                  Our Services
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                {servicesMenu.map((item) => (
                  <Link
                    key={item.path}
                    className="footermenu"
                    component={RouterLink}
                    to={item.path}
                    underline="none"
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Development Column */}
            <Box className="footer-column">
              <Box className="footer-header">
                <CodeOutlined className="footer-header-icon" />
                <Typography className="footermenu-header" variant="h6">
                  Development
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                {developersMenu.map((item) => (
                  <Link
                    key={item.path}
                    className="footermenu"
                    component={RouterLink}
                    to={item.path}
                    underline="none"
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Solutions Column */}
            <Box className="footer-column">
              <Box className="footer-header">
                <WorkIcon className="footer-header-icon" />
                <Typography className="footermenu-header" variant="h6">
                  Solutions
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                {solutionsMenu.map((item) => (
                  <Link
                    key={item.path}
                    className="footermenu"
                    component={RouterLink}
                    to={item.path}
                    underline="none"
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Quick Links Column */}
            <Box className="footer-column">
              <Box className="footer-header">
                <ContactSupportIcon className="footer-header-icon" />
                <Typography className="footermenu-header" variant="h6">
                  Quick Links
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                <Link className="footermenu" component={RouterLink} to="/about" underline="none">
                  About Us
                </Link>
                <Link className="footermenu" component={RouterLink} to="/career" underline="none">
                  Career
                </Link>
                 <Link
                  className="footermenu"
                  component={RouterLink}
                  to="/hire-developers"
                  underline="none"
                >
                  View All Expert Roles
                </Link>
                <Link className="footermenu" component={RouterLink} to="/contact" underline="none">
                  Contact Us
                </Link>
                <Link className="footermenu" component={RouterLink} to="/privacy-policy" underline="none">
                  Privacy Policy
                </Link>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom Footer */}
      <Box className="footer-bottom">
        <Container maxWidth="xl">
          <Box className="subFooter2">
            <Typography className="subFooter2-title1" variant="body2">
              2025 Jyoti Technosoft LLP. All Rights Reserved.
            </Typography>
            <Typography className="subFooter2-title2" variant="body2">
              Innovating Digital Solutions Since 2021
            </Typography>
          </Box>
        </Container>
      </Box>

      <ScrollToTopButton />
    </Box>
  );
};

export default Footer;