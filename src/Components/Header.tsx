import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductsIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PeopleIcon from "@mui/icons-material/People";

import { developersMenu, topLevelTabs } from "./config/menu.ts";
import jtWebsiteData from "../jt-website.json";
import "../styles/header.css";
import "../styles/header-animations.css";

const Header: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [isWhatWeDoDropdownOpen, setIsWhatWeDoDropdownOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [expandWhatWeDo, setExpandWhatWeDo] = useState(false);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic subtitle based on current page
  const getSubtitle = () => {
    const path = location.pathname;
    if (path === '/products') {
      return "Building Innovative Solutions for Your Business";
    } else if (path === '/our-work') {
      return "Showcasing Our Exceptional Projects";
    } else if (path === '/services') {
      return "Delivering Excellence in Every Service";
    } else {
      return "Innovate, Implement & Inspire";
    }
  };

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
        <div>
          <div
            className="title"
            onClick={() => navigate("/")}
          >
            <span className="subTitle1">JYOTI </span>
            <span className="subTitle2">Technosoft LLP</span>
          </div>
          <div className="subtitle">
            {getSubtitle()}
          </div>
        </div>

        <IconButton className="menu-icon" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={openDrawer} onClose={handleDrawerToggle}>
          <div
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
                setExpandWhatWeDo((prev) => !prev);
              }}
            >
              <span>Solutions</span>
              <span className="toggle-icon">
                {expandWhatWeDo ? (
                  <RemoveIcon fontSize="small" color="primary" />
                ) : (
                  <AddIcon fontSize="small" color="primary" />
                )}
              </span>
            </Box>
            {expandWhatWeDo && (
              <Box className="subLinks" onClick={(e) => e.stopPropagation()}>
                {/* Products Section */}
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    color: '#347CCC', 
                  }}>
                    Products
                  </Typography>
                  {jtWebsiteData.products?.slice(0, 4).map(product => (
                    <Box key={product.productId} sx={{ pl: 3 }}>
                      <NavLink
                        to={`/products/${product.productName.toLowerCase()}`}
                        className="navLink"
                        onClick={handleDrawerToggle}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.productName}
                        </Typography>
                      </NavLink>
                    </Box>
                  ))}
                  <Box sx={{ pl: 3 }}>
                    <NavLink
                      to="/products"
                      className="navLink"
                      onClick={handleDrawerToggle}
                    >
                      <Typography sx={{ color: '#347CCC', fontWeight: 'bold', fontSize: '14px' }}>
                        View More Products
                      </Typography>
                    </NavLink>
                  </Box>
                </Box>

                {/* Development Section */}
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    color: '#347CCC', 
                  }}>
                    Development
                  </Typography>
                  {[
                    { label: 'Web Solutions', path: '/services/web-development' },
                    { label: 'Mobile Apps', path: '/services/mobile-development' },
                    { label: 'Product Engineering', path: '/services/product-development' }
                  ].map((item) => (
                    <Box key={item.path} sx={{ pl: 3 }}>
                      <NavLink
                        to={item.path}
                        className="navLink"
                        onClick={handleDrawerToggle}
                      >
                        {item.label}
                      </NavLink>
                    </Box>
                  ))}
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ 
                      fontWeight: 600, 
                      color: '#347CCC', 
                    }}>
                      Integrations
                    </Typography>
                    {[
                      { label: 'API Solutions', path: '/services/api-integration' },
                      { label: 'AI Agent Services', path: '/services/ai-integration' }
                    ].map((item) => (
                      <Box key={item.path} sx={{ pl: 3 }}>
                        <NavLink
                          to={item.path}
                          className="navLink"
                          onClick={handleDrawerToggle}
                        >
                          {item.label}
                        </NavLink>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Consulting & Support Section */}
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    color: '#347CCC', 
                  }}>
                    Consulting & Support
                  </Typography>
                  {[
                    { label: 'Deployment', path: '/services/deployment' },
                    { label: 'Consulting', path: '/services/consulting' },
                    { label: 'Customization', path: '/services/customization' }
                  ].map((item) => (
                    <Box key={item.path} sx={{ pl: 3 }}>
                      <NavLink
                        to={item.path}
                        className="navLink"
                        onClick={handleDrawerToggle}
                      >
                        {item.label}
                      </NavLink>
                    </Box>
                  ))}
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ 
                      fontWeight: 600, 
                      color: '#347CCC', 
                    }}>
                      Hire Experts
                    </Typography>
                    {developersMenu.map((item) => (
                      <Box key={item.path} sx={{ pl: 3 }}>
                        <NavLink
                          to={item.path}
                          className="navLink"
                          onClick={handleDrawerToggle}
                        >
                          {item.label}
                        </NavLink>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Services Section */}
                <Box sx={{ mb: 1 }}>
                  <NavLink
                    to="/our-work"
                    className="navLink"
                    onClick={handleDrawerToggle}
                    style={{ 
                      fontWeight: 600, 
                      color: '#347CCC',
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    Services
                  </NavLink>
                </Box>
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
          </div>
        </Drawer>

        <div className="header-menu">
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
            onMouseEnter={() => setIsWhatWeDoDropdownOpen(true)}
            onMouseLeave={() => setIsWhatWeDoDropdownOpen(false)}
          >
            <Box
              className={location.pathname.startsWith('/products') || location.pathname.startsWith('/our-work') || location.pathname.startsWith('/services') ? "navLink active" : "navLink"}
              aria-haspopup="true"
              aria-expanded={isWhatWeDoDropdownOpen}
              aria-controls="solutions-menu"
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#347CCC',
                }
              }}
            >
              Solutions
              <ChevronDownIcon sx={{ fontSize: 18 }} />
            </Box>

            {isWhatWeDoDropdownOpen && (
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

            {isWhatWeDoDropdownOpen && (
              <Box
                id="solutions-menu"
                sx={{
                  position: "absolute",
                  top: "200%",
                  left: "50%",
                  transform: isWhatWeDoDropdownOpen
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-10px)",
                  background: "white",
                  boxShadow: "0 12px 48px rgba(31, 38, 135, 0.15)",
                  borderRadius: 3,
                  zIndex: 1,
                  minWidth: 1000,
                  py: 2,
                  px: 2,
                  border: "1px solid rgba(52, 124, 204, 0.15)",
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
                  {/* Column 1: Products */}
                  <Box sx={{ minWidth: 250, borderRight: '1px solid #eee', pr: 3, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        component="a"
                        role="menuitem"
                        onClick={() => {
                          setIsWhatWeDoDropdownOpen(false);
                          navigate('/products');
                        }}
                        sx={{ 
                          px: 3,
                          color: '#347CCC', 
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          "&:hover": {
                            backgroundColor: 'rgba(52, 124, 204, 0.08)',
                            transform: 'translateX(2px)',
                          },
                        }}
                      >
                        <ProductsIcon sx={{ fontSize: 24, fontWeight: 600, color: '#347CCC' }} />
                        Products
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 7 }}>
                        Ready-to-use solutions
                      </Typography>
                      <Box sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {/* Dynamic Products - Show max 4 */}
                      {jtWebsiteData.products?.slice(0, 4).map((product: any) => (
                        <Box
                          key={product.productId}
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate(`/products/${product.productName.toLowerCase()}`);
                          }}
                          sx={{
                            px: 3,
                            cursor: "pointer",
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              backgroundColor: '#eef5ff',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              color: '#347CCC',
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '14px' }}>
                            {product.productName}
                          </Typography>
                          <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666' }}>
                            {product.productName === 'SiteSync' ? 'Construction Management Solutions' : 'AI Powered Learning Solutions'}
                          </Typography>
                        </Box>
                      ))}
                      
                      {/* View More Link - Show if more than 4 products */}
                      {jtWebsiteData.products && jtWebsiteData.products.length > 4 && (
                        <Typography
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate('/products');
                          }}
                          sx={{
                            cursor: "pointer",
                            textDecoration: 'none',
                            color: '#347CCC',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            mt: 1,
                            px: 3,
                            py: 1,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          View More Products
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* Column 2: Development */}
                  <Box sx={{ minWidth: 265, borderRight: '1px solid #eee', pr: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box
                      component="a"
                      role="menuitem"
                      onClick={() => {
                        setIsWhatWeDoDropdownOpen(false);
                        navigate('/services');
                      }}
                      sx={{ 
                        px: 3, 
                        color: '#347CCC', 
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        "&:hover": {
                          backgroundColor: 'rgba(52, 124, 204, 0.08)',
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      <CodeOutlined sx={{ fontSize: 24, color: '#347CCC', fontWeight: 600 }} />
                      Development
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 7 }}>
                      Custom software solutions
                    </Typography>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        { label: 'Web Solutions', path: '/services/web-development' },
                        { label: 'Mobile Apps', path: '/services/mobile-development' },
                        { label: 'Product Engineering', path: '/services/product-development' }
                      ].map((item: any) => (
                        <Box
                          key={item.path}
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate(item.path);
                          }}
                          sx={{
                            px: 7,
                            py: 1,
                            fontSize: '14px',
                            cursor: "pointer",
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              backgroundColor: '#eef5ff',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              color: '#347CCC',
                            },
                          }}
                        >
                          <span>{item.label}</span>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ 
                      px: 3, 
                      color: '#347CCC', 
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}>
                      <IntegrationInstructionsIcon sx={{ fontSize: 24, fontWeight: 600, color: '#347CCC' }} />
                      Integrations
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 7 }}>
                      Seamless system connectivity
                    </Typography>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        { label: 'API Solutions', path: '/services/api-integration' },
                        { label: 'AI Agent Services', path: '/services/ai-integration' }
                      ].map((item: any) => (
                        <Box
                          key={item.path}
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate(item.path);
                          }}
                          sx={{
                            px: 7,
                            py: 1,
                            fontSize: '14px',
                            cursor: "pointer",
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              backgroundColor: '#eef5ff',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              color: '#347CCC',
                            },
                          }}
                        >
                          <span>{item.label}</span>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Column 3: Consulting & Support */}
                  <Box sx={{ minWidth: 265, borderRight: '1px solid #eee', pr: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box
                      sx={{ 
                        px: 3, 
                        color: '#347CCC', 
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <EngineeringIcon sx={{ fontSize: 24, color: '#347CCC', fontWeight: 600,  }} />
                      Consulting & Support
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 7 }}>
                      Expert guidance & assistance
                    </Typography>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        { label: 'Deployment', path: '/services/deployment' },
                        { label: 'Consulting', path: '/services/consulting' },
                        { label: 'Customization', path: '/services/customization' }
                      ].map((item: any) => (
                        <Box
                          key={item.path}
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate(item.path);
                          }}
                          sx={{
                            px: 7,
                            py: 1,
                            fontSize: '14px',
                            cursor: "pointer",
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              backgroundColor: '#eef5ff',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              color: '#347CCC',
                            },
                          }}
                        >
                          <span>{item.label}</span>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ 
                      px: 3, 
                      color: '#347CCC', 
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <PeopleIcon sx={{ fontSize: 24, fontWeight: 600, color: '#347CCC' }} />
                      Hire Experts
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 7 }}>
                      Build your dream with our team
                    </Typography>
                    <Box sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {developersMenu.map((item: any) => (
                        <Box
                          key={item.path}
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate(item.path);
                          }}
                          sx={{
                            px: 7,
                            py: 1,
                            fontSize: '14px',
                            cursor: "pointer",
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              backgroundColor: '#eef5ff',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              color: '#347CCC',
                            },
                          }}
                        >
                          <span>{item.label}</span>
                        </Box>
                      ))}
                      <Box sx={{ textAlign: 'center'}}>
                        <Box sx={{ mb: 1, borderBottom: '1px solid #eee' }}></Box>
                        <Box
                          component="a"
                          role="menuitem"
                          onClick={() => {
                            setIsWhatWeDoDropdownOpen(false);
                            navigate('/hire-developers');
                          }}
                          sx={{
                            py: 1,
                            fontSize: '14px',
                            color: '#347CCC',
                            cursor: "pointer",
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            "&:hover": {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          View All Developer Roles
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Column 4: Our services/work */}
                  <Box sx={{ minWidth: 265, display: 'flex', flexDirection: 'column', pl: 3, pr: 3, backgroundColor: '#f9f9f9' }}>
                    <Box
                      sx={{ 
                        color: '#347CCC', 
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                      <WorkIcon sx={{ fontSize: 24, fontWeight: 600, color: '#347CCC' }} />
                      Services
                    </Box>
                    <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: 500, color: '#666', pl: 4 }}>
                      Comprehensive solutions
                    </Typography>
                    <Box sx={{ mb: 1 }} />
                    {/* Enhanced Carousel */}
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        borderRadius: 3,
                        overflow: 'hidden',
                        mb: 1,
                        background: 'white',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                      }}
                    >
                      {/* Project Images Carousel */}
                      {['/assets/images/portfolio/bloomwell-mockup.png',
                      '/assets/images/portfolio/aqua-intel-mockup.png',
                      '/assets/images/portfolio/ante-think-mockup.png',
                      '/assets/images/portfolio/pvista-mockup.png', 
                      '/assets/images/portfolio/virtualcrm-mockup.png',
                    ].map((image, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={image}
                          alt={`Project ${index + 1}`}
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            opacity: currentProjectIndex === index ? 1 : 0,
                            // transform: `translateX(${(index - currentProjectIndex) * 100}%)`,
                            // transition: 'all 0.6s ease-in-out',
                          }}
                        />
                      ))}
                    </Box>
                    
                    {/* Enhanced CTA Button */}
                    <Typography
                      component="a"
                      role="menuitem"
                      onClick={() => {
                        setIsWhatWeDoDropdownOpen(false);
                        navigate('/our-work');
                      }}
                      sx={{
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: '#347CCC',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: '#2a5ca8',
                        },
                      }}
                    >
                      Explore More Services
                    </Typography>
                  </Box>
                </Box>
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
        </div>
      </Toolbar>
    </Box>
  );
};

export default React.memo(Header);
