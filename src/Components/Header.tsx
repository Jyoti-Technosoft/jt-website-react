import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Toolbar, Typography, Box, IconButton, Menu, MenuItem, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import "../styles/header.css";

const Header: React.FC = () => {
  // const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);
  const [developersAnchorEl, setDevelopersAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // const handleServicesOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setServicesAnchorEl(event.currentTarget);
  // };

  // const handleServicesClose = () => {
  //   setServicesAnchorEl(null);
  // };

  const handleDevelopersHover = (event: React.MouseEvent<HTMLElement>) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setDevelopersAnchorEl(event.currentTarget);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDevelopersLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setDevelopersAnchorEl(null);
  };

  const handleMenuCloseWithDelay = () => {
    const timeout = setTimeout(() => {
      setDevelopersAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleMenuEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box className="header">
      <Toolbar className="container">
        <Typography className="title">
          <span className='subTitle1'>JYOTI </span>
          <span className='subTitle2'>Technosoft LLP</span>
        </Typography>

        {/* Mobile Menu Icon */}
        <IconButton className="menu-icon" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
          <Box
            role="presentation"
            className="drawer-menu"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
          >
            <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Services</NavLink>
            <NavLink to="/our-work" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Our Work</NavLink>
            <NavLink to="/hire-developers" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Hire Developers</NavLink>
            <NavLink to="/career" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Career</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Contact</NavLink>
          </Box>
        </Drawer>

        {/* Desktop Menu */}
        <Box className="header-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Services</NavLink>
          {/* <div
            className="menu-item"
            onMouseEnter={handleServicesOpen}
            onMouseLeave={handleServicesClose}
          >
            <NavLink to="/services" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Services</NavLink>
            <Menu
              anchorEl={servicesAnchorEl}
              open={Boolean(servicesAnchorEl)}
              onClose={handleServicesClose}
              MenuListProps={{ onMouseLeave: handleServicesClose }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ marginTop: "5px" }}
            >
              <MenuItem onClick={handleServicesClose}>Web Development</MenuItem>
              <MenuItem onClick={handleServicesClose}>App Development</MenuItem>
              <MenuItem onClick={handleServicesClose}>API Integration</MenuItem>
              <MenuItem onClick={handleServicesClose}>Customization</MenuItem>
              <MenuItem onClick={handleServicesClose}>Product Development</MenuItem>
              <MenuItem onClick={handleServicesClose}>Deployment</MenuItem>
              <MenuItem onClick={handleServicesClose}>Consulting</MenuItem>
            </Menu>
          </div> */}

          <NavLink to="/our-work" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Our Work</NavLink>
          {/* Hire Developers Dropdown */}
          <Box
            className="menu-item"
            onMouseEnter={handleDevelopersHover}
            onMouseLeave={handleMenuCloseWithDelay}
            sx={{ position: 'relative' }}
          >
            <NavLink
              to="/hire-developers"
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
              onClick={() => setDevelopersAnchorEl(null)}
              style={{ zIndex: 2, position: 'relative' }}
            >
              Hire Developers
            </NavLink>

            {/* <Menu
              anchorEl={developersAnchorEl}
              open={Boolean(developersAnchorEl)}
              onClose={() => setDevelopersAnchorEl(null)}
              MenuListProps={{
                onMouseEnter: handleMenuEnter,
                onMouseLeave: handleMenuCloseWithDelay,
                autoFocusItem: false,
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ marginTop: "5px", zIndex: 1 }}
            >
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire Angular Developer</MenuItem>
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire React Developer</MenuItem>
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire Java Developer</MenuItem>
            </Menu> */}
            <Menu
              anchorEl={developersAnchorEl}
              open={Boolean(developersAnchorEl)}
              onClose={() => setDevelopersAnchorEl(null)}
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuCloseWithDelay}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ marginTop: '5px', zIndex: 1 }}
            >
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire Angular Developer</MenuItem>
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire React Developer</MenuItem>
              <MenuItem onClick={() => setDevelopersAnchorEl(null)}>Hire Java Developer</MenuItem>
            </Menu>
          </Box>
          <NavLink to="/career" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Career</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Contact</NavLink>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
