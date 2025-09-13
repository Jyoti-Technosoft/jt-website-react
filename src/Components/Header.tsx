import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../styles/header.css";
import { servicesMenu, developersMenu, topLevelTabs } from "./config/menu.ts";

const Header: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDevelopersDropdownOpen, setIsDevelopersDropdownOpen] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [expandServices, setExpandServices] = useState(false);
  const [expandDevelopers, setExpandDevelopers] = useState(false);

  // Memoized drawer toggle to satisfy exhaustive-deps
  const handleDrawerToggle = React.useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDesktop && openDrawer) {
      handleDrawerToggle();
    }
  }, [isDesktop, openDrawer, handleDrawerToggle]);

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
            Innovate, Implement & Inspire
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
                {servicesMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="navLink"
                    onClick={handleDrawerToggle}
                  >
                    {item.label}
                  </NavLink>
                ))}

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
                {developersMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="navLink"
                    onClick={handleDrawerToggle}
                  >
                    {item.label}
                  </NavLink>
                ))}

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
            aria-haspopup="true"
            aria-expanded={isServicesDropdownOpen}
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
                role="menu"
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
                {servicesMenu.map(({ label, path }) => (
                  <Box
                    key={path}
                    role="menuitem"
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
            aria-haspopup="true"
            aria-expanded={isDevelopersDropdownOpen}
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
                role="menu"
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
                {developersMenu.map(({ label, path }) => (
                  <Box
                    key={path}
                    role="menuitem"
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

          {topLevelTabs
            .filter((t) => !t.children && ["Career", "About", "Contact"].includes(t.label))
            .map((t) => (
              <Box key={t.label}>
                <NavLink
                  to={t.path}
                  className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
                >
                  {t.label}
                </NavLink>
              </Box>
            ))}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default React.memo(Header);