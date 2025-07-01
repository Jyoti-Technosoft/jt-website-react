import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "../styles/header.css";

const Header: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const isServicesTabActive = location.pathname.startsWith("/services");
  const isDevelopersTabActive =
    location.pathname.startsWith("/hire-developers");

  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDevelopersDropdownOpen, setIsDevelopersDropdownOpen] =
    useState(false);
  const [developersAnchorEl, setDevelopersAnchorEl] =
    useState<null | HTMLElement>(null);
  const [servicesHoverTimeout, setServicesHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [developersHoverTimeout, setDevelopersHoverTimeout] =
    useState<ReturnType<typeof setTimeout> | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [showShadow, setShowShadow] = useState(false);
  const [expandServices, setExpandServices] = useState(false);
  const [expandDevelopers, setExpandDevelopers] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesHover = (event: React.MouseEvent<HTMLElement>) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesLeave = () => {
    const timeout = setTimeout(() => {
      setServicesAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  // const handleServicesMenuEnter = () => {
  //   if (hoverTimeout) clearTimeout(hoverTimeout);
  // };

  // const handleServicesMenuLeave = () => {
  //   const timeout = setTimeout(() => {
  //     setServicesAnchorEl(null);
  //   }, 200);
  //   setHoverTimeout(timeout);
  // };

  const handleDevelopersHover = (event: React.MouseEvent<HTMLElement>) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setDevelopersAnchorEl(event.currentTarget);
  };

  const handleDevelopersLeave = () => {
    const timeout = setTimeout(() => {
      setDevelopersAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDevelopersMenuEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handleDevelopersMenuLeave = () => {
    const timeout = setTimeout(() => {
      setDevelopersAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  // const openServicesMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   if (servicesHoverTimeout) clearTimeout(servicesHoverTimeout);
  //   setServicesAnchorEl(event.currentTarget);
  // };

  const closeServicesMenu = () => {
    const timeout = setTimeout(() => {
      setServicesAnchorEl(null);
    }, 200);
    setServicesHoverTimeout(timeout);
  };

  const cancelCloseServicesMenu = () => {
    if (servicesHoverTimeout) clearTimeout(servicesHoverTimeout);
  };

  // const openDevelopersMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   if (developersHoverTimeout) clearTimeout(developersHoverTimeout);
  //   setDevelopersAnchorEl(event.currentTarget);
  // };

  const closeDevelopersMenu = () => {
    const timeout = setTimeout(() => {
      setDevelopersAnchorEl(null);
    }, 200);
    setDevelopersHoverTimeout(timeout);
  };

  const cancelCloseDevelopersMenu = () => {
    if (developersHoverTimeout) clearTimeout(developersHoverTimeout);
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
  };

  // const handleDevelopersClick = () => {
  //   setDevelopersAnchorEl(null);
  // };
  const handleDevelopersClick = (event: React.MouseEvent<HTMLElement>) => {
    setDevelopersAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (isDesktop && openDrawer) {
      handleDrawerToggle();
    }
  }, [isDesktop]);

  useEffect(() => {
    setServicesAnchorEl(null);
    setDevelopersAnchorEl(null);
  }, [location.pathname]);

  return (
    <Box className={`header ${showShadow ? "header-shadow" : ""}`}>
      <Toolbar className="container">
        <Box>
          <Typography
            className="title"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            <span className="subTitle1">JYOTI </span>
            <span className="subTitle2">Technosoft LLP</span>
          </Typography>
          <Box className="subtitle" sx={{ textAlign: "right" }}>
            Innovate, Inspire And Services
          </Box>
        </Box>

        <IconButton className="menu-icon" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
          <Box
            role="presentation"
            className="drawer-menu"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            <Box
              className="drawer-close"
              onClick={(e) => {
                e.stopPropagation();
                handleDrawerToggle();
              }}
            >
              <CloseIcon fontSize="medium" />
            </Box>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Home
            </NavLink>

            <Box
              className="navLink"
              onClick={(e) => {
                e.stopPropagation();
                setExpandServices((prev) => !prev);
              }}
            >
              <span>Services</span>
              <span className="toggle-icon">
                {expandServices ? (
                  <RemoveIcon fontSize="small" color="primary" />
                ) : (
                  <AddIcon fontSize="small" color="primary" />
                )}
              </span>
            </Box>
            {expandServices && (
              <Box className="subLinks" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to="/services/web-development"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Web Development
                </NavLink>
                <NavLink
                  to="/services/mobile-development"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  App Development
                </NavLink>
                <NavLink
                  to="/services/api-integration"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  API Integration
                </NavLink>
                <NavLink
                  to="/services/customization"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Customization
                </NavLink>
                <NavLink
                  to="/services/product-development"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Product Development
                </NavLink>
                <NavLink
                  to="/services/deployment"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Deployment
                </NavLink>
                <NavLink
                  to="/services/consulting"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Consulting
                </NavLink>
                <NavLink
                  to="/services/ai-integration"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  AI Agent Integration
                </NavLink>
              </Box>
            )}

            <NavLink
              to="/our-work"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Our Work
            </NavLink>

            <Box
              className="navLink"
              onClick={(e) => {
                e.stopPropagation();
                setExpandDevelopers((prev) => !prev);
              }}
            >
              <span>Hire Developers</span>
              <span className="toggle-icon">
                {expandDevelopers ? (
                  <RemoveIcon fontSize="small" color="primary" />
                ) : (
                  <AddIcon fontSize="small" color="primary" />
                )}
              </span>
            </Box>
            {expandDevelopers && (
              <Box className="subLinks" onClick={(e) => e.stopPropagation()}>
                <NavLink
                  to="/hire-developers/angular"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Hire Angular Developer
                </NavLink>
                <NavLink
                  to="/hire-developers/react"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Hire React Developer
                </NavLink>
                <NavLink
                  to="/hire-developers/java"
                  className="navLink"
                  onClick={handleDrawerToggle}
                >
                  Hire Java Developer
                </NavLink>
              </Box>
            )}

            <NavLink
              to="/career"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Career
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Contact
            </NavLink>
          </Box>
        </Drawer>

        <Box className="header-menu">
          <Box>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Home
            </NavLink>
          </Box>
          <Box
            className="menu-item"
            sx={{ position: "relative" }}
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Services
            </NavLink>

            {isServicesDropdownOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  height: "30px",
                  zIndex: 10,
                }}
              />
            )}

            {isServicesDropdownOpen && (
              <Box
                className="custom-dropdown"
                sx={{
                  position: "absolute",
                  top: "170%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  zIndex: 1,
                  minWidth: 200,
                  py: 1,
                }}
              >
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
                  { label: "Customization", path: "/services/customization" },
                  {
                    label: "Product Development",
                    path: "/services/product-development",
                  },
                  { label: "Deployment", path: "/services/deployment" },
                  { label: "Consulting", path: "/services/consulting" },
                  {
                    label: "AI Agent Integration",
                    path: "/services/ai-integration",
                  },
                ].map(({ label, path }) => (
                  <Box
                    key={path}
                    onClick={() => {
                      setIsServicesDropdownOpen(false);
                      navigate(path);
                    }}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box>
            <NavLink
              to="/our-work"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Our Work
            </NavLink>
          </Box>
          <Box
            className="menu-item"
            sx={{ position: "relative" }}
            onMouseEnter={() => setIsDevelopersDropdownOpen(true)}
            onMouseLeave={() => setIsDevelopersDropdownOpen(false)}
          >
            <NavLink
              to="/hire-developers"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Hire Developers
            </NavLink>

            {isDevelopersDropdownOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  height: "30px",
                  zIndex: 10,
                }}
              />
            )}

            {isDevelopersDropdownOpen && (
              <Box
                className="custom-dropdown"
                sx={{
                  position: "absolute",
                  top: "170%",
                  left: 0,
                  backgroundColor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  zIndex: 9,
                  minWidth: 200,
                  py: 1,
                }}
              >
                {[
                  {
                    label: "Hire Angular Developer",
                    path: "/hire-developers/angular",
                  },
                  {
                    label: "Hire React Developer",
                    path: "/hire-developers/react",
                  },
                  {
                    label: "Hire Java Developer",
                    path: "/hire-developers/java",
                  },
                ].map(({ label, path }) => (
                  <Box
                    key={path}
                    onClick={() => {
                      setIsDevelopersDropdownOpen(false);
                      navigate(path);
                    }}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {["Career", "About", "Contact"].map((label) => (
            <Box>
              <NavLink
                key={label}
                to={`/${label.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
              >
                {label}
              </NavLink>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
