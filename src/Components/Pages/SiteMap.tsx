import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import GamepadIcon from '@mui/icons-material/Gamepad';
import HeaderCommon from "./shared/HeaderCommonPage.tsx";
import dataArray from "../../jt-website.json";
import "../../styles/site-map.css";

const SiteMap: React.FC = () => {
  const jobs = dataArray?.jobs || [];
  const middleIndex = Math.ceil(jobs.length / 2);
  const leftColumn = jobs.slice(0, middleIndex);
  const rightColumn = jobs.slice(middleIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const BulletIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginRight: 8 }}
    >
      <rect x="11" y="1" width="2.5" height="6" fill="#347CCC" />
      <rect x="11" y="17" width="2.5" height="6" fill="#347CCC" />
      <rect x="17" y="11" width="6" height="2.5" fill="#347CCC" />
      <rect x="1" y="11" width="6" height="2.5" fill="#347CCC" />
      <rect x="11" y="11" width="2.5" height="2.5" fill="#347CCC" />
    </svg>
  );

  return (
    <Box className="site-map-main">
      <HeaderCommon smallTitle="Site Map" page="Site Map" />

      <Box
        sx={{
          backgroundColor: "#fff",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Container>
          <Typography
            className="sitemap-main-description"
            align="center"
            sx={{ mb: 4 }}
          >
            Your search assistant to make navigation{" "}
            <Typography component="span" color="primary" fontWeight="bold">
              easier
            </Typography>{" "}
            throughout the website.
          </Typography>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Typography className="sitemap-header">Home</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <Typography className="sitemap-header">Services</Typography>
              <Grid container>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <List sx={{ pl: { xs: 2, sm: 5 } }}>
                    {[
                      {
                        label: "Web Development",
                        path: "/services/web-development",
                      },
                      {
                        label: "Mobile Development",
                        path: "/services/mobile-development",
                      },
                      {
                        label: "API Integration",
                        path: "/services/api-integration",
                      },
                      {
                        label: "Customization",
                        path: "/services/customization",
                      },
                    ].map(({ label, path }) => (
                      <ListItem key={label} disablePadding>
                        <ListItemText
                          primary={
                            <Link
                              to={path}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {/* <span className="sitemap-list-text">
                                <span className="sitemap-dot">•</span> {label}
                              </span> */}
                              <span className="sitemap-list-text">
                                <GamepadIcon
                                  sx={{ fontSize: 14, color: "#347CCC" }}
                                />{" "}
                                {label}
                              </span>
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <List dense sx={{ pl: { xs: 2, sm: 5 } }}>
                    {[
                      {
                        label: "Product Development",
                        path: "/services/product-development",
                      },
                      { label: "Deployment", path: "/services/deployment" },
                      { label: "Consulting", path: "/services/consulting" },
                      { label: "AI Agent Integration", path: "/services/ai-integration" },
                    ].map(({ label, path }) => (
                      <ListItem key={label} disablePadding>
                        <ListItemText
                          primary={
                            <Link
                              to={path}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <span className="sitemap-list-text">
                                <GamepadIcon
                                  sx={{ fontSize: 14, color: "#347CCC" }}
                                />{" "}
                                {label}
                              </span>
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Typography className="sitemap-header">Our Work</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography className="sitemap-header">
                Hire Developers
              </Typography>
              <List dense sx={{ pl: { xs: 2, sm: 5 } }}>
                {[
                  "Hire Angular Developer",
                  "Hire React Developer",
                  "Hire Java Developer",
                ].map((item) => {
                  const tech = item.split(" ")[1].toLowerCase();
                  return (
                    <ListItem key={item} disablePadding>
                      <ListItemText
                        primary={
                          <Link
                            to={`/hire-developers/${tech}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {/* <span className="sitemap-list-text">
                              <span className="sitemap-dot">•</span> {item}
                            </span> */}
                            <span className="sitemap-list-text">
                              <GamepadIcon
                                sx={{ fontSize: 14, color: "#347CCC" }}
                              />{" "}
                              {item}
                            </span>
                          </Link>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <Typography className="sitemap-header">Career</Typography>
              <Grid container>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <List dense sx={{ pl: { xs: 2, sm: 5 } }}>
                    {leftColumn.map((job) => (
                      <ListItem key={job.id} disablePadding>
                        <ListItemText
                          primary={
                            <Link
                              to={`/career-details?job=${job.id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {/* <span className="sitemap-list-text">
                                <span className="sitemap-dot">•</span>{" "}
                                {job.jobName}
                              </span> */}
                              <span className="sitemap-list-text">
                                <GamepadIcon
                                  sx={{ fontSize: 14, color: "#347CCC" }}
                                />{" "}
                                {job.jobName}
                              </span>
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <List dense sx={{ pl: { xs: 2, sm: 0 } }}>
                    {rightColumn.map((job) => (
                      <ListItem key={job.id} disablePadding>
                        <ListItemText
                          primary={
                            <Link
                              to={`/career-details?job=${job.id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {/* <span className="sitemap-list-text">
                                <span className="sitemap-dot">•</span>{" "}
                                {job.jobName}
                              </span> */}
                              <span className="sitemap-list-text">
                                <GamepadIcon
                                  sx={{ fontSize: 14, color: "#347CCC" }}
                                />{" "}
                                {job.jobName}
                              </span>
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Typography className="sitemap-header">About</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Typography className="sitemap-header">Contact</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SiteMap;
