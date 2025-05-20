import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation  } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "../styles/header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isServicesTabActive = location.pathname.startsWith("/services");
  const isDevelopersTabActive = location.pathname.startsWith("/hire-developers");

  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(
    null
  );
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

  const handleServicesMenuEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handleServicesMenuLeave = () => {
    const timeout = setTimeout(() => {
      setServicesAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

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

  const openServicesMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (servicesHoverTimeout) clearTimeout(servicesHoverTimeout);
    setServicesAnchorEl(event.currentTarget);
  };

  const closeServicesMenu = () => {
    const timeout = setTimeout(() => {
      setServicesAnchorEl(null);
    }, 200);
    setServicesHoverTimeout(timeout);
  };

  const cancelCloseServicesMenu = () => {
    if (servicesHoverTimeout) clearTimeout(servicesHoverTimeout);
  };

  const openDevelopersMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (developersHoverTimeout) clearTimeout(developersHoverTimeout);
    setDevelopersAnchorEl(event.currentTarget);
  };

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

  const handleDevelopersClick = () => {
    setDevelopersAnchorEl(null);
  };

  return (
    <Box className={`header ${showShadow ? "header-shadow" : ""}`}>
      <Toolbar className="container">
        <Typography className="title">
          <span className="subTitle1">JYOTI </span>
          <span className="subTitle2">Technosoft LLP</span>
        </Typography>

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Home
            </NavLink>
            <Box
              className="menu-item"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
              sx={{ position: "relative" }}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
                onClick={handleServicesClick}
                style={{ zIndex: 2, position: "relative" }}
              >
                Services
              </NavLink>

              <Menu
                anchorEl={servicesAnchorEl}
                open={Boolean(servicesAnchorEl) && isServicesTabActive}
                onClose={() => setServicesAnchorEl(null)}
                onMouseEnter={cancelCloseServicesMenu}
                onMouseLeave={closeServicesMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ marginTop: "5px", zIndex: 1300 }}
              ></Menu>
            </Box>

            <NavLink
              to="/our-work"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
            >
              Our Work
            </NavLink>
            <Box
              className="menu-item"
              onMouseEnter={openDevelopersMenu}
              onMouseLeave={closeDevelopersMenu}
              sx={{ position: "relative" }}
            >
              <NavLink
                to="/hire-developers"
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
                onClick={handleDevelopersClick}
                style={{ zIndex: 2, position: "relative" }}
              >
                Hire Developers
              </NavLink>

              <Menu
                anchorEl={developersAnchorEl}
                open={Boolean(developersAnchorEl)}
                onClose={() => setDevelopersAnchorEl(null)}
                onMouseEnter={cancelCloseDevelopersMenu}
                onMouseLeave={closeDevelopersMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ marginTop: "5px", zIndex: 1300 }}
              >
              </Menu>
            </Box>
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
          >
            Home
          </NavLink>

          <Box
            className="menu-item"
            onMouseEnter={handleServicesHover}
            onMouseLeave={handleServicesLeave}
            sx={{ position: "relative" }}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
              onClick={() => setServicesAnchorEl(null)}
              style={{ zIndex: 2, position: "relative" }}
            >
              Services
            </NavLink>

            <Menu
              anchorEl={servicesAnchorEl}
              open={Boolean(servicesAnchorEl)}
              onClose={() => setServicesAnchorEl(null)}
              onMouseEnter={handleServicesMenuEnter}
              onMouseLeave={handleServicesMenuLeave}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ marginTop: "5px", zIndex: 1300 }}
              PaperProps={{
                style: {
                  maxHeight: "none",
                  height: "auto",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/web-development");
                }}
              >
                Web Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/app-development");
                }}
              >
                App Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/api-integration");
                }}
              >
                API Integration
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/customization");
                }}
              >
                Customization
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/product-development");
                }}
              >
                Product Development
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/deployment");
                }}
              >
                Deployment
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setServicesAnchorEl(null);
                  navigate("/services/consulting");
                }}
              >
                Consulting
              </MenuItem>
            </Menu>
          </Box>

          <NavLink
            to="/our-work"
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
          >
            Our Work
          </NavLink>

          <Box
            className="menu-item"
            onMouseEnter={handleDevelopersHover}
            onMouseLeave={handleDevelopersLeave}
            sx={{ position: "relative" }}
          >
            <NavLink
              to="/hire-developers"
              className={({ isActive }) =>
                isActive ? "navLink active" : "navLink"
              }
              onClick={() => setDevelopersAnchorEl(null)}
              style={{ zIndex: 2, position: "relative" }}
            >
              Hire Developers
            </NavLink>

            <Menu
              anchorEl={developersAnchorEl}
              open={Boolean(developersAnchorEl)}
              onClose={() => setDevelopersAnchorEl(null)}
              onMouseEnter={handleDevelopersMenuEnter}
              onMouseLeave={handleDevelopersMenuLeave}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ marginTop: "5px", zIndex: 1300 }}
            >
              <MenuItem
                onClick={() => {
                  setDevelopersAnchorEl(null);
                  navigate("/hire-developers/angular");
                }}
              >
                Hire Angular Developer
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDevelopersAnchorEl(null);
                  navigate("/hire-developers/react");
                }}
              >
                Hire React Developer
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDevelopersAnchorEl(null);
                  navigate("/hire-developers/java");
                }}
              >
                Hire Java Developer
              </MenuItem>
            </Menu>
          </Box>
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
      </Toolbar>
    </Box>
  );
};

export default Header;
