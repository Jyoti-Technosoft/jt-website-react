import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Toolbar, Typography, Box, IconButton, Menu, MenuItem, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import "../styles/header.css";

const Header: React.FC = () => {
  // const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(null);
  const [developersAnchorEl, setDevelopersAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  // const handleServicesOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setServicesAnchorEl(event.currentTarget);
  // };

  // const handleServicesClose = () => {
  //   setServicesAnchorEl(null);
  // };

  const handleDevelopersOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDevelopersAnchorEl(event.currentTarget);
  };

  const handleDevelopersClose = () => {
    setDevelopersAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box position="static" className="header">
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
          <div
            className="menu-item"
            onMouseEnter={handleDevelopersOpen}
            onMouseLeave={handleDevelopersClose}
          >
            <NavLink to="/hire-developers" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Hire Developers</NavLink>
            <Menu
              anchorEl={developersAnchorEl}
              open={Boolean(developersAnchorEl)}
              onClose={handleDevelopersClose}
              MenuListProps={{ onMouseLeave: handleDevelopersClose }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ marginTop: "5px" }}
            >
              <MenuItem onClick={handleDevelopersClose}>Hire Angular Developer</MenuItem>
              <MenuItem onClick={handleDevelopersClose}>Hire React Developer</MenuItem>
              <MenuItem onClick={handleDevelopersClose}>Hire Java Developer</MenuItem>
            </Menu>
          </div>
          <NavLink to="/career" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Career</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>Contact</NavLink>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Header;
